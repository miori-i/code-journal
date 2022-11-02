/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

// To write the data in entries property before unload, stginfy it
window.addEventListener('beforeunload', function (event) {
  var entriesJSON = JSON.stringify(data);
  localStorage.setItem('javascript strage', entriesJSON);
});

var $entries = localStorage.getItem('javascript storage');
if ($entries !== null) {
  data = JSON.parse($entries);
}
