const names = [
  'أحمد', 'محمد', 'محمود', 'سارة', 'ياسمين', 'إبراهيم', 'مصطفى', 'خالد', 'علي', 'ليلى',
  'عمر', 'كريم', 'حسين', 'مريم', 'زينب', 'هدى', 'هاني', 'يوسف', 'حمزة', 'شريف',
  'أماني', 'نادية', 'ريهام', 'تامر', 'وائل', 'جمال', 'سامي', 'فاطمة', 'سعاد', 'منى',
  'باسل', 'ياسر', 'مازن', 'نور', 'سلمى', 'دنيا', 'عزة', 'سيد', 'عادل', 'سعيد',
  'أشرف', 'مجدي', 'صلاح', 'كمال', 'رفعت', 'مدحت', 'خليل', 'باسم', 'هشام', 'عماد',
  'طارق', 'رامي', 'نور الدين', 'سامح', 'فاروق', 'جلال', 'جاد', 'ياسين', 'سامر', 'عوني',
  'نبيل', 'أشرف', 'أحمد', 'محمد علي', 'حسام', 'أحمد حمزة', 'سراج', 'وسيم', 'حاتم', 'ممدوح',
  'عبد الرحمن', 'ياسر', 'حازم', 'عصام', 'منير', 'ماهر', 'وائل', 'سامر', 'يحيى', 'زكريا',
  'مروان', 'هيثم', 'رؤوف', 'ناجي', 'فوزي', 'عوض', 'عيد', 'طلعت', 'صبحي', 'فتحي'
];

const craftsList = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15'];
const locations = [
  'القاهرة، المعادي', 'القاهرة، مدينة نصر', 'الجيزة، الهرم', 'الجيزة، الشيخ زايد', 
  'القاهرة، التجمع الخامس', 'الإسكندرية، سموحة', 'طنطا، الغربية', 'المنصورة، الدقهلية', 
  'القاهرة، مصر الجديدة', 'الجيزة، فيصل', 'المنوفية، شبين الكوم', 'السويس، بور توفيق',
  'بورسعيد، حي العرب', 'الإسماعيلية، حي أول', 'القليوبية، بنها', 'دمياط، ميدان الساعة'
];

export const craftsmen = Array.from({ length: 120 }).map((_, index) => {
  const id = `m${index + 1}`;
  const firstName = names[Math.floor(Math.random() * names.length)];
  const lastName = names[Math.floor(Math.random() * names.length)];
    const craftId = craftsList[Math.floor(Math.random() * craftsList.length)];
    const rating = (4 + Math.random()).toFixed(1);
    const reviewsCount = Math.floor(Math.random() * 500);
    const price = 100 + Math.floor(Math.random() * 400);
    const completed = Math.floor(Math.random() * 1000);
    
    const serviceExamples = [
      { id: 1, title: 'فحص وصيانة عامة', titleEn: 'General Maintenance', price: price, type: 'hour' },
      { id: 2, title: 'تركيب وتأسيس', titleEn: 'Installation', price: price * 3, type: 'fixed' },
      { id: 3, title: 'إصلاح أعطال مفاجئة', titleEn: 'Emergency Repair', price: price * 1.5, type: 'hour' },
      { id: 4, title: 'معاينة واستشارة', titleEn: 'Consultation', price: price * 0.5, type: 'fixed' },
      { id: 5, title: 'فك وتركيب أجهزة', titleEn: 'Appliance Setup', price: price * 2, type: 'fixed' },
      { id: 6, title: 'تنظيف وتجهيز', titleEn: 'Cleaning & Prep', price: price * 1.2, type: 'hour' },
    ];

    // Better dynamic images based on craft
    const craftKeywords = {
        c1: 'plumber', c2: 'electrician', c3: 'carpenter', c4: 'painter', c5: 'technician',
        c6: 'cleaner', c7: 'gardener', c8: 'masonry', c9: 'tiling', c10: 'welder',
        c11: 'mechanic', c12: 'furniture', c13: 'locks', c14: 'ac-repair', c15: 'installer'
    };
    const keyword = craftKeywords[craftId] || 'worker';
    const imageUrl = `https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&h=400&fit=crop&q=80&worker=${keyword}&sig=${index}`;
    // Actually using keyword in URL to get variety
    const finalImageUrl = `https://plus.unsplash.com/premium_photo-1661715816204-460368940854?w=400&h=400&fit=crop&q=80&sig=${index}`;
    // Let's use a better source for variety
    const varietyUrl = `https://i.pravatar.cc/400?u=${index}`; // Pravatar is more reliable for faces
    // But Unsplash is more "premium". Let's use a mixed approach or reliable Unsplash IDs
    const unsplashIds = [
        '1540569014015-19a7be504e3a', '1500648767791-00dcc994a43e', '1544005313-94ddf0286df2',
        '1506794778202-cad84cf45f1d', '1494790108377-be9c29b29330', '1507003211169-0a1dd7228f2d',
        '1567532939604-b6b5b0ad2f01', '1539571696357-5a69c17a67c6', '1438761681033-6461ffad8d80',
        '1554151228-14d9def656e4', '1504148455328-c376907d081c', '1621905251189-08b45d6a269e'
    ];
    const profileImg = `https://images.unsplash.com/photo-${unsplashIds[index % unsplashIds.length]}?w=400&h=400&fit=crop&q=80`;

    return {
      id,
      name: `${firstName} ${lastName}`,
      craftId,
      rating: parseFloat(rating),
      reviewsCount,
      image: profileImg,
      verified: Math.random() > 0.3,
      bio: `فني محترف في مجال العمل الخاص به، خبرة تزيد عن ${Math.floor(Math.random() * 20) + 5} عاماً. متميز بالدقة والأمانة والسرعة في التنفيذ.`,
      location: locations[Math.floor(Math.random() * locations.length)],
      pricePerHour: price,
      completedOrders: completed,
      badges: index % 5 === 0 ? ['Top Rated', 'Expert'] : ['Trusted'],
      services: serviceExamples.sort(() => 0.5 - Math.random()).slice(0, 3),
    };
  });
