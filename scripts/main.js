$(document).ready(function() {

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
    } else if (newValue === 'DEL') { //Delete Pressed
      entryField.val((index, currentVal) => {
        return currentVal.slice(0, currentVal.length - 1);
      });
    } else if (newValue === 'PLUS-MINUS') { //Plus/Minus Pressed

    } else if (newValue === 'EQUALS') { //Equals Pressed
      resultField.val(eval(entryField.val()).toString());
    } else {
      entryField.val((index, currentVal) => {
        if (/[/*\-+]$/.test(currentVal) && /[/*\-+]/.test(newValue)) { //If previous and current entry was operand then remove it and replace with new operand
          return currentVal.slice(0, currentVal.length - 1) + newValue;
        } else {
          return currentVal + newValue;
        }
      });
    }
  });
});
