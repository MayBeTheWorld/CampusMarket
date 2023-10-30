<!-- 附近商家组件 -->
<template>
  <div class="nearby">
    <h3 class="nearby__title">附近卖家</h3>
    <ShopInfo
      v-for="item in nearbyList"
      :key="item._id"
      :item='item'
      @click="handleClick(item._id)"
      />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'

// 附件商家逻辑
const useNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    const result = await get('/api/shop/hot-list')
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data
    }
  }
  return { nearbyList, getNearbyList }
}

// 商家商品页面跳转逻辑
const useShopEffect = () => {
  const router = useRouter()
  const handleClick = (id) => {
    router.push({ name: 'Shop', params: { id: id } })
  }
  return { handleClick }
}

export default {
  name: 'NearbyPart',
  components: { ShopInfo },
  setup () {
    const { nearbyList, getNearbyList } = useNearbyListEffect()
    const { handleClick } = useShopEffect()
    getNearbyList()
    return { nearbyList, handleClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';

.nearby {
  &__title {
    margin: .16rem 0 .02rem 0;
    font-size: .18rem;
    font-weight: normal;
    color: $content-fontcolor;
  }
}
</style>
