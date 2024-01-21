document.addEventListener("DOMContentLoaded", function () {
  let tl = gsap.timeline({ paused: true });

  tl.to(".menu-overlay", {
    duration: 0.75,
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    ease: "power2.out",
  });

  tl.to(
    ".grid-item",
    {
      duration: 0.75,
      height: "200px",
      ease: "power2.out",
    },
    "<"
  );

  function openMenu() {
    document.querySelector(".menu-overlay").style.pointerEvents = "all";
    tl.play();
  }

  function closeMenu() {
    document.querySelector(".menu-overlay").style.pointerEvents = "none";
    tl.reverse();
  }

  document.querySelector(".menu-btn-open").addEventListener("click", openMenu);
  document
    .querySelector(".menu-btn-close")
    .addEventListener("click", closeMenu);
  tl.reverse();

  document.querySelectorAll(".grid-item a").forEach((anchor) => {
    anchor.addEventListener("click", function () {
      setTimeout(closeMenu, 100); // Delay in milliseconds
    });
  });
});

var light = document.getElementById("light");

light.onclick = function () {
  document.body.classList.toggle("light-theme");
  if (document.body.classList.contains("light-theme")) {
    light.textContent = "DARK";
  } else {
    light.textContent = "LIGHT";
  }
};

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

/* BARBA PAGE TRANSITION */

function pageTransition() {
  var tl = gsap.timeline();

  tl.to(".transition", {
    duration: 1,
    scaleY: 1,
    transformOrigin: "bottom",
    ease: "power4.inOut",
  });

  tl.to(".transition", {
    duration: 1,
    scaleY: 0,
    transformOrigin: "top",
    ease: "power4.inOut",
    delay: 0.2,
  });
}

function delay(n) {
  n = n || 0;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

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
    },
  ],
});

document.addEventListener("DOMContentLoaded", function () {
  // ... existing code ...

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

  // ... existing code ...
});
