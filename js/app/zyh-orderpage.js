/**
 * Created by Zhangyuhan on 2017/7/17.
 */
'use strict'
/*全局配置*/
const testjson = {
  shopImg:'./image/shopImg.PNG',
  shopName:'我hi硕大的',
  shopPic:'88.88',
  shopNum:8
}
const host = 'http://api.lerongmall.com/'
/*Component*/
/*--1.获取localStorage数据更新商品数据--*/
/*str => float*/
function toFloat(str,n = 2){return parseFloat(str).toFixed(n)}
/*create shopLiTemp*/
function createTemp({shopImg,shopName,shopSelect,shopPic,shopNum,shopTip}){
  return `<li class="lf_sureShopList">
							<p><img src=${shopImg} alt=""/></p>
							<p>${shopName}</p>
							<p>${toEach(shopSelect)}</p>
							<p name="shopPic">${shopPic}</p>
							<p>
								<span>
									<button name="minus">-</button>
									<input name="shopNum" type="text" value=${shopNum}>
									<button name="adder">+</button>
								</span>
							</p>

							<p name="shopMoney">¥ <span>${toFloat(shopPic * shopNum)}</span></p>
						</li>`
}
/*for shopSelectInfo*/
function toEach(obj){
  let tempLate = ''
  for(let o in obj){
    tempLate += o + " : " + obj[o] + "<br>"
  }
  return tempLate
}
/*upView shopMsg*/
function upShopMsg(data,selector=".lf_sureShopLists"){
  $(selector).append(createTemp(data))
  addOnClick()
  setShopTotal(getShopTotal())
}
/*Take the data out of the Localstorage*/
window.onload = function () {
  upShopMsg(testjson)
  let mydata = localStorage.getItem('location.mydata')
  if(mydata){
    upShopMsg(JSON.parse(mydata))
  }else{
    alert("商品数据获取失败")

  }
}
/*--end--*/
/*--2.计算多个商品及积分总价--*/
/*计算每列总价*/
function multiplying(e,boolean){
  let x =$(e).siblings("input[name='shopNum']").val()
  let y = $(e).parent().parent().siblings("p[name='shopPic']").text()
  let z = $(e).parent().parent().siblings("p[name='shopMoney']").children("span").text()
  if(boolean){x++}else{x--}
  $(e).siblings("input[name='shopNum']").val(x)
  $(e).parent().parent().siblings("p[name='shopMoney']").children("span").text(toFloat(x * y))
}
/*获取商品总价*/
function getShopTotal () {
  let tempStr = 0
  $("p[name='shopMoney'] span").each(function(){tempStr += parseFloat($(this).text())})
  if($("input[name='isIntegral']").prop("checked")){
    tempStr -= parseFloat($("span[name='Integral']").text())
  }
  return toFloat(tempStr)
}
/*upView 商品总价*/
function setShopTotal (str) {
  $("span[name='shopTotal']").text(str)
}
/*为动态元素添加监听事件*/
function addOnClick(){
  $("button[name='minus']").on('click',function () {
    multiplying(this,false)
    setShopTotal(getShopTotal())
  })
  $("button[name='adder']").on('click',function () {
    multiplying(this,true)
    setShopTotal(getShopTotal())
  })
}
/*--3.获取用户操作数据,请求订单ID--*/
/*find input-checked*/
let findChecked = () => $("#shoubox").find("input[name='address']:checked").val()
let getMark = (boolean) => boolean?1:2
/*add onclick*/
$("input[name='isIntegral']").on('click',function(){setShopTotal(getShopTotal())})
/*get Ajax-data*/
function getData() {
  let json = JSON.parse(localStorage.getItem('location.mydata'))
  return {
    flag: 2,
    mark: getMark($("input[name='isIntegral']").prop("checked")),
    id: json.shopId,
    wuliu_id: $("#addressSelect").val(),
    num: $("input[name='shopNum']").val(),
    areaId: findChecked(),
    attr_value_id: JSON.stringify(json.attr_value_id)
  }
}
/*校验*/
function checkData(data){
  let arr =Object.values(data);
  console.log(arr);
  return !arr.includes(NaN)&&!arr.includes(undefined)
}
/*同步地址信息*/
function syncAddress(e){
  $(".lf_addressContent span").text($(e).find("span.lf_addressCon").text())
  $(".lf_consigneer span").text($(e).find("span.Consignee").text())
}
/*add input-checked*/
$("#shoubox").on("click","li",function(){
  $(this).addClass("lf_addressDefault").siblings().removeClass("lf_addressDefault")
  $(this).children("input").prop( "checked", true )
  syncAddress(this)
})
/*提交订单*/
function sendOrder () {
  $.ajax({
    url: host + 'home/order/submitOrder',
    data:getData(),
    type: 'get',
    dataType: 'jsonp',
    success: function (result) {
      console.log(result)
      let data = {
        id:result.data,
        money: $("span[name='shopTotal']").eq(0).text()
      }
      localStorage.setItem('location.myMoney',JSON.stringify(data));
      window.location.href='./lf_payWay.html'
    },
    error:function () {
      alert("很抱歉,您的订单没有提交成功")
    }
  })
}
/*--end--*/
/*onclik sendOrder*/
$(".lf_submitOrder").on('click',function () {
  /*check data*/
  if(checkData(getData())){
    sendOrder()
  }else{
    alert("数据残缺,请检查")
  }

})
/*获取物流信息并更新View*/
function sendAddress() {
  function setAdd({id,name}){
    $("#addressSelect").append(`<option value=${id}>${name}</option>`)
  }
  $.ajax({
    url: host + "home/order/delay",
    type: 'get',
    dataType: 'jsonp',
    success: function (result) {
      for(let obj of result.data){
        setAdd(obj)
      }
    },
    error: function () {
      alert("物流信息未成功获取")
    }
  })
}
/*initialize*/
sendAddress()