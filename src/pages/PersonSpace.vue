<template>
    <div>
        <van-cell center title="个人空间">
            <van-button type="primary" icon="plus" style="z-index: 999;" round @click="showPopup"/>
        </van-cell>
        <van-pull-refresh v-model="loading2" @refresh="onRefresh">


        <SpaceCardList :user-list="userList" :loading="loading"/>

        <van-empty v-if="!userList || userList.length < 1" description="数据为空"/>
        <van-popup v-model:show="popupVisible" position="center" class="custom-popup">
            <div class="popup-content">
                <div class="input-field">
                    <textarea v-model="content" class="content-field" placeholder="在此输入内容..."
                              id="input_text"></textarea>
                </div>
                <div class="button-group">
                    <van-button @click="closePopup" type="danger" plain round block>
                        取消
                    </van-button>
                    <van-button type="primary" @click="publish" round block>
                        发布
                    </van-button>
                </div>
            </div>
        </van-popup>
        </van-pull-refresh>

    </div>
</template>
<script setup lang="ts">
import {ref, watchEffect} from 'vue';
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {UserType} from "../models/user";
import SpaceCardList from "../components/SpaceCardList.vue";
const userList = ref([]);
const loading = ref(true);
const loading2 = ref(true);
const popupVisible = ref(false)
let content = ref('')

const onRefresh = () => {
    setTimeout(() => {
        loadData();
        Toast('刷新成功');
        loading2.value = false;
    }, 1000);
};
/**
 * 加载数据
 */
 const loadData = async () => {
    let userListData;
    loading.value = true;
    // 普通模式，直接分页查询用户
    userListData = await myAxios.get('/space/select', {
        params: {
            pageSize: 8,
            pageNum: 1,
        },
    })
        .then(function (response) {
            console.log('/user/recommend succeed', response);
            return response?.data?.records;
        })
        .catch(function (error) {
            console.error('/user/recommend error', error);
            Toast.fail('请求失败');
        })

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
const showPopup = () => {
    popupVisible.value = true
}
const closePopup = () => {
    popupVisible.value = false; // 隐藏弹出窗口
    content.value = ''; // 清空发布内容
}
const publish = async () => {
    // 在这里执行发布操作，可以将content.value提交到后端或执行其他操作
    // 普通模式，直接分页查询用户
    try {
        // todo 前端参数校验
        const response = await myAxios.post('/space/add',
            // 将 content.value 作为请求的数据进行提交
            {
                context: content.value
            });
        loadData();
        console.log('/space/add成功');
    } catch (error) {
        console.error('/space/add出错', error);
    }

    console.log('发布内容：', content.value);
    closePopup(); // 发布后关闭弹出窗口
}


</script>

<style scoped>


.custom-popup {
    width: 80%;
    height: 70%;
    max-height: calc(100vh - 120px);
    background-color: #f5f6f7;
    overflow-y: auto;
    padding: 20px;
    border-radius: 50px; /* 添加圆角 */
}

.popup-content {
    display: flex;
    width: 250px;
    border-radius: 70px;
    flex-direction: column;
    justify-content: space-between;
    height: 300px;
}

.input-field {
    flex-grow: 1;
    margin-bottom: 20px;
}

.content-field {
    width: 100%;
    height: 100%;
    min-height: 150px;
    padding: 12px;
    resize: vertical;
    font-size: 14px;
    border: 1px solid #999999;
    border-radius: 4px;
}

.button-group {
    display: flex;
    justify-content: space-between;
}
</style>
