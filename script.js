//variables

ws = new WebSocket('wss://futures.kraken.com/ws/v1')
const product_id = "PI_ETHUSD"
const asks = new Map();
const bids = new Map();

const ctx = document.getElementById('chart');
let chart;


//connect 
ws.onopen = () => {
    console.log('Trade WS with Kraken connected')
    
    setTimeout(function(){
        let request_messageTwo = {
            "event": "subscribe",
            "feed": 'book',
            "product_ids": [product_id]
        }
        ws.send(JSON.stringify(request_messageTwo))
        console.log(JSON.stringify(request_messageTwo))
    }, 3000);

}

//get messages
ws.onmessage = (message) => {
    let data = JSON.parse(message.data)
    //console.log(data)
    //console.log(Object.keys(data))
    //Object.keys(data)[4]
    if (!data.event) {

        if (Object.values(data)[0] == 'book_snapshot') {
            let arrasks = Object.values(data)[6];
            let arrbids = Object.values(data)[5];

            arrasks.forEach((askitem) =>{
                asks.set(parseFloat(Object.values(askitem)[0]), parseFloat(Object.values(askitem)[1]))
            })

            arrbids.forEach((biditem) =>{
                bids.set(parseFloat(Object.values(biditem)[0]), parseFloat(Object.values(biditem)[1]))
            })

            if(!chart){
                display()
            }
            console.log('Initialised Book');
            console.log(asks, bids);


        } else {
            if(Object.values(data)[2] == 'sell' ) {
                update_book(asks, 'ask', data);
            }
            if (Object.values(data)[2] == 'buy' ) {
                update_book(bids, 'bid', data);
            }
        }
    }
}



// Updating Orderbook
function update_book (map, side, data) {
       
    console.log(data)
    //delete entry if its volume is 0000
    if(Object.values(data)[5] == 0){
        console.log('deleted')
        map.delete(parseFloat(Object.values(data)[4]));
        updateChart()  
    }else{
        //update entry 
        console.log('updated');
        map.set(parseFloat(Object.values(data)[4]), parseFloat(Object.values(data)[5]))
        //console.log(map.get(Object.values(data)[4]))

        // Sort the order book
    }
    sort_book(map, side);                                 
}

// Sort Orderbook
function sort_book (map, side) {
    if (side == 'bid') {
        
        var mapAsc = new Map([...map].sort(function (a, b) {  return a - b;  }));
        map = mapAsc
        updateChart()                                       // Update Chart


    } else if (side == 'ask') {
        
        var mapAsc = new Map([...map].sort(function (a, b) {  return a - b;  }));
        map = mapAsc
        //updateChart()                                       // Update Chart

    }        

}


function updateChart(){
    let price = []
    let volume = []
    max = 0;
    for (const [key, value] of bids) {
        price.push(key)
        volume.push(value)
        max++
        if(max == 50){
            break;
        }
    }
    chart.data.labels = price;
    chart.data.datasets[0].data = volume;
    chart.update()

}


function display(){
    let price = []
    let volume = []
    max = 0;
    for (const [key, value] of bids) {
        price.push(key)
        volume.push(value)
        console.log(key, value); 
        max++
        if(max == 50){
            break;
        }
    }
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

//challenge function for private requests
/*function signin_challenge(message){
    
    // step 1: hash the message with SHA256
    var hash = CryptoJS.SHA256(message);

    // step 2: base64 decode api secret key
    const secret_buffer = CryptoJS.enc.Base64.parse(api_secret);

    // step 3: use result of step 2 to hash the result of step 1 with HMAC-SHA512
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA512, secret_buffer);
    hmac.update(hash, secret_buffer);
    
    // step 4: Base64-encode the result of step 3
    let result = hmac.finalize().toString(CryptoJS.enc.Base64);
    return result;
}*/
