<template>
    <div class="my-container">
        <van-image
            width="300"
            height="150"
                fit="cover"
                :src="imgUrl"
                animation="heartBeat"
        />
        <van-form class="my-form">
            <van-cell-group inset>
                <van-field
                        v-model="userAccount"
                        name="userAccount"
                        label="账号"
                        placeholder="账号长度不能低于5位"
                        :rules="[{ required: true, message: '请填写用户名' },{ min: 5, message: '账号长度不能低于5位' }]"
                        class="my-field"
                />
                <van-field
                        v-model="userPassword"
                        type="password"
                        name="userPassword"
                        label="密码"
                        placeholder="密码长度不能低于8位"
                        :rules="[{ required: true, message: '请填写密码' },{ min: 8, message: '密码长度不能低于8位' }]"
                        class="my-field"
                />
                <van-field
                        v-model="checkPassword"
                        type="password"
                        name="checkPassword"
                        label="确认密码"
                        placeholder="请确认密码"
                        :rules="[{ required: true, message: '请填写确认密码' }, { validator: validatePassword, message: '两次输入的密码不一致' }]"
                        class="my-field"
                />
                <van-field
                        v-model="email"
                        name="email"
                        label="邮箱"
                        type="email"
                        placeholder="请输入邮箱"
                        :rules="[
    { required: true, message: '请填写邮箱' }, { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$/, message: '邮箱格式不正确' }

  ]"
                />

                <div style="float: left;left: 0px;">
                    <div style="width: 75%;display: inline-block;;margin-right: 8px">
                        <van-field
                                v-model="code"
                                name="email"
                                label="验证码"
                                type="email"
                                placeholder="请输入验证码"
                                :rules="[{ required: true, message: '请填写验证码' }]"
                                class="my-field"
                        />
                    </div>
                    <van-button type="success" :disabled="isDisabled" @click="sendMessage">
                        {{ isDisabled ? `${countDown}s` : '发送' }}
                    </van-button>
                </div>
            </van-cell-group>
            <div style="margin-top: 20px">
                <van-button class="my-button" round block type="primary" @click="submintInfo()">
                    注册
                </van-button>
            </div>
        </van-form>
        <div class="my-link">
            <span>已经有账号?</span>
            <router-link to="/user/login">
                <van-button size="small" plain>登录</van-button>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
import {ref} from 'vue';
import myAxios from '../plugins/myAxios';
import {Toast} from 'vant';

const router = useRouter();

const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');
const email = ref('');
const imgUrl = 'https://pic.dmjnb.com/pic/aa2dc4459d55397cbf1cd5c0c990fa38';
const code = ref('');
let isDisabled = ref(false);
let countDown = ref(60);

const validatePassword = (value: string) => {
    return value === checkPassword.value;
};

const submintInfo = async () => {
    const res = await myAxios.post('/user/register', {
        userAccount: userAccount.value,
        userPassword: userPassword.value,
        checkPassword: checkPassword.value,
        email: email.value,
        code: code.value,


    });
    console.log(res, '用户注册');
    if (res.code === 0 && res.data) {
        Toast.success('注册成功');
        // 跳转到登录页面
        router.push('/user/login');
    } else {
        Toast.fail('注册失败');
    }
};
const sendMessage = async () => {
    if(email.value===''){
        Toast.fail('请输入邮箱');
        return ;
    }
    isDisabled.value = true;

    // 启动计时器，60s 后恢复按钮状态
    setTimeout(() => {
        isDisabled.value = false;
        countDown.value = 60;
    }, 60000);

    // 每秒更新倒计时
    const timer = setInterval(() => {
        countDown.value--;
        if (countDown.value < 1) {
            clearInterval(timer);
        }
    }, 1000);
    console.log()
    const res = await myAxios.post('/user/sendMessage', {
        email: email.value,
        code: code.value,
    })
    if (res.code === 0) {
        Toast.success('发送成功！');
        // 跳转到之前的页面
    } else {
        Toast.fail('发送失败,' + res.description);
    }
}
</script>

<style scoped>
@import 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.min.css';

body {
    background-color: #f2f2f2;
}

.my-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px;
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

.my-link {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.my-link span {
    margin-right: 5px;
}


</style>
