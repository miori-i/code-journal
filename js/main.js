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

  // Edit the existing data object
  if (data.editing !== null) {
    for (var i = 0; i < data.entries.length; i++) {

      if (data.entries[i].title === data.editing.title) {
        // update the existing object in entries.

        var titleInEditingBeforeUpdated = data.editing.title;

        data.entries[i].title = $form.elements.title.value;
        data.entries[i].photoUrl = $form.elements['photo-url'].value;
        data.entries[i].notes = $form.elements.notes.value;
        data.entries[i].nextEntryId = data.editing.nextEntryId;

        // Update the existing DOM and adds it to the page
        var $doms = document.querySelectorAll('li[data-entry-id]');
        for (var n = 0; n < $doms.length; n++) {
          if ($doms[n].getAttribute('data-entry-id') === titleInEditingBeforeUpdated) {
            var $updatedDOMtree = renderEntry(data.entries[i]);
            $doms[n].replaceWith($updatedDOMtree);
          }
        }

        // Reset the title for the form
        var $title = document.querySelectorAll('h3');
        $title[0].textContent = 'New Entry';

        // Reset the image preview's `src' attribute.
        $img.setAttribute('src', 'images/placeholder-image-square.jpg');

        // Reset the form inputs.
        $form.reset();

        // Automatically shows the 'entries' view without reloading the page.
        viewSwapping('entries');

        // Remove "Delete Entry" button
        var $deleteEntryButton = document.querySelector('.delete-entry-button');
        $deleteEntryButton.remove();
      }
    }

    // Add new object to entries array
  } else if (data.editing === null) {

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

    // Creates a new DOM tree for it and adds it to the page
    var $newDOMtree = renderEntry(entry);
    $ul.prepend($newDOMtree);

    // Reset the image preview's `src' attribute.
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');

    // Reset the form inputs.
    $form.reset();

    // Automatically shows the 'entries' view without reloading the page.
    viewSwapping('entries');

    // Removes the p element that shows there is no entry
    // $paragraph.remove();
  }
  // Reset the value of data.editing
  data.editing = null;

});

// Define a function that takes a single journal entry object and
//  returns a DOM tree that matches one of the example entries in the HTML.

function renderEntry(object) {

  var $li = document.createElement('li');
  $li.setAttribute('data-entry-id', object.title);

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
  $h2.setAttribute('class', 'placing-icon');
  $h2.textContent = object.title;
  $columnHalf2.appendChild($h2);

  var $p = document.createElement('p');
  $p.textContent = object.notes;
  $columnHalf2.appendChild($p);

  var $icon = document.createElement('i');
  $icon.setAttribute('class', 'fa-solid fa-pencil fa-sm edit-icon');
  $icon.setAttribute('name', 'icon');
  $h2.appendChild($icon);

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
  // refreshing the pages shows the same view as before refreshing.
  viewSwapping(data.view);
});

// Function that is called when the links(a tages) are pressed
document.addEventListener('click', function (event) {
  if (event.target.tagName !== 'A') {
    return null;
  }
  // Decides which page will be shown with the info by clicking
  viewSwapping(event.target.name);
});

// View swapping function
var $views = document.querySelectorAll('.view');
function viewSwapping(dataView) {
  data.view = dataView;
  if (dataView === 'code-journal') {
    $views[0].className = 'view hidden';
    $views[1].className = 'view';
    $views[2].className = 'view hidden';
  } else if (dataView === 'entries') {
    $views[0].className = 'view';
    $views[1].className = 'view hidden';
    $views[2].className = 'view';
  } else if (dataView === 'new') {
    $views[0].className = 'view hidden';
    $views[1].className = 'view';
    $views[2].className = 'view hidden';
  }
}

// Listen for clicks on the parent element of all rendered entries.
// the parent element = $ul
$ul.addEventListener('click', function (event) {
  // console.log('$ul', $ul);
  // console.log('event.target:', event.target);
  // console.log('event.target.getAttribute("name"):', event.target.getAttribute('name'));
  if (event.target.getAttribute('name') === 'icon') {
    // Show the entry form if an edit icon was clicked.
    viewSwapping('code-journal');

    // Change the title to Edit Entry
    var $title = document.querySelectorAll('h3');
    $title[0].textContent = 'Edit Entry';

    // Find the matching entry object in the data model
    // and assign it to the data model's editing property if an edit icon was clicked.
    var dataEntryId = event.target.closest('li').getAttribute('data-entry-id');
    // console.log('dataEntryId:', dataEntryId);
    for (var i = 0; i < data.entries.length; i++) {
      if (dataEntryId === data.entries[i].title) {
        data.editing = data.entries[i];
      }
    }

    // Pre-populate the entry form with the clicked entry's values from the object found in the data model.
    $form.elements.title.value = data.editing.title;
    $form.elements['photo-url'].value = data.editing.photoUrl;
    $img.setAttribute('src', data.editing.photoUrl);
    $form.elements.notes.value = data.editing.notes;

    // console.log('event.target:', event.target);
    // console.log('event.target.closest("li"):', event.target.closest('li'));
    // console.log('dataEntryId:', dataEntryId);
    // console.log('data.editing.title:', data.editing.title);

    // Add "Delete Entry" button
    var $saveButton = document.querySelector('.save-button');
    var $deleteEntryButton = document.createElement('button');
    $deleteEntryButton.setAttribute('class', 'delete-entry-button');
    $deleteEntryButton.setAttribute('type', 'button');
    $deleteEntryButton.textContent = 'Delete Entry';
    $saveButton.appendChild($deleteEntryButton);

  }
});

// Shows that there is no entry added
if (data.entries.length === 0) {
  var $paragraph = document.createElement('p');
  $paragraph.textContent = 'No entries have been recorded.';
  $paragraph.setAttribute('class', 'no-entries');
  $ul.appendChild($paragraph);
}

// ---------------------- editing -------------------------------------

// Add a click target for deleting an entry to the entry form
var $popup = document.querySelector('.popup');
$form.addEventListener('click', deleteEnterButtonClick);

function deleteEnterButtonClick(event) {
  // console.log(event.target);
  if (event.target.getAttribute('class') === 'delete-entry-button') {
    // console.log('delete entry clicked!');
    $popup.classList.remove('hidden');

  }
}

// Hide the modal if the user clicks Cancel
var $cancelButton = document.querySelector('.cancel-button');
$cancelButton.addEventListener('click', function () {
  $popup.classList.add('hidden');
});

// Remove the entry from the data model and the entry's DOM tree from the page if the user clicks Delete
var $confirmButton = document.querySelector('.confirm-button');
$confirmButton.addEventListener('click', confirmClick);

// --- remove the entry from the data model
function confirmClick() {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.editing.title === data.entries[i].title) {
      data.entries.splice(i, 1);
    }
  }
  // --- remove the entry's DOM tree from the page
  var $doms = document.querySelectorAll('li[data-entry-id]');
  for (var n = 0; n < $doms.length; n++) {
    if ($doms[n].getAttribute('data-entry-id') === data.editing.title) {
      $doms[n].remove();
    }
  }

  // Reset the value of data.editing
  data.editing = null;

  $popup.classList.add('hidden');
}
