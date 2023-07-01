<template>
    <!--展示-->
    <div class="container">
        <van-icon name="cross" size="25" class="icon-left" @click="downConnect()"/>
        <!--        <p class="title">{{ team.name }}</p>-->
        {{ user.username }}

    </div>
    <div id="Content" style="overflow-y: scroll;">

    </div>


    <div id="input">
        <textarea v-model="text" type="text" placeholder="在此输入内容..." id="input_text"></textarea>
        <div style="clear:both"></div>
        <!--按钮-->
        <div>
            <van-button block type="primary" id="submit" @click="doSearchResult">发送</van-button>
        </div>

    </div>

</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
// import {getCurrentUserState} from "../states/user";
import {getCurrentUser} from "../services/user";
// import {currentID} from "../states/currentID";
import {Toast} from "vant";

const route = useRoute();
const router = useRouter();
const user = route.query;
let nowTime = ref(null);
let Token = ref([]);
const text = ref(null);
let currentUser  = ref();
let messageBox = ref(null)


console.log(user)
const timestampToTime = (times) => {
    let time = times[1]
    let mdy = times[0]
    mdy = mdy.split('/')
    let month = parseInt(mdy[0]);
    let day = parseInt(mdy[1]);
    let year = parseInt(mdy[2])
    return year + '-' + month + '-' + day + ' ' + time
}

nowTime = timestampToTime(new Date().toLocaleString('en-US', {hour12: false}).split(" "));
//打印结果为：2022-8-31 11:08:34


onMounted(async () => {
    currentUser = await getCurrentUser();
    doSearchResult();
})
onMounted(async () => {
    currentUser = await getCurrentUser();
    messageBox= document.querySelector("#Content");
    var item = sessionStorage.getItem(user.username);
    messageBox.innerHTML=item
    doSearchResult();
})
const downConnect=()=>{
    messageBox= document.querySelector("#Content");
    sessionStorage.setItem(user.username,messageBox.innerHTML);
    router.back();

}
const doSearchResult = () => {

    const name = user.username;
    const  ws = new WebSocket("ws://localhost:8081/api/chat");
    // const ws = new WebSocket("ws://124.221.242.250:8081/api/chat");
    ws.onopen = () => {
        console.log("Socket 已连接");
    }
    if (text.value !== "") {
        Token.value.push(text.value);

    }


    /**
     *接受数据
     * @param ev
     */
    ws.onmessage = (ev) => {
        try{
            console.log(ev)
            const data = ev.data;
            const parse = JSON.parse(data);
            console.log(parse.message)
            // Get.value.push(parse.message);
            let querySelector = document.querySelector("#Content");
            let img = document.createElement("img");
            img.src = user.avatarUrl;
            img.style.width = "50px";
            img.style.height = "50px";
            img.style.marginTop = "5%";
            querySelector.appendChild(img)
            let span = document.createElement("span");
            span.style.width = "100%";
            span.style.marginTop = "-10%";
            span.style.marginLeft = "18%";
            span.style.float = "left";
            span.style.position = "relative ";
            span.innerHTML=   ' <imput  type="text" style="background-color:  #24a3f6; padding: 7px;border-radius: 10px "  >' +parse.message  +'</imput>'
            querySelector.appendChild(span)
            let br = document.createElement("br");
            querySelector.appendChild(br)
            console.log(querySelector)
        }catch (e){
            console.log(e)
        }

    }

    /**
     **关闭连接时将聊天记录存储
     */
    ws.onclose = () => {
        sessionStorage.setItem(user.username, Token);
        console.log("Socket已关闭");
    }


    const json = {"toName": name, "message": text.value}
    console.log(json)
    console.log(JSON.stringify(json))
    ws.onerror = function () {
        Toast.fail("Socket发生了错误");
        //此时可以尝试刷新页面
    }

    /**
     * 发送对话
     */
    ws.addEventListener('open', function () {
        console.log(json)
        if (text.value === "" || text.value === null) {
            return;
        } else {
            ws.send(JSON.stringify(json))

            let querySelector = document.querySelector("#Content");
            let span = document.createElement("span");
            span.innerHTML =   ' <imput  type="text" style="background-color:rgb(137,217,97); padding: 7px; border-radius: 10px"   >' +text.value  +'</imput>'
            span.id = "mes_right";
            span.style.width = "200px"
            span.style.float = "right";
            span.style.width = "100%";
            span.style.textAlign = "right";
            span.style.marginRight = "18%"
            span.style.marginTop = "5%"
            span.style.wordBreak = "break-all"
            querySelector.appendChild(span)
            let img = document.createElement("img");
            img.src = currentUser.avatarUrl
            img.style.width = "50px";
            img.style.height = "50px";
            img.style.marginLeft = "85%";
            img.style.marginTop = "-9%";
            querySelector.appendChild(img)
        }
        text.value = "";
    });

}
</script>

<style scoped>
#Content {
    width: 99.9%;
    height: 460px;
    background-color: #f0f0f0;

}

#input textarea {
    width: 99.9%;
    height: 50px;
    border-style: solid none none none;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 12px;
    font-size: 16px;
    resize: none;
    overflow-y: hidden; /* 初始化时隐藏滚动条 */
    transition: height 0.3s ease; /* 高度过渡效果 */
}
#input textarea :focus {
    outline: none;
    box-shadow: 0 0 0 2px #cbd6ff;
}

#input {
    width: 98.9%;
    height: 80px;
}

#input input {
    width: 99.9%;
    height: 80px;
}

#input button {
    float: right;
    width: 80px;
    height: 40px;
    line-height: 40px;
    border-radius: 8px;
}




#submit {
    width: 100px;
}
/* 输入框样式 */
#input {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
}
.container {
    /*display: flex;*/
    /*align-items: center;*/
    text-align: center;
    margin-right: 35px;
}

.icon-left {

    float: left;
    margin-left: 10px; /* 如果需要在icon右侧添加一些间距，可以增加这个属性值 */
}


</style>
