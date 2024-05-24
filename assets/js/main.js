document.addEventListener("DOMContentLoaded", function() {
    const sliderWrapper = document.querySelector('.sponsorOne');
    const slides = document.querySelectorAll('.sponsorOne img');
    const totalSlides = slides.length;
    let currentIndex = 0;
  
    function showNextSlide() {
      currentIndex++;
      console.log(currentIndex );
      if (currentIndex > totalSlides - 4) { // Loop back to the start
        currentIndex = 0;
      }
      slides.style.transform = `translateX(-${currentIndex * 25}%)`;
    }
  
    setInterval(showNextSlide, 1000);
  });