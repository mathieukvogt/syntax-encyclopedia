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
});

