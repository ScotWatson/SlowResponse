/*
(c) 2022 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

"use strict";

const initPageTime = performance.now();

const loadWindow = new Promise(function (resolve, reject) {
  window.addEventListener("load", function (evt) {
    resolve(evt);
  });
});

const loadErrorLogModule = (async function () {
  try {
    const module = await import("https://scotwatson.github.io/Debug/ErrorLog.mjs");
    return module;
  } catch (e) {
    console.error(e);
  }
})();

const startServiceWorker = (async function () {
  if (!("serviceWorker" in navigator)) {
    throw new Error("Service Workers are not supported");
  }
  await navigator.serviceWorker.register("sw.js");
  return await navigator.serviceWorker.ready();
})();

(async function () {
  try {
    const modules = await Promise.all( [ loadWindow, loadErrorLogModule, startServiceWorker ] );
    start(modules);
  } catch (e) {
    console.error(e);
  }
})();

async function start( [ evtWindow, ErrorLog, myServiceWorkerRegistration ] ) {
  try {
    navigator.serviceWorker.addEventListener("message", function (evt) {
      console.log("sw.js: " + evt.data);
    });
    const btnGetData = document.createElement("button");
    btnGetData.innerHTML = "Get Data";
    btnGetData.addEventListener("click", function () {
      getData();
    })
    document.body.appendChild(btnGetData);
  } catch (e) {
    ErrorLog.rethrow({
      functionName: "start",
      error: e,
    });
  }
  async function getData() {
    const testResponse = await fetch("https://scotwatson.github.io/SlowResponse/pseudo/");
    const bodyReader = testResponse.body.getReader({
      mode: "byob",
    });
    let view;
    let result = {
      done: false,
    };
    while (!(result.done)) {
      view = new Uint8Array(4);
      result = await bodyReader.read(view);
      console.log(result.value);
    }
    console.log("Done.");
  }
}
