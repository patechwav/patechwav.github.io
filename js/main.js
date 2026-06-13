console.log("DJ Website loaded");

document.addEventListener("DOMContentLoaded", () => {
  fetch("components/hero_slider.html")
    .then(response => {
      if (!response.ok) {
        throw new Error("Slider konnte nicht geladen werden");
      }
      return response.text();
    })
    .then(data => {
      document.getElementById("slider-container").innerHTML = data;
      initHeroSlider();
    })
    .catch(error => {
      console.error(error);
    });
});

function initHeroSlider() {
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  let startX = 0;
  let endX = 0;

  const slideDuration = 6000; // 8 Sekunden

  if (slides.length === 0) return;

  function showSlide(index) {
    slides[currentSlide].classList.remove("active");
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  let autoSlide = setInterval(() => {
    showSlide(currentSlide + 1);
  }, slideDuration);

  function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
      showSlide(currentSlide + 1);
    }, slideDuration);
  }

  const slider = document.querySelector(".hero-slider");

  slider.addEventListener("touchstart", event => {
    startX = event.touches[0].clientX;
  });

  slider.addEventListener("touchend", event => {
    endX = event.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        showSlide(currentSlide + 1);
      } else {
        showSlide(currentSlide - 1);
      }

      resetAutoSlide();
    }
  });
}