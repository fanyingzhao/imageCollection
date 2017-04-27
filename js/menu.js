

function testcreate(info, tab) {
	if (info.mediaType == 'image') {

	}else if (info.mediaType == 'video') {

	}

	// 弹出页面
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    	chrome.tabs.sendMessage(tabs[0].id, {message : "popPage"}, function(response) {
    		
  		});
	});


	// 验证图片是否合法

	// 询问图片所属分类

	// 发送到服务器，由服务器进行下载
}

chrome.contextMenus.create({"title":"test", "type":"normal", "contexts": ["image", "video"], "onclick":testcreate}, function(){
})