<template>
  <view class="body">
    <!-- 商品图片 -->
    <image class="goodsImage" :src="goods.img" mode="aspectFit" @click="preview"></image>
    <!-- 产品信息 -->
    <view class="goodsInfoMoudle">
      <view class="title">{{goods.title}}•本地自产优质农产品</view>
      <view class="text">
        <view class="price">￥{{goods.price}}</view>
        <view class="unit">/{{goods.unit}}</view>
      </view>
      <view class="otherInfo">
        <view>产地:中国内陆</view>
        <view>城市:重庆</view>
        <view>包装方式:食用农产品</view>
        <view>规格:见包装</view>
        <view>净含量:见包装</view>
        <view>保质期:见包装</view>
      </view>
    </view>
    <!-- 提升信息 -->
    <view class="tipsMoudle">价格保护•72小时包退(拆开后无效)•闪电退款•缺货退•不支持花呗等套现渠道支付</view>
    <!-- 平台功能 -->
    <view class="functionMoudle">
      <view class="textBox">
        <view class="title">门店自提</view>
        <view class="text">每天16点提货，门店不同时间可能会有差异，详见社群通知。</view>
      </view>
      <view class="textBox">
        <view class="title">在线下单</view>
        <view class="text">每天23点前可选购明日送达的商品，送货时间以订单为准。</view>
      </view>
      <view class="textBox">
        <view class="title">售后无忧</view>
        <view class="text">若购买的商品有问题，可联系团长处理，部分商品联系平台。</view>
      </view>
    </view>
    <!-- 用户评论 -->
    <view class="commentMoudle">
      <view class="commentTop">
        <view class="title">用户评价(117)</view>
        <view class="more">查看更多></view>
      </view>
      <view class="commentBox">
        <view class="userInfo">
          <image class="avatar" src="https://wx.qlogo.cn/mmhead/zmjO2ryQ8jOf81tvMPRiaCsic7tpicKsAbjqRxt40wAE3ekd3650hmic5rGaDibzERVrOibuCjnNK6GIs/0" mode=""></image>
          <view class="name">Nice</view>
        </view>
        <view class="text">很新鲜，物美价廉，好评!!</view>
      </view>
    </view>
    <!-- 底部模块 -->
    <view class="bottomMoudle">
      <view class="leftBox">
        <view class="text" @click="toHome">首页</view>
        <view class="text" @click="showCart">购物车<view class="badge" v-if="cartNum>0">{{cartNum}}</view></view>
      </view>
      <view class="rightBox">
        <view class="addButton" @click="addCart">加入购物车</view>
        <view class="buyButton">立即购买</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        //商品信息
        goods:{
          "id":0,
          "title":"商品名称",
          "img":"../../static/index/goodsList/1.png",
          "price":"价格",
          "unit":'单位'
        },
        cartNum:0, //数量
        cartList:[], //购物车列表
      }
    },
    onLoad(option) {
      // 重定向
      let that = this
      // 拿取本地存储信息
      uni.getStorage({
      	key: 'goods',
      	success: function (res) {
          // 赋值
          that.goods = res.data
      	}
      });
      uni.getStorage({
      	key: 'cartList',
      	success: function (res) {
          // 赋值
          that.cartList = res.data
          that.cartNum = that.cartList.length
      	}
      });
    },
    methods: {
      // 点击放大图片
      preview() {
        // console.log(this.goods.img)
        let arr = []
        // 图片与点击不一致 原因：预览图片要用https//:  从后端返的路径   本地图片有bug
        // 此处只做效果显示
        arr.push('https://gd-hbimg.huaban.com/9615d1750b93f86748756c268dc421b869b56a3959a0f-l9eg5e_fw658webp')
        console.log(arr)
        uni.previewImage({
          urls:arr,
          current:0
        })
      },
      // 去首页
      toHome() {
        uni.switchTab({
          url:"/pages/index/index"
        })
      },
      // 添加购物车
      addCart() {
        if(this.cartNum<99){
          let cartList = this.cartList
          if(cartList.length>0){
            let isAdd = true
            cartList.map((item)=>{
              if(item.id==this.goods.id){
                this.$u.toast('已添加过此商品')
                isAdd = false
              }
            })
            if(isAdd){
              cartList.push({...this.goods})
              this.cartNum+=1
              this.$u.toast('添加成功')
            }
          }else{
            cartList.push({...this.goods})
            // 角标+1
            this.cartNum+=1
          }
          this.cartList = cartList
          uni.setStorage({
            key:"cartList",
            data:cartList
          })
        }else{
          this.$u.toast('购物车至多为99')
        }
      },
      // 显示购物车
      showCart() {
        let that = this
        uni.getStorage({
        	key: 'cartList',
        	success: function (res) {
            // 赋值
            that.cartList = res.data
        	}
        });
        console.log(this.cartList)
      }
    },
    beforeDestroy() {
      // 离开页面时删除本地存储 优化性能
      uni.setStorage({
        key:'goods',
        data:''
      })
    }
  }
