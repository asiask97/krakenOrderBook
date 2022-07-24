// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"MYun":[function(require,module,exports) {

function TreeBase() {}

// removes all nodes from the tree
TreeBase.prototype.clear = function() {
    this._root = null;
    this.size = 0;
};

// returns node data if found, null otherwise
TreeBase.prototype.find = function(data) {
    var res = this._root;

    while(res !== null) {
        var c = this._comparator(data, res.data);
        if(c === 0) {
            return res.data;
        }
        else {
            res = res.get_child(c > 0);
        }
    }

    return null;
};

// returns iterator to node if found, null otherwise
TreeBase.prototype.findIter = function(data) {
    var res = this._root;
    var iter = this.iterator();

    while(res !== null) {
        var c = this._comparator(data, res.data);
        if(c === 0) {
            iter._cursor = res;
            return iter;
        }
        else {
            iter._ancestors.push(res);
            res = res.get_child(c > 0);
        }
    }

    return null;
};

// Returns an iterator to the tree node at or immediately after the item
TreeBase.prototype.lowerBound = function(item) {
    var cur = this._root;
    var iter = this.iterator();
    var cmp = this._comparator;

    while(cur !== null) {
        var c = cmp(item, cur.data);
        if(c === 0) {
            iter._cursor = cur;
            return iter;
        }
        iter._ancestors.push(cur);
        cur = cur.get_child(c > 0);
    }

    for(var i=iter._ancestors.length - 1; i >= 0; --i) {
        cur = iter._ancestors[i];
        if(cmp(item, cur.data) < 0) {
            iter._cursor = cur;
            iter._ancestors.length = i;
            return iter;
        }
    }

    iter._ancestors.length = 0;
    return iter;
};

// Returns an iterator to the tree node immediately after the item
TreeBase.prototype.upperBound = function(item) {
    var iter = this.lowerBound(item);
    var cmp = this._comparator;

    while(iter.data() !== null && cmp(iter.data(), item) === 0) {
        iter.next();
    }

    return iter;
};

// returns null if tree is empty
TreeBase.prototype.min = function() {
    var res = this._root;
    if(res === null) {
        return null;
    }

    while(res.left !== null) {
        res = res.left;
    }

    return res.data;
};

// returns null if tree is empty
TreeBase.prototype.max = function() {
    var res = this._root;
    if(res === null) {
        return null;
    }

    while(res.right !== null) {
        res = res.right;
    }

    return res.data;
};

// returns a null iterator
// call next() or prev() to point to an element
TreeBase.prototype.iterator = function() {
    return new Iterator(this);
};

// calls cb on each node's data, in order
TreeBase.prototype.each = function(cb) {
    var it=this.iterator(), data;
    while((data = it.next()) !== null) {
        if(cb(data) === false) {
            return;
        }
    }
};

// calls cb on each node's data, in reverse order
TreeBase.prototype.reach = function(cb) {
    var it=this.iterator(), data;
    while((data = it.prev()) !== null) {
        if(cb(data) === false) {
            return;
        }
    }
};


function Iterator(tree) {
    this._tree = tree;
    this._ancestors = [];
    this._cursor = null;
}

Iterator.prototype.data = function() {
    return this._cursor !== null ? this._cursor.data : null;
};

// if null-iterator, returns first node
// otherwise, returns next node
Iterator.prototype.next = function() {
    if(this._cursor === null) {
        var root = this._tree._root;
        if(root !== null) {
            this._minNode(root);
        }
    }
    else {
        if(this._cursor.right === null) {
            // no greater node in subtree, go up to parent
            // if coming from a right child, continue up the stack
            var save;
            do {
                save = this._cursor;
                if(this._ancestors.length) {
                    this._cursor = this._ancestors.pop();
                }
                else {
                    this._cursor = null;
                    break;
                }
            } while(this._cursor.right === save);
        }
        else {
            // get the next node from the subtree
            this._ancestors.push(this._cursor);
            this._minNode(this._cursor.right);
        }
    }
    return this._cursor !== null ? this._cursor.data : null;
};

// if null-iterator, returns last node
// otherwise, returns previous node
Iterator.prototype.prev = function() {
    if(this._cursor === null) {
        var root = this._tree._root;
        if(root !== null) {
            this._maxNode(root);
        }
    }
    else {
        if(this._cursor.left === null) {
            var save;
            do {
                save = this._cursor;
                if(this._ancestors.length) {
                    this._cursor = this._ancestors.pop();
                }
                else {
                    this._cursor = null;
                    break;
                }
            } while(this._cursor.left === save);
        }
        else {
            this._ancestors.push(this._cursor);
            this._maxNode(this._cursor.left);
        }
    }
    return this._cursor !== null ? this._cursor.data : null;
};

