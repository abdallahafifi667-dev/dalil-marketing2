export const services = {
  ar: [
    {
      id: 'plumber',
      slug: 'سباك',
      name: 'سباك',
      alternateNames: ['سباك صحي', 'معلم سباكة', 'فني سباكة', 'مصلح صنابير', 'سباك طوارئ', 'سباك 24 ساعة'],
      description: 'سباك محترف لجميع أعمال السباكة: تركيب، تصليح، تسليك مجاري، صيانة حمامات، تركيب سخانات، وإصلاح تسربات المياه.',
      faqs: [
        { question: 'كم تكلفة خدمة السباكة؟', answer: 'التكلفة تختلف حسب نوع الخدمة. أفضل طريقة هي إرسال طلب وتلقي عروض من الحرفيين المتاحين في منطقتك.' },
        { question: 'هل هناك ضمان على الخدمة؟', answer: 'نعم، جميع الخدمات المحجوزة عبر الموقع مضمونة من قبلنا. في حال عدم الرضا، نقوم بإعادة العمل أو التعويض.' },
        { question: 'هل السباك يأتي مع الأدوات؟', answer: 'نعم، جميع الحرفيين عندنا يأتيون مع جميع الأدوات والقطع اللازمة لإتمام العمل.' }
      ],
      icon: '🔧'
    },
    {
      id: 'electrician',
      slug: 'كهربائي',
      name: 'كهربائي',
      alternateNames: ['فني كهرباء', 'معلم كهرباء', 'مصلح كهرباء', 'كهربائي طوارئ', 'كهربائي 24 ساعة'],
      description: 'كهربائي محترف لجميع أعمال الكهرباء: تركيب، تصليح، صيانة، تركيب أضواء، سخانات، وأجهزة كهربائية.',
      faqs: [
        { question: 'هل الكهربائي معتمد؟', answer: 'نعم، جميع الحرفيين عندنا موثقين ومدققين، ولهم خبرة كبيرة في مجالهم.' },
        { question: 'هل يمكن تركيب تكييف؟', answer: 'نعم، لدينا فنيين متخصصين في تركيب وصيانة جميع أنواع التكييف.' },
        { question: 'ماذا لو ظهرت مشكلة بعد العمل؟', answer: 'اتصل بنا مباشرة وسنرسل الحرفي مجدداً لحل المشكلة دون أي تكاليف إضافية.' }
      ],
      icon: '⚡'
    },
    {
      id: 'carpenter',
      slug: 'نجار',
      name: 'نجار',
      alternateNames: ['معلم نجارة', 'فني نجارة', 'مصمم أثاث', 'نجار خشب'],
      description: 'نجار محترف لجميع أعمال النجارة: تركيب، تصليح، تصميم أثاث، أبواب، شبابيك، وخزائن.',
      faqs: [
        { question: 'هل يمكن تصميم أثاث مخصص؟', answer: 'نعم، جميع نجارين عندنا قادرين على تصميم وتنفيذ أثاث مخصص حسب احتياجاتك.' },
        { question: 'هل الخشب جيد؟', answer: 'نعم، نستخدم فقط أنواع الخشب عالية الجودة وبضمان طويل.' },
        { question: 'كم يستغرق تنفيذ العمل؟', answer: 'الوقت يختلف حسب حجم العمل، لكن جميع الحرفيين ملتزمون بالمواعيد.' }
      ],
      icon: '🪵'
    },
    {
      id: 'painter',
      slug: 'نقاش',
      name: 'نقاش',
      alternateNames: ['معلم نقاشة', 'فني دهانات', 'مصمم ديكور', 'نقاش داخلي وخارجي'],
      description: 'نقاش محترف لجميع أعمال الديكور والدهانات: دهانات داخلية وخارجية، تشطيبات، وتصميم ديكور عصري.',
      faqs: [
        { question: 'هل الدهانات آمنة؟', answer: 'نعم، نستخدم فقط دهانات آمنة وذات جودة عالية، خالية من المواد الضارة.' },
        { question: 'هل يمكن اختيار اللون؟', answer: 'بالتأكيد! يمكنك اختيار أي لون تريد، أو نستطيع مساعدتك في اختيار الألوان المناسبة.' },
        { question: 'هل تقومون بالتنظيف بعد العمل؟', answer: 'نعم، جميع الحرفيين يقومون بتنظيف المكان جيداً بعد الانتهاء من العمل.' }
      ],
      icon: '🎨'
    },
    {
      id: 'hvac',
      slug: 'فني-تكييف',
      name: 'فني تكييف',
      alternateNames: ['مصلح تكييف', 'فني مكيفات', 'تركيب تكييف', 'صيانة تكييف'],
      description: 'فني تكييف محترف لجميع أنواع المكيفات: تركيب، صيانة، تصليح، وتنظيف.',
      faqs: [
        { question: 'كم مرة يجب صيانة التكييف؟', answer: 'ينصح بصيانة التكييف مرتين سنوياً: قبل فصل الصيف وقبل فصل الشتاء.' },
        { question: 'هل يمكن صيانة جميع أنواع المكيفات؟', answer: 'نعم، لدينا فنيين متخصصين في جميع أنواع المكيفات: سبليت، شبابي، أرضي، ومركزي.' },
        { question: 'ماذا لو التكييف ما يبردش؟', answer: 'اتصل بنا مباشرة وسنرسل فني مختص لفحص المكيف وإصلاح المشكلة.' }
      ],
      icon: '❄️'
    }
  ],
  en: [
    {
      id: 'plumber',
      slug: 'plumber',
      name: 'Plumber',
      alternateNames: ['Sanitary Plumber', 'Plumbing Technician', 'Pipe Repair Specialist', 'Emergency Plumber', '24 Hour Plumber'],
      description: 'Professional plumber for all plumbing work: installation, repair, drain cleaning, bathroom maintenance, water heater installation, and fixing water leaks.',
      faqs: [
        { question: 'How much does plumbing service cost?', answer: 'The cost varies depending on the type of service. The best way is to submit a request and receive quotes from available craftsmen in your area.' },
        { question: 'Is there a warranty on the service?', answer: 'Yes, all services booked through the site are guaranteed by us. In case of dissatisfaction, we redo the work or provide compensation.' },
        { question: 'Does the plumber come with tools?', answer: 'Yes, all our craftsmen come with all the necessary tools and parts to complete the job.' }
      ],
      icon: '🔧'
    },
    {
      id: 'electrician',
      slug: 'electrician',
      name: 'Electrician',
      alternateNames: ['Electrical Technician', 'Electricity Specialist', 'Emergency Electrician', '24 Hour Electrician'],
      description: 'Professional electrician for all electrical work: installation, repair, maintenance, lighting installation, water heaters, and electrical appliances.',
      faqs: [
        { question: 'Is the electrician certified?', answer: 'Yes, all our craftsmen are verified and checked, with extensive experience in their field.' },
        { question: 'Can you install an air conditioner?', answer: 'Yes, we have technicians specialized in installing and maintaining all types of air conditioners.' },
        { question: 'What if a problem appears after the work?', answer: 'Contact us directly and we will send the craftsman again to solve the problem without any additional costs.' }
      ],
      icon: '⚡'
    },
    {
      id: 'carpenter',
      slug: 'carpenter',
      name: 'Carpenter',
      alternateNames: ['Carpentry Specialist', 'Furniture Designer', 'Wood Carpenter'],
      description: 'Professional carpenter for all carpentry work: installation, repair, furniture design, doors, windows, and cabinets.',
      faqs: [
        { question: 'Can you design custom furniture?', answer: 'Yes, all our carpenters are able to design and implement custom furniture according to your needs.' },
        { question: 'Is the wood good quality?', answer: 'Yes, we only use high-quality wood types with long warranty.' },
        { question: 'How long does the work take?', answer: 'Time varies depending on the size of the work, but all craftsmen are committed to deadlines.' }
      ],
      icon: '🪵'
    },
    {
      id: 'painter',
      slug: 'painter',
      name: 'Painter',
      alternateNames: ['Painting Specialist', 'Decor Designer', 'Interior and Exterior Painter'],
      description: 'Professional painter for all decor and painting work: interior and exterior painting, finishing, and modern decor design.',
      faqs: [
        { question: 'Are the paints safe?', answer: 'Yes, we only use safe, high-quality paints free of harmful substances.' },
        { question: 'Can I choose the color?', answer: 'Absolutely! You can choose any color you want, or we can help you choose the right colors.' },
        { question: 'Do you clean up after the work?', answer: 'Yes, all craftsmen clean the place thoroughly after finishing the work.' }
      ],
      icon: '🎨'
    },
    {
      id: 'hvac',
      slug: 'hvac-technician',
      name: 'HVAC Technician',
      alternateNames: ['AC Repair Specialist', 'Air Conditioning Technician', 'AC Installation', 'AC Maintenance'],
      description: 'Professional HVAC technician for all types of air conditioners: installation, maintenance, repair, and cleaning.',
      faqs: [
        { question: 'How often should AC be maintained?', answer: 'It is recommended to maintain the AC twice a year: before summer and before winter.' },
        { question: 'Can you maintain all types of ACs?', answer: 'Yes, we have technicians specialized in all types of ACs: split, window, floor, and central.' },
        { question: 'What if the AC is not cooling?', answer: 'Contact us directly and we will send a specialized technician to inspect the AC and fix the problem.' }
      ],
      icon: '❄️'
    }
  ]
};

