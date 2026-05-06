export function showNotice(text) {
  const notification = document.getElementById('notification');
  notification.textContent = text;
  setTimeout(() => {
    if (notification.textContent === text) notification.textContent = '';
  }, 1800);
}