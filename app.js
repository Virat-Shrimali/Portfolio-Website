
document.addEventListener('DOMContentLoaded', function () {
  const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
  };

  const texts = [
    "CS Student",
    "DSA Enthusiast",
    "Competitive Programmer",
    "Web Developer"
  ];

  const morphTime = 1;
  const cooldownTime = 0.25;

  let textIndex = texts.length - 1;
  let time = new Date();
  let morph = 0;
  let cooldown = cooldownTime;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];

  function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
      cooldown = cooldownTime;
      fraction = 1;
    }

    setMorph(fraction);
  }

  function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
  }

  function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
  }

  function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
      if (shouldIncrementIndex) {
        textIndex++;
      }

      doMorph();
    } else {
      doCooldown();
    }
  }

  animate();

  var mySwiper = new Swiper(".swiper-container--timeline", {
    autoHeight: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    speed: 500,
    direction: "horizontal",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar"
    },
    loop: false,
    effect: "slide",
    spaceBetween: 30,
    on: {
      init: function () {
        document.querySelectorAll(".swiper-pagination-custom .swiper-pagination-switch").forEach(function (el, index) {
          if (index === 0) {
            el.classList.add("active");
          } else {
            el.classList.remove("active");
          }
        });
      },
      slideChangeTransitionStart: function () {
        document.querySelectorAll(".swiper-pagination-custom .swiper-pagination-switch").forEach(function (el, index) {
          if (index === mySwiper.realIndex) {
            el.classList.add("active");
          } else {
            el.classList.remove("active");
          }
        });
      }
    }
  });

  document.querySelectorAll(".swiper-pagination-custom .swiper-pagination-switch").forEach(function (el, index) {
    el.addEventListener("click", function () {
      mySwiper.slideTo(index);
      document.querySelectorAll(".swiper-pagination-custom .swiper-pagination-switch").forEach(function (el) {
        el.classList.remove("active");
      });
      el.classList.add("active");
    });
  });
});



var items = document.querySelectorAll("li");

function isItemInView(item) {
    var rect = item.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
        if (isItemInView(items[i])) {
            items[i].classList.add("show");
        }
    }
}

// Initial call to check items in view on page load
callbackFunc();

// Listen for events
window.addEventListener("load", callbackFunc);
window.addEventListener("resize", callbackFunc);
window.addEventListener("scroll", callbackFunc);


