<template>
  <div class="wrapper">
    CartList
  </div>
  <Docker-part :currentIndex="1"/>
</template>

<script>
import DockerPart from '../../components/DockerPart.vue'
export default {
  name: 'CartList',
  components: {
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
