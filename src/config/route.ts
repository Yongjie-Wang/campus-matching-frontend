// 定义一些路由
import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import UserPage from "../pages/UserPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import SearchPage from "../pages/SearchPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserRegisterPage from "../pages/UserRegisterPage.vue";
import TokenPage from "../pages/TokenPage.vue";
import UserTagPage from "../pages/UserTagPage.vue";
import TeamTokenPage from "../pages/TeamTokenPage.vue";
import OtherUserInfo from "../pages/OtherUserInfo.vue";
import CommonFollow from "../pages/CommonFollow.vue";
import PersonSpace from "../pages/PersonSpace.vue";
import FollowObjects from "../pages/FollowObjects.vue";


const routes = [
    { path: '/', component: Index },
    { path: '/team', title: '找队伍', component: Team },
    { path: '/team/add', title: '创建队伍', component: TeamAddPage },
    { path: '/team/update', title: '更新队伍', component: TeamUpdatePage },
    { path: '/user', title: '个人信息', component: UserPage },
    { path: '/space', title: '空间', component: PersonSpace },
    { path: '/search', title: '找伙伴', component: SearchPage },
    { path: '/user/list', title: '用户列表', component: SearchResultPage },
    { path: '/user/edit', title: '编辑信息', component: UserEditPage },
    { path: '/user/login', title: '登录', component: UserLoginPage },
    { path: '/user/update', title: '更新信息', component: UserUpdatePage },
    { path: '/user/team/join', title: '加入队伍', component: UserTeamJoinPage },
    { path: '/user/followed', title: '关注对象', component: FollowObjects },
    { path: '/user/team/create', title: '创建队伍', component: UserTeamCreatePage },
    { path: '/user/register', title: '注册用户', component: UserRegisterPage },
    { path: '/user/Token', title: '聊天室', component: TokenPage },
    { path: '/team/TeamToken', title: '队伍聊天室', component: TeamTokenPage },
    { path: '/user/edit/tag', title: '编辑标签', component: UserTagPage },
    { path: '/user/other/info', title: '用户资料', component: OtherUserInfo },
    { path: '/user/other/commonFollow', title: '共同关注', component: CommonFollow },
]

export default routes;
