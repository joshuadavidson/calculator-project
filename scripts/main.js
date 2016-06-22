function input(key) {

}

$(document).ready(function() {

  var answer = '0'; //answer

  $(document).keypress((event) => {

  });

  //handle button presses
  $('button').click(function() {
    //set newValue euqal to the name attribute of the pressed button
    var newValue = $(this).attr('name');
    var entryField = $('#entry-field');
    var resultField = $('#result-field');

    console.log(newValue);

    if (newValue === 'CE') { //Clear Entry Pressed
      entryField.val('');
    } else if (newValue === 'AC') { //All Clear Pressed
      entryField.val('');
      resultField.val('0');
      answer = 0;
    } else if (newValue === 'DEL') { //Delete Pressed
      entryField.val((index, currentVal) => {
        if (currentVal.charAt(currentVal.length - 1) === 'S') { //account for the case that the last entry was ANS
          return currentVal.slice(0, currentVal.length - 3); //remove the 3 characters of ANS
        } else {
          return currentVal.slice(0, currentVal.length - 1); //remove only the last character
        }
      });
    } else if (newValue === 'EQUALS' && /^[ANSE0-9./*\-+]*$/.test(entryField.val())) { //Equals Pressed AND Only evaluate if only calculator characters, prevent malicious code execution
      answer = eval(entryField.val().replace(/ANS/g, answer)).toString(); //evaluate mathmatical string epxression using eval, replacing ANS with previous answer
      entryField.val(''); //clear the entry field
      resultField.val(answer); //display the answer
    } else {
      entryField.val((index, currentVal) => {
        if (/[/*\-+]$/.test(currentVal) && /[/*\-+]/.test(newValue)) { //If previous and current entry was operand then remove it and replace with new operand
          return currentVal.slice(0, currentVal.length - 1) + newValue;
        } else if (currentVal === '' && /[/*\-+]/.test(newValue)) { //If blank and operand pressed perform operand on answer
          return answer + newValue;
        } else { //If number pressed just return it
          return currentVal + newValue;
        }
      });
    }

  });
});
