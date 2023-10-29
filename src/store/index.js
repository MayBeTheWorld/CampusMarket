import { createStore } from 'vuex'

const setLocalCartList = (state) => {
  const { cartList } = state
  // 对象转化字符串
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocalCartList = () => {
  // { shopId: { shopName: '', productList: {productId: {} } } }
  try {
    return JSON.parse(localStorage.cartList)
  } catch (e) {
    return {}
  }
}

export default createStore({
  state: {
    // { shopId: { shopName: '', productList: {productId: {} } } }
    cartList: getLocalCartList()
  },
  getters: {
  },
  mutations: {
    // 购物车修改数量或者添加新商品功能
    changeCartItemInfo (state, payload) {
      const { shopId, productId, productInfo, num } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }
      let product = shopInfo.productList[productId]
      if (!product) {
        // 产品数量
        productInfo.count = 0
        // 产品是否选中
        productInfo.check = 0
        product = productInfo
      }
      product.count = product.count + num
      if (num > 0) { product.check = true }
      if (product.count < 0) { product.count = 0 }
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      console.log(state.cartList)
      setLocalCartList(state)
    },
    // 购物车数据结构中添加店铺名称
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      // 增加店铺名字段
      const shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    // 某一项选中功能
    changeCartItemChecked (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    // 清空购物车功能
    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    // 全选功能
    setCartItemChecked (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if (products) {
        for (const key in products) {
          const product = products[key]
          product.check = true
        }
      }
      setLocalCartList(state)
    },
    // 清空购物车
    clearCartData (state, shopId) {
      state.cartList[shopId].productList = {}
    }
  },
  actions: {
  },
  modules: {
  }
})
