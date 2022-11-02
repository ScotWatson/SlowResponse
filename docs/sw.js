/*
(c) 2022 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

"use strict";

function project_file(filename) {
  const pathname = self.registration.scope;
  return (pathname + filename);
}

function selfActivate(evt) {
  try {
    console.log("selfActivate");
    console.log(evt);
    self.registration.addEventListener("updatefound", registrationUpdateFound);
    self.clients.claim();
    self.skipWaiting()
  } catch (e) {
    console.error(e);
  }
}

function selfFetch(evt) {
  try {
    console.log("selfFetch");
    console.log(evt);
    evt.respondWith(createResponse(evt.request));
  } catch (e) {
    console.error(e);
  }
}

async function createResponse(request) {
  const allClients = await self.clients.matchAll();
  const myHost = allClients[0];
  myHost.postMessage("Scope: " + self.registration.scope);
  myHost.postMessage("Request: " + request.url);
  console.log(myHost);
  console.log("Scope: " + self.registration.scope);
  console.log("Request: " + request.url);
  if (request.url.startsWith(self.registration.scope + "/pseudo/")) {
    let i = 0;
    const underlyingSource = {
      start: function (controller) {
        console.log("start");
      },
      pull: function (controller) {
        if (i >= 10) {
          return controller.close();
        }
        console.log("pull");
        const newData = new Uint8Array(4);
        newData[0] = Math.random() * 255;
        newData[1] = Math.random() * 255;
        newData[2] = Math.random() * 255;
        newData[3] = Math.random() * 255;
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            controller.enqueue(newData);
            resolve();
          }, 500);
        });
        ++i;
      },
      cancel: function (controller) {
        console.log("cancel");
        return controller.close();
      },
      type: "bytes",
      autoAllocateChunkSize: 1,
    };
    const bodyStream = new ReadableStream(underlyingSource);
    return new Response(bodyStream, {
      status: 200,
      statusText: "OK",
      headers: {},
    });
  } else {
    return await fetch(request);
  }
}

function selfInstall(evt) {
  try {
    console.log("selfInstall");
    console.log(evt);
    /*
    function addCaches(cache) {
      console.log("sw.js: Start Adding Caches");
      cache.addAll([
        project_file(""),
        project_file("index.html"),
        project_file("index.js"),
        project_file("worker_api.js"),
        project_file("style.css"),
      ])
      console.log("sw.js: End Adding Caches");
    }
    evt.waitUntil(caches.open("store").then(addCaches));
    */
    self.registration.addEventListener("updatefound", registrationUpdateFound);
  } catch (e) {
    console.error(e);
  }
}

function selfMessage(evt) {
  try {
    console.log("selfMessage");
    console.log(evt);
  } catch (e) {
    console.error(e);
  }
}

function selfNotificationClick(evt) {
  try {
    console.log("selfNotificationClick");
    console.log(evt);
  } catch (e) {
    console.error(e);
  }
}

function selfNotificationClose(evt) {
  try {
    console.log("selfNotificationClose");
    console.log(evt);
  } catch (e) {
    console.error(e);
  }
}

function selfPeriodicSync(evt) {
  try {
    console.log("selfPeriodicSync");
    console.log(evt);
  } catch (e) {
    console.error(e);
  }
}

function selfPush(evt) {
  try {
    console.log("selfPush");
    console.log(evt);
  } catch (e) {
    console.error(e);
  }
}

function selfPushSubscriptionChange(evt) {
  try {
    console.log("selfPushSubscriptionChange");
    console.log(evt);
  } catch (e) {
    console.error(e);
  }
}

function selfSync(evt) {
  try {
    console.log("selfSync");
    console.log(evt);
  } catch (e) {
    console.error(e);
  }
}

self.addEventListener("activate", selfActivate);
self.addEventListener("fetch", selfFetch);
self.addEventListener("install", selfInstall);
self.addEventListener("message", selfMessage);
self.addEventListener("notificationclick", selfNotificationClick);
self.addEventListener("notificationclose", selfNotificationClose);
self.addEventListener("periodicsync", selfPeriodicSync);
self.addEventListener("push", selfPush);
self.addEventListener("pushsubscriptionchange", selfPushSubscriptionChange);
self.addEventListener("sync", selfSync);

function registrationUpdateFound() {
  try {
    console.log("self.registration.waiting");
    console.log(self.registration.waiting);
    console.log("self.registration.active");
    console.log(self.registration.active);
    console.log("self.registration.installing");
    console.log(self.registration.installing);
    console.log("self.registration.updateViaCache");
    console.log(self.registration.updateViaCache);
  } catch (e) {
    console.error(e);
  }
}

/*
  self.registration.index
  self.registration.navigationPreload
  self.registration.periodicSync
  self.registration.pushManager
  self.registration.sync
  getNotifications()
  showNotification()
*/
//  unregister()
//  update()
