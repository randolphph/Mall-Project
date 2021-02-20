var express = require('express');
var app = new express();


//引入mongoDB模块，获得客户端对象
var MongoClient = require('mongodb').MongoClient;
//mongoDB连接字符串
var DB_CONN_STR = 'mongodb://127.0.0.1:27017/';


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods","*");
    res.header("Access-Control-Max-Age",' 3600')
    next();
});

var _xxObj = {
    arrs:[
        {
            id : 'n1',
            name : "a_name",
            vals : "aaa"
        },
        {
            id : 'n2',
            name : "b_nam",
            vals : "bbb"
        },
        {
            id : 'n3',
            name : "c_name",
            vals : "ccc"
        }
    
        
    ]
}

var _filterData = null;

function filter (_val) {
    return _xxObj.arrs.filter((item) => {
        return item.vals === _val
    })
}

// function insertTempGoodsList(){

// 	let TempGoodsListObj = [{"name" : "洗衣机", "price" : 22, "category" : "goodsList_b", "img" : "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548497575095&di=d4a59272c4cf53848d8b615f208a4d38&imgtype=0&src=http%3A%2F%2Fimg010.hc360.cn%2Fk1%2FM01%2F30%2F25%2F4LLd34735d9f8e3092065fBff467C42d385.png", "describe" : " 洗衣机特好，洗的干净" },
//     {"name" : "燃气灶", "price" : 33, "category" : "goodsList_b", "img" : "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548497592730&di=21f41bd6f1ddf4178951c7cc1a59515f&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fhousephotolib%2F1610%2F13%2Fc1%2F28285254_1476289213390_690x460.jpg", "describe" : " 燃气灶特好，火大" },
//     {"name" : "冰箱", "price" : 44, "category" : "goodsList_b", "img" : "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548497740253&di=2a66cd86af34128a3160f36597a7b4f8&imgtype=0&src=http%3A%2F%2Fpic15.photophoto.cn%2F20100610%2F0020033085457192_b.jpg", "describe" : " 冰箱特好，凉" },
//     {"name" : "空调", "price" : 55, "category" : "goodsList_b", "img" : "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548497798102&di=43fb38fe2fd46d41dab6e4e9ecd66e06&imgtype=0&src=http%3A%2F%2Fsc.jb51.net%2Fuploads%2Fallimg%2F140416%2F11-14041610514b17.jpg", "describe" : " 空调特好，冻死个人" 
//     }]
// 	MongoClient.connect( DB_CONN_STR, function(err, db){
// 		// 数据库名：proShopCart
// 		var _dbo = db.db('proShopCart');
// 		// 商品栏目集合名：goodsCategory
// 		var _collection = _dbo.collection( 'goodsList_b' );

// 		_collection.insertMany( TempGoodsListObj, function(err, result){
// 			if(err) throw err;
// 			db.close();
// 		});
// 	});
// }
//  insertTempGoodsList()

//第一个接口，接收
app.get('/node_a',function(req,res){
   console.log(req.query._xx);
   _filterData = filter(req.query._xx);
})
 //发送
app.get('/node_b',function(req,res){
    if (_filterData.length <= 0) {
        res.send([{name : '不存在'}])
    }else {
        res.send(_filterData)
    }
    
})

//通过id得到商品信息
app.get('/getGoodsInfoById',function(req,res){
    var _findId = req.query.id;
    var _findName = req.query.collectionName;
    //引入mongoDB的id对象
    var ObjectID = require('mongodb').ObjectID;
    var _findObjId = ObjectID.createFromHexString(_findId);

    MongoClient.connect(DB_CONN_STR,function(err,db){
        //数据库名：proShopCart
        var _dbo = db.db('proShopCart');
        //商品集合名：_findName
        var _collection = _dbo.collection(_findName);
        _collection.findOne( {'_id':_findObjId},{} ,function(err,result){
            if (err) throw err;
            res.send(result);

        })
        db.close()
    }) 


})

