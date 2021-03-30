<template>
    <div class="headNav">
        <div class="header-user-con">
            <!-- 中英文 -->
            <div class="CE" @click="changeLocale">
                <img :src="CE"  alt="">
            </div>
            <!-- <el-menu 
                class="el-menu-demo" 
                mode="horizontal" 
                >
                <el-submenu index="1" popper-class="langItem">
                    <template slot="title">
                        <img :src="langLogo" class='langAvatar' alt="">
                    </template>
                    <el-menu-item index="1-1" @click="changeLocale('zh')">
                        <img :src="chinaImg" class='langAvatar' alt="">
                        <span class="intro">中文</span>
                    </el-menu-item>
                    <el-menu-item index="1-2" @click="changeLocale('en')">
                        <img :src="americaImg" class='langAvatar' alt="">
                        <span class="intro">EngList</span>
                    </el-menu-item>
                </el-submenu>
            </el-menu> -->
            <!-- 全屏显示 -->
            <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <i class="el-icon-rank"></i>
                </div>
            </el-tooltip>
            <!-- 消息中心 -->
            <el-tooltip
                effect="dark"
                :content="message?`有${message}条未读消息`:`消息中心`"
                placement="bottom">
                <div class="btn-bell">
                    <router-link to="/msgCenter">
                        <el-badge is-dot :hidden='dotHidden' class="item">
                            <i class="el-icon-bell"></i>
                        </el-badge>
                    </router-link>
                </div>
            </el-tooltip>

            <!-- 用户头像 -->
            <div class="user-avator">
                <img src="../assets/images/avatar-2.jpg" />
            </div>
            <!-- 用户名下拉菜单 -->
            <el-dropdown class="user-name" @command="handleCommand">
                <span class="el-dropdown-link">
                    {{ms_username}}
                    <i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
                    <el-dropdown-item command="modifyInfo">修改信息</el-dropdown-item>
                    <el-dropdown-item command="login">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>

import CE from "@/assets/images/CE.png";

import { setToken } from '@/utils/jsCookie'

export default {
    data() {
        return {
            fullscreen: false,
            message: 2,
            ms_username: localStorage.getItem('ms_username'),
            dotHidden:false,
            CE:CE
        };
    },
    methods: {
        // 全屏
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        },
         // 切换语言
        changeLocale(){
            console.log(this.$i18n)
            let type = null;
            if(this.$i18n.locale === 'en'){
                type = 'zh';
            }else{
                type = 'en';
            }
            setToken('lang',type);
            this.$i18n.locale = type;
        },
        // 退出
        handleCommand(command) {
            if (command == "login") {
                localStorage.removeItem("ms_username");
            }
             this.$router.push(`/${command}`);
        }
    }
};
</script>
<style lang="less" scoped>
.headNav {
    width: 100%;
    height: 60px;
    background: #fff;
    line-height: 30px;
    .header-user-con {
        float: right;
        padding-right: 50px;
        display: flex;
        height: 60px;
        align-items: center;
        .CE,
        .btn-bell,
        .btn-fullscreen {
            // position: relative;
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border-radius: 3px;
            cursor: pointer;
            
        }
        .CE img{
            margin-top: 8px;
        }
        .btn-fullscreen .el-icon-rank{
            font-size: 26px;
            line-height: 40px;
            transform: rotate(45deg);
        }
        .btn-bell .el-icon-bell{
            font-size: 25px;
            color: #000;
        }
        .user-avator{
            margin: 0 10px 0 15px;
            img {
                display: block;
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }
        
    }
}
.CE:hover,
.btn-fullscreen:hover,
.btn-bell:hover{
    background: rgba(167, 167, 167, 0.2);
}

</style>
<style lang="less">
    .el-badge__content.is-fixed.is-dot{
        top: 5px;
    }
</style>