export function initNavigation() {
  const navigationToggle = document.getElementById('navigation-toggle');
  const navigationItems = document.querySelectorAll('.navigation__item');

  navigationItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navigationToggle && navigationToggle.checked) {
        navigationToggle.checked = false;
      }
    });
  });
}