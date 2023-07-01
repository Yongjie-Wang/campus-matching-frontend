<template>
    <div class="friend-circle">
        <van-skeleton
                title
                avatar
                :row="3"
                :loading="props.loading"
                v-for="user in props.userList"
                :key="user.id"
        >
            <div class="friend-card">
                <div class="friend-avatar-container">
                    <img :src="user.avatarUrl" class="friend-avatar"/>
                    <div class="friend-info">
                        <span class="friend-username">{{ user.username }}</span>
                        <p class="friend-time">{{ formatDate(user.createTime) }}</p>
                    </div>
                </div>
                <div class="friend-content">
                    <p class="friend-post">{{ user.post }}</p>
                </div>
                <div class="friend-footer">

                    <van-icon
                            name="chat-o"
                            size="22"
                            style="margin-right: 8px"/>

                    <van-icon
                        :name="getLikeIcon(user)"
                        :size="22"
                        :color="getLikeColor(user)"
                        @click="handleLike(user)"
                            :badge="user.bage"
                        style="margin-right: 4px"
                    />
                </div>
            </div>
        </van-skeleton>
    </div>
</template>
<script setup lang="ts">
import {UserType} from "../models/user";
import {useRouter} from "vue-router";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";

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
const handleLike =async (user: any) => {
    const isLiked = user.isBadge;
    let res = await myAxios.post(`/space/liked`, {
        id: user.id,
        liked: user.isBadge
    });
    if (res.code === 0) {
        if(user.isBadge){
            user.bage-=1;
        }else{
            user.bage+=1;
        }

        user.isBadge = !isLiked;
        return res.data;
    }else{
        Toast.fail("操作异常")
    }
//         发送请求
}
const getLikeIcon= (user:any)=>{
    return  user.isBadge ? 'like' : 'like-o'
}
const getLikeColor= (user:any)=>{
    return  user.isBadge  ? '#ee0a24' : '#000'
}

// const formatDate = (dateStr) => {
//     const dateTime = new Date(dateStr);
//     const year = dateTime.getFullYear();
//     const month = String(dateTime.getMonth() + 1).padStart(2, '0');
//     const day = String(dateTime.getDate()).padStart(2, '0');
//     const hour = String(dateTime.getHours()).padStart(2, '0');
//     const minute = String(dateTime.getMinutes()).padStart(2, '0');
//     return `${year}-${month}-${day} ${hour}:${minute}`;
// }
const formatDate = (dateStr) => {
    const currentTime = new Date();
    let targetTime = new Date(Date.parse(dateStr));
    targetTime = new Date(targetTime.getTime() - (8 * 3600 * 1000)); // 添加8个小时的偏移量

    const diffInSeconds = Math.floor((currentTime - targetTime) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds} 秒前`;
    } else if (diffInSeconds < 3600) {
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        return `${diffInMinutes} 分钟前`;
    } else if (diffInSeconds < 86400) {
        const diffInHours = Math.floor(diffInSeconds / 3600);
        return `${diffInHours} 小时前`;
    } else {
        const diffInDays = Math.floor(diffInSeconds / 86400);
        return `${diffInDays} 天前`;
    }
};

</script>

<style scoped>
.friend-circle {
    padding: 10px;
    background-color: #f3f5f8;
}

.friend-card {
    margin-bottom: 10px;
    background-color: #fff;
    padding: 10px;
}

.friend-avatar-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.friend-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.friend-info {
    display: flex;
    flex-direction: column;
}

.friend-username {
    font-weight: bold;
}

.friend-time {
    font-size: 12px;
    color: #888;
}

.friend-content {
    margin-bottom: 10px;
}

.friend-post {
    text-indent: 2em;
}

.friend-footer {
    display: flex;
    justify-content: flex-end;
}
</style>
