export const getUserDataFromLs = () => {
  const localStorageItem = localStorage.getItem('user-kayak');
  const userData = localStorageItem ? JSON.parse(localStorageItem) : undefined;
  if (userData) return userData.data;
};
