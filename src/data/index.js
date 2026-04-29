import { users } from './users';
import { crafts } from './crafts';
import { craftsmen } from './craftsmen';
import { orders } from './orders';
import { proposals } from './proposals';
import { chats } from './chats';
import { notifications } from './notifications';
import { reviews } from './reviews';

// Function to get the currently logged-in user from localStorage or default to Abdullah
const getCurrentUser = () => {
  const userId = localStorage.getItem('userId') || 'u1';
  return users.find(u => u.id === userId) || users[0];
};

export const demoData = {
  users,
  user: getCurrentUser(),
  crafts,
  craftsmen,
  orders,
  proposals,
  chats,
  notifications,
  reviews,
};

// Helper to switch user (simulating login)
export const loginAs = (userId) => {
  const user = users.find(u => u.id === userId);
  localStorage.setItem('userId', userId);
  localStorage.setItem('token', 'demo-token-' + userId);
  if (user) {
    localStorage.setItem('userRole', user.role || 'client');
  }
  window.location.reload();
};
