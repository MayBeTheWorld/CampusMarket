<template lang="">
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click='handleBackClick'>&#xe60a;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe609;</span>
        <input
          class="search__content__input"
          placeholder='请输入商品名称'
        />
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-if='item.imgUrl' />
    <Content :shopName='item.name' />
    <Cart />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'
import Content from './Content.vue'
import Cart from './Cart.vue'

// 获取商店信息
const useShopInfoEffect = () => {
  const route = useRoute()
  const item = ref('')
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      item.value = result.data
    }
  }
  return { item, getItemData }
}

// 点击回退
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}

export default {
  name: 'ShopView',
  components: { ShopInfo, Content, Cart },
  setup () {
    const { item, getItemData } = useShopInfoEffect()
    const { handleBackClick } = useBackRouterEffect()
    getItemData()
    return { item, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.wrapper {
  padding: 0 .18rem;
  overflow-y: hidden;
}

.search {
  margin: .14rem 0 .04rem 0;
  line-height: .32rem;
  display: flex;

  &__back {
    font-size: .24rem;
    width: .3rem;
    color: #b6b6b6;
  }

  &__content {
    display: flex;
    flex: 1;
    background: $input-color;
    border-radius: .16rem;

    &__icon {
      width: .44rem;
      text-align: center;
      color: $placeholder-color;
    }

    &__input {
      display: block;
      padding-right: .2rem;
      border: none;
      outline: none;
      background: none;
      height: .32rem;
      width: 100%;
      font-size: .14rem;

      &::placeholder {
        color: $placeholder-color;
      }
    }
  }
}
</style>
