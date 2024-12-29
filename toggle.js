// Get the circle and themeToggle elements
const circle = document.getElementById("circle");
const themeToggle = document.getElementById("themeToggle");
let isToggled = false;
// Add an event listener for the click event on the circle
circle.addEventListener('click', function () {
    if (!isToggled) {
        // Move the circle to the left (OFF or dark mode)
        circle.style.transform = 'translateX(23px)';

    } 
    else{
        // Move the circle to the right (ON or light mode)
        circle.style.transform = 'translateX(-1px)';
       
    }
  
    
    // Toggle the state
    isToggled = !isToggled;
});