//注册信息
app.post('/register_post',function(req,res){
    let _allData = '';
    req.on('data',function(_d){
        _allData += _d;
    });

    req.on('end',function(){
        let insertMsg = JSON.parse(_allData);
        findSameNameFn(insertMsg,res);
    })
})
//登录信息
app.post('/login_post',function(req,res){
    let _allData = '';
    req.on('data',function(_d){
        _allData += _d;
    });

    req.on('end',function(){
        let temObj = JSON.parse(_allData);
        //console.log(temObj);
        MongoClient.connect(DB_CONN_STR,function(err,db){
            //数据库名：proShopCart
            var _dbo = db.db('proShopCart');
            //集合名：userInfo
            var _collection = _dbo.collection('userInfo');
            _collection.findOne( {username : temObj.username},{} ,function(err,result){
                if (err) throw err;
                if (result === null) {
                    console.log('用户不存在');
                    return res.send({
                        regInfo : '用户不存在',
                        reg_code : 3
                    })
                }else if (result.password !== temObj.password) {
                    console.log('密码错误');
                    return  res.send({
                        regInfo : '密码错误',
                        reg_code : 4
                    })
                }else if(result !== null && result.password === temObj.password) {
                    console.log('登录成功');
                    return res.send({
                        regInfo : result,
                        reg_code : 5
                    })
                }

              
            })
            db.close()
        })
      
    });
})
//录入商品信息
app.post('/submit_goods',function(req,res){
    let _allData = '';
    req.on('data',function(_d){
        _allData += _d;
    });

    req.on('end',function(){
        var _temObjArr = JSON.parse(_allData);
        MongoClient.connect(DB_CONN_STR,function(err,db){
            //数据库名：proShopCart
            var _dbo = db.db('proShopCart');
            //商品集合名：goodsCategory
            var _collection = _dbo.collection('goodsCategory');
            _collection.insertMany( _temObjArr,{} ,function(err,result){
                if (err) throw err;
                res.send({
                    regInfo : '商品录入成功',
                    reg_code : 6
                })

            })
            db.close()
        })

    })
})

//查询所有商品大类
app.get('/getGoodsCategory',function(req,res){
    MongoClient.connect(DB_CONN_STR,function(err,db){
        //数据库名：proShopCart
        var _dbo = db.db('proShopCart');
        //商品集合名：goodsCategory
        var _collection = _dbo.collection('goodsCategory');
        
        _collection.aggregate([{
			$lookup:{
				localField:'describe',
				from:'goodsList_a',
				foreignField:'category',
				as:'goodsList_aa'
			}
		},{
			$lookup:{
				localField:'describe',
				from:'goodsList_b',
				foreignField:'category',
				as:'goodsList_bb'
			}
		},{
			$lookup:{
				localField:'describe',
				from:'goodsList_c',
				foreignField:'category',
				as:'goodsList_cc'
			}
		},{
			$lookup:{
				localField:'describe',
				from:'goodsList_d',
				foreignField:'category',
				as:'goodsList_dd'
			}
		}]).toArray(function(err, result){
			if(err) throw err;

			return res.send( result );
			db.close();
		});
    })
})

//查询数据库中是否有同名的信息
function findSameNameFn(insertMsg,res) {
    
    MongoClient.connect(DB_CONN_STR,function(err,db){
        //数据库名：proShopCart
        var _dbo = db.db('proShopCart');
        //集合名：userInfo
        var _collection = _dbo.collection('userInfo');
        _collection.findOne( {username : insertMsg.username},{} ,function(err,result){
            if (err) throw err;
            if (result === null) {
                console.log('没有同名的');
                insertNewMsgFn(insertMsg,res);
            }else if (result.username === insertMsg.username) {
                console.log('存在同名的信息');
                res.send({
                    regInfo : '存在同名的信息',
                    reg_code : 2
                })
            }
            db.close();
        })
    })
    
    
}

//插入不重名的信息
function insertNewMsgFn (insertMsg,res){
    
        MongoClient.connect(DB_CONN_STR,function(err,db){
            //数据库名：proShopCart
            var _dbo = db.db('proShopCart');
            //集合名：userInfo
            var _collection = _dbo.collection('userInfo');
            _collection.insertOne( insertMsg ,function(err,result){
                if (err) throw err;
                console.log('注册成功');
                res.send({
                    regInfo : '注册成功',
                    reg_code : 1
                })
                db.close();
            })
        })
}





app.listen(3000,function(){
    console.log('3000端口启动')
})