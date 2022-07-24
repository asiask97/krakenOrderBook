var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequirece02"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequirece02"] = parcelRequire;
}
parcelRequire.register("l4AO6", function(module, exports) {

var $7rkCd = parcelRequire("7rkCd");
function $f57685d060ae2ad7$var$Node(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.red = true;
}
$f57685d060ae2ad7$var$Node.prototype.get_child = function(dir) {
    return dir ? this.right : this.left;
};
$f57685d060ae2ad7$var$Node.prototype.set_child = function(dir, val) {
    if (dir) this.right = val;
    else this.left = val;
};
function $f57685d060ae2ad7$var$RBTree(comparator) {
    this._root = null;
    this._comparator = comparator;
    this.size = 0;
}
$f57685d060ae2ad7$var$RBTree.prototype = new $7rkCd();
// returns true if inserted, false if duplicate
$f57685d060ae2ad7$var$RBTree.prototype.insert = function(data) {
    var ret = false;
    if (this._root === null) {
        // empty tree
        this._root = new $f57685d060ae2ad7$var$Node(data);
        ret = true;
        this.size++;
    } else {
        var head = new $f57685d060ae2ad7$var$Node(undefined); // fake tree root
        var dir = 0;
        var last = 0;
        // setup
        var gp = null; // grandparent
        var ggp = head; // grand-grand-parent
        var p = null; // parent
        var node = this._root;
        ggp.right = this._root;
        // search down
        while(true){
            if (node === null) {
                // insert new node at the bottom
                node = new $f57685d060ae2ad7$var$Node(data);
                p.set_child(dir, node);
                ret = true;
                this.size++;
            } else if ($f57685d060ae2ad7$var$is_red(node.left) && $f57685d060ae2ad7$var$is_red(node.right)) {
                // color flip
                node.red = true;
                node.left.red = false;
                node.right.red = false;
            }
            // fix red violation
            if ($f57685d060ae2ad7$var$is_red(node) && $f57685d060ae2ad7$var$is_red(p)) {
                var dir2 = ggp.right === gp;
                if (node === p.get_child(last)) ggp.set_child(dir2, $f57685d060ae2ad7$var$single_rotate(gp, !last));
                else ggp.set_child(dir2, $f57685d060ae2ad7$var$double_rotate(gp, !last));
            }
            var cmp = this._comparator(node.data, data);
            // stop if found
            if (cmp === 0) break;
            last = dir;
            dir = cmp < 0;
            // update helpers
            if (gp !== null) ggp = gp;
            gp = p;
            p = node;
            node = node.get_child(dir);
        }
        // update root
        this._root = head.right;
    }
    // make root black
    this._root.red = false;
    return ret;
};
// returns true if removed, false if not found
$f57685d060ae2ad7$var$RBTree.prototype.remove = function(data) {
    if (this._root === null) return false;
    var head = new $f57685d060ae2ad7$var$Node(undefined); // fake tree root
    var node = head;
    node.right = this._root;
    var p = null; // parent
    var gp = null; // grand parent
    var found = null; // found item
    var dir = 1;
    while(node.get_child(dir) !== null){
        var last = dir;
        // update helpers
        gp = p;
        p = node;
        node = node.get_child(dir);
        var cmp = this._comparator(data, node.data);
        dir = cmp > 0;
        // save found node
        if (cmp === 0) found = node;
        // push the red node down
        if (!$f57685d060ae2ad7$var$is_red(node) && !$f57685d060ae2ad7$var$is_red(node.get_child(dir))) {
            if ($f57685d060ae2ad7$var$is_red(node.get_child(!dir))) {
                var sr = $f57685d060ae2ad7$var$single_rotate(node, dir);
                p.set_child(last, sr);
                p = sr;
            } else if (!$f57685d060ae2ad7$var$is_red(node.get_child(!dir))) {
                var sibling = p.get_child(!last);
                if (sibling !== null) {
                    if (!$f57685d060ae2ad7$var$is_red(sibling.get_child(!last)) && !$f57685d060ae2ad7$var$is_red(sibling.get_child(last))) {
                        // color flip
                        p.red = false;
                        sibling.red = true;
                        node.red = true;
                    } else {
                        var dir2 = gp.right === p;
                        if ($f57685d060ae2ad7$var$is_red(sibling.get_child(last))) gp.set_child(dir2, $f57685d060ae2ad7$var$double_rotate(p, last));
                        else if ($f57685d060ae2ad7$var$is_red(sibling.get_child(!last))) gp.set_child(dir2, $f57685d060ae2ad7$var$single_rotate(p, last));
                        // ensure correct coloring
                        var gpc = gp.get_child(dir2);
                        gpc.red = true;
                        node.red = true;
                        gpc.left.red = false;
                        gpc.right.red = false;
                    }
                }
            }
        }
    }
    // replace and remove if found
    if (found !== null) {
        found.data = node.data;
        p.set_child(p.right === node, node.get_child(node.left === null));
        this.size--;
    }
    // update root and make it black
    this._root = head.right;
    if (this._root !== null) this._root.red = false;
    return found !== null;
};
function $f57685d060ae2ad7$var$is_red(node) {
    return node !== null && node.red;
}
function $f57685d060ae2ad7$var$single_rotate(root, dir) {
    var save = root.get_child(!dir);
    root.set_child(!dir, save.get_child(dir));
    save.set_child(dir, root);
    root.red = true;
    save.red = false;
    return save;
}
function $f57685d060ae2ad7$var$double_rotate(root, dir) {
    root.set_child(!dir, $f57685d060ae2ad7$var$single_rotate(root.get_child(!dir), !dir));
    return $f57685d060ae2ad7$var$single_rotate(root, dir);
}
module.exports = $f57685d060ae2ad7$var$RBTree;

});
parcelRequire.register("7rkCd", function(module, exports) {
function $56ab0bd15ef78a11$var$TreeBase() {}
// removes all nodes from the tree
$56ab0bd15ef78a11$var$TreeBase.prototype.clear = function() {
    this._root = null;
    this.size = 0;
};
// returns node data if found, null otherwise
$56ab0bd15ef78a11$var$TreeBase.prototype.find = function(data) {
    var res = this._root;
    while(res !== null){
        var c = this._comparator(data, res.data);
        if (c === 0) return res.data;
        else res = res.get_child(c > 0);
    }
    return null;
};
// returns iterator to node if found, null otherwise
$56ab0bd15ef78a11$var$TreeBase.prototype.findIter = function(data) {
    var res = this._root;
    var iter = this.iterator();
    while(res !== null){
        var c = this._comparator(data, res.data);
        if (c === 0) {
            iter._cursor = res;
            return iter;
        } else {
            iter._ancestors.push(res);
            res = res.get_child(c > 0);
        }
    }
    return null;
};
// Returns an iterator to the tree node at or immediately after the item
$56ab0bd15ef78a11$var$TreeBase.prototype.lowerBound = function(item) {
    var cur = this._root;
    var iter = this.iterator();
    var cmp = this._comparator;
    while(cur !== null){
        var c = cmp(item, cur.data);
        if (c === 0) {
            iter._cursor = cur;
            return iter;
        }
        iter._ancestors.push(cur);
        cur = cur.get_child(c > 0);
    }
    for(var i = iter._ancestors.length - 1; i >= 0; --i){
        cur = iter._ancestors[i];
        if (cmp(item, cur.data) < 0) {
            iter._cursor = cur;
            iter._ancestors.length = i;
            return iter;
        }
    }
    iter._ancestors.length = 0;
    return iter;
};
// Returns an iterator to the tree node immediately after the item
$56ab0bd15ef78a11$var$TreeBase.prototype.upperBound = function(item) {
    var iter = this.lowerBound(item);
    var cmp = this._comparator;
    while(iter.data() !== null && cmp(iter.data(), item) === 0)iter.next();
    return iter;
};
// returns null if tree is empty
$56ab0bd15ef78a11$var$TreeBase.prototype.min = function() {
    var res = this._root;
    if (res === null) return null;
    while(res.left !== null)res = res.left;
    return res.data;
};
// returns null if tree is empty
$56ab0bd15ef78a11$var$TreeBase.prototype.max = function() {
    var res = this._root;
    if (res === null) return null;
    while(res.right !== null)res = res.right;
    return res.data;
};
// returns a null iterator
// call next() or prev() to point to an element
$56ab0bd15ef78a11$var$TreeBase.prototype.iterator = function() {
    return new $56ab0bd15ef78a11$var$Iterator(this);
};
// calls cb on each node's data, in order
$56ab0bd15ef78a11$var$TreeBase.prototype.each = function(cb) {
    var it = this.iterator(), data;
    while((data = it.next()) !== null){
        if (cb(data) === false) return;
    }
};
// calls cb on each node's data, in reverse order
$56ab0bd15ef78a11$var$TreeBase.prototype.reach = function(cb) {
    var it = this.iterator(), data;
    while((data = it.prev()) !== null){
        if (cb(data) === false) return;
    }
};
function $56ab0bd15ef78a11$var$Iterator(tree) {
    this._tree = tree;
    this._ancestors = [];
    this._cursor = null;
}
$56ab0bd15ef78a11$var$Iterator.prototype.data = function() {
    return this._cursor !== null ? this._cursor.data : null;
};
// if null-iterator, returns first node
// otherwise, returns next node
$56ab0bd15ef78a11$var$Iterator.prototype.next = function() {
    if (this._cursor === null) {
        var root = this._tree._root;
        if (root !== null) this._minNode(root);
    } else if (this._cursor.right === null) {
        // no greater node in subtree, go up to parent
        // if coming from a right child, continue up the stack
        var save;
        do {
            save = this._cursor;
            if (this._ancestors.length) this._cursor = this._ancestors.pop();
            else {
                this._cursor = null;
                break;
            }
        }while (this._cursor.right === save);
    } else {
        // get the next node from the subtree
        this._ancestors.push(this._cursor);
        this._minNode(this._cursor.right);
    }
    return this._cursor !== null ? this._cursor.data : null;
};
// if null-iterator, returns last node
// otherwise, returns previous node
$56ab0bd15ef78a11$var$Iterator.prototype.prev = function() {
    if (this._cursor === null) {
        var root = this._tree._root;
        if (root !== null) this._maxNode(root);
    } else if (this._cursor.left === null) {
        var save;
        do {
            save = this._cursor;
            if (this._ancestors.length) this._cursor = this._ancestors.pop();
            else {
                this._cursor = null;
                break;
            }
        }while (this._cursor.left === save);
    } else {
        this._ancestors.push(this._cursor);
        this._maxNode(this._cursor.left);
    }
    return this._cursor !== null ? this._cursor.data : null;
};
$56ab0bd15ef78a11$var$Iterator.prototype._minNode = function(start) {
    while(start.left !== null){
        this._ancestors.push(start);
        start = start.left;
    }
    this._cursor = start;
};
$56ab0bd15ef78a11$var$Iterator.prototype._maxNode = function(start) {
    while(start.right !== null){
        this._ancestors.push(start);
        start = start.right;
    }
    this._cursor = start;
};
module.exports = $56ab0bd15ef78a11$var$TreeBase;

});


