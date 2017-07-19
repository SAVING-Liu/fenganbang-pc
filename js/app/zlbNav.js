
$(
    function (){
        var nav = "<ul class='zlb-body-nav'>"
            +"<li style='width: 209px;background-color: #2e62ad;margin:0;padding-left: 23px;'>个人中心</li>"
            +"<li>首页</li>"
            +"<li>需求大厅</li>"
            +"<li>服务大厅</li>"
            +"<li>辅材街</li>"
            +"<li>团队培训</li>"
            +"</ul>";
        var leftNav = '<div class="zlb-clear-fix">'
            +'<img class="zlb-person zlb-pull-left" src="images/zlb_person.png" />'
            +'<div class="zlb-pull-left" style="margin-left: 10px;padding-top: 5px;font-size:16px;font-weight:bold;">山野的风</div>'
            +'</div>'
            +'<div style="margin-top: 10px;margin-bottom: 30px;border: 1px solid #e6e6e6;line-height: 44px;background-color: #fff;font-size:14px;color:#3c8fed;text-align: center;">我的账户</div>'
            +'<div>'
            +"<div style='margin-bottom: 20px;font-size:16px;color:#333333;font-weight:bold;'>个人中心:</div>"
            +"<ul>"
            +"<li>我的信息</li>"
            +"<li>我的订单</li>"
            +"<li>我的项目</li>"
            +"<li class='zlb-address active'>收获地址</li>"
            +"<li>修改密码</li>"
            +"</ul>";
            +'</div>';
        $('#zlb-nav').html(nav);
        $('#zlbLefNav').html(leftNav);
    }
);