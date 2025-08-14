from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__, instance_relative_config=True)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(app.instance_path, 'career_talk.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class Session(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    speaker = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    location = db.Column(db.String(120), nullable=False)
    start_datetime = db.Column(db.DateTime, nullable=False)
    end_datetime = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f"<Session {self.title} by {self.speaker}>"


# Create instance folder and tables at startup (Flask 3 removed before_first_request)
os.makedirs(app.instance_path, exist_ok=True)
with app.app_context():
    db.create_all()


@app.route('/')
def index():
    sessions = Session.query.order_by(Session.start_datetime.asc()).all()
    return render_template('index.html', sessions=sessions)


@app.route('/session/<int:session_id>')
def session_detail(session_id):
    session = Session.query.get_or_404(session_id)
    return render_template('detail.html', session=session)


@app.route('/session/new', methods=['GET', 'POST'])
def create_session():
    if request.method == 'POST':
        title = request.form.get('title', '').strip()
        speaker = request.form.get('speaker', '').strip()
        description = request.form.get('description', '').strip()
        location = request.form.get('location', '').strip()
        start = request.form.get('start_datetime', '').strip()
        end = request.form.get('end_datetime', '').strip()

        if not title or not speaker or not location or not start or not end:
            flash('Please fill in all required fields.', 'error')
            return redirect(url_for('create_session'))

        try:
            start_dt = datetime.fromisoformat(start)
            end_dt = datetime.fromisoformat(end)
        except ValueError:
            flash('Invalid date/time format. Use YYYY-MM-DDTHH:MM.', 'error')
            return redirect(url_for('create_session'))

        if end_dt <= start_dt:
            flash('End time must be after start time.', 'error')
            return redirect(url_for('create_session'))

        new_session = Session(
            title=title,
            speaker=speaker,
            description=description,
            location=location,
            start_datetime=start_dt,
            end_datetime=end_dt
        )
        db.session.add(new_session)
        db.session.commit()
        flash('Session created successfully!', 'success')
        return redirect(url_for('index'))

    return render_template('create.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)