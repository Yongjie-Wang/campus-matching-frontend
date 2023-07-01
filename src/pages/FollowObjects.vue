<template>
    <user-card-list :user-list="userList" :loading="loading"/>
    <van-empty v-if="!userList || userList.length < 1" description="数据为空"/>
</template>

<script setup lang="ts">
import {ref, watchEffect} from 'vue';
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import UserCardList from "../components/UserCardList.vue";
import {UserType} from "../models/user";
import {useRoute, useRouter} from "vue-router";
const userList = ref([]);
const loading = ref(true);
const router = useRouter();
const route = useRoute();
let otherUserId=route.query.id

/**
 * 加载数据
 */
const loadData = async () => {
    console.log("用户id",otherUserId)
    let userListData;
    loading.value = true;
    // 普通模式，直接分页查询用户
    userListData = await myAxios.get('/follow/objects', {
        params: {
            size: 8,
            current: 1,
        },
    })
        .then(function (response) {
            // console.log('/user/recommend succeed');
            return response?.data?.records;
        })
        .catch(function (error) {
            console.error('/user/recommend error', error);
        });


    if (userListData) {
        userListData.forEach((user: UserType) => {
            if (user.tags) {
                user.tags = JSON.parse(user.tags);
            }
        })
        userList.value = userListData;

    }
    loading.value = false;
}

watchEffect(() => {
    loadData();
})

</script>

<style scoped>

</style>
