var remote = require('remote')
var Menu = remote.require('menu')
var MenuItem = remote.require('menu-item')

// Build our new menu
var menu = new Menu()
menu.append(new MenuItem({
  label: 'Delete',
  click: function() {
    // Trigger an alert when menu item is clicked
    alert('Deleted')
  }
}))
menu.append(new MenuItem({
  label: 'More Info...',
  click: function() {
    // Trigger an alert when menu item is clicked
    alert('Here is more information')
  }
}))

// Add the listener
document.addEventListener('DOMContentLoaded', function () {
  //document.querySelector('.js-context-menu').addEventListener('click', function (event) {
  //  menu.popup(remote.getCurrentWindow());
  //});

  renderFile( full_path + "/" + file_name );
  addFileChangeWatcher();
})

function RunAssLog(){
  
  const spawn = require('child_process');
 const ls = spawn.spawn('/Users/TobiasFinkelstein/Google\ Drive/AssLog/asslog5', []);

 ls.stdout.on('data', (data) => {
   alert(`stdout: ${data}`);
 });;
}
const fs = require('fs');



 var full_path = "/Users/TobiasFinkelstein/Google\ Drive/AssLog/"
 var file_name = "KINGSTON_scanlog.csv"



function addFileChangeWatcher(){
 fs.watch(full_path + "/" + file_name , { encoding: 'buffer' }, (eventType, filename) => {    
   renderFile( full_path + "/" + file_name );
 });
}

function renderFile( file_path ){
     var filetext = fs.readFileSync( full_path + "/" + file_name, {encoding: "utf8"});
   var rows = getRowsFromFile( filetext );
   renderRows( rows );
}



function getRowsFromFile( filetext ){
 var rows = [];
 var header_elements;
 filetext.split("\n").forEach( function( line, index){
   var elements = line.split(';')
   if ( index == 0 ){
     header_elements = elements;
   } else {
     var row = [];
     elements.forEach( function( value, idx ){
       row.push( value );
     });
     rows.push( row );

   }
 });
 return rows;
}


function renderRows( rows ){

 var root_node = document.getElementById('listed_files');

 var cNode = root_node.cloneNode(false);

 for ( var row of rows ){
   var renderedRow = document.createElement("tr");
   var name = document.createElement("td"); name.innerHTML = row[0];
   var TimeOfLastStatusChange = document.createElement("td"); TimeOfLastStatusChange.innerHTML = row[1]; 
   var TimeOfLastModification = document.createElement("td"); TimeOfLastModification.innerHTML = row[2];
   var FileSize = document.createElement("td"); FileSize.innerHTML = row[3];
   renderedRow.appendChild(name);
   renderedRow.appendChild(TimeOfLastStatusChange);
   renderedRow.appendChild(TimeOfLastModification);
   renderedRow.appendChild(FileSize);
   cNode.appendChild( renderedRow );
 } 

 root_node.parentNode.replaceChild(cNode ,root_node);

}