Iterator.prototype._minNode = function(start) {
    while(start.left !== null) {
        this._ancestors.push(start);
        start = start.left;
    }
    this._cursor = start;
};

Iterator.prototype._maxNode = function(start) {
    while(start.right !== null) {
        this._ancestors.push(start);
        start = start.right;
    }
    this._cursor = start;
};

module.exports = TreeBase;


},{}],"cG43":[function(require,module,exports) {

var TreeBase = require('./treebase');

function Node(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.red = true;
}

Node.prototype.get_child = function(dir) {
    return dir ? this.right : this.left;
};

Node.prototype.set_child = function(dir, val) {
    if(dir) {
        this.right = val;
    }
    else {
        this.left = val;
    }
};

function RBTree(comparator) {
    this._root = null;
    this._comparator = comparator;
    this.size = 0;
}

RBTree.prototype = new TreeBase();

// returns true if inserted, false if duplicate
RBTree.prototype.insert = function(data) {
    var ret = false;

    if(this._root === null) {
        // empty tree
        this._root = new Node(data);
        ret = true;
        this.size++;
    }
    else {
        var head = new Node(undefined); // fake tree root

        var dir = 0;
        var last = 0;

        // setup
        var gp = null; // grandparent
        var ggp = head; // grand-grand-parent
        var p = null; // parent
        var node = this._root;
        ggp.right = this._root;

        // search down
        while(true) {
            if(node === null) {
                // insert new node at the bottom
                node = new Node(data);
                p.set_child(dir, node);
                ret = true;
                this.size++;
            }
            else if(is_red(node.left) && is_red(node.right)) {
                // color flip
                node.red = true;
                node.left.red = false;
                node.right.red = false;
            }

            // fix red violation
            if(is_red(node) && is_red(p)) {
                var dir2 = ggp.right === gp;

                if(node === p.get_child(last)) {
                    ggp.set_child(dir2, single_rotate(gp, !last));
                }
                else {
                    ggp.set_child(dir2, double_rotate(gp, !last));
                }
            }

            var cmp = this._comparator(node.data, data);

            // stop if found
            if(cmp === 0) {
                break;
            }

            last = dir;
            dir = cmp < 0;

            // update helpers
            if(gp !== null) {
                ggp = gp;
            }
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
RBTree.prototype.remove = function(data) {
    if(this._root === null) {
        return false;
    }

    var head = new Node(undefined); // fake tree root
    var node = head;
    node.right = this._root;
    var p = null; // parent
    var gp = null; // grand parent
    var found = null; // found item
    var dir = 1;

    while(node.get_child(dir) !== null) {
        var last = dir;

        // update helpers
        gp = p;
        p = node;
        node = node.get_child(dir);

        var cmp = this._comparator(data, node.data);

        dir = cmp > 0;

        // save found node
        if(cmp === 0) {
            found = node;
        }

        // push the red node down
        if(!is_red(node) && !is_red(node.get_child(dir))) {
            if(is_red(node.get_child(!dir))) {
                var sr = single_rotate(node, dir);
                p.set_child(last, sr);
                p = sr;
            }
            else if(!is_red(node.get_child(!dir))) {
                var sibling = p.get_child(!last);
                if(sibling !== null) {
                    if(!is_red(sibling.get_child(!last)) && !is_red(sibling.get_child(last))) {
                        // color flip
                        p.red = false;
                        sibling.red = true;
                        node.red = true;
                    }
                    else {
                        var dir2 = gp.right === p;

                        if(is_red(sibling.get_child(last))) {
                            gp.set_child(dir2, double_rotate(p, last));
                        }
                        else if(is_red(sibling.get_child(!last))) {
                            gp.set_child(dir2, single_rotate(p, last));
                        }

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
    if(found !== null) {
        found.data = node.data;
        p.set_child(p.right === node, node.get_child(node.left === null));
        this.size--;
    }

    // update root and make it black
    this._root = head.right;
    if(this._root !== null) {
        this._root.red = false;
    }

    return found !== null;
};

function is_red(node) {
    return node !== null && node.red;
}

function single_rotate(root, dir) {
    var save = root.get_child(!dir);

    root.set_child(!dir, save.get_child(dir));
    save.set_child(dir, root);

    root.red = true;
    save.red = false;

    return save;
}

function double_rotate(root, dir) {
    root.set_child(!dir, single_rotate(root.get_child(!dir), !dir));
    return single_rotate(root, dir);
}

module.exports = RBTree;

},{"./treebase":"MYun"}],"KQdR":[function(require,module,exports) {

var TreeBase = require('./treebase');

function Node(data) {
    this.data = data;
    this.left = null;
    this.right = null;
}

Node.prototype.get_child = function(dir) {
    return dir ? this.right : this.left;
};

Node.prototype.set_child = function(dir, val) {
    if(dir) {
        this.right = val;
    }
    else {
        this.left = val;
    }
};

function BinTree(comparator) {
    this._root = null;
    this._comparator = comparator;
    this.size = 0;
}

BinTree.prototype = new TreeBase();

// returns true if inserted, false if duplicate
BinTree.prototype.insert = function(data) {
    if(this._root === null) {
        // empty tree
        this._root = new Node(data);
        this.size++;
        return true;
    }

    var dir = 0;

    // setup
    var p = null; // parent
    var node = this._root;

    // search down
    while(true) {
        if(node === null) {
            // insert new node at the bottom
            node = new Node(data);
            p.set_child(dir, node);
            ret = true;
            this.size++;
            return true;
        }

        // stop if found
        if(this._comparator(node.data, data) === 0) {
            return false;
        }

        dir = this._comparator(node.data, data) < 0;

        // update helpers
        p = node;
        node = node.get_child(dir);
    }
};

// returns true if removed, false if not found
BinTree.prototype.remove = function(data) {
    if(this._root === null) {
        return false;
    }

    var head = new Node(undefined); // fake tree root
    var node = head;
    node.right = this._root;
    var p = null; // parent
    var found = null; // found item
    var dir = 1;

    while(node.get_child(dir) !== null) {
        p = node;
        node = node.get_child(dir);
        var cmp = this._comparator(data, node.data);
        dir = cmp > 0;

        if(cmp === 0) {
            found = node;
        }
    }

    if(found !== null) {
        found.data = node.data;
        p.set_child(p.right === node, node.get_child(node.left === null));

        this._root = head.right;
        this.size--;
        return true;
    }
    else {
        return false;
    }
};

module.exports = BinTree;


},{"./treebase":"MYun"}],"Aksv":[function(require,module,exports) {
module.exports = {
    RBTree: require('./lib/rbtree'),
    BinTree: require('./lib/bintree')
};

},{"./lib/rbtree":"cG43","./lib/bintree":"KQdR"}],"L4bL":[function(require,module,exports) {
//var BST = require('binarysearch-tree')
//import BST from "red-black-tree-js"
var BST = require('bintrees').RBTree; //variables


ws = new WebSocket('wss://futures.kraken.com/ws/v1');
var product_id = "PI_ETHUSD";
var chart;
var limit = 50;
var chartBids = document.getElementById('chartBids');
var chartAsks = document.getElementById('chartAsks');
var asks = new BST(function (a, b) {
  return a.key - b.key;
});
var bids = new BST(function (a, b) {
  return a.key - b.key;
}); //connect 

ws.onopen = function () {
  console.log('Trade WS with Kraken connected');
  setTimeout(function () {
    var request_messageTwo = {
      "event": "subscribe",
      "feed": 'book',
      "product_ids": [product_id]
    };
    ws.send(JSON.stringify(request_messageTwo)); //console.log(JSON.stringify(request_messageTwo))
  }, 3000);
}; //get messages


ws.onmessage = function (message) {
  var data = JSON.parse(message.data); //console.log(data)
  //console.log(Object.keys(data))
  //Object.keys(data)[4]

  if (!data.event) {
    if (Object.values(data)[0] == 'book_snapshot') {
      var arrasks = Object.values(data)[6];
      var arrbids = Object.values(data)[5];
      arrasks.forEach(function (askitem) {
        var price = parseFloat(Object.values(askitem)[0]);
        var vol = parseFloat(Object.values(askitem)[1]);
        asks.insert({
          key: price,
          value: vol
        });
      });
      arrbids.forEach(function (biditem) {
        var price = parseFloat(Object.values(biditem)[0]);
        var vol = parseFloat(Object.values(biditem)[1]);
        bids.insert({
          key: price,
          value: vol
        });
      });
      console.log('Initialised Book'); //console.log(asks, bids);

      if (!chart) {
        displayBids();
        displayAsks();
        console.log('charts disaplyed');
      }
    } else {
      if (Object.values(data)[2] == 'sell') {
        update_book(asks, 'ask', data);
      }

      if (Object.values(data)[2] == 'buy') {
        update_book(bids, 'bid', data);
      }
    }
  }
}; // Updating Orderbook


function update_book(tree, side, data) {
  //console.log(data)
  //delete entry if its volume is 0
  //console.log(side, tree.find(parseFloat(Object.values(data)[4])), parseFloat(Object.values(data)[4]))
  if (Object.values(data)[5] == 0) {
    tree.remove({
      key: parseFloat(Object.values(data)[4])
    });
  } else {
    // add/update
    //if node exits
    var findkey = tree.find({
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
    } else {
      //if it doesnt exit then just insert it
      tree.insert({
        key: parseFloat(Object.values(data)[4]),
        value: parseFloat(Object.values(data)[5])
      });
    } //console.log('updated');

  }

  sort(tree, side); //console.log(price.slice(0,limit), volume.slice(0,limit))
}

var price = [];
var volume = [];
var toDisplayPrice = [];
var toDisaplyVolume = [];

function sort(tree, side) {
  // let arr = tree.toArrayPreOrder()
  price.length = 0;
  toDisplayPrice.length = 0;
  volume.length = 0;
  toDisaplyVolume.length = 0;
  var max = 0;

  if (side == 'ask') {
    var it = tree.iterator(),
        item;

    while ((item = it.next()) !== null) {
      price.push(item.key);
      volume.push(item.value);
      max++;

      if (max == limit) {
        break;
      }
    }
  } else {
    var it = tree.iterator(),
        item;

    while ((item = it.prev()) !== null) {
      price.push(item.key);
      volume.push(item.value);
      max++;

      if (max == limit) {
        break;
      }
    }
  } //console.log(price, volume)


  var start = price[0];
  toDisplayPrice.push(price[0]);
  toDisaplyVolume.push(volume[0]);

  for (var i = 1; i <= limit; i++) {
    if (side == 'ask') {
      start = start + 0.05;
    } else {
      start = start - 0.05;
    }

    start = Math.floor(start * 100) / 100.0;
    var added = false; //console.log('helo')

    /* if(start == price[i]){
         toDisplayPrice.push(price[i]);
         toDisaplyVolume.push(volume[i]);
     }*/

    for (var y = 0; y <= price.length; y++) {
      if (start == price[y]) {
        toDisplayPrice.push(price[y]);
        toDisaplyVolume.push(volume[y]);
        added = true;
      }
    }

    if (!added) {
      toDisplayPrice.push(start);
      toDisaplyVolume.push(0);
    }
  } //console.log(toDisplayPrice, toDisaplyVolume)


  if (side == 'bid') updateChartBids();else if (side == 'ask') {
    //console.log(price, volume, toDisplayPrice, toDisaplyVolume)
    updateChartAsks();
  }
}

function updateChartBids() {
  chartbids.data.labels = toDisplayPrice;
  chartbids.data.datasets[0].data = toDisaplyVolume;
  chartbids.update(); //console.log('update')
}

function updateChartAsks() {
  chartasks.data.labels = toDisplayPrice;
  chartasks.data.datasets[0].data = toDisaplyVolume;
  chartasks.update();
}

function displayBids() {
  sort(bids, 'bids');
  chartbids = new Chart(chartBids, {
    type: 'bar',
    data: {
      labels: toDisplayPrice,
      datasets: [{
        label: 'order size',
        data: toDisaplyVolume,
        borderWidth: 1,
        backgroundColor: ['rgb(255,0,0)']
      }]
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

function displayAsks() {
  sort(asks, 'asks');
  chartasks = new Chart(chartAsks, {
    type: 'bar',
    data: {
      labels: toDisplayPrice,
      datasets: [{
        label: 'order size',
        data: toDisaplyVolume,
        borderWidth: 1,
        backgroundColor: ['rgb(0,255,0)']
      }]
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
},{"bintrees":"Aksv"}]},{},["L4bL"], null)
//# sourceMappingURL=https://github.com/asiask97/krakenOrderBook/script.dcb8a9fb.js.map