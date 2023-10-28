<!-- 静态部分组件 -->
<template>
  <div class="position">
    <span class="iconfont position__item">&#xe60e;</span>
    合肥工业大学宣城校区北区学生宿舍4号楼2层
    <span class="iconfont position__notice">&#xe608;</span>
  </div>
  <div class="search">
    <span class="iconfont">&#xe609;</span>
    <span class="search__text">床边挂篮</span>
  </div>
  <div class="banner">
    <img src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt="商品图片" class="banner__img" />
  </div>
  <div class="icons">
    <div class="icons__item" v-for="item in iconsList" :key="item.imageName">
      <img :src="`http://www.dell-lee.com/imgs/vue3/${item.imageName}.png`" alt="便捷功能" class="icons__item__img">
      <p class="icons__item__description">{{ item.desc }}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'StaticPart',
  setup () {
    const iconsList = reactive([
      { imageName: '超市', desc: '超市便利' },
      { imageName: '菜市场', desc: '菜市场' },
      { imageName: '水果店', desc: '水果店' },
      { imageName: '鲜花', desc: '鲜花绿植' },
      { imageName: '医药健康', desc: '医药健康' },
      { imageName: '家居', desc: '家具时尚' },
      { imageName: '蛋糕', desc: '烘培蛋糕' },
      { imageName: '签到', desc: '签到' },
      { imageName: '大牌免运', desc: '大牌免运' },
      { imageName: '红包', desc: '红包套餐' }])

    return { iconsList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';

.position {
  position: relative;
  padding: .16rem .24rem .16rem 0;
  line-height: .22rem;
  font-size: .16rem;
  color: $content-fontcolor;
  @include ellipsis;

  .position__item {
    // 这样写优先级更高，font-size可以生效
    font-size: .2rem;
    position: relative;
    top: .01rem;
  }

  .position__notice {
    position: absolute;
    right: 0;
    top: .17rem;
    font-size: .2rem;
  }
}

.search {
  line-height: .32rem;
  background: $input-color;
  color: $placeholder-color;
  border-radius: .16rem;
  margin-bottom: .12rem;

  .iconfont {
    position: relative;
    top: .02rem;
    font-size: .2rem;
    display: inline-block;
    padding: 0 .08rem 0 .16rem;
  }

  &__text {
    display: inline-block;
    font-size: .14rem;
  }
}

.banner {
  // 按照图片比例(图片高宽比，百分比相对屏幕宽度)设置底部填充宽度，提前将图片撑开，防止后续加载内容抖动
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;

  &__img {
    width: 100%;
  }
}

.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: .16rem;

  &__item {
    width: 20%;

    &__img {
      display: block;
      width: .4rem;
      height: .4rem;
      margin: 0 auto;
    }

    &__description {
      margin: .06rem 0 .16rem 0;
      text-align: center;
      color: $content-fontcolor;
    }
  }
}

.gap {
  margin: 0 -.18rem;
  height: .1rem;
  background: $content-bgcolor;
}
</style>