parcelRequire.register("fqM55", function(module, exports) {

var $7rkCd = parcelRequire("7rkCd");
function $02e62bafea00478f$var$Node(data) {
    this.data = data;
    this.left = null;
    this.right = null;
}
$02e62bafea00478f$var$Node.prototype.get_child = function(dir) {
    return dir ? this.right : this.left;
};
$02e62bafea00478f$var$Node.prototype.set_child = function(dir, val) {
    if (dir) this.right = val;
    else this.left = val;
};
function $02e62bafea00478f$var$BinTree(comparator) {
    this._root = null;
    this._comparator = comparator;
    this.size = 0;
}
$02e62bafea00478f$var$BinTree.prototype = new $7rkCd();
// returns true if inserted, false if duplicate
$02e62bafea00478f$var$BinTree.prototype.insert = function(data) {
    if (this._root === null) {
        // empty tree
        this._root = new $02e62bafea00478f$var$Node(data);
        this.size++;
        return true;
    }
    var dir = 0;
    // setup
    var p = null; // parent
    var node = this._root;
    // search down
    while(true){
        if (node === null) {
            // insert new node at the bottom
            node = new $02e62bafea00478f$var$Node(data);
            p.set_child(dir, node);
            ret = true;
            this.size++;
            return true;
        }
        // stop if found
        if (this._comparator(node.data, data) === 0) return false;
        dir = this._comparator(node.data, data) < 0;
        // update helpers
        p = node;
        node = node.get_child(dir);
    }
};
// returns true if removed, false if not found
$02e62bafea00478f$var$BinTree.prototype.remove = function(data) {
    if (this._root === null) return false;
    var head = new $02e62bafea00478f$var$Node(undefined); // fake tree root
    var node = head;
    node.right = this._root;
    var p = null; // parent
    var found = null; // found item
    var dir = 1;
    while(node.get_child(dir) !== null){
        p = node;
        node = node.get_child(dir);
        var cmp = this._comparator(data, node.data);
        dir = cmp > 0;
        if (cmp === 0) found = node;
    }
    if (found !== null) {
        found.data = node.data;
        p.set_child(p.right === node, node.get_child(node.left === null));
        this._root = head.right;
        this.size--;
        return true;
    } else return false;
};
module.exports = $02e62bafea00478f$var$BinTree;

});

