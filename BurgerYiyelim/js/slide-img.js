// document.addEventListener("DOMContentLoaded", function () {
//   const slideContainer = document.querySelector('..image-container');
//   let marginLeftValue = 0;

//   function nextSlide() {
//     marginLeftValue -= 100;
//     if (marginLeftValue <= -101) {
//       marginLeftValue = 0;
//     }
//     slideContainer.style.transition = "all 2s";
//     slideContainer.style.marginLeft = marginLeftValue + "%";
//   }

//   setInterval(nextSlide, 4000); // Her 4 saniyede bir geçiş yap
// });


var prevButton = document.querySelector('.prevBtn');
prevButton.addEventListener('click', function () {
  console.log("back");
  const slideContainer = document.querySelector('.image-container');
  let marginLeftValue = 0;

  function back() {
    marginLeftValue -= 50;
    if (marginLeftValue <= -101) {
      marginLeftValue = 0;
    }
    slideContainer.style.transition = "all 1s";
    slideContainer.style.marginLeft = marginLeftValue + "%";
  }

  back();
});

var nextBtn = document.querySelector('.nextBtn');
nextBtn.addEventListener('click', function () {
  console.log("next");
  const slideContainer = document.querySelector('.image-container');
  let marginLeftValue = 0;

  function next() {
    marginLeftValue = 0;
    if (marginLeftValue <= 101) {
      marginLeftValue = 0;
    }
    slideContainer.style.transition = "all 1s";
    slideContainer.style.marginLeft = marginLeftValue + "%";
  }

  next();
});