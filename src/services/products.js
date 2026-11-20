export const CATEGORIES = [{
  id: 'coffee',
  name: 'Coffee'
}, {
  id: 'non-coffee',
  name: 'Non-Coffee'
}, {
  id: 'cookies',
  name: 'Cookies'
}, {
  id: 'bars',
  name: 'Bars'
}];
export const PRODUCTS = [{
  id: 'cafe-latte',
  name: 'Cafe Latte',
  price: 85,
  group: 'drinks',
  category: 'coffee',
  rating: 4,
  sku: 'BCB-CL-085',
  tone: '#dfeaf5',
  image: '/images/products/cafe-latte.webp',
  sizes: [{
    label: '12oz Hot',
    price: 85
  }, {
    label: '16oz Iced',
    price: 95
  }],
  description: 'Smooth espresso balanced with steamed milk, served over ice.'
}, {
  id: 'caramel-macchiato',
  name: 'Caramel Macchiato',
  price: 130,
  group: 'drinks',
  category: 'coffee',
  rating: 4,
  sku: 'BCB-CM-130',
  tone: '#f3dcb8',
  image: '/images/products/caramel-macchiato.webp',
  sizes: [{
    label: '12oz Hot',
    price: 130
  }, {
    label: '16oz Iced',
    price: 140
  }],
  description: 'Espresso layered with milk and rich caramel drizzle.'
}, {
  id: 'biscoff-latte',
  name: 'Biscoff Latte',
  price: 150,
  group: 'drinks',
  category: 'coffee',
  rating: 4,
  sku: 'BCB-BL-150',
  tone: '#e8cfae',
  image: '/images/products/biscoff-latte.webp',
  sizes: [{
    label: '16oz Iced',
    price: 150
  }],
  description: 'Creamy latte blended with sweet Biscoff cookie flavor.'
}, {
  id: 'spanish-latte',
  name: 'Spanish Latte',
  price: 85,
  group: 'drinks',
  category: 'coffee',
  rating: 4,
  sku: 'BCB-SL-085',
  tone: '#e9dccb',
  image: '/images/products/spanish-latte.webp',
  sizes: [{
    label: '12oz Hot',
    price: 85
  }, {
    label: '16oz Iced',
    price: 95
  }],
  description: 'Creamy milk and espresso layered over ice, with a smooth, lightly sweet finish.'
}, {
  id: 'strawberry-milk',
  name: 'Strawberry Milk',
  price: 140,
  group: 'drinks',
  category: 'non-coffee',
  rating: 4,
  sku: 'BCB-SM-140',
  tone: '#f8c8d0',
  image: '/images/products/strawberry-milk.webp',
  description: 'Fresh milk swirled with sweet strawberry sauce.'
}, {
  id: 'oreo-milk',
  name: 'Oreo Milk',
  price: 140,
  group: 'drinks',
  category: 'non-coffee',
  rating: 4,
  sku: 'BCB-OM-140',
  tone: '#d9d9e0',
  image: '/images/products/oreo-milk.webp',
  description: 'Chilled milk blended with crushed Oreo cookies.'
}, {
  id: 'matcha-milk',
  name: 'Matcha Milk',
  price: 150,
  group: 'drinks',
  category: 'non-coffee',
  rating: 4,
  sku: 'BCB-MM-150',
  tone: '#d7f0c5',
  image: '/images/products/matcha-milk.webp',
  description: 'Earthy matcha whisked into creamy milk.'
}, {
  id: 'choco-lava',
  name: 'Choco Lava',
  price: 150,
  group: 'drinks',
  category: 'non-coffee',
  rating: 4,
  sku: 'BCB-CV-150',
  tone: '#d7c3b8',
  image: '/images/products/choco-lava.webp',
  description: 'Rich chocolate milk with a molten cocoa swirl.'
}, {
  id: 'strawberry-matcha',
  name: 'Strawberry Matcha',
  price: 150,
  group: 'drinks',
  category: 'non-coffee',
  rating: 4,
  sku: 'BCB-HR-350',
  tone: '#e4f2d0',
  image: '/images/products/strawberry-matcha.webp',
  gallery: ['/images/products/strawberry-matcha.webp', '/images/products/strawberry-matcha-detail.webp', '/images/products/strawberry-matcha-thumb.webp'],
  description: 'Enjoy a refreshing blend of earthy matcha and sweet, juicy strawberries. This Strawberry Matcha features creamy green matcha layered with vibrant strawberry sauce, creating a delicious balance of rich, slightly bitter matcha and fruity sweetness in every sip.',
  features: [['Ingredients', 'Matcha, Strawberry sauce, Fresh strawberry'], ['Texture', 'Smooth and creamy'], ['Perfect For', 'Matcha and strawberry lovers'], ['Highlights', 'Rich matcha flavor layered with sweet strawberry']]
}, {
  id: 'smores',
  name: "S'mores",
  price: 60,
  group: 'bakery',
  category: 'cookies',
  rating: 4,
  sku: 'BCB-SM-060',
  tone: '#e9d6c0',
  image: '/images/products/smores.webp',
  description: 'Chocolate chip cookie with marshmallow and graham notes.'
}, {
  id: 'red-velvet-creamcheese',
  name: 'Red Velvet Creamcheese',
  price: 65,
  group: 'bakery',
  category: 'cookies',
  rating: 4,
  sku: 'BCB-RV-065',
  tone: '#f5cfc9',
  image: '/images/products/red-velvet-creamcheese.webp',
  description: 'Red velvet cookie with a soft cream cheese center.'
}, {
  id: 'chocolate-chip',
  name: 'Chocolate Chip',
  price: 50,
  group: 'bakery',
  category: 'cookies',
  rating: 4,
  sku: 'BCB-CC-050',
  tone: '#e6cfb1',
  image: '/images/products/chocolate-chip.webp',
  description: 'Classic chewy cookie loaded with chocolate chips.'
}, {
  id: 'white-chocolate-chip',
  name: 'White Chocolate Chip',
  price: 50,
  group: 'bakery',
  category: 'cookies',
  rating: 4,
  sku: 'BCB-WC-050',
  tone: '#efe4cf',
  image: '/images/products/white-chocolate-chip.webp',
  description: 'Buttery cookie with white chocolate chunks.'
}, {
  id: 'oreo-cheesecake',
  name: 'Oreo Cheesecake',
  price: 60,
  group: 'bakery',
  category: 'cookies',
  rating: 4,
  sku: 'BCB-OC-060',
  tone: '#dcd6d2',
  image: '/images/products/oreo-cheesecake.webp',
  description: 'Cookie topped with Oreo bits and cheesecake filling.'
}, {
  id: 'matcha-creamcheese',
  name: 'Matcha Creamcheese',
  price: 65,
  group: 'bakery',
  category: 'cookies',
  rating: 4,
  sku: 'BCB-MC-065',
  tone: '#d5e6c5',
  image: '/images/products/matcha-creamcheese.webp',
  description: 'Matcha cookie with a cream cheese filling.'
}, {
  id: 'lotus-biscoff',
  name: 'Lotus Biscoff',
  price: 65,
  group: 'bakery',
  category: 'cookies',
  rating: 4,
  sku: 'BCB-LB-065',
  tone: '#eed3b2',
  image: '/images/products/lotus-biscoff.webp',
  description: 'Soft cookie with Lotus Biscoff spread and crumbs.'
}, {
  id: 'hershey-chocolate-chip',
  image: '/images/products/hershey-chocolate-chip.webp',
  name: "Hershey's Chocolate Chip",
  price: 55,
  group: 'bakery',
  category: 'cookies',
  rating: 4,
  sku: 'BCB-HC-055',
  tone: '#e3cdb8',
  description: "Chocolate chip cookie made with Hershey's chocolate."
}, {
  id: 'brownies',
  name: 'Brownies',
  price: 55,
  group: 'bakery',
  category: 'bars',
  rating: 4,
  sku: 'BCB-BW-055',
  tone: '#d8c7b8',
  image: '/images/signatures/brownie.webp',
  description: 'Fudgy chocolate brownie baked fresh in-store.'
}, {
  id: 'oreo-blondies',
  image: '/images/products/oreo-blondies.webp',
  name: 'Oreo Blondies',
  price: 60,
  group: 'bakery',
  category: 'bars',
  rating: 4,
  sku: 'BCB-OB-060',
  tone: '#ece0c8',
  description: 'Blondie bars with Oreo pieces.'
}, {
  id: 'brookies',
  image: '/images/products/brookies.webp',
  name: 'Brookies',
  price: 69,
  group: 'bakery',
  category: 'bars',
  rating: 4,
  sku: 'BCB-BK-069',
  tone: '#d9c2a5',
  description: 'Half brownie, half cookie in one bar.'
}, {
  id: 'rocky-road-brownies',
  image: '/images/products/rocky-road-brownies.webp',
  name: 'Rocky Road Brownies',
  price: 69,
  group: 'bakery',
  category: 'bars',
  rating: 4,
  sku: 'BCB-RR-069',
  tone: '#cdb9a6',
  description: 'Brownies topped with marshmallow and chocolate chunks.'
}, {
  id: 'biscoff-blondies',
  image: '/images/products/biscoff-blondies.webp',
  name: 'Biscoff Blondies',
  price: 69,
  group: 'bakery',
  category: 'bars',
  rating: 4,
  sku: 'BCB-BB-069',
  tone: '#eed3b2',
  description: 'Blondie bars with Biscoff spread.'
}, {
  id: 'dubai-cookie',
  name: 'Dubai Cookie',
  price: 80,
  group: 'signature',
  category: 'signature',
  rating: 5,
  sku: 'BCB-DC-080',
  tone: '#e9d6c0',
  image: '/images/signatures/dubai-cookie.webp',
  description: 'Chocolate pistachio bite with a crisp golden shell.'
}];
export const ADDONS = [{
  id: 'tapioca-pearls',
  name: 'Tapioca Pearls',
  price: 20
}, {
  id: 'popping-boba',
  name: 'Popping Boba',
  price: 20
}, {
  id: 'jelly-toppings',
  name: 'Jelly Toppings',
  price: 20
}, {
  id: 'pudding',
  name: 'Pudding',
  price: 20
}];
export const FEATURED_IDS = ['oreo-milk', 'chocolate-chip', 'strawberry-matcha', 'red-velvet-creamcheese', 'choco-lava'];
export const SIGNATURES = [{
  id: 1,
  date: '06/June/2026',
  comments: 50,
  title: 'Matcha Meets Oreo for a Delightful Treat',
  tone: '#e4f2d0',
  image: '/images/signatures/matcha-meets-oreo.webp',
  productId: 'matcha-milk',
  body: ['Our Matcha Meets Oreo is a happy marriage of earthy matcha and crunchy Oreo crumbles. A smooth, creamy base balances the rich green tea for a drink that is refreshing and lightly sweet.', 'Topped with cookie crumbs, it is a treat for matcha lovers who also crave a bit of chocolate. Enjoy it iced on a warm afternoon.'],
  sampleComments: [{
    name: 'Maria L.',
    date: '08 June 2026',
    text: 'The matcha is so smooth and the Oreo topping is perfect. My new favorite!'
  }, {
    name: 'Carlo D.',
    date: '09 June 2026',
    text: 'Refreshing, not too sweet, and the crumbs add the best crunch.'
  }, {
    name: 'Jessa R.',
    date: '12 June 2026',
    text: 'Beautiful drink and even better taste. I will definitely order again.'
  }]
}, {
  id: 2,
  date: '17/July/2026',
  comments: 67,
  title: 'Treat Yourself to a Delightful Brownie',
  tone: '#f0dcc4',
  image: '/images/signatures/brownie.webp',
  productId: 'brownies',
  body: ['Our brownies are baked fresh every day with rich dark chocolate, for a fudgy center and a slightly crisp top. Each square is generous and made to be shared, or saved for yourself.', 'Pair it with your favorite Manna Delight drink for a comforting afternoon treat.'],
  sampleComments: [{
    name: 'Ana M.',
    date: '19 July 2026',
    text: 'Fudgy, rich, and exactly how a brownie should be.'
  }, {
    name: 'Miguel S.',
    date: '20 July 2026',
    text: 'Best brownie in Olongapo, hands down!'
  }, {
    name: 'Liza P.',
    date: '23 July 2026',
    text: 'Perfect with an iced latte. Soft and so chocolatey.'
  }]
}, {
  id: 3,
  date: '22/Aug/2026',
  comments: 88,
  title: 'Make Every Bite a Delight with Our Dubai Cookie',
  tone: '#e9d6c0',
  image: '/images/signatures/dubai-cookie.webp',
  productId: 'dubai-cookie',
  body: ['Our Dubai Cookie is a bite-sized treat with a crisp chocolate shell, a smooth pistachio cream center, and a finishing drizzle of dark chocolate. Crushed pistachios on top add a lovely nutty crunch.', 'Light, rich, and easy to share, it is a great pick for dessert or a snack with coffee.'],
  sampleComments: [{
    name: 'Ryan T.',
    date: '24 August 2026',
    text: 'The pistachio flavor is amazing. It tastes like a little luxury.'
  }, {
    name: 'Ella V.',
    date: '25 August 2026',
    text: 'Crunchy outside, creamy inside. Absolutely love it!'
  }, {
    name: 'Mark A.',
    date: '27 August 2026',
    text: 'So good with a cup of coffee. The packaging was great too.'
  }]
}];
export const SHIPPING_FEE = 50;
export const getProduct = id => PRODUCTS.find(p => p.id === id);
export const getProductsByCategory = categoryId => PRODUCTS.filter(p => p.category === categoryId);
export const getRelated = product => PRODUCTS.filter(p => p.group === product.group && p.id !== product.id).slice(0, 4);
export const getFeatured = () => FEATURED_IDS.map(getProduct).filter(Boolean);
export const formatPeso = amount => `₱${amount}`;
export const priceLabel = product => product.sizes && product.sizes.length > 1 ? product.sizes.map(s => formatPeso(s.price)).join(' / ') : formatPeso(product.price);
export const getSizePrice = (product, sizeLabel) => {
  const size = product.sizes?.find(s => s.label === sizeLabel) || product.sizes?.[0];
  return size ? size.price : product.price;
};
const COMMENT_FIRST = ['Maria', 'Carlo', 'Jessa', 'Ana', 'Miguel', 'Liza', 'Ryan', 'Ella', 'Mark', 'Paolo', 'Trisha', 'Jomar', 'Kim', 'Rhea', 'Ben', 'Lara', 'Noel', 'Joy', 'Aldrin', 'Mica', 'Ivan', 'Gela', 'Dennis', 'Hazel', 'Ronnie', 'Cathy', 'Erwin', 'Faith', 'Gio', 'Nina', 'Jerome', 'Angel', 'Bea', 'Kenji', 'Sam', 'Yna', 'Rico', 'Tina', 'Vince', 'Lorie'];
const COMMENT_LAST = ['S.', 'R.', 'D.', 'L.', 'M.', 'T.', 'G.', 'P.', 'C.', 'V.'];
const COMMENT_TEXTS = {
  1: ['The matcha is so smooth and the Oreo topping is perfect.', 'Refreshing, not too sweet, and the crumbs add the best crunch.', 'Beautiful drink and even better taste.', 'Creamy, earthy, and so satisfying.', 'My favorite matcha drink so far!', 'The Oreo bits make every sip fun.', 'Perfect for a warm afternoon.', 'Balanced sweetness and great quality.', 'Will definitely order this again.', 'Staff made it exactly the way I like it.'],
  2: ['Fudgy, rich, and exactly how a brownie should be.', 'Best brownie in Olongapo, hands down!', 'Perfect with an iced latte.', 'So soft and chocolatey.', 'Always fresh and generous in size.', 'My go-to treat after work.', 'Rich chocolate flavor without being too sweet.', 'Shared this with my family and they loved it.', 'The crisp top and gooey center are perfect.', 'Worth every peso!'],
  3: ['The pistachio flavor is amazing.', 'Crunchy outside, creamy inside.', 'So good with a cup of coffee.', 'Tastes like a little luxury.', 'Perfect for gifting.', 'The chocolate drizzle is so pretty and tasty.', 'Light and not too heavy.', 'Easy to share, and it disappears fast!', 'Great packaging and fresh taste.', 'Will be ordering a box next time.']
};
const COMMENT_START = {
  1: '2026-06-06',
  2: '2026-07-17',
  3: '2026-08-22'
};
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const formatCommentDate = d => `${String(d.getDate()).padStart(2, '0')} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
const parseCommentDate = str => {
  const [day, month, year] = str.split(' ');
  const monthIndex = MONTH_NAMES.findIndex(m => m.toLowerCase() === month.toLowerCase());
  return new Date(Number(year), monthIndex, Number(day)).getTime();
};
export const getComments = sig => {
  const texts = COMMENT_TEXTS[sig.id] || [];
  const start = new Date(`${COMMENT_START[sig.id]}T00:00:00`);
  const need = Math.max(0, sig.comments - sig.sampleComments.length);
  const generated = [];
  for (let i = 0; i < need; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + 1 + i % 45);
    generated.push({
      name: `${COMMENT_FIRST[(i * 7 + sig.id) % COMMENT_FIRST.length]} ${COMMENT_LAST[i * 3 % COMMENT_LAST.length]}`,
      date: formatCommentDate(d),
      text: texts[(i * 5 + sig.id) % texts.length]
    });
  }
  return [...sig.sampleComments, ...generated].slice(0, sig.comments).sort((a, b) => parseCommentDate(b.date) - parseCommentDate(a.date));
};
const KEY_FEATURES = {
  'cafe-latte': [['Ingredients', 'Espresso, Milk'], ['Texture', 'Smooth and creamy'], ['Perfect For', 'Coffee lovers who like a milder cup'], ['Highlights', 'Espresso with steamed milk, served over ice']],
  'caramel-macchiato': [['Ingredients', 'Espresso, Milk, Caramel'], ['Texture', 'Creamy and layered'], ['Perfect For', 'Caramel lovers'], ['Highlights', 'Layered espresso and milk with rich caramel drizzle']],
  'biscoff-latte': [['Ingredients', 'Espresso, Milk, Biscoff'], ['Texture', 'Creamy and sweet'], ['Perfect For', 'Biscoff fans'], ['Highlights', 'Creamy latte with sweet Biscoff cookie flavor']],
  'spanish-latte': [['Ingredients', 'Espresso, Milk'], ['Texture', 'Creamy and smooth'], ['Perfect For', 'Milk coffee lovers'], ['Highlights', 'Espresso and milk layered over ice']],
  'strawberry-milk': [['Ingredients', 'Strawberry sauce, Milk'], ['Texture', 'Creamy and fruity'], ['Perfect For', 'Strawberry lovers'], ['Highlights', 'Fresh milk swirled with sweet strawberry sauce']],
  'oreo-milk': [['Ingredients', 'Oreo, Milk'], ['Texture', 'Creamy with crunchy bits'], ['Perfect For', 'Oreo lovers'], ['Highlights', 'Chilled milk blended with crushed Oreo cookies']],
  'matcha-milk': [['Ingredients', 'Matcha, Milk'], ['Texture', 'Smooth and creamy'], ['Perfect For', 'Matcha lovers'], ['Highlights', 'Earthy matcha whisked into creamy milk']],
  'choco-lava': [['Ingredients', 'Chocolate, Milk'], ['Texture', 'Thick and creamy'], ['Perfect For', 'Chocolate lovers'], ['Highlights', 'Rich chocolate milk with a molten cocoa swirl']],
  'smores': [['Ingredients', 'Chocolate chips, Marshmallow, Graham'], ['Texture', 'Chewy with a gooey marshmallow center'], ['Perfect For', 'Dessert lovers'], ['Highlights', 'Chocolate chip cookie with marshmallow and graham']],
  'red-velvet-creamcheese': [['Ingredients', 'Red velvet dough, Cream cheese, White chocolate chips'], ['Texture', 'Soft and chewy'], ['Perfect For', 'Red velvet fans'], ['Highlights', 'Soft red velvet cookie with a cream cheese center']],
  'chocolate-chip': [['Ingredients', 'Butter, Chocolate chips'], ['Texture', 'Chewy with melty chips'], ['Perfect For', 'Classic cookie lovers'], ['Highlights', 'Classic chewy cookie loaded with chocolate chips']],
  'white-chocolate-chip': [['Ingredients', 'Butter, White chocolate chips'], ['Texture', 'Buttery and chewy'], ['Perfect For', 'Sweet tooth'], ['Highlights', 'Buttery cookie with white chocolate chunks']],
  'oreo-cheesecake': [['Ingredients', 'Oreo, Cheesecake filling'], ['Texture', 'Soft and creamy'], ['Perfect For', 'Cheesecake fans'], ['Highlights', 'Cookie topped with Oreo bits and cheesecake filling']],
  'matcha-creamcheese': [['Ingredients', 'Matcha, Cream cheese'], ['Texture', 'Soft with a creamy center'], ['Perfect For', 'Matcha lovers'], ['Highlights', 'Matcha cookie with a cream cheese filling']],
  'lotus-biscoff': [['Ingredients', 'Lotus Biscoff spread, Biscoff crumbs'], ['Texture', 'Soft and crumbly'], ['Perfect For', 'Biscoff fans'], ['Highlights', 'Soft cookie with Lotus Biscoff spread and crumbs']],
  'hershey-chocolate-chip': [['Ingredients', "Hershey's chocolate, Chocolate chips"], ['Texture', 'Chewy'], ['Perfect For', 'Chocolate lovers'], ['Highlights', "Chocolate chip cookie made with Hershey's chocolate"]],
  'brownies': [['Ingredients', 'Dark chocolate'], ['Texture', 'Fudgy with a crisp top'], ['Perfect For', 'Chocolate lovers'], ['Highlights', 'Fudgy chocolate brownie baked fresh in-store']],
  'oreo-blondies': [['Ingredients', 'Blondie, Oreo'], ['Texture', 'Soft and chewy'], ['Perfect For', 'Oreo lovers'], ['Highlights', 'Blondie bars with Oreo pieces']],
  'brookies': [['Ingredients', 'Brownie, Cookie'], ['Texture', 'Fudgy and chewy'], ['Perfect For', 'Brownie and cookie lovers'], ['Highlights', 'Half brownie, half cookie in one bar']],
  'rocky-road-brownies': [['Ingredients', 'Chocolate, Marshmallow'], ['Texture', 'Fudgy'], ['Perfect For', 'Rocky road fans'], ['Highlights', 'Brownies topped with marshmallow and chocolate chunks']],
  'biscoff-blondies': [['Ingredients', 'Blondie, Biscoff spread'], ['Texture', 'Soft and chewy'], ['Perfect For', 'Biscoff fans'], ['Highlights', 'Blondie bars with Biscoff spread']],
  'dubai-cookie': [['Ingredients', 'Pistachio, Chocolate'], ['Texture', 'Crisp shell with a creamy center'], ['Perfect For', 'Pistachio lovers'], ['Highlights', 'Chocolate pistachio bite with a crisp golden shell']]
};
PRODUCTS.forEach(p => {
  if (!p.features && KEY_FEATURES[p.id]) p.features = KEY_FEATURES[p.id];
});