export const cities = {
  ar: [
    { id: 'cairo', name: 'القاهرة', slug: 'القاهرة', neighborhoods: ['مدينة نصر', 'المعادي', 'هرم', 'عباسية', 'المهندسين', 'الزمالك', 'الدقي', 'حلمية', 'السروج', 'المنيل'] },
    { id: 'giza', name: 'الجيزة', slug: 'الجيزة', neighborhoods: ['الهرم', '6 أكتوبر', 'الشيخ زايد', 'العجوزة', 'بولاق الدكرور', 'المنيب', 'الواحات', 'البيوم'] },
    { id: 'alexandria', name: 'الإسكندرية', slug: 'الإسكندرية', neighborhoods: ['المنتزه', 'سيدي جابر', 'المنصورة', 'العامرية', 'العصافرة', 'كفر عبدو', 'مiami', 'البرج'] },
    { id: 'sharqia', name: 'الشرقية', slug: 'الشرقية', neighborhoods: ['الزقازيق', 'بلبيس', 'منيا القمح', 'أبو حماد', 'القنايات'] }
  ],
  en: [
    { id: 'cairo', name: 'Cairo', slug: 'cairo', neighborhoods: ['Nasr City', 'Maadi', 'Haram', 'Abbasia', 'Mohandessin', 'Zamalek', 'Dokki', 'Helmeya', 'El Sarouj', 'El Manial'] },
    { id: 'giza', name: 'Giza', slug: 'giza', neighborhoods: ['Haram', '6th of October', 'Sheikh Zayed', 'Agouza', 'Bulaq El Dakrour', 'Moneeb', 'Wahat', 'Bayoum'] },
    { id: 'alexandria', name: 'Alexandria', slug: 'alexandria', neighborhoods: ['Montaza', 'Sidi Gaber', 'Mansoura', 'Amiriya', 'Asafra', 'Kafr Abdo', 'Miami', 'El Borg'] },
    { id: 'sharqia', name: 'Sharqia', slug: 'sharqia', neighborhoods: ['Zagazig', 'Belbeis', 'Minya El Qamh', 'Abu Hammad', 'Qanayat'] }
  ]
};
