

function testcreate(info, tab) {
	var imgUrl = '';
	if (info.mediaType == 'image') {
		// 直接弹框提示
		imgUrl = info.srcUrl;
	}else if (info.mediaType == 'video') {

	}else {
		// 寻找img，或者video 标签
		// 如果有多个子元素img（或者可以显示图片的标签）标签，则显示多个

	}



}

chrome.contextMenus.create({"title":"test", "type":"normal", "contexts": ["image", "video"], "onclick":testcreate}, function(){
});

// 接受到消息
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if (message.method === 'addImage') {
		// 对图片地址进行处理
		chrome.windows.create({
				"url": "http://127.0.0.1:5000/chrome/addImage/" + encodeURI(message.imgUrl).replace(/\//g, '%-$') + '&' + message.title,
				"type": "popup"
			}, function(){
		});
	}else {
	}
});

// 在每个网页加载时，找出其中左右的图片，在规格超过一定尺寸时，在其最上角添加‘收藏’按钮，当鼠标滑过时显示按钮
// 当拖动图片/加载下一张图片时，按钮位置如何调整
chrome.tabs.onCreated.addListener(function(window){
	getImageList($('body')).each(function(index, element){
		if (sizeIsStandard($(this))) {
			createCollection(element);
		}
	});	
});




// tools
// 找到一个容器中的所有图片，目前只寻找了img 标签，后期决定是否添加寻找背景图片
function getImageList(container) {
	return $(container).find('img');
}
// 元素大小是否符合标准，如果符合标准，则添加‘收藏’按钮
function sizeIsStandard(element) {
	return true;
}
// 创建收藏按钮
function createCollection(element) {
	var $btn = $('<span>收藏</span>')
	$(element).append($btn);
}