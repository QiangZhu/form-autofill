// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.



function radioOnClick(info, tab) {
    console.log("radio item " + info.menuItemId +
        " was clicked (previous checked state was " +
        info.wasChecked + ")");

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: info.menuItemId}, function(response) {
          console.log(" received autofill response: "+ response.action);
        });
    });

}

var radio1 = chrome.contextMenus.create({
    "id": "copy",
    "title": "复制",
    "type": "radio",
    "onclick": radioOnClick
});
var radio2 = chrome.contextMenus.create({
    "id": "paste",
    "title": "粘贴",
    "type": "radio",
    "onclick": radioOnClick
});

console.log("radio1:" + radio1 + " radio2:" + radio2);