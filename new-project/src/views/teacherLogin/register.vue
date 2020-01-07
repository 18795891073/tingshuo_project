<template>
    <div>
        <div class="cover">
            <!-- 大白背景 -->
            <div class="large_bg">
                <!-- 页头内容 -->
                <div class="title">
                    <span>新用户注册</span>
                    <div>
                        <img src="../../assets/images/main.png" alt="图片加载失败">
                        <span>网站首页</span>
                    </div>
                </div>
                <!-- 提示 -->
                <div class="hint">
                    <img src="../../assets/images/careful.png" alt="图片加载失败">
                    <span>贴心提示：请勿设置与邮箱密码相同的登录密码或支付密码，防止不法分子窃取您的账户信息，</span>
                    <span>谨防诈骗</span>
                </div>
                <!-- form表单 -->
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" style="width:500px;">
                    <el-form-item label="用户名" prop="userName">
                        <el-input type="text" v-model="ruleForm2.userName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="登录密码" prop="pass">
                        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="ruleForm2.email"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="ruleForm2.region" placeholder="男">
                            <el-option label="男" value=1></el-option>
                            <el-option label="女" value=0></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="用户类型">
                        <el-select v-model="ruleForm2.character" placeholder="学生">
                            <el-option label="学生" value='xuesheng'></el-option>
                            <el-option label="老师" value='laoshi'></el-option>
                            <el-option label="识别员" value='shibieyuan'></el-option>
                            <el-option label="审核员" value='shenheyuan'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code" style="width:252px;">
                        <el-input type="text" v-model="ruleForm2.code" auto-complete="off"></el-input>
                        <!-- 验证码图片生成 -->
                        <div class="code" @click="refreshCode" style="margin:-45px 0 0 180px;">
                            <s-identify :identifyCode="identifyCode"></s-identify>
                        </div>
                    </el-form-item>
                    <el-form-item style="text-align:center;margin:30px 0 0 -35px">
                        <el-button type="primary" @click="submitForm('ruleForm2')" style="width:120px;height:40px;text-align:center;line-height:1;margin-right:10px;">注册</el-button>
                        <el-button @click="resetForm('ruleForm2')" style="width:120px;height:40px;text-align:center;line-height:1;">重置</el-button>
                    </el-form-item>
                </el-form>   
            </div>
        </div>
        <!-- 页脚说明 -->
        <div class="footer">
            <ul>
                <li>关于听说</li>
                <li>|</li>
                <li>加入听说</li>
                <li>|</li>
                <li>下载中心</li>
                <li>|</li>
                <li>常见问题</li>
                <li>|</li>
                <li>渠道联盟</li>
            </ul>
            <div style="font-size:13px;color:#777;">Copyright © 2008-2019 南京听说科技有限公司 All Rights Reserved 电信增值业务许可证:苏B2-20160570</div>
        </div>
    </div>  
</template>
<script>
import { home } from '@/api'

export default {
    name:"SIdentifyd",
    data(){
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm2.checkPass !== '') {
                    this.$refs.ruleForm2.validateField('checkPass');
                }
            callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码!'));
            } else if (value !== this.ruleForm2.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        var validataCode = (rule, value, callback) =>{
            if( this.ruleForm2.code === ''  ){
                callback(new Error('验证码为空！'))
            } else if( this.ruleForm2.code.toUpperCase() !== this.identifyCode.toUpperCase() ){
                callback(new Error('验证码输入错误!'))
            }else{
                callback();
            }
        };
        return{
            ruleForm2: {
                pass: '',
                checkPass: '',
                userName:'',
                email:'',
                region:'',
                character:'',
                code:'',

            },
            rules2: {
                pass: [
                    { validator: validatePass, required:true, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, required:true, trigger: 'blur' }
                ],
                userName: [
                    {required:true,message:'请输入用户名',trigger:'blur'},
                    {min:3,max:8,message:'长度在3到5个字符',trigger:'blur'}
                ],
                email:[
                    {required:true,message:'请输入邮箱地址',trigger:'blur'},
                    {type:'email',message:'请输入正确的邮箱地址',trigger:'blur,change'}
                ],
                code:[
                    { validator: validataCode, required:true,trigger:'blur'}
                ]
            },
            identifyCodes:'1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
            identifyCode:"",
        }
    },
    mounted(){
        this.identifyCode = "";
        this.makeCode(this.identifyCodes,4);
    },
    methods:{
        // 注册按钮触发
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var data = {
                        username:this.ruleForm2.userName,
                        password1:this.ruleForm2.pass,
                        password2:this.ruleForm2.checkPass,
                        email:this.ruleForm2.email,
                        sex:this.ruleForm2.region,
                        identity:this.ruleForm2.code
                    };
                    home.register(data).then( res=>{
                        this.$router.push('/login');
                    }).catch( err=>{
                        this.refreshCode();
                        alert(err);
                    })    
                } else {
                    this.refreshCode();
                    return false;
                }
            });
        },
        // 重置按钮触发
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        randomNum(min,max){
            return Math.floor(Math.random() * (max-min) + min);
        },
        // 验证码图片点击事件 
        refreshCode(){
            this.identifyCode = "";
            this.makeCode(this.identifyCodes,4);
        },
        makeCode(o,l){
            for(let i=0;i<l;i++){
                this.identifyCode += this.identifyCodes[this.randomNum(0,this.identifyCodes.length)];
            }
        },
    },
}
</script>
<style  scoped>
.cover{
    width:600px;
    border:1px solid #999;
    border-radius:3px;
    margin:30px auto 0;
}
.large_bg{
    margin:20px;
}
.title{
    display:flex;
}
.title>span{
    display:inline-block;
    width:120px;height:50px;
    background:#999;
    text-align:center;
    line-height:50px;
    border-radius:5px;
}
.title div{
    width:150px;height:50px;
    margin-left:300px;
    display:flex;
    align-items: center;
}
.title div img{
    margin-right:13px;
    width:20px;
}
.title div span{
    font-size:12px;
}
.hint{
    width:100%;height:20px;
    line-height: 20px;
    margin:20px 0  50px 0;
}
.hint span{
    font-size:12px;
}
.hint img{
    width:15px;
    margin-bottom:-2px;
}
.footer{
    margin:0 0 30px 632px;
}
.footer ul{
    margin:80px 0 30px 120px;
    display:flex;
}
ul li{
    list-style: none;
    margin-right:10px;
    font-size:13px;
    color:#777;
}
ul li:hover{
    color:#999;
    cursor: pointer;
}
.code{
    margin:8px 0 5px 68px;
    width:150px;
    height:50px;
    border:1px solid red;
}
</style>