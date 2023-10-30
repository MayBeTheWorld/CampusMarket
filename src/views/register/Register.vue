<!-- 注册页面 -->
<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png" alt="">
    <div class="wrapper__input">
      <input class="wrapper__input__content"
        placeholder="请输入手机号"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <!-- autocomplete属性可以防止浏览器自动填充 -->
      <input class="wrapper__input__content"
        placeholder="请输入密码"
        type="password"
        autocomplete="new-password"
        v-model="password"
      />
    </div>
    <div class="wrapper__input">
      <input class="wrapper__input__content"
      placeholder="请确认密码"
      type="password"
      autocomplete="new-password"
      v-model="ensurement"
    />
    </div>
    <div class="wrapper__register-button" @click="handleRegister">注册</div>
    <div class="wrapper__register-link" @click="handleLoginClick">已有账号去登录</div>
    <Toast v-if="show" :message="toastMessage"/>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'

// 注册相关逻辑
const useRegisterEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: '',
    ensurement: ''
  })
  const handleRegister = async () => {
    try {
      const result = await post('/api/user/register', {
        username: data.username,
        password: data.password
      })
      if (result?.errno === 0 && ensurement === password) {
        showToast('注册成功')
        // 注册之后跳转Login页面
        setTimeout(() => {
          router.push({ name: 'Login' })
        }, 2000)
      } else {
        showToast('注册失败')
      }
    } catch {
      showToast('请求失败')
    }
    router.push({ name: 'Login' })
  }
  const { username, password, ensurement } = toRefs(data)
  return { username, password, ensurement, handleRegister }
}

// 登陆页面跳转逻辑
const useLoginEffect = () => {
  const router = useRouter()
  const handleLoginClick = () => {
    router.push({ name: 'Login' })
  }
  return { handleLoginClick }
}

export default {
  name: 'RegisterView',
  components: { Toast },
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, ensurement, handleRegister } = useRegisterEffect(showToast)
    const { handleLoginClick } = useLoginEffect()
    return { handleRegister, handleLoginClick, show, toastMessage, username, password, ensurement }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);

  &__img {
    display: block;
    margin: 0 auto .4rem auto;
    widows: .66rem;
    height: .66rem;
  }

  &__input {
    // box-sizing: ;
    height: .48rem;
    margin: 0 .4rem .16rem .4rem;
    padding: 0 .16rem;
    background: $content-bgcolor;
    border: 1px solid rgba(0, 0, 0, 0.10);
    border-radius: 6px;
    border-radius: 6px;

    &__content {
      line-height: .48rem;
      border: none;
      outline: none;
      width: 100%;
      background: $content-bgcolor;
      font-size: .16rem;
      color: $content-notice-fontcolor;

      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }

  &__register-button {
    margin: .32rem .4rem .16rem .4rem ;
    line-height: .48rem;
    background: $theme-color;
    box-shadow: 0 0.04rem .08remass 0 rgba(0, 145, 255, 0.32);
    border-radius: 4px;
    border-radius: 4px;
    color: $bg-color;
    font-size: .16rem;
    text-align: center;
  }

  &__register-link {
    text-align: center;
    font-size: .14rem;
    color: $content-notice-fontcolor;
  }
}
</style>
