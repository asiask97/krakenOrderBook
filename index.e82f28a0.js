// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"eZyLq":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "207a8fdfe82f28a0";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id1][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"dV6cC":[function(require,module,exports) {
//var BST = require('binarysearch-tree')
//import BST from "red-black-tree-js"
var BST = require("bintrees").RBTree;
//var WebSocket = require('ws')
//variables
ws = new WebSocket("wss://futures.kraken.com/ws/v1");
const product_id = "PI_ETHUSD";
let chart;
const limit = 50;
const chartBids = document.getElementById("chartBids");
const chartAsks = document.getElementById("chartAsks");
let asks = new BST(function(a, b) {
    return a.key - b.key;
});
let bids = new BST(function(a, b) {
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
                product_id
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
                asks.insert({
                    key: price1,
                    value: vol
                });
            });
            arrbids.forEach((biditem)=>{
                let price2 = parseFloat(Object.values(biditem)[0]);
                let vol = parseFloat(Object.values(biditem)[1]);
                bids.insert({
                    key: price2,
                    value: vol
                });
            });
            console.log("Initialised Book");
            //console.log(asks, bids);
            if (!chart) {
                displayBids();
                displayAsks();
                console.log("charts disaplyed");
            }
        } else {
            if (Object.values(data)[2] == "sell") update_book(asks, "ask", data);
            if (Object.values(data)[2] == "buy") update_book(bids, "bid", data);
        }
    }
};
// Updating Orderbook
function update_book(tree, side, data) {
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
    sort(tree, side);
//console.log(price.slice(0,limit), volume.slice(0,limit))
}
let price = [];
let volume = [];
let toDisplayPrice = [];
let toDisaplyVolume = [];
function sort(tree, side) {
    // let arr = tree.toArrayPreOrder()
    price.length = 0;
    toDisplayPrice.length = 0;
    volume.length = 0;
    toDisaplyVolume.length = 0;
    let max = 0;
    if (side == "ask") {
        var it = tree.iterator(), item;
        while((item = it.next()) !== null){
            price.push(item.key);
            volume.push(item.value);
            max++;
            if (max == limit) break;
        }
    } else {
        var it = tree.iterator(), item;
        while((item = it.prev()) !== null){
            price.push(item.key);
            volume.push(item.value);
            max++;
            if (max == limit) break;
        }
    }
    //console.log(price, volume)
    let start = price[0];
    toDisplayPrice.push(price[0]);
    toDisaplyVolume.push(volume[0]);
    for(let i = 1; i <= limit; i++){
        if (side == "ask") start = start + 0.05;
        else start = start - 0.05;
        start = Math.floor(start * 100) / 100.0;
        let added = false;
        //console.log('helo')
        /* if(start == price[i]){
            toDisplayPrice.push(price[i]);
            toDisaplyVolume.push(volume[i]);
        }*/ for(let y = 0; y <= price.length; y++)if (start == price[y]) {
            toDisplayPrice.push(price[y]);
            toDisaplyVolume.push(volume[y]);
            added = true;
        }
        if (!added) {
            toDisplayPrice.push(start);
            toDisaplyVolume.push(0);
        }
    }
    //console.log(toDisplayPrice, toDisaplyVolume)
    if (side == "bid") updateChartBids();
    else if (side == "ask") //console.log(price, volume, toDisplayPrice, toDisaplyVolume)
    updateChartAsks();
}
function updateChartBids() {
    chartbids.data.labels = toDisplayPrice;
    chartbids.data.datasets[0].data = toDisaplyVolume;
    chartbids.update();
//console.log('update')
}
function updateChartAsks() {
    chartasks.data.labels = toDisplayPrice;
    chartasks.data.datasets[0].data = toDisaplyVolume;
    chartasks.update();
}
function displayBids() {
    sort(bids, "bids");
    chartbids = new Chart(chartBids, {
        type: "bar",
        data: {
            labels: toDisplayPrice,
            datasets: [
                {
                    label: "order size",
                    data: toDisaplyVolume,
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
function displayAsks() {
    sort(asks, "asks");
    chartasks = new Chart(chartAsks, {
        type: "bar",
        data: {
            labels: toDisplayPrice,
            datasets: [
                {
                    label: "order size",
                    data: toDisaplyVolume,
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

},{"bintrees":"9Hiqi"}],"9Hiqi":[function(require,module,exports) {
module.exports = {
    RBTree: require("./lib/rbtree"),
    BinTree: require("./lib/bintree")
};

},{"./lib/rbtree":"f70pG","./lib/bintree":"g26p6"}],"f70pG":[function(require,module,exports) {
var TreeBase = require("./treebase");
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
    if (dir) this.right = val;
    else this.left = val;
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
    if (this._root === null) {
        // empty tree
        this._root = new Node(data);
        ret = true;
        this.size++;
    } else {
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
        while(true){
            if (node === null) {
                // insert new node at the bottom
                node = new Node(data);
                p.set_child(dir, node);
                ret = true;
                this.size++;
            } else if (is_red(node.left) && is_red(node.right)) {
                // color flip
                node.red = true;
                node.left.red = false;
                node.right.red = false;
            }
            // fix red violation
            if (is_red(node) && is_red(p)) {
                var dir2 = ggp.right === gp;
                if (node === p.get_child(last)) ggp.set_child(dir2, single_rotate(gp, !last));
                else ggp.set_child(dir2, double_rotate(gp, !last));
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
RBTree.prototype.remove = function(data) {
    if (this._root === null) return false;
    var head = new Node(undefined); // fake tree root
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
        if (!is_red(node) && !is_red(node.get_child(dir))) {
            if (is_red(node.get_child(!dir))) {
                var sr = single_rotate(node, dir);
                p.set_child(last, sr);
                p = sr;
            } else if (!is_red(node.get_child(!dir))) {
                var sibling = p.get_child(!last);
                if (sibling !== null) {
                    if (!is_red(sibling.get_child(!last)) && !is_red(sibling.get_child(last))) {
                        // color flip
                        p.red = false;
                        sibling.red = true;
                        node.red = true;
                    } else {
                        var dir2 = gp.right === p;
                        if (is_red(sibling.get_child(last))) gp.set_child(dir2, double_rotate(p, last));
                        else if (is_red(sibling.get_child(!last))) gp.set_child(dir2, single_rotate(p, last));
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

},{"./treebase":"dTcSb"}],"dTcSb":[function(require,module,exports) {
function TreeBase() {}
// removes all nodes from the tree
TreeBase.prototype.clear = function() {
    this._root = null;
    this.size = 0;
};
// returns node data if found, null otherwise
TreeBase.prototype.find = function(data) {
    var res = this._root;
    while(res !== null){
        var c = this._comparator(data, res.data);
        if (c === 0) return res.data;
        else res = res.get_child(c > 0);
    }
    return null;
};
// returns iterator to node if found, null otherwise
TreeBase.prototype.findIter = function(data) {
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
TreeBase.prototype.lowerBound = function(item) {
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
TreeBase.prototype.upperBound = function(item) {
    var iter = this.lowerBound(item);
    var cmp = this._comparator;
    while(iter.data() !== null && cmp(iter.data(), item) === 0)iter.next();
    return iter;
};
// returns null if tree is empty
TreeBase.prototype.min = function() {
    var res = this._root;
    if (res === null) return null;
    while(res.left !== null)res = res.left;
    return res.data;
};
// returns null if tree is empty
TreeBase.prototype.max = function() {
    var res = this._root;
    if (res === null) return null;
    while(res.right !== null)res = res.right;
    return res.data;
};
// returns a null iterator
// call next() or prev() to point to an element
TreeBase.prototype.iterator = function() {
    return new Iterator(this);
};
// calls cb on each node's data, in order
TreeBase.prototype.each = function(cb) {
    var it = this.iterator(), data;
    while((data = it.next()) !== null){
        if (cb(data) === false) return;
    }
};
// calls cb on each node's data, in reverse order
TreeBase.prototype.reach = function(cb) {
    var it = this.iterator(), data;
    while((data = it.prev()) !== null){
        if (cb(data) === false) return;
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
Iterator.prototype.prev = function() {
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
Iterator.prototype._minNode = function(start) {
    while(start.left !== null){
        this._ancestors.push(start);
        start = start.left;
    }
    this._cursor = start;
};
Iterator.prototype._maxNode = function(start) {
    while(start.right !== null){
        this._ancestors.push(start);
        start = start.right;
    }
    this._cursor = start;
};
module.exports = TreeBase;

},{}],"g26p6":[function(require,module,exports) {
var TreeBase = require("./treebase");
function Node(data) {
    this.data = data;
    this.left = null;
    this.right = null;
}
Node.prototype.get_child = function(dir) {
    return dir ? this.right : this.left;
};
Node.prototype.set_child = function(dir, val) {
    if (dir) this.right = val;
    else this.left = val;
};
function BinTree(comparator) {
    this._root = null;
    this._comparator = comparator;
    this.size = 0;
}
BinTree.prototype = new TreeBase();
// returns true if inserted, false if duplicate
BinTree.prototype.insert = function(data) {
    if (this._root === null) {
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
    while(true){
        if (node === null) {
            // insert new node at the bottom
            node = new Node(data);
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
BinTree.prototype.remove = function(data) {
    if (this._root === null) return false;
    var head = new Node(undefined); // fake tree root
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
module.exports = BinTree;

},{"./treebase":"dTcSb"}]},["eZyLq","dV6cC"], "dV6cC", "parcelRequirece02")

//# sourceMappingURL=index.e82f28a0.js.map
