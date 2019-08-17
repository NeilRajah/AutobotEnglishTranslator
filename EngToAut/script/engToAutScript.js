/**
 * engToAutScript
 * Neil Balaskandarajah
 * Created: 08/15/2019
 * Script that converts user input English text to Autobot
 */

//VARIABLES
var engField; //English text field

var autoField; //Autobot text field

var translate; //translation arrow

//On Load
/**
 * All functions for the page
 */
window.onload = function() {
    startUp();
    addListeners();
} //end onload

//Startup
/**
 * First function to run when the program loads; initializes all variables
 */
function startUp() {
    //initialize the english field
    engField = document.getElementById('eng-field');

    //initialize the autobot field
    autoField = document.getElementById('auto-field');

    //initialize the translation arrow
    translate = document.getElementById('to-auto');
} //end startUp

//Event Listeners
/**
 * Add listeners to all components requiring them
 */
function addListeners() {
    translate.addEventListener('click', displayAutobot); //for when arrow is clicked
    autoField.addEventListener('oncopy', "return false;"); //for when Autobot field is copied
} //end addListeners

//Translation
/**
 * Translates the English text into code that is written to a file
 */
function translateText() {

} //end translateText

/**
 * Displays the text from the English text field as Autobot in the Autobot text field
 */
function displayAutobot() {
    var text = engField.value;
    autoField.value = text;
} //end displayAutobot
