// not work
// chrome.tabs.getCurrent(function (tab) {
//   console.log(tab);
//   console.log(document.title, window.location.href)
// })
// 获取当前Tab
chrome.tabs.query({
  currentWindow: true,
  active: true
}, function(tabs) {
  const target = tabs[0],
    currentUrl = target.url,
    currentTitle = target.title;
  // 初始化Title和Url
  document.getElementById('title').value = currentTitle;
  document.getElementById('url').value = currentUrl;
  // 获取要操作的Dom
  const qrcodeDom = document.getElementById("qrcode"),
    contentDom = document.getElementById('content'),
    generateDom = document.getElementById('generate'),
    hintQRDom = document.getElementById('hintQR');
  // 初始化二维码
  let qrcode = new QRCode(qrcodeDom, {
    text: currentUrl,
    width: 180,
    height: 180,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
  // 生成二维码
  generateDom.addEventListener('click', function() {
      makeCode();
    })
    // 回车生成 或者 无输入时恢复Url二维码
  contentDom.addEventListener('keyup', function(e) {
    if (e.keyCode == 13) {
      makeCode();
      return;
    }
    const content = contentDom.value;
    if (!content) {
      hintQRDom.innerText = '当前页面QR码';
      qrcode.clear(); // clear the code.
      qrcode.makeCode(currentUrl); // make another code.
    }
  })

  function makeCode() {
    const content = contentDom.value;
    if (content) {
      hintQRDom.innerText = '文本生成的QR码';
      qrcode.clear(); // clear the code.
      qrcode.makeCode(content); // make another code.
    }
  }
});