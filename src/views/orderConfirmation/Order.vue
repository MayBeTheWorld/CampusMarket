<!-- 订单底部组件 -->
<template>
  <div class="order">
    <div class="order__price">实付金额 <b>￥{{ calculations.price }}</b></div>
    <div class="order__btn" @click="handleShowConfirmChange(true)">提交订单</div>
  </div>
  <div
    class="mask"
    v-show="showConfirm "
    @click="handleShowConfirmChange(false)"
  >
    <div class="mask__content" @click.stop>
      <h3 class="mask__content__title">确认离开收银台？</h3>
      <p class="mask__content__ desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn"
          @click="handleConfirmOrder(true)"
        >取消支付</div>
        <div
          class="mask__content__btn mask__content__btn--last"
          @click="handleConfirmOrder(false)"
        >确认支付</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { post } from '@/utils/request'
import { useCommonCartEffect } from '../../effects/cartEffects'

// 与下订单相关逻辑
const useMakeOrderEffect = (shopId, shopName, productList) => {
  const router = useRouter()
  const store = useStore()
  const handleConfirmOrder = async (isCanceled) => {
    const products = []
    for (const i in productList.value) {
      const product = productList.value[i]
      products.push({ id: parseInt(product._id, 10), num: product.count })
    }
    console.log(shopName)
    try {
      const result = await post('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled: isCanceled,
        products
      })
      console.log(result)
      if (result?.errno === 0) {
        store.commit('clearCartData', shopId)
        router.push({ name: 'OrderList' })
      }
    } catch (e) {
      // 提示下单失败
    }
  }
  return { handleConfirmOrder }
}

// 蒙层展示相关逻辑
const useShowMaskEffect = () => {
  const showConfirm = ref(false)
  const handleShowConfirmChange = (status) => {
    showConfirm.value = status
  }
  return { showConfirm, handleShowConfirmChange }
}

export default {
  name: 'OrderComponent',
  setup () {
    const route = useRoute()
    // parseInt将参数转化为数字
    const shopId = parseInt(route.params.id, 10)
    const { productList, shopName, calculations } = useCommonCartEffect(shopId)
    const { handleConfirmOrder } = useMakeOrderEffect(shopId, shopName, productList)
    const { showConfirm, handleShowConfirmChange } = useShowMaskEffect()
    return { calculations, handleShowConfirmChange, handleConfirmOrder, showConfirm }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.order {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: .49rem;
  line-height: .49rem;
  background: $bg-color;

  &__price {
    flex: 1;
    text-indent: .24rem;
    font-size: .14rem;
    color: $content-fontcolor;
  }

  &__btn {
    width: .98rem;
    background: $theme-color;
    color: $bg-color;
    text-align: center;
    font-size: .14rem;
  }
}

.mask {
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);

  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.56rem;
    background: #fff;
    border-radius: .04rem;
    text-align: center;

    &__titel {
      margin: .24rem 0 0 0;
      line-height: .26rem;
      font-size: .18rem;
      color: #333;
    }

    &__desc {
      margin: .08rem 0 0 0;
      font-size: .14rem;
      color: #666;
    }

    &__btns {
      display: flex;
      margin: .24rem .58rem;
    }

    &__btn {
      flex: 1;
      width: 8rem;
      line-height: .32rem;
      border: .01rem solid $theme-color;
      border-radius: .16rem;
      color: $theme-color;
      font-size: .14rem;

      &--last {
        margin-left: .24rem;
        background: $theme-color;
        color: #fff;
      }
    }
  }
}
</style>
