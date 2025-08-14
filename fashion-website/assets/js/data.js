(function(){
  const PRODUCTS = [
    {
      id: 'p001',
      name: 'Linen Blazer',
      price: 169,
      category: 'Women',
      sizes: ['XS','S','M','L','XL'],
      colors: ['Beige','Black','Olive'],
      images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1400&auto=format&fit=crop'],
      tags: ['Outerwear','Linen','Tailored'],
      featured: true,
      description: 'Lightweight linen blazer with a relaxed, tailored fit and horn buttons.'
    },
    {
      id: 'p002',
      name: 'Minimal Leather Tote',
      price: 220,
      category: 'Accessories',
      sizes: [],
      colors: ['Tan','Black'],
      images: ['https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1400&auto=format&fit=crop'],
      tags: ['Bag','Leather'],
      featured: true,
      description: 'Full-grain leather tote with interior pocket and magnetic closure.'
    },
    {
      id: 'p003',
      name: 'Everyday Tee',
      price: 35,
      category: 'Women',
      sizes: ['XS','S','M','L','XL'],
      colors: ['White','Black','Heather'],
      images: ['https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1400&auto=format&fit=crop'],
      tags: ['Top','Cotton'],
      featured: true,
      description: 'Ultra-soft cotton tee with a slightly cropped, boxy silhouette.'
    },
    {
      id: 'p004',
      name: 'Slim Denim',
      price: 98,
      category: 'Men',
      sizes: ['28','30','32','34','36'],
      colors: ['Indigo','Washed Black'],
      images: ['https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1400&auto=format&fit=crop'],
      tags: ['Bottoms','Denim'],
      featured: true,
      description: 'Stretch denim with a slim, tapered fit. Garment-dyed for softness.'
    },
    {
      id: 'p005',
      name: 'Wool Overcoat',
      price: 280,
      category: 'Men',
      sizes: ['S','M','L','XL'],
      colors: ['Camel','Charcoal'],
      images: ['https://images.unsplash.com/photo-1520975922284-8b456906c813?q=80&w=1400&auto=format&fit=crop'],
      tags: ['Outerwear','Wool'],
      featured: false,
      description: 'Italian wool blend overcoat with clean lines and hidden placket.'
    },
    {
      id: 'p006',
      name: 'Silk Slip Dress',
      price: 189,
      category: 'Women',
      sizes: ['XS','S','M','L','XL'],
      colors: ['Black','Emerald'],
      images: ['https://images.unsplash.com/photo-1503342217505-b0a15cf70489?q=80&w=1400&auto=format&fit=crop'],
      tags: ['Dress','Silk'],
      featured: true,
      description: 'Bias-cut silk slip dress with adjustable straps and midi length.'
    },
    {
      id: 'p007',
      name: 'Cropped Cardigan',
      price: 79,
      category: 'Women',
      sizes: ['XS','S','M','L','XL'],
      colors: ['Oat','Navy'],
      images: ['https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop'],
      tags: ['Knitwear','Wool'],
      featured: false,
      description: 'Soft merino-wool blend cardigan with corozo buttons.'
    },
    {
      id: 'p008',
      name: 'Field Jacket',
      price: 160,
      category: 'Men',
      sizes: ['S','M','L','XL'],
      colors: ['Olive','Navy'],
      images: ['https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop'],
      tags: ['Outerwear','Cotton'],
      featured: true,
      description: 'Heritage-inspired field jacket with multiple utility pockets.'
    },
    {
      id: 'p009',
      name: 'Leather Loafers',
      price: 150,
      category: 'Accessories',
      sizes: ['6','7','8','9','10','11'],
      colors: ['Brown','Black'],
      images: ['https://images.unsplash.com/photo-1520975771243-6ce46a8a09f9?q=80&w=1400&auto=format&fit=crop'],
      tags: ['Shoes','Leather'],
      featured: false,
      description: 'Classic penny loafers with almond toe and leather sole.'
    },
    {
      id: 'p010',
      name: 'Oversized Hoodie',
      price: 85,
      category: 'Men',
      sizes: ['S','M','L','XL'],
      colors: ['Grey','Black','Forest'],
      images: ['https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1400&auto=format&fit=crop'],
      tags: ['Sweatshirt','Cotton'],
      featured: false,
      description: 'Heavyweight fleece hoodie with oversized fit and kangaroo pocket.'
    },
    {
      id: 'p011',
      name: 'Pleated Skirt',
      price: 89,
      category: 'Women',
      sizes: ['XS','S','M','L','XL'],
      colors: ['Black','Ivory'],
      images: ['https://images.unsplash.com/photo-1520975927459-88b53a6044f0?q=80&w=1400&auto=format&fit=crop'],
      tags: ['Bottoms','Skirt'],
      featured: false,
      description: 'Accordion-pleated midi skirt with elastic waist and fluid drape.'
    },
    {
      id: 'p012',
      name: 'Cashmere Beanie',
      price: 65,
      category: 'Accessories',
      sizes: [],
      colors: ['Oat','Black','Navy'],
      images: ['https://images.unsplash.com/photo-1541099027-44c7e7a6b524?q=80&w=1400&auto=format&fit=crop'],
      tags: ['Hat','Knitwear'],
      featured: true,
      description: 'Luxuriously soft cashmere beanie with ribbed texture.'
    }
  ];

  const CATEGORIES = Array.from(new Set(PRODUCTS.map(p => p.category))).sort();

  window.PRODUCTS = PRODUCTS;
  window.CATEGORIES = CATEGORIES;
})();