export function hideBtns() {
  const btnArea = document.getElementById('btnArea');

  btnArea.innerHTML = '';
  btnArea.classList.remove('noPointer');
  btnArea.style.flexDirection = '';
}