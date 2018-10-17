let path=require('path')
let HtmlWebpackPlugin=require('html-webpack-plugin')//配置html的插件
let webpack=require('webpack')
let CleanWebpackPlugin=require('clean-webpack-plugin')//用于在构建之前删除/清除构建文件夹(防止文件重复打包)
let ExtractTextWebpackPlugin=require('extract-text-webpack-plugin');//以link的方式引入css

let CssExtract=new ExtractTextWebpackPlugin({
  filename:'css/css.css',
})
let PurifycssWebpack=require('purifycss-webpack')//清除多余样式
let glob=require('glob')
let CopyWebpackPlugin=require('copy-webpack-plugin')//将不需要打包的文件直接拷贝到目标目录

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
          {loader:'postcss-loader'}
          ]
        })
      },//匹配规则 css后缀的文件 
     
    ]
  },//配置模块
  plugins:[
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
    new PurifycssWebpack({
      paths: glob.sync(path.resolve('src/*.html')),
    }),//清除掉目标目录多余的样式
    new CleanWebpackPlugin(['./build']),
    
  ],//插件配置 没打包一次清理之前留下的缓存
  mode:'development',//可以更改模式
  resolve:{},//配置解析
}