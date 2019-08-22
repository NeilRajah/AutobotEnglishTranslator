/**
 * engToAutScript
 * Neil Balaskandarajah
 * Created: 08/15/2019
 * Script that converts user input English text to Autobot
 */

//VARIABLES

//fields
var engField; //English text field
var autoField; //Autobot text field

//clickables
var translate; //translation arrow
var clear; //clear button
var encrypt; //encrypt button

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
    //initialize the text fields
    engField = document.getElementById('eng-field');
    autoField = document.getElementById('auto-field');

    //initialize the translation arrow
    translate = document.getElementById('to-auto');

    //initialize the buttons
    clear = document.getElementById('clear');
    encrypt = document.getElementById('encrypt');
} //end startUp

//Event Listeners
/**
 * Add listeners to all components requiring them
 */
function addListeners() {
    translate.addEventListener('click', displayAutobot); //for when arrow is clicked

    clear.addEventListener('click', clearFields); //when clear button is clicked
    encrypt.addEventListener('click', encryptText); //when encrypt button is pressed
} //end addListeners

/**
 * Displays the text from the English text field as Autobot in the Autobot text field
 */
function displayAutobot() {
    var text = engField.value;
    autoField.value = text;
} //end displayAutobot

/**
 * Clears both fields when the clear button is pressed
 */
function clearFields() {
    engField.value = "";
    autoField.value = "";
} //end clearFields

/**
 * Translates the English text into code and writes it to a file
 */
function encryptText() {

} //end encryptText