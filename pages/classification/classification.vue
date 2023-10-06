<template>
  <view class="body">
    <!-- 搜索框 -->
    <view class="searchMoudle">
      <input class="search" type="text" placeholder="输入'瓜果'" v-model="searchKey" placeholder-class="searchPlace">
      <view class="enterButton">搜索</view>
    </view>
    <view class="content">
      <!-- 分类列表 -->
      <view class="classList">
        <view :class="{classBox:true,checkedClass:classIdCurrent==item.classId}"
         v-for="(item,index) in classList" :key="index" @click="checkClass(item)">{{item.name}}</view>
      </view>
      <!-- 商品列表 -->
      <view class="goodsList">
        <view class="noGoods" v-if="showList.length==0">抱歉，暂无此类商品</view>
        <view class="goodsBox" v-for="(item,index) in showList" :key="index">
          <image class="goodsImg" :src="item.img" mode="aspectFit"></image>
          <view class="goodsInfo">
            <view class="title">{{item.title}}/{{item.unit}}</view>
            <view class="price">￥{{item.price}}</view>
            <image class="cartIcon" src="../../static/classification/cart.png" mode="aspectFit" @click="addCart(item)"></image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
	import store from '@/store/index.js'; //引入store
	import {
		
	} from '@/common/http.api.js';
	export default {
		data() {
			return {
        searchKey:'', //搜索关键词
        classList:[
          {
            "name":"全部",
            "classId":0
          },
          {
            "name":"特价",
            "classId":1
          },
          {
            "name":"活动",
            "classId":2
          },
          {
            "name":"水产",
            "classId":3
          },
          {
            "name":"肉蛋",
            "classId":4
          },
          {
            "name":"蔬菜",
            "classId":5
          },
          {
            "name":"瓜果",
            "classId":6
          },
          {
            "name":"大米",
            "classId":7
          },
          {
            "name":"特产",
            "classId":8
          },
          {
            "name":"1元",
            "classId":9
          },
          {
            "name":"时令蔬菜",
            "classId":10
          },
        ],
        goodsList:[
          {
            "id":1,
            "title":"新鲜黄瓜",
            "img":"../../static/index/goodsList/1.png",
            "price":1.20,
            "unit":'根',
            "classId":[6,9]
          },
          {
            "id":2,
            "title":"小白菜",
            "img":"../../static/index/goodsList/2.png",
            "price":1.00,
            "unit":'斤',
            "classId":[5,9]
          },
          {
            "id":3,
            "title":"优质南瓜",
            "img":"../../static/index/goodsList/3.png",
            "price":1.60,
            "unit":'斤',
            "classId":[6,2]
          },
          {
            "id":4,
            "title":"本地土豆",
            "img":"../../static/index/goodsList/4.png",
            "price":1.50,
            "unit":'斤',
            "classId":[1,2]
          },
          {
            "id":5,
            "title":"红心番薯",
            "img":"../../static/index/goodsList/5.png",
            "price":1.80,
            "unit":'斤',
            "classId":[1,2]
          },
          {
            "id":6,
            "title":"进口苹果",
            "img":"../../static/index/goodsList/6.png",
            "price":3.50,
            "unit":'斤',
            "classId":[6]
          },
          {
            "id":7,
            "title":"雪梨",
            "img":"../../static/index/goodsList/7.png",
            "price":2.90,
            "unit":'斤',
            "classId":[6]
          },
          {
            "id":8,
            "title":"优质猪肉",
            "img":"../../static/index/goodsList/8.png",
            "price":13.60,
            "unit":'斤',
            "classId":[4]
          },
          {
            "id":9,
            "title":"优质土鸡蛋",
            "img":"../../static/index/goodsList/9.png",
            "price":23.00,
            "unit":'版',
            "classId":[4]
          },
          {
            "id":10,
            "title":"新鲜四季豆",
            "img":"../../static/index/goodsList/10.png",
            "price":2.10,
            "unit":'斤',
            "classId":[5,10]
          },
        ],
        showList:[
          {
            "id":1,
            "title":"新鲜黄瓜",
            "img":"../../static/index/goodsList/1.png",
            "price":1.20,
            "unit":'根',
            "classId":[6,9]
          }
        ], //当前显示商品列表
        classIdCurrent:0, //当前分类id
        cartList:[], //购物车列表
			}
		},
		onLoad() {
			this.showList = this.goodsList
      let that = this
      uni.getStorage({
      	key: 'cartList',
      	success: function (res) {
          // 赋值
          that.cartList = res.data
          that.cartNum = that.cartList.length
      	}
      });
		},
		onShow() {
      
    },
		methods: {
      // 切换分类
      checkClass(item) {
        this.classIdCurrent = item.classId
        this.showList = []
        this.goodsList.map((item)=>{
          if(item.classId.includes(this.classIdCurrent)){
            this.showList.push({...item})
          }else{
            if(this.classIdCurrent==0){
              this.showList.push({...item})
            }
          }
        })
      },
      // 添加购物车
      addCart(item) {
        let cartList = this.cartList
        let cartNum = cartList.length
        if(cartNum<99){
          if(cartList.length>0){
            let isAdd = true
            cartList.map((items)=>{
              if(items.id==item.id){
                this.$u.toast('已添加过此商品')
                isAdd = false
              }
            })
            if(isAdd){
              cartList.push({...item})
              this.$u.toast('添加购物车成功')
            }
          }else{
            cartList.push({...item})
            this.$u.toast('添加购物车成功')
          }
          this.cartList = cartList
          uni.setStorage({
            key:"cartList",
            data:cartList
          })
        }else{
          this.$u.toast('购物车至多为99')
        }
      }
		},
	}
</script>

<style lang="scss">
  .body{
    font-size: 32rpx;
    .searchMoudle{
      border:1rpx solid #FF5000;
      border-radius: 100rpx;
      margin: 10rpx;
      padding: 4rpx;
      display: flex;
      justify-content: space-between;
      .search{
        line-height: 58rpx;
        height: 58rpx;
        margin-left: 30rpx;
      }
      .searchPlace{
        color: #333;
        line-height: 58rpx;
      }
      .enterButton{
        background-color: #FF5000;
        color: #fff;
        width: 100rpx;
        line-height: 58rpx;
        text-align: center;
        font-size: 28rpx;
        border-radius: 100rpx;
      }
    }
    .content{
      display: flex;
      .classList{
        background-color: rgba(0, 0, 0, 0.1);
        width: 20%;
        .classBox{
          color: #333;
          text-align: center;
          line-height: 78rpx;
        }
        .checkedClass{
          background-color: #fff;
          color: #000;
        }
      }
      .goodsList{
        width: 80%;
        height: 93vh;
        overflow-y: scroll;
        .noGoods{
          padding: 30rpx;
        }
        .goodsBox{
          padding-bottom: 10rpx;
          border-bottom: 1rpx solid #eee;
          margin-bottom: 10rpx;
          display: flex;
          .goodsImg{
            width: 200rpx;
            height: 200rpx;
            border-radius: 16rpx;
            margin: 0 20rpx;
          }
          .goodsInfo{
            position: relative;
            flex: 6;
            .title{
              padding-top: 20rpx;
              height: 140rpx;
            }
            .price{
              color: red;
            }
            .cartIcon{
              position: absolute;
              width: 40rpx;
              height: 40rpx;
              right: 10rpx;
              bottom: 0;
            }
          }
        }
        .goodsBox:last-child{
          border-bottom: none;
          margin-bottom: 0;
        }
      }
    }
  }
</style>