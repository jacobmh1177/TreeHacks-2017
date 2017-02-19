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

function updateDocName() {
  var newDocName = document.getElementById('doc_name').value
  chrome.storage.sync.set({"currDocName": newDocName});
  chrome.contextMenus.update("annotationMenu", {
    title: "Add text to " + newDocName
  });
  chrome.storage.sync.get("recentDocs", function (doc) {
    if (doc.recentDocs == null) doc.recentDocs = [];
    console.log(doc.recentDocs);
    if (doc.recentDocs.length >= 5) {
      doc.recentDocs.shift();
    }
    doc.recentDocs.push(newDocName);
    chrome.storage.sync.set({"recentDocs" : doc.recentDocs});
  });
}

function addTextToDoc(info, tab) {
  console.log("here");
  var inputText = info.selectionText
  chrome.storage.sync.get("currDocName", function(doc){
  getCurrentTabUrl( function(tabUrl) {
    post_addr = 'https://script.google.com/macros/s/AKfycbyufvSw3_I_TydtUPNUS5Hq8J5RtqZMtzj4p52QQJnLw9Fw7vI/exec'
    $.get(post_addr, {docName : doc.currDocName, text : inputText, url : tabUrl},
      function(data) {}).fail(function () {});
    });
  });
}

//_______________________________ MAIN _______________________________\\

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.get("currDocName", function(doc){
    if (doc.currDocName == null) doc.currDocName = "New Document";
    chrome.contextMenus.create({
      id: "annotationMenu",
      title: "Add text to " + doc.currDocName,
      contexts: ["selection"],
      onclick: addTextToDoc,
    });
  })
});

document.getElementById("mybutton").addEventListener("click", updateDocName);
var name_field = document.getElementById('doc_name');
chrome.storage.sync.get("currDocName", function(doc){
  if (!doc.currDocName) {
    doc.currDocName = 'New Document'
  }
  name_field.value = doc.currDocName
});
// chrome.storage.sync.get("recentDocs", function(doc){
//   var elem = document.getElementById("curr_val");
//   for (var i = doc.recentDocs.length; i > 1; i--) {
//     elem.value = doc.recentDocs[i - 1];
//   }
// });


                /////////////////////\\\\\\\\\\\\\\\\\\\
               //______________________________________\\
              //________________________________________\\
             //__________________________________________\\
            //____________________________________________\\
           //______________________________________________\\
          //________________________________________________\\
         //                                                  \\
        //                                                    \\
       //                                                      \\
      //                                                        \\
     //                                                          \\
    //                         Sorry Jacob                        \\
   //                      But I made Artwork                      \\
  //                                                                \\
 //                                                                  \\












