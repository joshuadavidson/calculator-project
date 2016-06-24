var answer = '0';//Answer from last evaluation

//function that takes a button that has been pressed and updates the calculator display
function newButtonPressed(button){
  var entryField = $('#entry-field');
  var currentEntry = $('#entry-field').val();
  var resultField = $('#result-field');

  //Clear Entry Pressed
  if (button === 'CE') {
    entryField.val('');
  }

  //All Clear Pressed
  else if (button === 'AC') {
    entryField.val('');
    resultField.val('0');
    answer = 0;
  }

  //Delete Pressed
  else if (button === 'DEL') {
    if (/ANS$/.test(currentEntry)) { //account for the case that the last entry was ANS
      entryField.val(currentEntry.replace(/ANS$/, '')); //remove the 3 characters of ANS
    } else { //Any other character to be deleted
      entryField.val(currentEntry.slice(0, currentEntry.length - 1)); //remove only the last entry
    }
  }

  //Answer Pressed
  else if (button === 'ANS') {
    if (/[\.?0-9]+$|ANS$/.test(currentEntry)) { //If previous was a number then replace it
      entryField.val(currentEntry.replace(/[\.?0-9]+$/, button));
    } else {
      entryField.val(currentEntry + 'ANS');
    }
  }

  //Number Pressed
  else if (/[0-9]/.test(button)) {
    if (/ANS$/.test(currentEntry)) { //If previous was ANS then replace it
      entryField.val(currentEntry.replace(/ANS$/, button));
    } else { //Add number to entry
      entryField.val(currentEntry + button);
    }
  }

  //Operator Pressed
  else if (/[/*\-+]/.test(button)) {
    if (/[/*\-+]$/.test(currentEntry)) { //If previous entry was operand then remove it and replace with new operand
      entryField.val(currentEntry.replace(/[/*\-+]$/, button));
    } else if (currentEntry === '' && /[/*\-+]/.test(button)) { //If blank and operand pressed perform operand on answer
      entryField.val('ANS' + button);
    } else { //Add operand to entry
      entryField.val(currentEntry + button);
    }
  }

  //Decimal Point Pressed
  //Ensure it only occurs after a number and not after ANS
  else if (button === '.' && !/[0-9]*\.[0-9]*$|ANS$/.test(currentEntry)) {
    entryField.val(currentEntry + button);
  }

  //Equals Pressed
  //Only evaluate if not empty, doesn't end with an operator, and only calculator characters present
  else if (button === 'EQUALS' && currentEntry !=='' && !/[/*\-+]$/.test(currentEntry) && /^[ANSeE0-9\./*\-+]*$/.test(currentEntry)) {
    answer = eval(entryField.val().replace(/ANS/g, answer)).toString(); //evaluate mathmatical string epxression using eval, replacing ANS with previous answer
    entryField.val(''); //clear the entry field
    resultField.val(answer); //display the answer
  }
}

$(document).ready(function() {
  //handle button presses
  $('button').click(function() {
    newButtonPressed($(this).attr('name')); //set button euqal to the name attribute of the pressed button
  });

  //Handle keyboard numberpad presses
  $(document).keypress((event)=>{
    var button = null;
    switch (event.which) {
      case 13:
        button = 'EQUALS';
        break;
      case 48:
        button = '0';
        break;
      case 49:
        button = '1';
        break;
      case 50:
        button = '2';
        break;
      case 51:
        button = '3';
        break;
      case 52:
        button = '4';
        break;
      case 53:
        button = '5';
        break;
      case 54:
        button = '6';
        break;
      case 55:
        button = '7';
        break;
      case 56:
        button = '8';
        break;
      case 57:
        button = '9';
        break;
      case 42:
        button = '*';
        break;
      case 43:
        button = '+';
        break;
      case 45:
        button = '-';
        break;
      case 46:
        button = '.';
        break;
      case 47:
        button = '/';
        break;
    }

    if (button) {//only evalute if a valid button is pressed
      newButtonPressed(button);
    }
  });
});
