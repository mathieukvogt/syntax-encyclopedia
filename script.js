// Function to set up expandable sections
function setupExpandableSections() {
  document.querySelectorAll(".faq-header").forEach((header) => {
    header.addEventListener("click", () => {
      const faqContent = header.nextElementSibling;
      if (faqContent.style.height) {
        faqContent.style.height = null; // Collapse
      } else {
        const contentHeight = faqContent.scrollHeight + "px";
        faqContent.style.height = contentHeight; // Expand
      }
      header.parentElement.classList.toggle("expanded");
    });
  });
}
document.addEventListener("DOMContentLoaded", function () {
  // Initialize expandable sections on page load
  setupExpandableSections();

  // Page Loader
  let counter = 0;
  const loader = document.getElementById("loader");
  const interval = setInterval(() => {
    loader.textContent = counter;
    counter++;
    if (counter > 100) {
      clearInterval(interval);
      let loaderWrapper = document.getElementById("loader-wrapper");
      loaderWrapper.style.transition = "transform 0.7s ease";
      loaderWrapper.style.transform = "translateY(100%)";
      setTimeout(() => {
        loaderWrapper.remove();
      }, 700); // match the timeout with the transition
    }
  }, 5); // Adjust the time here for faster or slower counting

  // GSAP timeline for animations
  let tl = gsap.timeline({ paused: true });

  // Menu overlay animation
  tl.to(".menu-overlay", {
    duration: 0.5,
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    ease: "power2.out",
  });

  // Animation for grid items
  tl.to(
    ".grid-item",
    {
      duration: 0.5,
      height: "200px",
      ease: "power2.out",
    },
    "<"
  );

  // Function to open the menu
  function openMenu() {
    document.querySelector(".menu-overlay").style.pointerEvents = "all";
    tl.play();
  }

  // Function to close the menu
  function closeMenu() {
    document.querySelector(".menu-overlay").style.pointerEvents = "none";
    tl.reverse();
  }

  // Event listeners for opening and closing the menu
  document.querySelector(".menu-btn-open").addEventListener("click", openMenu);
  document
    .querySelector(".menu-btn-close")
    .addEventListener("click", closeMenu);
  tl.reverse();

  // Close menu when a grid item is clicked
  document.querySelectorAll(".grid-item a").forEach((anchor) => {
    anchor.addEventListener("click", function () {
      setTimeout(closeMenu, 75); // Delay in milliseconds
    });
  });

  // Toggle light theme
  var lightToggle = document.getElementById("light-toggle");
  var lightOverlay = document.getElementById("light-overlay");
  function toggleTheme() {
    document.body.classList.toggle("light-theme");
    var themeText = document.body.classList.contains("light-theme")
      ? "DARK"
      : "LIGHT";
    if (lightToggle) {
      lightToggle.textContent = themeText;
    }
    if (lightOverlay) {
      lightOverlay.textContent = themeText;
    }
  }

  if (lightToggle) {
    lightToggle.onclick = toggleTheme;
  }

  if (lightOverlay) {
    lightOverlay.onclick = toggleTheme;
  }

  // Function to manually trigger the page transition
  function triggerPageTransition() {
    // Manually trigger the page transition
    pageTransition();
    // Add any additional logic here if needed
  }

  // Event listener for menu anchor elements
  document.querySelectorAll(".grid-item a").forEach((item) => {
    item.addEventListener("click", function (event) {
      const targetPage = this.getAttribute("href").replace(".html", "");
      const currentPage = window.location.pathname
        .split("/")
        .pop()
        .replace(".html", "");

      // Check if the target page is the same as the current page
      if (targetPage === currentPage) {
        event.preventDefault(); // Prevent default link behavior
        triggerPageTransition(); // Call the function to trigger the transition
      }
    });
  });

  /* BARBA PAGE TRANSITION */

  // Function for page transition
  function pageTransition() {
    var tl = gsap.timeline();

    tl.to(".transition", {
      duration: 0.75,
      scaleY: 1,
      transformOrigin: "bottom",
      ease: "power4.inOut",
    });

    tl.to(".transition", {
      duration: 0.75,
      scaleY: 0,
      transformOrigin: "top",
      ease: "power4.inOut",
      delay: 0.2,
    });
  }

  // Function for transition delay
  function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
      setTimeout(() => {
        done();
      }, n);
    });
  }

  // Initialize barba.js
  barba.init({
    sync: true,
    transitions: [
      {
        async leave(data) {
          const done = this.async();
          pageTransition();
          await delay(1000);
          done();
        },
        async after() {
          setupExpandableSections(); // Reinitialize expandable sections after transition
          hljs.highlightAll();
        },
      },
    ],
  });
});
