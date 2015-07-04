var WechatAPI = require("../index.js");
//console.log("本利保");
var app_id = "wx4b6e962611f5e662";
var app_secret = "78f0744a1d73bbbd423859840fd1255d";
var api = new WechatAPI(app_id, app_secret);

var now=new Date();
var timeStamp = parseInt(now.getTime() / 1000); /*秒数*/
var timeStamp2=timeStamp+60*60*24*90;


function main() {
    //console.log(api);


    // api.getColors(function(err, data, res){
    // 	console.log("result",data);
    // })


    // api.getCards(0, 10, function(err, data, res) {
    // 	console.log("getCards", data);

    // });

    // api.getCard("po2HJs0Es90XhygVjNav86uQ5BY8", function(err, data, res) {
    // 	console.log("getCard", data.card.gift.base_info);
    // })
    //var logo_url = 'http://mmbiz.qpic.cn/mmbiz/10ia0WIdm40H9FjTsMOrsrYbyxJ1icH7UR9UL5RxN4E1zbiaN30SlKSV0cFGybNwGpAebKzprbH5TruD4LLKHBpAg/0?wx_fmt=png';
    var logo_url = "http://mmbiz.qpic.cn/mmbiz/10ia0WIdm40E0SqeX4W3yoULD1EibiapTXJ5BEgd7IOWdtc1BVH5RDRjpgtuwlvxQiby7BssqY8Qs98pxIN30V1s3Q/0";
    //桃子 peach

    var info = {
        "logo_url": logo_url,
        "brand_name": "24节气 耕耘有礼",
        "code_type": "CODE_TYPE_TEXT",
        "title": "夏至耕耘礼包20元",
        "sub_title": "",
        "color": "Color010",
        "notice": "凭此券可参加24节气耕耘财富活动",
        "service_phone": "4008-2255-38",
        "description": "不可兑换现金 ",
        "date_info": {
            "type": 1,
            "begin_timestamp": timeStamp, //1432563704,1432600039
            "end_timestamp": timeStamp2
        },
        "sku": {
            "quantity": 50000000
        },
        "get_limit": 3,
        "use_custom_code": false,
        "bind_openid": false,
        "can_share": true,
        "can_give_friend": true,
        "location_id_list": [],
        "custom_url_name": "立即使用",
        "custom_url": "http://m.nongfadai.com",
        "custom_url_sub_title": "耕耘有礼",
        "promotion_url_name": "活动指南",
        "promotion_url": "http://m.nongfadai.com/about_us.html",
        "source": "农发贷"
    };
    var data = {
    	"base":info,
        "base_info": info,
        "default_detail": "凭此券可参加24节气耕耘财富活动，成功完成活动享受价值20元水果兑换券,该20元礼包可用于定期兑换精选水果，农产品，电影票"
    };
    data["gift"]=data.default_detail;
    data["deal_detail"]=data.default_detail;
    var card = {
        "card_type": "GENERAL_COUPON",
        "general_coupon": data,
    };

    var card = {
        "card_type": "GIFT",
        "gift": data,
    };


    api.createCard(card, function(err, data, res) {
        console.log("createCard", data);
    })

}
main();
// 时间 2015-6-15 添加卡券结果
// createCard { errcode: 0,
//   errmsg: 'ok',
//   card_id: 'po2HJs96CkrVRlRIGsr3xp8T-Pec' }