(function(){
	// alert('bbb');
	getImageList($('body')).each(function(index, element){
		if (sizeIsStandard($(this))) {
			createCollection(element);
		}
	});	
})();


// tools
// 找到一个容器中的所有图片，目前只寻找了img 标签，后期决定是否添加寻找背景图片
function getImageList(container) {
	return $(container).find('img');
}
// 元素大小是否符合标准，如果符合标准，则添加‘收藏’按钮
function sizeIsStandard(element) {
	if ($(element).width() >= 150 && $(element).height() >= 150) {
		return true;
	}

	return false;
}
// 得到图片的路径
function getImgUrl(element) {
	return $(element).attr('src');
}

// 创建收藏按钮
function createCollection(element) {
	var $btn = $('<span>收藏</span>').css({
		'position':'absolute',
		'background' : 'orange',
		'width'	: '40px',
		'height' : '30px',
		'text-align' : 'center',
		'line-height' : '30px',
		'display': 'none'
	}).on('click', function() {
		sendMsg({
			method : "addImage",
			imgUrl : getImgUrl(element),
			pageUrl : "http://www.baidu.com",
			title : "标题"
		}, function(response) {
			if (response.code == 0) {
				alert('添加成功');
			}else {
				alert('失败');
			}
		});
	}).hover(function() {
		$(this).css({
			'background' : 'gray',
			'display' : 'inline'
		});
	}, function() {
		$(this).css({
			'background' : 'orange',
			'display' : 'none'
		});
	});

	$(element).parent().append($btn);
	$(element).hover(function(){
		$btn.css({
			'display': 'inline',
			'left': $(element).position().left + 50 + 'px',
			'top' : $(element).position().top + 50 +  'px'
		});
	}, function(){
		$btn.css('display', 'none');
	});
}

function sendMsg(data, func) {
	chrome.runtime.sendMessage(data, function(response) {
		func(response);
	});
}

// network
function addImage() {
	$.ajax({  
        type:'post',  
        traditional :true,  
        url:'http://127.0.0.1:5000/api/images/add',  
        data:{imgUrl: "imgUrl", pageUrl:"http://oi7yis5b9.bkt.clouddn.com/Flt4vJTpXudXKn2WIYtLn7UHHz8c", linkUrl:"http://oi7yis5b9.bkt.clouddn.com/Flt4vJTpXudXKn2WIYtLn7UHHz8c"},  
        success:function(data){  
		    if (data['status']['code'] == 000) {
		    	// 添加图片成功，显示添加标签界面

			}else {
				alert('添加图片失败');
			}
        }  
    });
}