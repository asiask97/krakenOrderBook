const ctx = document.getElementById('chart');
let chart;

// variables
ws = new WebSocket('wss://ws.kraken.com')
let asks = [];
let bids = [];
let message ='{"event":"subscribe", "subscription":{"name":"book"}, "pair":["ETH/EUR"]}'
// Web Socket open connection
ws.onopen = () => {
    ws.send(message);
    console.log('Trade WS with Kraken connected')
}

// Fires when new data is received from web socket
ws.onmessage = (event) => {
    var data = JSON.parse(event.data);
    if (!data.event) {
        if (data[1]['as']) {
            asks = data[1]['as'];
            bids = data[1]['bs'];

            console.log('Initialised Book');
            console.log(asks, bids);
            if(!chart){
                display()
            }
        } else if (data[1]['a'] || data[1]['b']) {
            if (data[1]['a']) {
                update_book(asks, 'ask', data[1]['a']);
            }
            if (data[1]['b']) {
                update_book(bids, 'bid', data[1]['b']);
            }
        }
    }
}

// Updating Orderbook
function update_book (arr, side, data) {
        //console.log(side, data)
        if (data.length > 1) {                                      // If 2 sets of data are received then the first will be deleted and the second will be added
            let index = arr.findIndex(o => o[0] == data[0][0]);     // Get position of first data
            
            arr.splice(index, 1);                                   // Delete data              
            arr.push([ data[1][0], data[1][1] ]);                   // Insert new data  

            //console.log('Delete and Insert');
        } else {
            let index = arr.findIndex(o => o[0] == data[0][0]);
            //console.error(index);
            if (index > -1) {                           // If the index matches a price in the list then it is an update message
                arr[index] = [data[0][0], data[0][1]];  // Update matching position in the book
                //console.log('Updated ' + index);
            } else {                                    // If the index is -1 then it is a new price that came in
                arr.push([data[0][0], data[0][1]]);     // Insert new price
                sort_book(arr, side);                   // Sort the book with the new price 
                arr.splice(10, 1);                      // Delete the 11th entry
                //console.log('Insert Only');
            }                   
        }
        sort_book(arr, side);                                   // Sort the order book

}

// Sort Orderbook
function sort_book (arr, side) {
    if (side == 'bid') {
        arr.sort((x, y) => parseFloat(y[0]) - parseFloat(x[0]));
        updateChart()                                       // Update Chart

    } else if (side == 'ask') {
        arr.sort((x, y) => parseFloat(x[0]) - parseFloat(y[0]));
        updateChart()                                       // Update Chart

    }        

    //console.log(asks, 'bid ->',bids)
}


function updateChart(){
    let price = []
    let volume = []
    bids.forEach(function(bid){
        price.push(bid[0]);
        volume.push(bid[1]*bid[0])
    })

    chart.data.labels = price;
    chart.data.datasets[0].data = volume;
    //console.log(price)
    chart.update()

}


function display(){
    console.log('herrrer ----> ', bids)
    let price = []
    let volume = []
    bids.forEach(function(bid){
        price.push(bid[0]);
        volume.push(bid[1]*bid[0])
    })
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: price,
            datasets: [{
                label: 'order size',
                data: volume,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
