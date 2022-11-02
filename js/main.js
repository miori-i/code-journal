/* global data */

var $photoUrl = document.getElementById('photo-url');

var $img = document.getElementById('image');

// Listen for 'input' events on the photoUrl input to update the src attribute
// of the photo preview when the input value changes.
$photoUrl.addEventListener('input', function (event) {
  $img.setAttribute('src', $photoUrl.value);

});

var $form = document.querySelector('form');

$form.addEventListener('submit', function (event) {

  // Put the form's input values into a new object.
  var entry = {};
  entry.title = $form.elements.title.value;
  entry.photoUrl = $form.elements['photo-url'].value;
  entry.notes = $form.elements.notes.value;

  // Add the nextEntryId to the object.
  // var nextEntryId = 0;
  // entry.push(nextEntryId);

  // Increment the nextEntryId on the data model.
  data.nextEntryId++;

  // Prepend the new object to the entries in the data model.
  data.entries.prepend(entry);

  // Reset the image preview's `src' attribute.
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');

  // Reset the form inputs.
  $form.reset();

});
