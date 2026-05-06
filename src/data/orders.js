const titles = [
  'تصليح حنفية', 'تأسيس كهرباء', 'دهان شقة', 'تركيب تكييف', 'صيانة غسالة', 
  'بناء سور', 'تنظيف فيلا', 'تغيير كالون', 'عزل أسطح', 'فك وتركيب عفش',
  'تصليح بوتاجاز', 'تركيب نجف', 'تأسيس سباكة', 'نقاشة ريسبشن', 'صيانة ثلاجة',
  'تركيب سيراميك', 'جبس بورد', 'صيانة سخان', 'تركيب فلتر مياه', 'إصلاح تسريب'
];

const clientIds = ['u1', 'u2', 'u3', 'u4', 'u5', 'u6'];
const craftsList = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
const locations = ['القاهرة، المعادي', 'القاهرة، مدينة نصر', 'الجيزة، الهرم', 'الجيزة، الشيخ زايد', 'القاهرة، التجمع الخامس', 'الإسكندرية، سموحة', 'طنطا، الغربية', 'المنصورة، الدقهلية', 'القاهرة، مصر الجديدة', 'الجيزة، فيصل'];

export const orders = Array.from({ length: 80 }).map((_, index) => {
  const id = `o${index + 1}`;
  const title = titles[Math.floor(Math.random() * titles.length)];
  
  // Create a more realistic distribution of statuses
  let status;
  const rand = Math.random();
  if (rand < 0.4) status = 'completed';
  else if (rand < 0.6) status = 'pending';
  else if (rand < 0.8) status = 'in_progress';
  else status = 'cancelled';

  // Ensure u1 has plenty of orders for testing
  const clientId = (index < 20) ? 'u1' : clientIds[Math.floor(Math.random() * clientIds.length)];
  
  return {
    id,
    clientId,
    title: `${title} - رقم ${index + 1}`,
    description: `محتاج حد شاطر يعمل ${title} في أسرع وقت، الشغل محتاج دقة واهتمام. يفضل خبرة سابقة في هذا النوع من الأعمال.`,
    craftId: craftsList[Math.floor(Math.random() * craftsList.length)],
    status,
    date: `2026-04-${(index % 30) + 1}`,
    budget: 'inspection',
    totalPrice: 'inspection',
    proposalsCount: Math.floor(Math.random() * 15),
    location: locations[Math.floor(Math.random() * locations.length)],
    craftsmanId: status !== 'pending' ? `m${Math.floor(Math.random() * 10) + 1}` : null,
  };
});
