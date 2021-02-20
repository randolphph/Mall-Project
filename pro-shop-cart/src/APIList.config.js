const port = 3000;
const BASEURL = 'http://127.0.0.1:' + port;

const API_LIST = {
    //查询条件
    node_a : BASEURL + '/node_a',
    // 查询结果
    node_b : BASEURL + '/node_b',
    //注册信息
    register_post : BASEURL + '/register_post',
    //登录信息
    login_post : BASEURL + '/login_post',
    //提交新增商品信息
    submit_goods : BASEURL + '/submit_goods',
    //获得所有商品大类
    getGoodsCategory : BASEURL + '/getGoodsCategory',
    //用id查询商品信息
    getGoodsInfoById : BASEURL + '/getGoodsInfoById'
}

module.exports = API_LIST