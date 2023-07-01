<template>
  <template v-if="user">
      <div style="margin-left: 120px">
          <van-image
                  round
                  width="10rem"
                  height="10rem"
                  position="center"
                  :src="user.avatarUrl"
          />
      </div>

    <van-cell title="当前用户" :value="user?.username" />
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我关注的人" is-link to="/user/followed" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
      <div style="margin: 16px; margin-top: 150px">
          <van-button round block type="warning" @click="logout()" >
              退出登入
          </van-button>
      </div>
  </template>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";

import {getCurrentUser} from "../services/user";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";

const router = useRouter();
const route = useRoute();

const user = ref();


onMounted(async () => {
  user.value = await getCurrentUser();
})

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}
    const logout = async () => {
    const res = await myAxios.post('/user/logout', {

    })
    console.log(res, '用户注销');
    if (res.code === 0 && res.data) {
        Toast.success('退出成功');
        // 跳转到之前的页面
        const redirectUrl = route.query?.redirect as string ?? '/user/login';
        window.location.href = redirectUrl;
    } else {
        Toast.fail('登录失败');
    }
};
</script>

<style scoped>

</style>