var $c82465d11a9ba8e8$exports = {};


$c82465d11a9ba8e8$exports = {
    RBTree: (parcelRequire("l4AO6")),
    BinTree: (parcelRequire("fqM55"))
};


var $4bca004c7b897765$require$BST = $c82465d11a9ba8e8$exports.RBTree;
//var WebSocket = require('ws')
//variables
ws = new WebSocket("wss://futures.kraken.com/ws/v1");
const $4bca004c7b897765$var$product_id = "PI_ETHUSD";
let $4bca004c7b897765$var$chart;
const $4bca004c7b897765$var$limit = 50;
const $4bca004c7b897765$var$chartBids = document.getElementById("chartBids");
const $4bca004c7b897765$var$chartAsks = document.getElementById("chartAsks");
let $4bca004c7b897765$var$asks = new $4bca004c7b897765$require$BST(function(a, b) {
    return a.key - b.key;
});
let $4bca004c7b897765$var$bids = new $4bca004c7b897765$require$BST(function(a, b) {
    return a.key - b.key;
});
//connect 
ws.onopen = ()=>{
    console.log("Trade WS with Kraken connected");
    setTimeout(function() {
        let request_messageTwo = {
            "event": "subscribe",
            "feed": "book",
            "product_ids": [
                $4bca004c7b897765$var$product_id
            ]
        };
        ws.send(JSON.stringify(request_messageTwo));
    //console.log(JSON.stringify(request_messageTwo))
    }, 3000);
};
//get messages
ws.onmessage = (message)=>{
    let data = JSON.parse(message.data);
    //console.log(data)
    //console.log(Object.keys(data))
    //Object.keys(data)[4]
    if (!data.event) {
        if (Object.values(data)[0] == "book_snapshot") {
            let arrasks = Object.values(data)[6];
            let arrbids = Object.values(data)[5];
            arrasks.forEach((askitem)=>{
                let price1 = parseFloat(Object.values(askitem)[0]);
                let vol = parseFloat(Object.values(askitem)[1]);
                $4bca004c7b897765$var$asks.insert({
                    key: price1,
                    value: vol
                });
            });
            arrbids.forEach((biditem)=>{
                let price2 = parseFloat(Object.values(biditem)[0]);
                let vol = parseFloat(Object.values(biditem)[1]);
                $4bca004c7b897765$var$bids.insert({
                    key: price2,
                    value: vol
                });
            });
            console.log("Initialised Book");
            //console.log(asks, bids);
            if (!$4bca004c7b897765$var$chart) {
                $4bca004c7b897765$var$displayBids();
                $4bca004c7b897765$var$displayAsks();
                console.log("charts disaplyed");
            }
        } else {
            if (Object.values(data)[2] == "sell") $4bca004c7b897765$var$update_book($4bca004c7b897765$var$asks, "ask", data);
            if (Object.values(data)[2] == "buy") $4bca004c7b897765$var$update_book($4bca004c7b897765$var$bids, "bid", data);
        }
    }
};
// Updating Orderbook
function $4bca004c7b897765$var$update_book(tree, side, data) {
    //console.log(data)
    //delete entry if its volume is 0
    //console.log(side, tree.find(parseFloat(Object.values(data)[4])), parseFloat(Object.values(data)[4]))
    if (Object.values(data)[5] == 0) tree.remove({
        key: parseFloat(Object.values(data)[4])
    });
    else {
        // add/update
        //if node exits
        let findkey = tree.find({
            key: parseFloat(Object.values(data)[4])
        });
        if (findkey) {
            tree.remove({
                key: parseFloat(Object.values(data)[4])
            });
            tree.insert({
                key: parseFloat(Object.values(data)[4]),
                value: parseFloat(Object.values(data)[5])
            });
        } else //if it doesnt exit then just insert it
        tree.insert({
            key: parseFloat(Object.values(data)[4]),
            value: parseFloat(Object.values(data)[5])
        });
    //console.log('updated');
    }
    $4bca004c7b897765$var$sort(tree, side);
//console.log(price.slice(0,limit), volume.slice(0,limit))
}
let $4bca004c7b897765$var$price = [];
let $4bca004c7b897765$var$volume = [];
let $4bca004c7b897765$var$toDisplayPrice = [];
let $4bca004c7b897765$var$toDisaplyVolume = [];
function $4bca004c7b897765$var$sort(tree, side) {
    // let arr = tree.toArrayPreOrder()
    $4bca004c7b897765$var$price.length = 0;
    $4bca004c7b897765$var$toDisplayPrice.length = 0;
    $4bca004c7b897765$var$volume.length = 0;
    $4bca004c7b897765$var$toDisaplyVolume.length = 0;
    let max = 0;
    if (side == "ask") {
        var it = tree.iterator(), item;
        while((item = it.next()) !== null){
            $4bca004c7b897765$var$price.push(item.key);
            $4bca004c7b897765$var$volume.push(item.value);
            max++;
            if (max == $4bca004c7b897765$var$limit) break;
        }
    } else {
        var it = tree.iterator(), item;
        while((item = it.prev()) !== null){
            $4bca004c7b897765$var$price.push(item.key);
            $4bca004c7b897765$var$volume.push(item.value);
            max++;
            if (max == $4bca004c7b897765$var$limit) break;
        }
    }
    //console.log(price, volume)
    let start = $4bca004c7b897765$var$price[0];
    $4bca004c7b897765$var$toDisplayPrice.push($4bca004c7b897765$var$price[0]);
    $4bca004c7b897765$var$toDisaplyVolume.push($4bca004c7b897765$var$volume[0]);
    for(let i = 1; i <= $4bca004c7b897765$var$limit; i++){
        if (side == "ask") start = start + 0.05;
        else start = start - 0.05;
        start = Math.floor(start * 100) / 100.0;
        let added = false;
        //console.log('helo')
        /* if(start == price[i]){
            toDisplayPrice.push(price[i]);
            toDisaplyVolume.push(volume[i]);
        }*/ for(let y = 0; y <= $4bca004c7b897765$var$price.length; y++)if (start == $4bca004c7b897765$var$price[y]) {
            $4bca004c7b897765$var$toDisplayPrice.push($4bca004c7b897765$var$price[y]);
            $4bca004c7b897765$var$toDisaplyVolume.push($4bca004c7b897765$var$volume[y]);
            added = true;
        }
        if (!added) {
            $4bca004c7b897765$var$toDisplayPrice.push(start);
            $4bca004c7b897765$var$toDisaplyVolume.push(0);
        }
    }
    //console.log(toDisplayPrice, toDisaplyVolume)
    if (side == "bid") $4bca004c7b897765$var$updateChartBids();
    else if (side == "ask") //console.log(price, volume, toDisplayPrice, toDisaplyVolume)
    $4bca004c7b897765$var$updateChartAsks();
}
function $4bca004c7b897765$var$updateChartBids() {
    chartbids.data.labels = $4bca004c7b897765$var$toDisplayPrice;
    chartbids.data.datasets[0].data = $4bca004c7b897765$var$toDisaplyVolume;
    chartbids.update();
//console.log('update')
}
function $4bca004c7b897765$var$updateChartAsks() {
    chartasks.data.labels = $4bca004c7b897765$var$toDisplayPrice;
    chartasks.data.datasets[0].data = $4bca004c7b897765$var$toDisaplyVolume;
    chartasks.update();
}
function $4bca004c7b897765$var$displayBids() {
    $4bca004c7b897765$var$sort($4bca004c7b897765$var$bids, "bids");
    chartbids = new Chart($4bca004c7b897765$var$chartBids, {
        type: "bar",
        data: {
            labels: $4bca004c7b897765$var$toDisplayPrice,
            datasets: [
                {
                    label: "order size",
                    data: $4bca004c7b897765$var$toDisaplyVolume,
                    borderWidth: 1,
                    backgroundColor: [
                        "rgb(255,0,0)"
                    ]
                }
            ]
        },
        options: {
            normalized: true,
            animation: {
                duration: 0
            },
            y: {
                min: 0,
                max: 200000,
                ticks: {
                    stepSize: 10000
                }
            }
        }
    });
}
function $4bca004c7b897765$var$displayAsks() {
    $4bca004c7b897765$var$sort($4bca004c7b897765$var$asks, "asks");
    chartasks = new Chart($4bca004c7b897765$var$chartAsks, {
        type: "bar",
        data: {
            labels: $4bca004c7b897765$var$toDisplayPrice,
            datasets: [
                {
                    label: "order size",
                    data: $4bca004c7b897765$var$toDisaplyVolume,
                    borderWidth: 1,
                    backgroundColor: [
                        "rgb(0,255,0)"
                    ]
                }
            ]
        },
        options: {
            normalized: true,
            animation: {
                duration: 0
            },
            y: {
                min: 0,
                max: 200000,
                ticks: {
                    stepSize: 10000
                }
            }
        }
    });
} //challenge function for private requests
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


//# sourceMappingURL=index.e7c40e16.js.map
