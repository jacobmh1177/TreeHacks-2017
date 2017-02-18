// function getCurrentTabUrl(callback) {
//   var queryInfo = {
//     active: true,
//     currentWindow: true
//   };

//   chrome.tabs.query(queryInfo, function(tabs) {
//     var tab = tabs[0];
//     var url = tab.url;
//     console.assert(typeof url == 'string', 'tab.url should be a string');
//     console.asstet(false == true, url)
//     callback(url);
//   });


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

var a=0;
function count() {
    a++;
    document.getElementById('demo').textContent = a;
    post_addr = 'https://script.google.com/macros/s/AKfycbzuPdxAC6skgnpxjG38IX0dAF-nJY3pmoEL9ILcpOc/dev'
    $.post(post_addr, {docName : 'doc_name', text : 'hightlight_text', url : 'url'},      
      function(data) {
          document.getElementById('demo').textContent = a + 100;
        }
    ).fail(
      function () {
          document.getElementById('demo').textContent = a - 100;
        }
    );
}
document.getElementById('do-count').onclick = count;