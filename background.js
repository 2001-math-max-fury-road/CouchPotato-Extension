"use strict";

chrome.runtime.onInstalled.addListener(function(details) {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              hostEquals: "www.hulu.com",
              pathPrefix: "/watch/",
              schemes: ["http", "https"]
            }
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              hostEquals: "www.hulu.com",
              schemes: ["http", "https"]
            }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

chrome.runtime.onMessage.addListener(data => {
  if (data.type === "notification") {
    chrome.notifications.create("", data.options);
  }
});
