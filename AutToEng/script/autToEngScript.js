/**
 * autToEngScript
 * Neil Balaskandarajah
 * Created: 08/29/2019
 * Script handling file uploading and decrypting for the Autobot to Engineering page
 */

//VARIABLES
//elements
var autoField; //Autobot text field
var engField; //English text field
var uploadBtn; //upload button
var clearBtn; //clear button
var arrow; //translation arrow

//file reading
var fileChooser; //HTML element that will select the file
var fileReader; //JS object that reads from files
var fileText; //text from the file

//FUNCTIONS
/**
* Run all functions when the page loads
*/
window.onload = function() {
  startUp();
  addListeners();
} //end onload

/**
* First function to run when program loads; initialize everything
*/
function startUp() {
  //initialize text fields
  autoField = document.getElementById("auto-field");
  engField = document.getElementById("eng-field");

  //initialize buttons
  uploadBtn = document.getElementById("upload");
  clearBtn = document.getElementById("clear");
  arrow = document.getElementById("arrow");

  //set up the file chooser
  fileChooser = document.createElement('input'); //create element in DOM
  fileChooser.type = "file"; //set to select files
  fileChooser.accept = ".tf"; //only accept .tf files
  fileChooser.style.display = "none"; //make invisible
} //end startUp

/**
* Add all listeners to elements requiring them
*/
function addListeners() {
  //clear button
  clearBtn.addEventListener('click', clearFields);

  //arrow for translation
  arrow.addEventListener('click', displayEnglish);

  //upload button
  uploadBtn.addEventListener('click', upload);
 
  //file chooser
  fileChooser.addEventListener('change', collectFiles, false);
} //end addListeners

//FileReader functions

/**
 * Loading files from the reader
 */
function readerOnload(event) {
  var contents = event.target.result;
  console.log("File contents: " + contents);
} //end readerOnload

/**
 * Runs if there is an error loading a file from the FileReader
 */
function readerOnerror() {
  alert("There was an error loading the file.");
} //end readerOnerror

//FIELD FUNCTIONS

/**
 * Clear the text fields and reset the file
 */
function clearFields() {
  autoField.value = "";
  engField.value = "";
  fileChooser.value = "";
} //end clearFields

/**
 * Display the text from the Autobot field to the English field
 */
function displayEnglish() {
  engField.value = autoField.value;
} //end displayEnglish

/**
* Upload a file from the client
*/
function upload() {
  fileChooser.click(); //click the chooser to open upload dialog box
} //end upload

/**
 * Collect the files selected from the user
 * event - the event that called this method
 */
function collectFiles(event) {
  //create the arrray of files
  var files = event.target.files; //event.target is the ELEMENT that calls this event
  
  //check to see if only one file has been chosen
  if (files.length != 1) {
    window.alert("Select only one file!");
  } else {
    console.log(files[0].name); //print the name of the file
  } //if

  //read from files
  readFromFile(files);
} //end collectFiles

/**
 * Read from the file
 */
function readFromFile(files) {
  //set up file reader
  fileReader = new FileReader(); //initialize the file reader
  fileReader.onload = (function(theFile) {
    return function(e) {
      fileText = e.target.result; //get the text from the file
    
      var newText = decryptText(fileText); //return the decrypted text

      autoField.value = newText; //display the text from the file in the Autobot field
    }
  })(files[0]);

  fileReader.readAsText(files[0]); //zero index is the selected file
} //end readFromFile

/**
 * Decrypt text from the file
 */
function decryptText(text) {
  var newText = ""; //initialize the to-be decrypted text

  //store words into array by splitting text by spaces
  var words = text.split(" ");

  //loop through the words and swap the numbers for characters
  for (i = 0; i < words.length; i++) {
    //split by periods for each character
    var numbers = words[i].split(".");

    //loop through each number and convert it to a character
    for (j = 0; j < numbers.length; j++) {
      var n = parseInt(numbers[j], 2); //binary number divided by 2

      n = Number(n.toString(10)) / 2; //convert to base 10 and divide by 2

      var c = String.fromCharCode(n); //convert to character

      newText = newText.concat(c); //add the character onto newText
    } //loop

    //add a space to separate words except if last character
    if (i < words.length-1) {
      newText = newText.concat(" ");
    } //if
  } //loop

  console.log(newText);
  return newText;
} //end decryptText