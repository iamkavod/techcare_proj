document.addEventListener("DOMContentLoaded", function() {
 const navToggleButton = document.getElementById('nav__toggle');
 const navMenu = document.getElementById('nav__menu');
 const drToggleButton = document.getElementById('dr__image');
 const drDetails = document.getElementById('dr__details');

 // Nav Menu
 navToggleButton.addEventListener('click', function() {
   if (drDetails.classList.contains('active')) {
     drDetails.classList.remove('active');
   }
   navMenu.classList.toggle('active');
 });

 drToggleButton.addEventListener('click', function() {
   if (navMenu.classList.contains('active')) {
     navMenu.classList.remove('active');
   }
   drDetails.classList.toggle('active');
 });
});
