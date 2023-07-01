<template>
    <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
        <van-card
                :desc="user.profile"
                :title="user.username"
                :thumb="user.avatarUrl"
                class="custom-card"
        >
            <template #tags>
                <van-tag plain type="danger" v-for="tag in user.tags" :key="tag" class="user-tag">
                    {{ tag }}
                </van-tag>
                <van-tag v-if="user.isOnline" plain type="success" class="user-tag">
                    在线
                </van-tag>
            </template>
            <template #footer>
                <van-button class="van-button" size="small" plain type="primary" @click="toUserInfo(user.id)">深度了解</van-button>
                <van-button  class="van-button" size="small" plain type="success" @click="ToToken(user.avatarUrl,user.username)">联系我</van-button>
            </template>
        </van-card>
    </van-skeleton>
</template>
<script setup lang="ts">
import {UserType} from "../models/user";
import {useRouter} from "vue-router";

interface UserCardListProps {
    loading: boolean;
    userList: UserType[];
}
const router = useRouter();

const props = withDefaults(defineProps<UserCardListProps>(), {
    loading: true,
    // @ts-ignore
    userList: [] as UserType[],

});
const ToToken = (avatarUrl: any,username:any) => {
    router.push({
        path: "/user/Token",
        query: {
            avatarUrl,
            username,
        }
    })
}
const toUserInfo = (userId : any) => {
    router.push({
        path: "/user/other/info",
        query: {
          userId
        }
    })
}

console.log("resultPage")
console.log(props.userList)

</script>

<style scoped>
.custom-card {
    border-radius: 8px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
}



.custom-card .user-tag {
    margin-right: 6px;
    margin-top: 6px;
}

.custom-card .van-button {
    margin-top: 10px;
}

.custom-card .van-button:first-child {
    margin-right: 6px;
}
</style>
