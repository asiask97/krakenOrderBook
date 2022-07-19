//variables

ws = new WebSocket('wss://futures.kraken.com/ws/v1')
const product_id = "PI_ETHUSD"
let asks = new Map();
let bids = new Map();

const ctxBids = document.getElementById('chartBids');
const ctxAsks = document.getElementById('chartAsks');

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
        //console.log(JSON.stringify(request_messageTwo))
    }, 3000);

}

//get messages
ws.onmessage = (message) => {
    let data = JSON.parse(message.data)
    console.log(data)
    //console.log(Object.keys(data))
    //Object.keys(data)[4]
    if (!data.event) {

        if (Object.values(data)[0] == 'book_snapshot') {
            let arrasks = Object.values(data)[6];
            let arrbids = Object.values(data)[5];
            console.log(arrbids)
            arrasks.forEach((askitem) =>{
                asks.set(parseFloat(Object.values(askitem)[0]), parseFloat(Object.values(askitem)[1]))
            })

            arrbids.forEach((biditem) =>{
                bids.set(parseFloat(Object.values(biditem)[0]), parseFloat(Object.values(biditem)[1]))
            })

            if(!chart){
                displayBids()
                displayAsks()
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
       
    //console.log(data)
    //delete entry if its volume is 0
    console.log(map)
    if(Object.values(data)[5] == 0){
        console.log('deleted')
        map.delete(parseFloat(Object.values(data)[4]));
        if(side == 'bid'){
            updateChartBids()                                      
        }
        else{
            updateChartAsks()
        }

    }else{
        // add/updates  price                       [       volume                               ]
        map.set(parseFloat(Object.values(data)[4]), parseFloat(Object.values(data)[5]))
        console.log('updated');
    }
    sort_book(side);                                 
}

// Sort Orderbook
function sort_book (side) {
    if (side == 'bid') {
        // Sort the order book
        bids = new Map([...bids].sort((a, b) => b[0] - a[0]));
        console.log('sorted --->' , bids)
        updateChartBids()                                          // Update Chart
    } else if (side == 'ask') {
        // Sort the order book
        asks = new Map([...asks].sort(function(a,b){return a-b}));
        //console.log('sorted --->' , asks)
        updateChartAsks()
    }        

}

function updateChartBids(){
    let price = []
    let volume = []
    max = 0;
    for (const [key, value] of bids) {
        price.push(key)
        volume.push(value)
        max++
        if(max == 10){
            break;
        }
    }

    chartbids.data.labels = price;
    chartbids.data.datasets[0].data = volume;
    chartbids.update()
}
function updateChartAsks(){
    let price = []
    let volume = []
    max = 0;
    for (const [key, value] of asks) {
        price.push(key)
        volume.push(value)

        max++
        if(max == 10){
            break;
        }
    }
    

    chartasks.data.labels = price;
    chartasks.data.datasets[0].data = volume;
    chartasks.update()
}


function displayBids(){
    let price = []
    let volume = []
    max = 0;
    for (const [key, value] of bids) {
        price.push(key)
        volume.push(value)
        console.log(key, value); 
        max++
        if(max == 10){
            break;
        }
    }
    chartbids = new Chart(chartBids, {
        type: 'bar',
        data: {
            labels: price,
            datasets: [{
                label: 'order size',
                data: volume,
                borderWidth: 1,
                backgroundColor: ['rgb(255,0,0)']
            }]
        },
        options: {
            animation: {
                
            },
            y:
             {
                min: 0,
                max: 150000,
                ticks:{
                   stepSize: 10000
                }
            },
        }   
    });
}

function displayAsks(){
    let price = []
    let volume = []
    max = 0;
    for (const [key, value] of asks) {
        price.push(key)
        volume.push(value)
        console.log(key, value); 
        max++
        if(max == 10){
            break;
        }
    }
    chartasks = new Chart(chartAsks, {
        type: 'bar',
        data: {
            labels: price,
            datasets: [{
                label: 'order size',
                data: volume,
                borderWidth: 1,
                backgroundColor: ['rgb(0,255,0)']
            }]
        },
        options: {
            animation: {
                
            },
            y:
             {
                min: 0,
                max: 150000,
                ticks:{
                   stepSize: 10000
                }
            },
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
