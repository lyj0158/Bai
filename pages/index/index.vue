<template>
  <view class="body">
    <!-- 轮播 -->
    <view class="swiper">
      <u-swiper
        :list="swiperList"
        @change="swiperChange"
        @click="swiperClick"
        indicator
        indicatorMode="dot"
        circular
        height="400rpx"
        radius="0"
        imgMode="aspectFill"
      ></u-swiper>
    </view>
    <!-- 分类专区 -->
    <view class="classMoudle">
      <view class="classBox" v-for="(item,index) in classList" :key="index">
        <image class="icon" mode="aspectFit" :src="item.icon"></image>
        <view class="text">{{item.text}}</view>
      </view>
    </view>
    <!-- 活动入口 -->
    <view class="title">限时活动</view>
    <view class="activityMoudle">
      <view class="activityBox" v-for="(item,index) in activityList" :key="index">
        <image :src="item.img" mode="aspectFit"></image>
      </view>
    </view>
    <!-- 商品列表 -->
    <view class="title">商品列表</view>
    <view class="goodsMoudle">
      <view class="goodsBox" v-for="(item,index) in goodsList" :key="index" @click="toDetails(item)">
        <image :src="item.img" mode="widthFix"></image>
        <view class="name">{{item.title}}</view>
        <view class="text">
          <view class="price">￥{{item.price}}</view>
          <view class="unit">/{{item.unit}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
	import store from '@/store/index.js'; //引入store
	import {
		// 引入接口
	} from '@/common/http.api.js';
  // libs组件
	// import { data } from '../../uni_modules/uview-ui/libs/mixin/mixin';
	export default {
		data() {
			return {
				token:'',
        swiperList: [
          'https://cdn.uviewui.com/uview/swiper/swiper1.png',
          'https://cdn.uviewui.com/uview/swiper/swiper2.png',
          'https://cdn.uviewui.com/uview/swiper/swiper3.png',
        ],
        classList: {
          1:{
            "text":"特价",
            "icon":"../../static/index/classList/specialOffer.png"
          },
          2:{
            "text":"活动",
            "icon":"../../static/index/classList/activity.png"
          },
          3:{
            "text":"水产",
            "icon":"../../static/index/classList/aquatic.png"
          },
          4:{
            "text":"肉蛋",
            "icon":"../../static/index/classList/meat.png"
          },
          5:{
            "text":"蔬菜",
            "icon":"../../static/index/classList/vegetable.png"
          },
          6:{
            "text":"瓜果",
            "icon":"../../static/index/classList/fruit.png"
          },
          7:{
            "text":"大米",
            "icon":"../../static/index/classList/rice.png"
          },
          8:{
            "text":"特产",
            "icon":"../../static/index/classList/local.png"
          },
          9:{
            "text":"1元",
            "icon":"../../static/index/classList/one.png"
          },
          10:{
            "text":"时令蔬菜",
            "icon":"../../static/index/classList/seasonalVegetable.png"
          }
        },
        activityList:{
          0:{
            img:'../../static/index/activityList/new.png'
          },
          1:{
            img:'../../static/index/activityList/vip.png'
          }
        },
        goodsList:[
          {
            "id":1,
            "title":"新鲜黄瓜",
            "img":"../../static/index/goodsList/1.png",
            "price":1.20,
            "unit":'根'
          },
          {
            "id":2,
            "title":"小白菜",
            "img":"../../static/index/goodsList/2.png",
            "price":1.00,
            "unit":'斤'
          },
          {
            "id":3,
            "title":"优质南瓜",
            "img":"../../static/index/goodsList/3.png",
            "price":1.60,
            "unit":'斤'
          },
          {
            "id":4,
            "title":"本地土豆",
            "img":"../../static/index/goodsList/4.png",
            "price":1.50,
            "unit":'斤'
          },
          {
            "id":5,
            "title":"红心番薯",
            "img":"../../static/index/goodsList/5.png",
            "price":1.80,
            "unit":'斤'
          },
          {
            "id":6,
            "title":"进口苹果",
            "img":"../../static/index/goodsList/6.png",
            "price":3.50,
            "unit":'斤'
          },
          {
            "id":7,
            "title":"雪梨",
            "img":"../../static/index/goodsList/7.png",
            "price":2.90,
            "unit":'斤'
          },
          {
            "id":8,
            "title":"优质猪肉",
            "img":"../../static/index/goodsList/8.png",
            "price":13.60,
            "unit":'斤'
          },
          {
            "id":9,
            "title":"优质土鸡蛋",
            "img":"../../static/index/goodsList/9.png",
            "price":23.00,
            "unit":'版'
          },
          {
            "id":10,
            "title":"新鲜四季豆",
            "img":"../../static/index/goodsList/10.png",
            "price":2.10,
            "unit":'斤'
          },
        ]
			}
		},
    // 滑动到页面底部加载下一页
    onReachBottom() {
    	// 正常要判断是否有数据，再添加 此处省略 
      this.goodsList.push(...this.goodsList)
    	console.log('我滚动到底部了')
    },
		onLoad() {
		},
		onShow() {
			
		},
		methods:{
      // 轮播图切换
      swiperChange(e) {
        // console.log(e)
      },
      // 轮播图点击
      swiperClick(e) {
        // console.log(e)
      },
      // 去商品详情页
      toDetails(item) {
        // 本地存储信息
        uni.setStorage({
          key:'goods',
          data:{...item}
        })
        uni.navigateTo({
          url:"/pages/index/goodsDetail"
        })
      }
		}
	}
</script>

<style lang="scss">
  .body{
    font-size: 32rpx;
    .title{
      font-size: 34rpx;
      padding: 24rpx;
    }
    .classMoudle{
      display: flex;
      padding: 20rpx;
      flex-wrap: wrap;
      .classBox{
        text-align: center;
        width: 20%;
        margin-bottom: 20rpx;
        .icon{
          width: 80rpx;
          height: 80rpx;
        }
        .text{
          font-size: 28rpx;
        }
      }
    }
    .activityMoudle{
      display: flex;
      padding: 10rpx 20rpx;
      .activityBox{
        width: 50%;
        image{
          width: 100%;
          border-radius: 20rpx;
          height: 300rpx;
        }
        margin-right: 20rpx;
      }
      .activityBox:nth-child(2n){
        margin-right: 0;
      }
    }
    .goodsMoudle{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 10rpx 20rpx;
      .goodsBox{
        width: 48%;
        margin-bottom: 20rpx;
        image{
          width: 100%;
          box-shadow: 0rpx 2rpx 6rpx 0rpx;
        }
        .name{
          margin: 20rpx 0;
        }
        .text{
          display: flex;
          // justify-content: flex-end;
          .price{
            color: red;
          }
        }
      }
    }
  }
</style>
