function switchTab(index) {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
    contents[i].classList.toggle("active", i === index);
  });
}

function openModal() {
  document.getElementById("modalBox").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modalBox").classList.add("hidden");
}

document.querySelectorAll('.has-mega-menu > a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const menu = this.nextElementSibling;
    menu.classList.toggle('active');
  });
});

// Toggle nav menu on mobile
document.querySelector('.nav-toggle').addEventListener('click', () => {
  document.querySelector('.nav-menu').classList.toggle('open');
});

// Toggle mega menu on mobile
document.querySelectorAll('.has-mega-menu > .menu-toggle').forEach(link => {
  link.addEventListener('click', e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const parent = link.closest('li');
      parent.classList.toggle('open');
    }
  });
});


