<template>
    <template v-if="user">
        <div class="qq-profile">
               <div class="header">
            <van-image class="avatar" :src="user.avatarUrl"  />

            <div class="info">
                <h2>{{ user.username }}</h2>
                <p>{{ user.profile }}</p>
            </div>
                   <van-button type="primary" round :loading="loading" @click="toggleFollow">
                       {{ isFollowed ? '取消关注' : '关注' }}
                   </van-button>

        </div>
            <van-divider />
            <van-divider />

            <van-cell-group>
                <!--                <van-cell icon="info-o" title="个人资料" is-link />-->
                <van-cell icon="like-o"  title="共同关注" is-link to="/user/other/commonFollow"  @click="toSelect(user.id)" />
                <van-cell icon="photograph" title="相册" is-link />
                <van-cell icon="music-o" title="音乐" is-link />
                <van-cell icon="video-o" title="视频" is-link />
            </van-cell-group>
            <van-cell-group>
                <van-cell title="手机" :value="user.phone"  />
                <van-cell title="Email" :value="user.email"  />
                <van-cell title="地址" value="江西宜春" />
            </van-cell-group>

<!--        <van-cell title="当前用户" :value="user?.username" />-->


        </div>
    </template>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
let loading = ref(false)
let isFollowed = ref(false)

const router = useRouter();
const route = useRoute();
let otherUserId=route.query.userId
const user = ref();


onMounted(async () => {
    user.value = await getOherUser(otherUserId);
    isFollowed.value=await selectUserState(otherUserId);

})
const toggleFollow = async () => {
    try {
        if (isFollowed.value) {
            loading .value=true;
            await unfollowUser(user.id);
        } else {
            loading .value=true;
            await followUser(user.id);
        }
        isFollowed.value = !isFollowed.value;
        loading.value=false;
    } catch (error) {
        console.log(error);
    }
};
const selectUserState = async( otherUserId: string) => {
    let res = await myAxios.get(`/user/isFollowed/${otherUserId}`);
    if (res.code === 0) {
        // setCurrentUserState(res.data
        // console.log("thisUser",res.data)
        return res.data;
    } else {
        console.log("select user failed");
        return null;
    }
}

const getOherUser = async( otherUserId: string) => {
    let res = await myAxios.get(`/user/selectUser/${otherUserId}`);
        // setCurrentUserState(res.data
        // console.log("thisUser",res.data)
        return res.data;

}
const followUser = async( otherUserId) => {
    let res = await myAxios.get(`/user/followeUser/${user.value.id}`);
}
const unfollowUser = async( otherUserId) => {
    let res = await myAxios.get(`/user/unFollowUser/${user.value.id}`);
}
const toSelect = (id) => {
    router.push({
        path: '/user/other/commonFollow',
        query: {
           id
        }
    })
}


</script>

<style scoped>
.qq-profile {
    padding: 20px;
}

.qq-profile .header {
    display: flex;
    align-items: center;
}

.qq-profile .avatar {
    margin-right: 20px;
    border-radius: 10px;
    width: 80px;
    height: 80px;
}

.qq-profile .info {
    flex: 1;
}

.qq-profile .info h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.qq-profile .info p {
    font-size: 1rem;
}
</style>
