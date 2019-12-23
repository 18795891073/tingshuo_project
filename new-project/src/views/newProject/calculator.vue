<template>
  <div class="center">
    <h1>实现计算器功能</h1> 
   <!-- <a href="https://github.com/guuibayer/simple-calculator" target="_blank"><i class="fa fa-github"></i></a> -->
    <form name="calculator">
      <input type="button" id="clear" class="btn other" value="C" @click="nth()">
      <input type="text" id="display" :value="value">
      <br>
      <input type="button" class="btn number " value="7" @click="get('7');">
      <input type="button" class="btn number" value="8" @click="get('8');">
      <input type="button" class="btn number " value="9" @click="get('9');">
      <input type="button" class="btn operator " value="+" @click="get('+');">
      <br>
      <input type="button" class="btn number " value="4" @click="get('4');">
      <input type="button" class="btn number " value="5" @click="get('5');">
      <input type="button" class="btn number " value="6" @click="get('6');">
      <input type="button" class="btn operator " value="*" @click="get('*');">
      <br>
      <input type="button" class="btn number " value="1" @click="get('1');">
      <input type="button" class="btn number " value="2" @click="get('2');">
      <input type="button" class="btn number " value="3" @click="get('3');">
      <input type="button" class="btn operator " value="-" @click="get('-');">
      <br>
      <input type="button" class="btn number " value="0" @click="get('0');">
      <input type="button" class="btn operator " value="." @click="get('.');">
      <input type="button" class="btn operator " value="/" @click="get('/');">			
      <input type="button" class="btn other" value="=" @click="calculates();">
    </form>
  </div>
</template>
<script>
export default {
  data(){
    return{
      value:'',
      result:0,
    }
  },
  mounted(){},
  methods:{
    nth(){
      this.value = ''
    },
    get(value){
			console.log(value)
			this.value += value;
    },
    calculates(){
			var result = 0;
			result = this.value
			this.value = '';
			this.value = eval(result);
    },
  }
}
</script>
<style scoped>
/* Basic Reset */
* {
	border: none;
	font-family: 'Open Sans', sans-serif;
	margin: 0;
	padding: 0;
}
.center {
	background-color: #999;
	border-radius: 50%;
	height: 600px;
	margin: auto;
	width: 600px;
}
h1 {
	color: #495678;
	font-size: 30px;	
	margin-top: 20px;
	padding-top: 50px;
	display: block;
	text-align: center;
	text-decoration: none;
}
a {
	color: #495678;
	font-size: 30px;	
	display: block;
	text-align: center;
	text-decoration: none;
	padding-top: 20px;
}
form {
	background-color: #495678;
	box-shadow: 4px 4px #3d4a65;
	margin: 40px auto;
	padding: 40px 0 30px 40px;	
	width: 280px;
}
.btn {
	outline: none;
	cursor: pointer;
	font-size: 20px;
	height: 45px;
	margin: 5px 0 5px 10px;
	width: 45px;
}
.btn:first-child {
	margin: 5px 0 5px 10px;
}
.btn, #display, form {
	border-radius: 25px;
}
#display {
	outline: none;
	background-color: #98d1dc;
	box-shadow: inset 6px 6px 0px #3facc0;
	color: #dededc;
	font-size: 20px;
	height: 47px;
	text-align: right;
	width: 165px;
	padding-right: 10px;
	margin-left: 10px;
}
.number {
	background-color: #72778b;
	box-shadow: 0 5px #5f6680;
	color: #dededc;
}
.number:active {
	box-shadow: 0 2px #5f6680;
  	-webkit-transform: translateY(2px);
  	-ms-transform: translateY(2px);
  	-moz-tranform: translateY(2px);
  	transform: translateY(2px);
}
.operator {
	background-color: #dededc;
	box-shadow: 0 5px #bebebe;
	color: #72778b;
}
.operator:active {
	box-shadow: 0 2px #bebebe;
  	-webkit-transform: translateY(2px);
  	-ms-transform: translateY(2px);
  	-moz-tranform: translateY(2px);
  	transform: translateY(2px);
}
.other {
	background-color: #e3844c;
	box-shadow: 0 5px #e76a3d;
	color: #dededc;
}
.other:active {
	box-shadow: 0 2px #e76a3d;
  	-webkit-transform: translateY(2px);
  	-ms-transform: translateY(2px);
  	-moz-tranform: translateY(2px);
  	transform: translateY(2px);
}
</style>