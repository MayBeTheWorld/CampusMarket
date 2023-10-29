<!-- 底部一级页面栏组件 -->
<template>
  <div class="docker">
    <div v-for="(item, index) in dockerList" :class="{ 'docker__item': true, 'docker__item--active': index === 0 }"
      class="docker__item" :key="item.icon">
      <!-- 这里使用的v-html可以对符号编码进行转义  -->
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon"></div>
        <div class="docker__title">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'DockerPart',
  // eslint-disable-next-line space-before-function-paren
  setup() {
    const dockerList = reactive([
      { icon: '&#xe603;', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe601;', text: '购物车', to: { name: 'CartList' } },
      { icon: '&#xe606;', text: '订单', to: { name: 'Home' } },
      { icon: '&#xe605;', text: '我的', to: { name: 'Home' } }
    ])
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';

.docker {
  display: flex;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0 .18rem;
  width: 100%;
  height: 0.49rem;
  border-top: 1px solid $content-bgcolor;
  color: $content-fontcolor;

  &__item {
    flex: 1;
    text-align: center;

    a {
      color: $content-fontcolor;
      text-decoration: none;
    }

    .iconfont {
      font-size: .18rem;
      margin: .07rem 0 .02rem 0;
    }

    &--active {
      a {
      color: $theme-color;
      }
    }
  }

  &__title {
    font-size: .2rem;
    // 我们要展示10像素大小的子，但浏览器默认最小12像素,可以使用缩放
    transform: scale(0.5, 0.5);
    // transform-origin定义缩放的中心点
    transform-origin: center top;
  }
}
</style>
