export const readLocalStorage = (name: string, value: string) => {
  window.localStorage.setItem(name, value);
  window.dispatchEvent(new Event('storage'));
};

export const removeItemLocalStorage = (name: string) => {
  window.localStorage.removeItem(name);
  window.dispatchEvent(new Event('storage'));
};
