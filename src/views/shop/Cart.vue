<template>
  <div class="mask"
    v-if="showCart && calculations.count > 0"
    @click="changeCartShow"
  ></div>
  <div class="cart">
    <div class="product" v-if="showCart">
      <div class="product__header" v-if="calculations.count > 0">
        <div
          class="product__header__all"
          @click="setCartItemChecked(shopId)"
        >
          <span
            class="product__header__icon iconfont"
            v-html="calculations.allCheaked ? '&#xe652;': '&#xe7ae;'"
          ></span>
          全选
        </div>
        <div
          class="product__header__clear"
        >
          <span class="product__header__clear__btn" @click="cleanCartProducts(shopId)">清空购物车</span>
        </div>
      </div>
      <div
        class="product__item"
        :key="item._id"
        v-for="item in productList"
      >
        <div
          class="product__item__checked iconfont"
          v-html="item.check ? '&#xe652;': '&#xe7ae;'"
          @click="changeCartProductItemInfoCheck(shopId, item._id)"
        ></div>
        <img class="product__item__img" :src=item.imgUrl alt="">
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;{{ item.price }}</span>
            <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <span class="product__number__minus" @click="() => { changeCartItemInfo(shopId, item._id, item, -1) }">-</span>
          {{ cartList?.[shopId]?.productList[item._id]?.count || 0 }}
          <span class="product__number__add" @click="() => { changeCartItemInfo(shopId, item._id, item, 1) }">+</span>
        </div>
      </div>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check__icon__img"
          @click="changeCartShow"
        />
        <div class="check__icon__tag">{{ calculations.count }}</div>
      </div>
      <div class="check__info">
        总计: <span class="check__info__price">&yen; {{ calculations.price }}</span>
      </div>
      <div class="check__btn">
        <router-link :to="{ path: `/orderConfirmation/${shopId}` }">去结算</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'

// 获取购物车信息逻辑
const useCartEffect = (shopId) => {
  const store = useStore()
  const { productList, calculations } = useCommonCartEffect(shopId)

  const changeCartProductItemInfoCheck = (shopId, productId) => {
    store.commit('changeCartItemChecked', { shopId, productId })
  }

  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId })
  }

  const setCartItemChecked = (shopId) => {
    store.commit('setCartItemChecked', { shopId })
  }

  return { calculations, productList, changeCartProductItemInfoCheck, cleanCartProducts, setCartItemChecked }
}

// 购物车栏显示逻辑
const toggleCartEffect = () => {
  const showCart = ref(false)

  const changeCartShow = () => {
    showCart.value = !showCart.value
  }

  return { changeCartShow, showCart }
}

export default {
  name: 'cartPart',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { changeCartShow, showCart } = toggleCartEffect()
    const { calculations, productList, changeCartProductItemInfoCheck, cleanCartProducts, setCartItemChecked } = useCartEffect(shopId)
    const { changeCartItemInfo, cartList } = useCommonCartEffect(shopId)
    return { calculations, productList, changeCartProductItemInfoCheck, cleanCartProducts, setCartItemChecked, changeCartItemInfo, cartList, shopId, showCart, changeCartShow }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 1;
}

.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: $bg-color;
}

.check {
  display: flex;
  border-top: .01rem solid $content-bgcolor;
  line-height: .49rem;

  &__icon {
    position: relative;
    width: .84rem;

    &__img {
      display: block;
      margin: .12rem auto;
      width: .28rem;
      height: .26rem;
    }

    &__tag {
      position: absolute;
      padding: 0 .04rem;
      min-width: .2rem;
      left: .46rem;
      top: .04rem;
      height: .2rem;
      line-height: .2rem ;
      color: $bg-color;
      background-color: $highline-font;
      border-radius: .1rem;
      font-size: .12rem;
      transform: scale(.5);
      transform-origin: left center;
      text-align: center;
    }
  }

  &__info {
    flex: 1;
    color: $content-fontcolor;
    font-size: .12rem;

    &__price {
      color: $highline-font;
      font-size: .18rem;
    }
  }

  &__btn {
    right: 0;
    width: .98rem;
    background-color: $theme-color;
    text-align: center;
    color: $bg-color;
    font-size: .14rem;
    a {
      color: #fff;
      text-decoration: none;
    }
  }
}

.product {
  overflow-y: scroll;
  flex: 1;
  background: $bg-color;

  &__header {
    display: flex;
    line-height: .52rem;
    border-bottom: .01rem solid $content-bgcolor;
    font-size: .14rem;
    color: $content-fontcolor;

    &__all {
      width: .64rem;
      margin-left: .18rem;
    }

    &__icon {
      display: inline-block;
      margin-right: .1rem;
      vertical-align: top;
      color: $theme-color;
      font-size: .2rem;
    }

    &__clear {
      flex: 1;
      margin-right: .16rem;
      text-align: right;

      &__btn {
        display: inline-block;
      }
    }
  }

  &__item {
    position: relative;
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid $content-bgcolor;

    &__checked {
      line-height: .5rem;
      margin-right: .2rem;
      color: $theme-color;
      font-size: .2rem;
    }

    &__detail {
      overflow: hidden;
    }

    &__img {
      height: .46rem;
      width: .46rem;
      margin-right: .16rem;
    }

    &__title {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }

    &__price {
      margin: .06rem 0 0 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $highline-font;
    }

    &__yen {
      font-size: .12rem;
    }

    &__origin {
      margin-left: .06rem;
      line-height: .2rem;
      font-size: .12rem;
      color: $light-fontcolor;
      text-decoration: line-through;
    }

    .product__number {
      position: absolute;
      right: 0;
      bottom: .26rem;

      &__minus, &__add {
        display: inline-block;
        width: .2rem;
        height: .2rem;
        line-height: .16rem;
        border-radius: 50%;
        font-size: .2rem;
        text-align: center;
      }

      &__minus {
        border: .01rem solid $medium-fontcolor;
        color: $medium-fontcolor;
        margin-right: .05rem;
      }

      &__add {
        background: $theme-color;
        color: $bg-color;
        margin-left: .05rem;
      }
    }
  }
}
</style>
