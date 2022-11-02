/*
(c) 2022 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/



function project_file(filename) {
  const pathname = self.registration.scope;
  return (pathname + filename);
}

function selfActivate(evt) {
  console.log("selfActivate");
  console.log(evt);
  self.registration.addEventListener("updatefound", registrationUpdateFound);
}

function selfFetch(evt) {
  console.log("selfFetch");
  console.log(evt);
  evt.respondWith(createResponse(evt.request));
}

function createResponse(request) {
  if (request.url.startsWith(self.registration.scope + "/pseudo/")) {
    const underlyingSource = {
      start: function (controller) {
        console.log("start");
      },
      pull: function (controller) {
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
    return fetch(request);
  }
}

function selfInstall(evt) {
  console.log("selfInstall");
  console.log(evt);
  self.clients.claim();
  self.skipWaiting()
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
}

function selfMessage(evt) {
  console.log("selfMessage");
  console.log(evt);
}

function selfNotificationClick(evt) {
  console.log("selfNotificationClick");
  console.log(evt);
}

function selfNotificationClose(evt) {
  console.log("selfNotificationClose");
  console.log(evt);
}

function selfPeriodicSync(evt) {
  console.log("selfPeriodicSync");
  console.log(evt);
}

function selfPush(evt) {
  console.log("selfPush");
  console.log(evt);
}

function selfPushSubscriptionChange(evt) {
  console.log("selfPushSubscriptionChange");
  console.log(evt);
}

function selfSync(evt) {
  console.log("selfSync");
  console.log(evt);
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
}

  self.registration.waiting
  self.registration.active
  self.registration.installing
  self.registration.updateViaCache
/*
  self.registration.index
  self.registration.navigationPreload
  self.registration.periodicSync
  self.registration.pushManager
  self.registration.sync
  getNotifications()
  showNotification()
*/
  unregister()
  update()