</script>

<style lang="scss">
  .body{
    font-size: 32rpx;
    padding-bottom: 120rpx;
    .goodsImage{
      width: 100vw;
      height: 600rpx;
      border-bottom: 1rpx solid #eee;
    }
    .goodsInfoMoudle{
      .title{
        font-size: 34rpx;
        padding: 0 20rpx;
      }
      .text{
        padding: 0 20rpx;
        margin: 10rpx 0;
        display: flex;
        .price{
          color: red;
        }
      }
      .otherInfo{
        border: 1rpx solid #eee;
        margin: 10rpx 0;
        padding: 10rpx;
      }
    }
    .tipsMoudle{
      background-color: #eee;
      padding: 20rpx;
      white-space: nowrap;
      width: 95%;
      text-overflow: ellipsis;
      overflow: hidden;
      margin-bottom: 10rpx;
    }
    .functionMoudle{
      .textBox{
        padding: 30rpx;
        padding-right: 120rpx;
        border-top: 1rpx solid #eee;
        font-size: 38rpx;
        background-repeat: no-repeat;
        background-position: 95% center;
        .title{
          margin-bottom: 10rpx;
        }
        .text{
          font-size: 28rpx;
          color: #666;
        }
      }
      .textBox:nth-child(1){
        background-image: url(../../static/index/funcationList/3.png);
        background-size: 60rpx 60rpx;
      }
      .textBox:nth-child(2){
        background-image: url(../../static/index/funcationList/1.png);
        background-size: 60rpx 60rpx;
      }
      .textBox:nth-child(3){
        background-image: url(../../static/index/funcationList/2.png);
        background-size: 60rpx 60rpx;
        border-bottom: 1rpx solid #eee;
      }
    }
    .commentMoudle{
      padding: 20rpx;
      padding-bottom: 0;
      .commentTop{
        display: flex;
        justify-content: space-between;
        margin-bottom: 20rpx;
      }
      .commentBox{
        border-bottom: 1rpx solid #eee;
        padding-bottom: 20rpx;
        margin-bottom: 20rpx;
        .userInfo{
          display: flex;
          align-items: center;
          .avatar{
            width: 120rpx;
            height: 120rpx;
            border-radius: 50%;
            margin-right: 10rpx;
          }
        }
      }
      .commentBox:last-child{
        margin-bottom: 0;
        border-bottom: none;
      }
    }
    .bottomMoudle{
      display: flex;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #fff;
      justify-content: space-between;
      height: 80rpx;
      padding: 20rpx;
      align-items: center;
      border-top: 1rpx solid #eee;
      .leftBox,.centerBox,.rightBox{
        display: flex;
        font-size: 24rpx;
      }
      .leftBox{
        .text:nth-child(1){
          color: #000;
          padding-top: 40rpx;
          margin-right: 30rpx;
          background-image: url(../../static/home.png);
          background-position: top center;
          background-repeat: no-repeat;
          background-size: 40rpx;
        }
        .text:nth-child(2){
          color: #000;
          padding-top: 40rpx;
          margin-right: 20rpx;
          background-image: url(../../static/cart.png);
          background-position: top center;
          background-repeat: no-repeat;
          background-size: 40rpx;
          position: relative;
          .badge{
            position: absolute;
            width: 30rpx;
            line-height: 30rpx;
            text-align: center;
            top: -8rpx;
            right: 0;
            font-size: 18rpx;
            border-radius: 50%;
            background-color: #f56c6c;
            color: #fff;
          }
        }
      }
      .rightBox{
        view{
          line-height: 78rpx;
          text-align: center;
          border-radius: 100rpx;
          font-size: 34rpx;
          width: 260rpx;
          color: #fff;
          font-weight: 600;
        }
        .addButton{
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          background: linear-gradient(to right,#ffca00,#ff9502);
        }
        .buyButton{
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          background: linear-gradient(to right,#ff7600,#ff5300);
        }
      }
    }
  }
</style>