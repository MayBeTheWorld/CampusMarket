<!-- 首页 -->
<template>
  <div class="wrapper">
    <Static-part />
    <Nearby-part />
  </div>

  <Docker-part />
</template>

<script>
import StaticPart from './StaticPart.vue'
import NearbyPart from './NearbyPart.vue'
import DockerPart from './DockerPart.vue'
export default {
  name: 'HomeView',
  components: {
    StaticPart,
    NearbyPart,
    DockerPart
  }
}
</script>

<style lang="scss" scoped>

.wrapper {
  overflow-y: auto; //允许纵向滚动
  position: absolute;
  left: 0;
  top: 0;
  bottom: .5rem;
  right: 0;
  padding: 0 .18rem .2rem .18rem; //底部适当留白
}
</style>
