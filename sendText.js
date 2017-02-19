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

    document.getElementById("curr_val").innerHTML = newDocName;
    for (var i = 1; i < doc.recentDocs.length; i++) {
      var elem = document.getElementById("curr_val" + (doc.recentDocs.length - i));
      elem.innerHTML = doc.recentDocs[i - 1];
      elem.style = "";
    }

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
// for (var i = 0; i < 5; i++) {
//   var str = i;
//   if (i == 0) { str = ''; }
//   console.log("curr_val" + str);
  document.getElementById("zzz").addEventListener("change", 
    function(event) {
      document.getElementById('doc_name').value = document.getElementById("zzz").value;
      updateDocName();
    });
// }
var name_field = document.getElementById('doc_name');
chrome.storage.sync.get("currDocName", function(doc){
  if (!doc.currDocName) {
    doc.currDocName = 'New Document'
  }
  name_field.value = doc.currDocName
  document.getElementById("curr_val").innerHTML = doc.currDocName
});
chrome.storage.sync.get("recentDocs", function(doc){
  for (var i = 1; i < doc.recentDocs.length; i++) {
    var elem = document.getElementById("curr_val" + (doc.recentDocs.length - i));
    elem.innerHTML = doc.recentDocs[i - 1];
    elem.style = "";
  }
});


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












