/* var raw = JSON */


function compare(a, b) {

    var genreA = a.timeToStation;
    var genreB = b.timeToStation;

    var comparison = 0;
    if (genreA > genreB) {
      comparison = 1;
    } else if (genreA < genreB) {
      comparison = -1;
    }
    return comparison;
  }
  

var tfl = raw.sort(compare);
/*

H1

fragment = platform board
    div = pb_container
        platform header
        table
            tr
            tr
            tr
        platform header
        table
            tr
            tr
            tr
*/



// Create Station Name header element
var station_header = document.createElement('h1');
// Inserting the first station name in the array as station name
station_header.innerHTML = tfl[0].stationName;
// Adding the header to the HTML body
document.body.appendChild(station_header);




// Create a new fragment for the platform and it's board results
var platform_board = document.createDocumentFragment();


// Create a container div to add to the fragment
var pb_container = document.createElement('div');
pb_container.setAttribute('id', 'container');


function update_fragment() {
    // Append the container div to the fragment
    platform_board.appendChild(pb_container);

    // Append the fragment to HTML Body
    document.body.appendChild(platform_board);
}


function new_platform(current_loop) {
    // Creating a header element for platform name
    var pb_platform = document.createElement('h2');
    // Set platformName to pb_platform
    pb_platform.innerHTML = tfl[current_loop].platformName;
    // Append the platform name to the container
    pb_container.appendChild(pb_platform);
}

function create_table(_platform_) {
    // Create table for displaying results
    var table = document.createElement('table');
    table.setAttribute('id', _platform_);
    table.innerHTML = '<tr><th class="line-header">Line</th><th>Destination</th><th>Arrival Time</th></tr>';
    pb_container.appendChild(table);

    update_fragment();
}


// Create table row
function create_tr(_id_, _parent_table_) {
    var tr = document.createElement('tr');
    tr.setAttribute("id", _id_);
    _parent_table_.appendChild(tr); 


    update_fragment();
}

// Create table cell
function create_td(id, _content_, _parent_row_) {

    var td = document.createElement('td');
    td.innerHTML = _content_;
    
    // currently how we're setting the class on line
    td.setAttribute("class", id);
    
    _parent_row_.appendChild(td); 
}


function write_board_results(current_loop, row_send) {
    
   


    create_td(tfl[current_loop].lineId, tfl[current_loop].lineName, row_send);
    // create new cell for destination
    create_td('towards',tfl[current_loop].towards, row_send);
    // create new cell for arrival time
    create_td('arriving',Math.round(tfl[current_loop].timeToStation / 60) +' mins', row_send);

    
    update_fragment();

}


function platforms() {

    // setting outside for loop so not to be overwritten every loop 
    var platforms_array = [];
    
    var row = 'row';
    var current_row = 0;

    // loop over platform and create new header
    for (var current_loop = 0; current_loop < tfl.length; current_loop++) {

        var current_platform = tfl[current_loop].platformName;
        


        if (platforms_array.includes(tfl[current_loop].platformName)) {

            // set the current loop platform table to send the new row to
            var table_send = document.getElementById(current_platform);

            // create variable for row id, so we can add cells to it
            current_row = current_row + 1;
            row_counter = current_row;
            row_id = row + row_counter;


            // create row in table_send id
            create_tr(row_id, table_send);
            

            // create variable for row so we can add cells
            var row_send = document.getElementById(row_id);
            

            write_board_results(current_loop, row_send);
        }

        else {
            // Add new Platfrom Header
            new_platform(current_loop);
            

            // create a table & add headers
            create_table(current_platform);


            // create variable for table id to add row to
            var table_send = document.getElementById(current_platform);


            // create variable for row id, so we can add cells to it
            current_row = current_row + 1;
            row_counter = current_row;
            row_id = row + row_counter;


            // create row in table_send id
            create_tr(row_id, table_send);
            

            // create variable for row so we can add cells
            var row_send = document.getElementById(row_id);
            
            
            // write the results for the platform board
            write_board_results(current_loop, row_send);


            // add this platformname to the array checker so we can add time to the correct tables
            platforms_array.push(tfl[current_loop].platformName);
        

            update_fragment();
        }
    }
}

platforms();

