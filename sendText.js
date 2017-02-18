function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);
  });
}


// function send_request (url) {
//   // post_addr = 'https://script.google.com/macros/s/AKfycbzuPdxAC6skgnpxjG38IX0dAF-nJY3pmoEL9ILcpOc/dev'
//   // $.post(post_addr, {docName = 'doc_name', text = 'hightlight_text', url = 'url'},      
//   //     function(data) {
//   //         renderStatus('good');
//   //       }
//   //   ).fail(
//   //     function () {
//   //         renderStatus('bad');
//   //       }
//   //   );
//   document.getElementById('do-count').onclick = count;
// }
// document.addEventListener('window.onload', function() {
//   send_request('http://test.com');
// }
// document.onreadystatechange = getCurrentTabUrl(send_request);

function updateDocName() {
  var newDocName = document.getElementById('name').value
  chrome.storage.sync.set({"currDocName": newDocName})
  chrome.contextMenus.removeAll();

  // chrome.storage.sync.get("currDocName", function(currDocName){
  //   if (newDocName === currDocName) return;
  //   chrome.contextMenus.removeAll();
  //   chrome.storage.sync.set({"currDocName": newDocName})
  // });
  chrome.contextMenus.create({
        title: "Add text to " + newDocName,
        contexts: ["selection"],
        onclick: function(info, tab) {
          count(info.selectionText)
        }
  });
}

function count(inputText) {
    console.log("in count")
    chrome.storage.sync.get("currDocName", function(doc){
    console.log(doc)
    console.log(inputText)
    getCurrentTabUrl( function(tabUrl) {
      post_addr = 'https://script.google.com/macros/s/AKfycbyufvSw3_I_TydtUPNUS5Hq8J5RtqZMtzj4p52QQJnLw9Fw7vI/exec'
      $.get(post_addr, {docName : doc.currDocName, text : inputText, url : tabUrl},      
        function(data) {
          console.log('good get request');
        }
      ).fail(
        function () {
          console.log('failed get');
        }
      );
    });
  });
}

document.getElementById("mybutton").addEventListener("click", updateDocName);

// chrome.contextMenus.create({
//     chrome.storage.sync.get("docName", function(doc){
//     docName = doc.docName

//     title: "Simple Annotate", 
//     contexts:["selection"], 
//     onclick: function(info, tab) {
//         count(info.selectionText);
//     }
//   }
// });

//document.getElementById('submit').onclick = updateDocName;




