## react学习之路笔记

### React简介
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

- 箭头函数
  - 普通函数的this：普通函数表达式总会定义它自己的this对象
  - 箭头函数表达式的this：箭头函数表达式会使用包含它的语境下的this对象
  - 箭头函数使用简洁函数体，简洁函数体的返回不用显示声明。
  - 对比普通函数体，简洁函数体去掉了函数声明表达式，花括号，返回声明
  - 箭头后是一个表达式（可以使用括号括起来）
  ````
    (param1, param2, …, paramN) => expression
    // equivalent to: => { return expression; }
    ```` 
  - 箭头后是一个花括号
    需要返回要写return

- ES6类
  - 示例
  ````
  class Developer{
    constructor(firstname, lastname){
      this.firstname = firstname;
      this.lastname = lastname;
    }
    getName(){
      return this.firstname + ' ' + this.lastname;
    }
  }


  //实例化
  const robin = new Developer('Robin', 'Wieruch');
  console.log(robin.getName());
  ````
- ReactDOM.render()是应用连接DOM的入口方法

### React基础
- 组件的构造函数
  当使用ES6编写的组件有一个构造函数时，它需要强制地调用super()
  可以在构造函数中调用super(props)，它会在构造函数中设置this.props以供在构造函数中访问它们。
  **使用ES6类组件可以在构造函数中初始化组件的状态，构造函数只会在组件初始化时调用一次**

- 简写

  - 构造函数初始化中，this.state中的元素键名和键值如果同名可以使用简写
    ```
    this.state = {
      list: list,
    };

    =>
    this.state = {
      list,
    };

  - 简洁的初始化一个对象方法
  ````
  var userService = {
    getUserName: function(user){
      return user.firstname + '' + user.lastname;
    },
  };

  =>

  const userService = {
    getUserName(user){
      return user.firstname + '' + user.lastername;
    },
  };

  - 可以使用计算属性名
- 元素处理器 onClick
- 单向数据流
  在界面中通过onClick触发一个动作，再通过函数或类方法修改组件的state，最后组件的render()方法再次运行并更新界面。
- this绑定
  如果在构造函数中不手动绑定this，那么在函数中，函数内部的this为undefined，假如此时想访问this.state，由于this为undefined，所以不能被检索到。此时的绑定就是为了确保this在类方法中可以被访问。需要将this绑定到类方法上。
  ````
  //this也可以绑定在render()方法中
    class ExplainBindingsComponent extends Component {
      onClickMe() {
        console.log(this);
      }
      //我感觉render()函数和其他定义的函数相比应该是特殊的，this能自动流入
      render() {
        return (
          <button
          onClick={this.onClickMe.bind(this)}
          type="button"
          >
          Click Me
          </button>
        );
      }
    }
  ````
