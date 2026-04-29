const titles = [
  'تصليح حنفية', 'تأسيس كهرباء', 'دهان شقة', 'تركيب تكييف', 'صيانة غسالة', 
  'بناء سور', 'تنظيف فيلا', 'تغيير كالون', 'عزل أسطح', 'فك وتركيب عفش',
  'تصليح بوتاجاز', 'تركيب نجف', 'تأسيس سباكة', 'نقاشة ريسبشن', 'صيانة ثلاجة',
  'تركيب سيراميك', 'جبس بورد', 'صيانة سخان', 'تركيب فلتر مياه', 'إصلاح تسريب'
];

const clientIds = ['u1', 'u2', 'u3', 'u4', 'u5', 'u6'];
const craftsList = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
const locations = ['القاهرة، المعادي', 'القاهرة، مدينة نصر', 'الجيزة، الهرم', 'الجيزة، الشيخ زايد', 'القاهرة، التجمع الخامس', 'الإسكندرية، سموحة', 'طنطا، الغربية', 'المنصورة، الدقهلية', 'القاهرة، مصر الجديدة', 'الجيزة، فيصل'];

export const orders = Array.from({ length: 50 }).map((_, index) => {
  const id = `o${index + 1}`;
  const title = titles[Math.floor(Math.random() * titles.length)];
  const status = index % 10 === 0 ? 'completed' : (index % 5 === 0 ? 'in_progress' : 'pending');
  
  return {
    id,
    clientId: clientIds[Math.floor(Math.random() * clientIds.length)],
    title: `${title} - رقم ${index + 1}`,
    description: `محتاج حد شاطر يعمل ${title} في أسرع وقت، الشغل محتاج دقة واهتمام.`,
    craftId: craftsList[Math.floor(Math.random() * craftsList.length)],
    status,
    date: `2023-10-${(index % 28) + 1}`,
    budget: `${(index + 1) * 100} EGP`,
    proposalsCount: Math.floor(Math.random() * 20),
    location: locations[Math.floor(Math.random() * locations.length)],
    craftsmanId: status !== 'pending' ? `m${Math.floor(Math.random() * 50) + 1}` : null,
  };
});
