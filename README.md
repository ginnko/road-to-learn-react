## react学习之路笔记

- npm init -y:-y 标记将把你的 package.json 内容初始化成默认值
- 安装react
  1. npm install react react-dom
  2. 设置babel支持jsx和es6
- 零配置使用react

  `npm install create-react-app`

  `create-react-app xxxxxx`
- 由`create-react-app`创建的项目附带以下脚本,这些脚本在package.json文件中
  - npm start
  - npm test  运行所有测试
  - npm run build 构建项目的产品文件
- 可以在render()中, return之前使用js,比如定义变量
- 在html中,使用花括号{}括起来变量名可以将变量引入JSX中,当做普通变量一样使用
- JSX将html内部属性class替换成className
- 尽量使用**const**和**let**替代**var**
  - **const**:被const声明的变量不能被重新赋值或重新声明,即不能再被改变.如果这个变量是数组或对象,其中的元素是可以改变的.**声明的变量是块级作用域**.必须在声明的时候初始化.
  - **let**如果想改变变量,就使用let声明
- ReactDOM.render()
  - 第一个参数: 准备渲染的JSX
  - 第二个参数: 指定React应用在html中放置的位置
- 模块热替换(HMR)
  在浏览器中重新加载应用的工具,无需再让浏览器刷新页面.在入口文件index.js中添加下述代码:

  ````
  if(module.hot){
    module.hot.accept();
  }
  ````
  代码改变,应用本身会被重新加载,应用的状态会被保持,但是页面不会刷新重载.

- 代码中返回多个元素要包在一个元素中
  ````
  list.map(function(item){
  return (
    <div>
      <span><a href={item.url}>{item.title}</a></span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
    </div>
  );
})
````
- key属性
  应该在React中添加一个辅助属性。如此，React在列表发生变化的时候就可以识别其中成员的添加、更改和删除的状态。

  **key值应该是个稳定的值，不能将对象元素的索引作为key值!!!**