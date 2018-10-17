let str =require('./a.js')
console.log(str)
console.log('yoo')
document.getElementById('app').innerHTML=str
import './style.css'

if(module.hot){
  module.hot.accept();
} //如果hot插件存在,启用热更新
