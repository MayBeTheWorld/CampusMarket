<template>
  <div class="shop" :key="item._id">
    <img :src="item.imgUrl" class="shop__img">
    <div
      :class="{'shop__content': true, 'shop__content--bordered': hideBorder ? false: true}"
    >
      <div class="shop__content__title">
        {{ item.name }}
      </div>
      <div class="shop__content__tags">
        <div class="shop__content__tag">月售: {{ item.sales }}</div>
        <div class="shop__content__tag">起送: {{ item.expressLimit }}</div>
        <div class="shop__content__tag">基础运费: {{ item.expressPrice }}</div>
      </div>
      <p class="shop__content__highlight">{{ item.slogan }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: ['item', 'hideBorder']
}
</script>

<stylel lang="scss" scoped>
@import '../style/variables.scss';
.shop {
  display: flex;
  padding-top: .12rem;

  &__img {
    margin-right: .16rem;
    width: .56rem;
    height: .56rem;
  }

  &__content {
    flex: 1;
    padding-bottom: .12rem;

    &--bordered {
      border-bottom: 1px solid $content-bgcolor;
    }

    &__title {
      line-height: .22rem;
      font-size: .16rem;
      color: $content-fontcolor;
    }

    &__tags {
      display: flex;
      margin-top: .08rem;
      line-height: .18rem;
      font-size: .13rem;
      color: $content-fontcolor;
      flex-direction: row;
    }

    &__tag {
      display: block;
      margin: 0 .16rem 0 0;
    }

    &__highlight {
      margin: .08rem 0 0 0;
      line-height: .18rem;
      font-size: .13rem;
      color: $highline-font;
    }
  }
}
</stylel>
