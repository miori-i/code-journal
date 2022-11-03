/* global data */

var $photoUrl = document.getElementById('photo-url');
var $img = document.getElementById('image');

// Listen for 'input' events on the photoUrl input to update the src attribute
// of the photo preview when the input value changes.
$photoUrl.addEventListener('input', function (event) {

  $img.setAttribute('src', $photoUrl.value);

});

// Listen for 'submit' events on the journal entry form
var $form = document.querySelector('form');

$form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Put the form's input values into a new object.
  var entry = {};
  entry.title = $form.elements.title.value;
  entry.photoUrl = $form.elements['photo-url'].value;
  entry.notes = $form.elements.notes.value;

  // Add the nextEntryId to the object.
  entry.nextEntryId = data.nextEntryId;

  // Increment the nextEntryId on the data model.
  data.nextEntryId++;

  // Prepend the new object to the entries in the data model.
  data.entries.unshift(entry);

  // Reset the image preview's `src' attribute.
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');

  // Reset the form inputs.
  $form.reset();

  // Creates a new DOM tree for it and adds it to the page
  var $newDOMtree = renderEntry(entry);
  $ul.prepend($newDOMtree);

});

// Define a function that takes a single journal entry object and
//  returns a DOM tree that matches one of the example entries in the HTML.

function renderEntry(object) {

  var $li = document.createElement('li');

  var $container = document.createElement('div');
  $container.setAttribute('class', 'container3');
  $li.appendChild($container);

  var $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  $container.appendChild($row);

  var $columnHalf1 = document.createElement('div');
  $columnHalf1.setAttribute('class', 'column-half');
  $row.appendChild($columnHalf1);

  var $image = document.createElement('img');
  $image.setAttribute('src', object.photoUrl);
  $columnHalf1.appendChild($image);

  var $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half');
  $row.appendChild($columnHalf2);

  var $h2 = document.createElement('h2');
  $h2.textContent = object.title;
  $columnHalf2.appendChild($h2);

  var $p = document.createElement('p');
  $p.textContent = object.notes;
  $columnHalf2.appendChild($p);

  return $li;

}

// Use a loop to create a DOM tree for each journal entry in the data model
// and append it to the page when the 'DOMContentLoaded' event is fired.

var $ul = document.querySelector('.entries-unordered-list');

document.addEventListener('DOMContentLoaded', function () {
  for (var i = 0; i < data.entries.length; i++) {
    var domTree = renderEntry(data.entries[i]);
    $ul.appendChild(domTree);
  }
});

// Listen for 'click' events for view swapping
var $tabContainer = document.querySelector('.tab-container');
var $tabs = document.querySelectorAll('.tab');
var $views = document.querySelectorAll('.view');

$tabContainer.addEventListener('click', function (event) {

  // If event.target is equal to the elements with the class atttribute with the value of tab
  if (event.target.matches('.tab')) {

    for (var i = 0; i < $tabs.length; i++) {
      if ($tabs[i] === event.target) {
        $tabs[i].className = 'tab active';
      } else {
        $tabs[i].className = 'tab';
      }
    }

    // Decides which page will be shown
    var $dataView = event.target.getAttribute('data-view');

    for (var n = 0; n < $views.length; n++) {
      if ($dataView === $views[n].getAttribute('data-view')) {
        $views[n].className = 'view';
      } else {
        $views[n].className = 'view hidden';
      }
    }
  }
});
