const install = (Vue, vm) => {
	
	/**
	 * 是否登录
	 */
	const isLogin = () => {
		// 如果没有token, 跳转到登录页面
		const token = vm.vuex_token
		if (!token) {
			// 来自哪个页面
			const currentPage = getCurrentPages().pop()
			// 获取页面路径, 和请求参数
			const {options, route} = currentPage
			// 参数的key
			const optionsKeys = Object.keys(options)
			let params = ''
			if (optionsKeys.length !== 0) {
				params = optionsKeys.reduce((pre, current) => {
					return `${pre}${current}=${options[current]}&`
				}, '?').slice(0, -1)
			}
			// 缓存当前页, 用于登录或者注册之后的跳转
			uni.setStorageSync('back_url', route + params)
			
			vm.$u.toast('请登录')
			setTimeout(() => {
				vm.$u.route({
					type: 'redirect',
					url: 'pages/auth/login',
				})
			}, 1500)
			return false
		}
		
		return true
	}
	
	/**
	 * 更新用户信息, 更新vuex_user
	 */
	const updateUser = async () => {
		// 请求用户信息
		const userInfo = await vm.$u.api.userInfo()
		// 缓存用户信息
		vm.$u.vuex('vuex_user', userInfo)
	}
	
	/**
	 * 判断是否是安卓设备
	 */
	const isAndroid = () => {
		try {
		    const res = uni.getSystemInfoSync();
		    if(res.platform === 'android') return true
				return false
		} catch (e) {
		    // error
		}
	}
	
	/**
	 * 检测当前网络链接情况
	 */
  const networkType = () => {
      try {
        let results = true
        uni.getNetworkType({
          success: function (res) {
            if(res.networkType=='2g' || res.networkType=='3g' || res.networkType=='none'){
                console.log("当前网络:",res.networkType);
                vm.$u.toast('当前网络差请稍后再试~')
                results = false
            }else{
              results = true
            }
          },
        });
        return results
      } catch (e) {
          // error
      }
  }
  
	vm.$u.utils = {
		isLogin,
		updateUser,
		isAndroid,
    networkType
	}
}

export default {
	install
}