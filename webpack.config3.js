let path=require('path')
let HtmlWebpackPlugin=require('html-webpack-plugin')//配置html的插件
let webpack=require('webpack')
let CleanWebpackPlugin=require('clean-webpack-plugin')//清除插件
let ExtractTextWebpackPlugin=require('extract-text-webpack-plugin');//以link的方式引入css
let ScssExtract=new ExtractTextWebpackPlugin({
  filename:'css/scss.css',
  disable:true,//使用时不支持热更新,所以开发环境下设置为true使其不生效,在打包上线时在设置为false
})//不同格式的css文件使用不同文件名
let CssExtract=new ExtractTextWebpackPlugin({
  filename:'css/css.css',
  disable:true,
})

module.exports={
  entry:'./src/index.js',//入口 可以设置多入口
  
  output:{
    filename:'build.js',//必须是绝对路径
    path:path.resolve('./build')//打包目标文件夹
  },//出口
  devServer:{
    contentBase:'./build',// 浏览器起始路径
    port:3000,//自定义端口
    compress:true,//服务器压缩
    open:true,//自动打开浏览器
    hot:true, //热更新
  },//开发服务器
  module:{
    rules:[//从右往左写
      {
        test:/\.css$/,use:CssExtract.extract({//css文件使用自定义的CssExtract
          fallback:'style-loader',//在抽离样式extract-text-webpack-plugin设置为true时生效,
        use:[
          {loader:'css-loader'},
          ]
        })
      },//匹配规则 css后缀的文件 
      {
        test:/\.scss$/,use:ScssExtract.extract({//scss文件使用自定义的ScssExtrect
          fallback:'style-loader',
        use:[
          {loader:'css-loader'},
          {loader:'sass-loader'}
          ]
        })
      }
    ]
  },//配置模块
  plugins:[
    ScssExtract,
    CssExtract,
    new webpack.HotModuleReplacementPlugin(),//webpack自带热更新插件
    new HtmlWebpackPlugin({
        template:'./src/index.html',//将打包过的js文件地址自动引入到这里,并一起打包到build目录下
        title:'学习webpack',//打包标题,在index.html的title输入<%=htmlWebpackPlugin.options.title%>
        hash:true,//随机字符串防浏览器缓存缓存
        // minify:{
        //   removeAttributeQuotes:true,//去除标签双引号
        //   collapseInlineTagWhitespace:true,//折叠空行
        // }
        //chunks:['index'],定义此html文件对应哪个js文件
    }),
    
    new CleanWebpackPlugin(['./build'])
  ],//插件配置 没打包一次清理之前留下的缓存
  mode:'development',//可以更改模式
  resolve:{},//配置解析
}