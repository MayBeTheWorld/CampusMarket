<template>
  <div class="top">
    <div class="top__bgcolor"></div>
    <div class="top__header">
      <div
        class="iconfont top__header__back"
        @click="handleBackClick"
      >&#xe60a;</div>
      确认订单
    </div>
    <div class="top__receiver">
      <div class="top__receiver__title">收货地址</div>
      <div class="top__receiver__address">合肥工业大学宣城校区北区学生宿舍4号楼2层</div>
      <div class="top__receiver__info">
        <span class="top__receiver__info__name">
          钟（先生）
        </span>
        <span class="top__receiver__info__num">18911923288</span>
      </div>
      <div class="iconfont top__receiver__enter">&#xe60a;</div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'TopArea',
  setup () {
    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }
    return { handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.top {
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgb(0,145,255,0.00) 4%, $theme-color 50%);
  background-repeat: no-repeat;

  &__header {
    position: relative;
    padding-top: .26rem;
    line-height: .24rem;
    color: $bg-color;
    text-align: center;
    font-size: .16rem;

    &__back {
      position: absolute;
      left: .18rem;
      font-size: .22rem;
    }
  }

  &__receiver {
    position: absolute;
    left: .18rem;
    right: .18rem;
    bottom: 0;
    height: 1.11rem;
    background: $bg-color;
    border-radius: .04rem;

    &__title {
      line-height: .22rem;
      padding: .16rem 0 .14rem .16rem;
      font-size: .16rem;
      color: $content-fontcolor;
    }

    &__address {
      line-height: .2rem;
      padding: 0rem .4rem 0 .16rem;
      font-size: .14rem;
      color: $content-fontcolor;
    }

    &__info {
      padding: .06rem 0 0 .16rem;
      color: $medium-fontcolor;

      &__name {
        margin-right: .06rem;
        line-height: .18rem;
        font-size: .12rem;
      }
    }

    &__enter {
      transform: rotate(180deg);
      position: absolute;
      right: .16rem;
      top: .5rem;
      font-size: .16rem;
      color: $medium-fontcolor;
    }
  }
}
</style>
