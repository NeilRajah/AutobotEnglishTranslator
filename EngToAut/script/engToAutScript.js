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
    startUp(); //initialize all variables
    addListeners(); //add listeners to the elements
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
    encrypt.addEventListener("click", download); //when encrypt button is pressed
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
 * Download the encrypted file
 */
function download() {
    //create the new element with a blank style
    var e = document.createElement('a'); //a element defines a hyperlink

    //add the data from the English field to the file
    writeToFile(e);

    //set the download link 
    e.setAttribute('download', "EncryptedMessage.tf");

    //make element 
    e.style.display = 'none';

    //simulate click to trigger event function and remove element
    document.body.appendChild(e);
    e.click();
    document.body.removeChild(e);
} //end download

/**
 * Translates the English text into code and writes it to a file 
 * element - the hyperlink element which holds the information in the file
 */
function writeToFile(element) {
    //required precursor for writing to file
    var data = 'data:text/plain;charset=utf-8,';

    //encrypt the text from the English field
    var text = encryptText(engField.value, 2, 2);

    //combine the data
    data = data + encodeURIComponent(text);
    
    //add the data to the element
    element.setAttribute('href', data);
} //end writeToFile

/**
 * Encrypts the text by converting each character to its ASCII number, multiplying it and converting it to a specified base
 * text - the text to be converted
 * multiplier - amount to multiply the ASCII numbers by
 * base - base to convert the number to
 * return fileText - the encrypted text
 */
function encryptText(text, multiplier, base) {
    var words = engField.value.split(' '); //split the text in the field by word
    var fileText = ""; //text for the file
    
    //loop through the file and swap the characters for numbers
    for (i = 0; i < words.length; i++) {
        var word = ""; //variable for the word
        
        //split the word into characters
        for (j = 0; j < words[i].length; j++) {
            var c = Number(words[i].charCodeAt(j)) * multiplier; //convert to ASCII number and double it
            var n = c.toString(base); //convert number to base 2
            
            word = word.concat(n); //add the number to the new word

            //add a period to separate characters except if last character
            if (j < words[i].length-1) {
                word = word.concat(".");
            } //if
        } //loop

        fileText = fileText.concat(word); //add the word onto the text for the file

        //add a space to separate words except if last character
        if (i < words.length-1) {
            fileText = fileText.concat(" ");
        } //if
    } //loop

    return fileText;
} //end encryptText