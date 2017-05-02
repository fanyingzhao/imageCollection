chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if (request.message === 'popPage') {
		// 重复请求处理

		$('body').append('<div id=\"FY_WIDGETS\">	    <style>	        .widgets-main {	            background: rgba(229,229,229,.95);	            width: 100%;	            height: 100%;	            position: fixed;	            top: 0;	            left: 0;	        }	        .widgets-main .widgets-container {	            background: white;	            width: 500px;	            margin: 0px auto 0;	            overflow: scroll;	        }	        .widgets-container .header {	        	height: 40px;	        	border-top: 1px solid orange;	        	border-bottom: 1px solid gray;				padding: 0 20px;				line-height: 40px;				position: relative;	        }	        .widgets-container .header span {	        	color: black;	        	font-size: 18px;	        }	        .widgets-container .header i {	        	display: inline-block;	        	width: 15px;	        	height: 15px;	        	position: absolute;				background: red;				right: 20px;				top: 12.5px;	        }	        .widgets-container .middle {				margin: 20px 20px 10px;				border-bottom: 1px solid gray;				text-align: center;	        }	        .widgets-container .middle img {	        	width: 50px;	        	height: 50px;	        	margin: 0 auto;	        }	        .widgets-container .tag .info {				padding: 0 20px;	        }	        .widgets-container .tag .info i {	        	display: inline-block;	        	width: 10px;	        	height: 10px;	        	background: orange;	        }	        ul, li {	        	margin: 0;	        	padding: 0;	        }			.widgets-container .tag-list ul, .widgets-container .tag-list li {				list-style: none;				margin: 0;				padding: 0;			}	        .widgets-container .tag-list ul li {				float: left;				border: 1px solid gray;				margin-right: 10px;				padding: 2px 10px;	        }	        .widgets-container .tag-list ul li:first-child {	        	border: none;	        	padding: 2px 0;	        	margin-right: 0;	        }	        .widgets-container .tag-list {	        	padding: 20px 20px 0;	        }			.widgets-container .new {				margin-top: 20px;				padding: 0 20px;			}			.widgets-container .new i {				display: inline-block;				width: 10px;				height: 10px;				background: orange;			}			.widgets-container .bottom {				background: #f4f4f4;				height: 50px;				text-align: center;				vertical-align: middle;				margin-top: 20px;			}			.widgets-container .bottom span {				border: 1px solid black;				padding: 5px 20px;				background: white;				color: black;				font-weight: 800;				border-radius: 2px;				line-height: 50px;			}			.widgets-container .bottom span:first-child {				background: orange;				color: white;				margin-right: 10px;			}	    </style>	    <div class=\"widgets-main\">	        <div class=\"widgets-container\">	            <div class=\"header\">	            	<span>收藏</span>	            	<i></i>	            </div>	            <div class=\"middle\">	            	<img src=\"\" alt=\"\">	            	<p>收藏成功</p>	            </div>	            <div class=\"tag\">	            	<div class=\"info\">	            		<i></i>	            		<span>添加标签来管理你的收藏</span>	            	</div>	            	<div class=\"tag-list\">	            		<ul>	            			<li>我的标签：</li>	            			<li>html5</li>	            			<li>错误</li>	            			<li>IT</li>	            			<li>搞笑</li>	            			<li>购物</li>	            			<li>测试</li>	            		</ul>	            		<div style=\"clear:both;\"></div>	            	</div>	            	<div class=\"new\">	            		<i></i>	            		<span>创建新标签</span>	            	</div>	            </div>	            <div class=\"bottom\">	            	<span>添加</span>	            	<span>取消</span>	            </div>	        </div>	    </div>');

		$('#FY_WIDGETS .bottom').find('span:first-child').css('background', 'red').on('click', function(){
			var xhr = new XMLHttpRequest();
			xhr.open("POST", "http://127.0.0.1:5000/api/images/add", true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.onreadystatechange = function() {
			  if (xhr.readyState == 4) {
			  	var res = JSON.parse(xhr.responseText);
			    if (res['status']['code'] == 000) {
			    	// 服务器处理成功
			    	// 不再提示，直接消除
			    	$('#FY_WIDGETS').animate({
			    		opacity: 0
			    	}, 500, function() {
			    		$(this).remove();
			    	});
			    }else {
			    	// 服务器处理失败
			    	alert('请求处理失败');
			    }
			  }
			}
			xhr.send("imgUrl=" + request.resInfo.srcUrl + "&pageUrl=" + request.resInfo.pageUrl + "&linkUrl=" + request.resInfo.linkUrl);
		});

		sendResponse({
			res: "bye"
		});
	}
});


