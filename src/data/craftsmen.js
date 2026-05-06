const names = [
  'أحمد', 'محمد', 'محمود', 'إبراهيم', 'مصطفى', 'خالد', 'علي', 'عمر',
  'كريم', 'حسين', 'هاني', 'يوسف', 'حمزة', 'شريف', 'تامر', 'وائل',
  'جمال', 'سامي', 'باسل', 'ياسر', 'مازن', 'سيد', 'عادل', 'سعيد',
  'أشرف', 'مجدي', 'صلاح', 'كمال', 'رفعت', 'مدحت', 'خليل', 'باسم',
  'هشام', 'عماد', 'طارق', 'رامي', 'نور الدين', 'سامح', 'فاروق', 'جلال',
  'جاد', 'ياسين', 'سامر', 'عوني', 'نبيل', 'حسام', 'سراج', 'وسيم',
  'حاتم', 'ممدوح', 'عبد الرحمن', 'حازم', 'عصام', 'منير', 'ماهر', 'يحيى',
  'زكريا', 'مروان', 'هيثم', 'رؤوف', 'ناجي', 'فوزي', 'عوض', 'عيد',
  'طلعت', 'صبحي', 'فتحي', 'إيهاب', 'علاء', 'مدحت', 'شادي', 'مازن',
  'باهر', 'منصور', 'راضي', 'منتصر', 'وجدي', 'مختار', 'يسري'
];

const craftsList = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'];
const locations = [
  'القاهرة، المعادي', 'القاهرة، مدينة نصر', 'الجيزة، الهرم', 'الجيزة، الشيخ زايد',
  'القاهرة، التجمع الخامس', 'الإسكندرية، سموحة', 'طنطا، الغربية', 'المنصورة، الدقهلية',
  'القاهرة، مصر الجديدة', 'الجيزة، فيصل', 'المنوفية، شبين الكوم', 'السويس، بور توفيق',
  'بورسعيد، حي العرب', 'الإسماعيلية، حي أول', 'القليوبية، بنها', 'دمياط، ميدان الساعة'
];

export const craftsmen = Array.from({ length: 120 }).map((_, index) => {
  const id = `gen_m${index + 1}`; // Use a unique prefix to avoid clash with users.js
  const firstName = names[index % names.length];
  const lastName = names[(index + 5) % names.length];
  const craftId = craftsList[index % craftsList.length]; // Deterministic craft selection for better distribution
  const rating = (4 + Math.random()).toFixed(1);
  const completed = Math.floor(Math.random() * 500) + 50; // Minimum 50 completed
  const reviewsCount = Math.floor(completed * (0.4 + Math.random() * 0.5)); // Reviews are 40-90% of completed orders
  const price = 100 + Math.floor(Math.random() * 400);

  const serviceExamples = [
    { id: 1, title: 'فحص وصيانة عامة', titleEn: 'General Maintenance', price: price, type: 'hour' },
    { id: 2, title: 'تركيب وتأسيس', titleEn: 'Installation', price: price * 3, type: 'fixed' },
    { id: 3, title: 'إصلاح أعطال مفاجئة', titleEn: 'Emergency Repair', price: price * 1.5, type: 'hour' },
    { id: 4, title: 'معاينة واستشارة', titleEn: 'Consultation', price: price * 0.5, type: 'fixed' },
    { id: 5, title: 'فك وتركيب أجهزة', titleEn: 'Appliance Setup', price: price * 2, type: 'fixed' },
    { id: 6, title: 'تنظيف وتجهيز', titleEn: 'Cleaning & Prep', price: price * 1.2, type: 'hour' },
  ];

  const experienceYears = Math.floor(Math.random() * 5) + 1; // 1 to 6 years max

  // Generate highly realistic portraits using RandomUser API men directory
  const faceIndex = 20 + (index % 60); // Use faces from 20 to 80 to ensure mature adults
  const profileImg = `https://randomuser.me/api/portraits/men/${faceIndex}.jpg`;

  // Specific portfolio images for each craft
  const craftPortfolios = {
    c1: ['1584622650085-04589943384f', '1504148455328-c376907d081c', '1607472586893-edb57bdc0e39', '1585533844147-aa17336d1362'],
    c2: ['1621905251189-08b45d6a269e', '1558211583-d28f967813b1', '1544724569-5f546fd6f2b5', '1460518451285-97b627178677'],
    c3: ['1533090161767-e6ffed986c88', '1581244277943-fe4a9c777189', '1426927308491-6380b6a9936f', '1589939705384-5185137a7f0f'],
    c4: ['1589939705384-5185137a7f0f', '1562259949-e8e7689d7828', '1595113316349-9fa4eb24f884', '1516962215378-7fa2e1372cf5'],
    c5: ['1581094288338-2314dddb7e8b', '1631541486121-827725916962', '1599833552251-582845c08643', '1581092580497-e0d23cb9d430'],
    c6: ['1581578731548-c64695cc6954', '1527515637462-cff94eecc1ac', '1584622781564-1d987f7333c1', '1584622650111-993a426fbf0a'],
    c7: ['1585320806297-9794b3e4eeae', '1592419044706-39796d40f98c', '1591857177580-dc82b9ac4e17', '1598902108854-10e335adac99'],
    c8: ['1541888941259-7b9f1207e33a', '1502005229762-cf1b2da7c5d6', '1600585154340-be6161a56a0c', '1516455590571-18256e5bb9ff'],
    c9: ['1502005090153-bf915a23e595', '1600607687920-4e2a09cf159d', '1534349735244-26958f24b4ee', '1603513361100-349f43058957'],
    c10: ['1504328345606-18bbc8c9d7d1', '1535119024890-73534e674e3c', '1493070129024-7df09c3f0b20', '1517146705904-937000889f07'],
    c11: ['1486262715619-67b85e0b08d3', '1487754180451-c456f719c1ff', '1530047622727-4a0083993708', '1615906659123-26d2c4990977'],
    c12: ['1538688598194-f848730f362f', '1524758631624-e2822e304c36', '1556911223-0552b921115b', '1586023492125-2a99817fd93d'],
    c13: ['1584622650085-04589943384f', '1504148455328-c376907d081c', '1615906659123-26d2c4990977', '1516455590571-18256e5bb9ff'],
    c14: ['1581094288338-2314dddb7e8b', '1631541486121-827725916962', '1599833552251-582845c08643', '1581092580497-e0d23cb9d430'],
    c15: ['1581094288338-2314dddb7e8b', '1631541486121-827725916962', '1599833552251-582845c08643', '1581092580497-e0d23cb9d430']
  };

  const craftSpecificPortfolio = (craftPortfolios[craftId] || []).map(id => `https://images.unsplash.com/photo-${id}?w=600&h=600&fit=crop&q=80`);
  const finalPortfolio = [...craftSpecificPortfolio].sort(() => 0.5 - Math.random());

  return {
    id,
    name: `${firstName} ${lastName}`,
    craftId,
    rating: parseFloat(rating),
    reviewsCount,
    image: profileImg,
    verified: Math.random() > 0.3,
    bio: `فني محترف، يتميز بالخبرة العالية والالتزام بالمواعيد. متخصص في كافة الأعمال الفنية بدقة وإتقان لتلبية احتياجاتكم.`,
    location: locations[Math.floor(Math.random() * locations.length)],
    pricePerHour: price,
    completedOrders: completed,
    badges: index % 5 === 0 ? ['Top Rated', 'Expert'] : ['Trusted'],
    services: serviceExamples.sort(() => 0.5 - Math.random()).slice(0, 3),
    portfolio: finalPortfolio,
  };
});
