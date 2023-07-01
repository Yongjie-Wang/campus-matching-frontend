<template>

    <div class="my-container">
        <van-image
            radius="8px"
                width="300"
                height="150"
                src="https://pic.dmjnb.com/pic/b9b918ea010b5768a6a1cc1568f9f2de"
                animation="heartBeat"/>
    </div>
    <van-form class="my-form" @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                    v-model="userAccount"
                    name="userAccount"
                    label="账号"
                    placeholder="请输入账号"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                    class="my-field"
            />
            <van-field
                    v-model="userPassword"
                    type="password"
                    name="userPassword"
                    label="密码"
                    placeholder="请输入密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                    class="my-field"
            />
        </van-cell-group>
        <div style="margin-top: 20px">
            <van-button class="my-button" round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
    <div class="my-link" >
        <span style="margin-right: 8px ; margin-top: 5px">还没有账号?</span>
        <router-link to="/user/register">
            <van-button size="small" color="black" plain>注册</van-button>
            <a>  </a>
        </router-link>
    </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";

const router = useRouter();
const route = useRoute();

const userAccount = ref('');
const userPassword = ref('');
const imgUrl="https://pic.imgdb.cn/item/6457455a0d2dde577713e6c3.jpg";

const onSubmit = async () => {
  const res = await myAxios.post('/user/login', {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  })
  console.log(res, '用户登录');
  if (res.code === 0 && res.data) {
    Toast.success('登录成功');
    // 跳转到之前的页面
    const redirectUrl = route.query?.redirect as string ?? '/';
    window.location.href = redirectUrl;
  } else {
    Toast.fail('登录失败');
  }
};

</script>

<style scoped>
@import 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.min.css';
body {
    background-color: #f2f2f2;
}

.my-form {
    margin: 16px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.my-field {
    border: 1px solid #ccc;
    border-radius: 4px;
}

.my-button:hover {
    background-color: #3e8e41;
}
.my-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background-color: #f2f2f2;
}
.my-link{
    margin-left: 230px;


}
</style>
