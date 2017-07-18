function alertBox(list) {
	//list.news:显示内容
	//list.url:点击确定跳转的页面,如果没有只关闭遮罩
	var box = document.createElement("div");
	if (document.body.clientHeight) {
		
	}
	var boxWidth = document.documentElement.clientWidth;
	var boxHeight = document.documentElement.clientHeight;
	//添加背景层盒子样式
	box.style = "position: fixed; top: 0; left: 0; width: " + boxWidth + "px; height: " + boxHeight + "px; z-index: 999;";
	box.id = "outBox";
	//设置背景
	var bg = document.createElement("div");
	bg.style = "position: fixed; top: 0; left: 0; opacity: 0.4; filter: alpha(opacity: 40); background: #000; width: " + boxWidth + "px; height: " + boxHeight + "px;";
	//设置展示盒子
	var left = (boxWidth - 555) / 2;
	var top = (boxHeight - 266) / 2;
	var show = document.createElement("div");
	show.style = "position: absolute; top: " + top + "px; left: " + left + "px;background: #fff; padding: 10px; border: 3px solid #aaa; width: 529px; height: 240px; z-index: 5;";
	//提示标题
	var title = document.createElement("h2");
	var titleNo = document.createElement("img");
	titleNo.src = "images/kll_alert2.png";
	titleNo.style = "float: right; width: 25px; height: 25px; margin-top: 3px;";
	titleNo.id = "outBox-titleNo";
	title.innerHTML = "提示";
	title.style = "border-bottom: 1px solid #aaa; line-height: 34px; font-size: 16px;";
	//提示内容
	var news = document.createElement("div");
	var clear = document.createElement("span");
	var newsImg = document.createElement("img");
	var newsShow = document.createElement("P");
	news.style = "width: 460px; height: 100px; margin: 25px auto;";
	clear.style = "clear: both";
	newsImg.src = "images/kll_alert1.png";
	newsImg.style = " width: 44px; height: 44px; vertical-align: middle;";
	newsShow.style = "line-height: 28px; font-size: 16px; color: #333; vertical-align: middle; width: 400px; display: inline-block; padding-left: 10px;";
	newsShow.innerHTML = list.news;
	//确定及取消按钮
	var btnOk = document.createElement("a");
	btnOk.id = "outBox-btnOk";
	var btnNo = document.createElement("a");
	btnNo.id = "outBox-btnNo";
	btnOk.innerHTML = "确定";
	if (list.url) {
		btnOk.href = list.url;
	}
	btnOk.style = "display: block; width: 100px; line-height: 34px; color: #fff; background: #3c8fed; height: 34px; border: 1px solid #3c8fed; border-radius: 3px; float: left; margin-left: 95px; text-align: center; font-size: 14px; cursor: pointer;"
	btnNo.innerHTML = "取消";
	btnNo.style = "display: block; width: 100px; line-height: 34px; color: #333; background: #fff; border: 1px solid #3c8fed; height: 34px; border-radius: 3px; float: right; margin-right: 95px; text-align: center; font-size: 14px; cursor: pointer;"
	
	
	
	//盒子插入
	news.appendChild(newsImg);
	news.appendChild(newsShow);
	news.appendChild(clear);
	title.appendChild(titleNo);
	show.appendChild(title);
	show.appendChild(news);
	show.appendChild(btnOk);
	show.appendChild(btnNo);
	box.appendChild(show);
	box.appendChild(bg);
	document.body.appendChild(box);
	
	
	//t添加事件
//	btnNo btnOk titleNo
	function boxNone() {
		document.body.removeChild(box);
	}
	document.getElementById("outBox-btnNo").onclick = boxNone;
	document.getElementById("outBox-btnOk").onclick = boxNone;
	document.getElementById("outBox-titleNo").onclick = boxNone;
}
