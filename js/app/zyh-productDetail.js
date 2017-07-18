/**
 * Created by zhangyuhan on 2017/7/17.
 */
'use strict'
/*addListening shopNum*/
function ListentingShopNum () {
  $("span[name='addNum']").on('click',function () {
    let tempNum = parseInt(getShopNum())
    tempNum++
    $(".Input").val(tempNum)
  })
  $("span[name='deNum']").on('click',function () {
    let tempNum = parseInt(getShopNum())
    if(tempNum > 0){
      tempNum--
    }else{tempNum = 0}
    $(".Input").val(tempNum)
  })
}
function ListentingButton () {
  $("button.style-red").on('click',function () {
    console.error("选择立即购买","数量",getShopNum())
  })
  $("button.style-yellow").on('click',function () {
    console.error("选择加入购物车","数量",getShopNum())
    showAside(true)
  })
}
function getShopNum () {return $(".Input").val()}
window.onload = function () {
  /*初始化*/
  ListentingShopNum()
  ListentingButton()
}

/*x-img 关闭aside*/
$(".x-img").on('click',function () {
  showAside(false)
})
function showAside(boolean){
  if(boolean){
    $("aside").addClass('showAside')
    setTimeout(function () {
      showAside(false)
    },3000);
  }
  else{$("aside").removeClass('showAside')}
}