/**
 * Sin/Cos Circular Menu Component
 * Handles all interactions for the trigonometric circular menu
 */

export function initTrigMenu() {
  const circularMenu = document.querySelector(".circular-menu");
  const menuItems = document.querySelectorAll(".circular-menu__item");
  const closeButton = document.querySelector(".circular-menu__center-btn");
  let isCollapsed = false;

  if (circularMenu && menuItems.length > 0) {
    // Disable close button while animations are running
    if (closeButton) {
      closeButton.disabled = true;
      closeButton.style.pointerEvents = "none";
      closeButton.style.opacity = "0.5";
    }

    setTimeout(() => {
      // Disable animation after initial load
      menuItems.forEach((item) => {
        item.classList.add("circular-menu__item--initialized");
      });
      
      // Enable close button after animations complete
      if (closeButton) {
        closeButton.disabled = false;
        closeButton.style.pointerEvents = "auto";
        closeButton.style.opacity = "1";
      }
    }, 2000); 

    // Menu item click functionality
    menuItems.forEach((item, index) => {
      const link = item.querySelector(".circular-menu__link");

      link.addEventListener("click", function (e) {
        e.preventDefault();

        // Add active state
        menuItems.forEach((li) =>
          li.classList.remove("circular-menu__item--active")
        );
        item.classList.add("circular-menu__item--active");
      });

      link.addEventListener("mouseleave", function () {
        item.style.zIndex = "1";
      });
    });

    // Close button collapse/expand functionality
    if (closeButton) {
      closeButton.addEventListener("click", function (e) {
        e.preventDefault();

        // Prevent interaction when closebutton is disabled
        if (closeButton.disabled) {
          return;
        }

        if (isCollapsed) {
          // Expand menu items
          expandMenu();
        } else {
          // Collapse menu items
          collapseMenu();
        }

        isCollapsed = !isCollapsed;
      });
    }

    // Collapse menu items
    function collapseMenu() {
      // Update close button
      closeButton.textContent = "Open";
      closeButton.classList.add("circular-menu__center-btn--expanded");

      // Scale as menu items collapse
      closeButton.style.transform = "scale(1.1)";
      setTimeout(() => {
        closeButton.style.transform = "scale(1)";
      }, 400);

      // Close button pulse effect
      closeButton.style.animation = "pulse 0.6s ease-in-out";

      // Animate buttons
      menuItems.forEach((item, index) => {
        // Clean up
        item.style.transition = "";
        item.style.animation = "";
        item.classList.remove("circular-menu__item--collapsed");

        // Current position value
        const radius = 120; 

        // Current position based on index
        const angle = (360 / 8) * index; 
        const radians = (angle * Math.PI) / 180;
        const startX = Math.cos(radians) * radius;
        const startY = Math.sin(radians) * radius;

        // Set starting position 
        item.style.transition = "none"; 
        item.style.transform = `translateX(${startX}px) translateY(${startY}px) scale(1)`;
        item.style.opacity = "1";
        item.style.zIndex = "1";
        item.style.pointerEvents = "auto";

        // Force reflow to apply styles immediately
        item.offsetHeight;

        // Start the animation
        item.style.transition =
          "all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19)";

        // Collapse to center with progressive acceleration
        requestAnimationFrame(() => {
          item.style.transform = "translateX(0) translateY(0) scale(0.8)";
          item.style.opacity = "0";
          item.style.zIndex = "-1";
        });

        // Clean up 
        setTimeout(() => {
          item.classList.add("circular-menu__item--collapsed");
          item.style.pointerEvents = "none";
        }, 300);
      });
    }

    // Expand menu items 
    function expandMenu() {
      // Update close button 
      closeButton.textContent = "Close";
      closeButton.classList.remove("circular-menu__center-btn--expanded");
      closeButton.style.animation = "none"; // Remove pulse animation

      // Animate buttons
      menuItems.forEach((item, index) => {
        item.classList.remove("circular-menu__item--collapsed");
        item.style.animation = ""; // Clear any existing animations

        // Calculate target position using index
        const angle = (360 / 8) * index; // 8 total items
        const radians = (angle * Math.PI) / 180;
        const radius = 120; // CSS --radius value
        const endX = Math.cos(radians) * radius;
        const endY = Math.sin(radians) * radius;

        // Set starting position
        item.style.transition = "none";
        item.style.transform = "translateX(0) translateY(0) scale(0.8)";
        item.style.opacity = "0";
        item.style.zIndex = "-1";
        item.style.pointerEvents = "none";

        // Force reflow to apply styles immediately
        item.offsetHeight;

        // Start animation immediately
        item.style.transition = "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";

        // Animate to circular position
        requestAnimationFrame(() => {
          item.style.transform = `translateX(${endX}px) translateY(${endY}px) scale(1)`;
          item.style.opacity = "1";
          item.style.zIndex = "1";
          item.style.pointerEvents = "auto";
        });

        // Clean up 
        setTimeout(() => {
          item.style.transition = ""; // Reset transition property
          item.style.transform = ""; // Let CSS handle positioning again
          item.style.opacity = "";
          item.style.zIndex = "";
        }, 600);
      });
    }

    // Add CSS for pulse effect
    addTrigMenuStyles();
  }
}

// @TODO: Move to SCSS
function addTrigMenuStyles() {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
    
    @keyframes slideToCenter {
      0% {
        transform: translateX(calc(cos(var(--rotation)) * var(--radius)))
                   translateY(calc(sin(var(--rotation)) * var(--radius)))
                   scale(1);
        opacity: 1;
        z-index: 1;
      }
      70% {
        transform: translateX(calc(cos(var(--rotation)) * var(--radius) * 0.1))
                   translateY(calc(sin(var(--rotation)) * var(--radius) * 0.1))
                   scale(0.9);
        opacity: 1;
        z-index: 1;
      }
      100% {
        transform: translateX(0) translateY(0) scale(0.8);
        opacity: 0;
        z-index: -1;
      }
    }
    
    @keyframes slideFromCenter {
      0% {
        transform: translateX(0) translateY(0) scale(0.8);
        opacity: 0;
        z-index: -1;
      }
      30% {
        transform: translateX(calc(cos(var(--rotation)) * var(--radius) * 0.1))
                   translateY(calc(sin(var(--rotation)) * var(--radius) * 0.1))
                   scale(0.9);
        opacity: 1;
        z-index: 1;
      }
      100% {
        transform: translateX(calc(cos(var(--rotation)) * var(--radius)))
                   translateY(calc(sin(var(--rotation)) * var(--radius)))
                   scale(1);
        opacity: 1;
        z-index: 1;
      }
    }
    
    .circular-menu__item--collapsing {
      animation: slideToCenter 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      pointer-events: none;
    }
    
    .circular-menu__item--expanding {
      animation: slideFromCenter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      pointer-events: none;
    }
    
    .circular-menu__item--active .circular-menu__link {
      background: rgba(102, 126, 234, 0.9) !important;
      color: white !important;
      transform: scale(1.15) !important;
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4) !important;
    }
    
    .circular-menu__item--initialized {
      animation: none !important;
    }
  `;
  document.head.appendChild(style);
}

