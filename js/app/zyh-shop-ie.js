/**
 * Created by Administrator on 2017/7/17.
 */
/*购物车轮播图初始化
 * 以下数据需要与css的初始化变量相同
 *
 * imgWidth 图片宽度
 * margin 图片间隔
 * imgNumber 显示图片数量
 * imgArr [{imgUrl,imgPic,imgLink}]
 *商品对应的预览图地址,商品价格,点击后的链接或者购物车链接
 *ie系列不支持
 * */
'use strict';
/*模拟数据*/
/*设置选择器*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var selector = '.hot-img-boxs';
var imgData = {
  imgWidth: 120,
  margin: 7.5,
  imgNumber: 4,
  imgArr: [{ imgUrl: './images/shopImg.PNG', imgPic: 88.00, imgLink: '#' }, { imgUrl: './images/shopImg.PNG', imgPic: 98.99, imgLink: '#' }, { imgUrl: './images/shopImg.PNG', imgPic: 68.00, imgLink: '#' }, { imgUrl: './images/shopImg.PNG', imgPic: 28.88, imgLink: '#' }, { imgUrl: './images/shopImg.PNG', imgPic: 28.88, imgLink: '#' }, { imgUrl: './images/shopImg.PNG', imgPic: 88.00, imgLink: '#' }]
  /*获取当前boxs的left值*/
};function getLeftNumber() {
  return $(selector).css("margin-left");
}
/*生成轮播图*/
function setBoxsHtml(temp) {
  $(selector).html(temp);
}
/*轮播图的设置处理*/

var HotMap = function () {
  function HotMap(data) {
    _classCallCheck(this, HotMap);

    this.data = data;
    this.minLeft = 0;
    this.width = data.imgWidth + data.margin * 2;
    this.pageWidth = this.width * data.imgNumber;
    this.maxLeft = -(this.width * data.imgArr.length - this.pageWidth);
  }

  HotMap.prototype.createImgs = function createImgs() {
    var tempLate = '';
    for (var _iterator = this.data.imgArr, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var o = _ref;

      tempLate += this.createImg(o);
    }
    return tempLate;
  };

  HotMap.prototype.createImg = function createImg(_ref2) {
    var imgPic = _ref2.imgPic,
      imgUrl = _ref2.imgUrl,
      imgLink = _ref2.imgLink;

    return '<div class="imgs" pic=' + imgPic + '>\n                <a href=' + imgLink + '>\n                <img src=' + imgUrl + ' />\n                </a>\n            </div>';
  };

  HotMap.prototype.clickLeft = function clickLeft() {
    var tempNumber = parseInt(getLeftNumber());
    if (tempNumber - this.width < this.maxLeft) {
      $(selector).css({ 'margin-left': this.maxLeft + 'px' });
    } else {
      tempNumber -= this.width;
      $(selector).css({ 'margin-left': tempNumber + 'px' });
    }
  };

  HotMap.prototype.clickRight = function clickRight() {
    var tempNumber = parseInt(getLeftNumber());
    if (tempNumber + this.width > this.minLeft) {
      $(selector).css({ 'margin-left': this.minLeft + 'px' });
    } else {
      tempNumber += this.width;
      $(selector).css({ 'margin-left': tempNumber + 'px' });
    }
  };

  return HotMap;
}();
/*初始化*/


var map = new HotMap(imgData);
setBoxsHtml(map.createImgs()
  /*监听事件*/
);$("div[name='map-left']").on('click', function () {
  map.clickLeft();
});
$("div[name='map-right']").on('click', function () {
  map.clickRight();
});