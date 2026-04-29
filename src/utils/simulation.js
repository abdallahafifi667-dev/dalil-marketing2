import { demoData } from '../data';

// Simulation Service to mock real-time activity
export const startOrderSimulation = (orderId, craftId) => {
  console.log(`Starting simulation for order ${orderId} (${craftId})`);
  
  // Find matching craftsmen for this craft
  const matchingCraftsmen = demoData.craftsmen.filter(m => m.craftId === craftId);
  
  // Simulate proposals over time
  matchingCraftsmen.slice(0, 3).forEach((craftsman, index) => {
    setTimeout(() => {
      const proposals = JSON.parse(localStorage.getItem('demo_proposals') || '[]');
      const newProposal = {
        id: `prop_${Date.now()}_${index}`,
        orderId,
        craftsmanId: craftsman.id,
        price: craftsman.pricePerHour * (1 + (Math.random() * 0.2 - 0.1)),
        message: index === 0 ? "أقدر أجيلك دلوقتي حالا ونخلص الشغل" : "جاهز للعمل ومتاح في الموعد المحدد",
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      proposals.push(newProposal);
      localStorage.setItem('demo_proposals', JSON.stringify(proposals));
      
      // Notify user (mock)
      addNotification({
        id: Date.now(),
        type: 'proposal',
        title: 'عرض جديد!',
        message: `قدم ${craftsman.name} عرضاً لطلبك #${orderId.slice(-6)}`,
        time: 'الآن'
      });
      
    }, (index + 1) * 3000); // Propose every 3 seconds
  });
};

export const addNotification = (notification) => {
  const notifications = JSON.parse(localStorage.getItem('demo_notifications') || '[]');
  notifications.unshift(notification);
  localStorage.setItem('demo_notifications', JSON.stringify(notifications));
};

export const simulateCraftsmanArrival = (craftsmanId) => {
  setTimeout(() => {
    addNotification({
      id: Date.now(),
      type: 'chat',
      title: 'رسالة جديدة',
      message: 'أنا في الطريق لحضرتك، قدامي 10 دقائق.',
      time: 'الآن'
    });
  }, 5000);
};
