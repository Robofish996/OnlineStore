//Trigger the slide up to show the main content
document.addEventListener("DOMContentLoaded", function(event) {
    let button = document.querySelector(".btn");
    let cover = document.querySelector(".cover");
    button.addEventListener("click", function() {
      cover.classList.add("slideUp");
    });
  });
  