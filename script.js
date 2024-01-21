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

var light = document.getElementById("light");

light.onclick = function () {
  document.body.classList.toggle("light-theme");
  if (document.body.classList.contains("light-theme")) {
    light.textContent = "DARK";
  } else {
    light.textContent = "LIGHT";
  }
};

function toggleDetail(detailId, event) {
  var detailRow = document.getElementById(detailId);
  var isExpanded = detailRow.style.display === "table-row";
  detailRow.style.display = isExpanded ? "none" : "table-row";

  if (isExpanded) {
    event.target.classList.remove("expanded");
  } else {
    event.target.classList.add("expanded");
  }
}

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
