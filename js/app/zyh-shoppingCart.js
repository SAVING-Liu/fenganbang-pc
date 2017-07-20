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
'use strict'
/*模拟数据*/
/*设置选择器*/
const selector = '.hot-img-boxs'
const imgData ={
  imgWidth :120,
  margin :7.5,
  imgNumber:4,
  imgArr:[
    {imgUrl:'./images/shopImg.PNG',imgPic:88.00,imgLink:'#'},
    {imgUrl:'./images/shopImg.PNG',imgPic:98.99,imgLink:'#'},
    {imgUrl:'./images/shopImg.PNG',imgPic:68.00,imgLink:'#'},
    {imgUrl:'./images/shopImg.PNG',imgPic:28.88,imgLink:'#'},
    {imgUrl:'./images/shopImg.PNG',imgPic:28.88,imgLink:'#'},
    {imgUrl:'./images/shopImg.PNG',imgPic:88.00,imgLink:'#'}
  ]
}
/*获取当前boxs的left值*/
function getLeftNumber(){
  return $(selector).css("margin-left")
}
/*生成轮播图*/
function setBoxsHtml(temp){
  $(selector).html(temp)
}
/*轮播图的设置处理*/
class HotMap {
  constructor (data){
    this.data = data
    this.minLeft = 0
    this.width = data.imgWidth + data.margin * 2
    this.pageWidth = this.width * data.imgNumber
    this.maxLeft = -(this.width * data.imgArr.length - this.pageWidth)
  }
  createImgs(){
    let tempLate = ''
    for(let o of this.data.imgArr){
      tempLate += this.createImg(o)
    }
    return tempLate
  }
  createImg({imgPic,imgUrl,imgLink}){
    return `<div class="imgs" pic=${imgPic}>
                <a href=${imgLink}>
                <img src=${imgUrl} />
                </a>
            </div>`
  }
  clickLeft(){
    let tempNumber = parseInt(getLeftNumber())
    if(tempNumber - this.width < this.maxLeft){
      $(selector).css({'margin-left': this.maxLeft + 'px'})
    }else{
      tempNumber -= this.width
      $(selector).css({'margin-left': tempNumber + 'px'})
    }
  }
  clickRight(){
    let tempNumber = parseInt(getLeftNumber())
    if(tempNumber + this.width > this.minLeft){
      $(selector).css({'margin-left': this.minLeft + 'px'})
    }else{
      tempNumber += this.width
      $(selector).css({'margin-left': tempNumber + 'px'})
    }
  }
}
/*初始化*/
let map = new HotMap(imgData)
setBoxsHtml(map.createImgs())
/*监听事件*/
$("div[name='map-left']").on('click',function () {
  map.clickLeft()
})
$("div[name='map-right']").on('click',function () {
  map.clickRight()
})