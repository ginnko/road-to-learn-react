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
  1. 如果在构造函数中不手动绑定this，那么在函数中，函数内部的this为undefined，假如此时想访问this.state，由于this为undefined，所以不能被检索到。**此时的绑定就是为了确保this在类方法中可以被访问**。需要将this绑定到类方法上。
    ````
    //this也可以绑定在render()方法中
      class ExplainBindingsComponent extends Component {
        constructor(){
          super();
          //react官方文档坚持使用这种绑定方法
          this.onClickMe = this.onClickMe.bind(this);
        }
        onClickMe() {
          console.log(this);
        }
        //我感觉render()函数和其他定义的函数相比应该是特殊的，this能自动流入
        render() {
          return (
            <button
            onClick={this.onClickMe}
            type="button"
            >
            Click Me
            </button>
          );
        }
      }
    ````
  2. 箭头函数自动绑定
  ```
  class ExplainBindingsComponent extends Component{
    onClick = () => {
      console.log(this);
    }

    ......
  }
  ```

- 传给事件处理器的表达式计算结果必须是函数
一个解决办法是将实际的功能函数存在一个空函数中

- 一个新的方法
string.includes(str):如果string中有str则返回true，否则返回false

- es6解构
使用解构时，左边对象变量名称要和右边对象key值名称一样，可以不考虑顺序

- 和表单交互
  - 在程序中加入搜索功能
    1. 给输入框onChange事件处理器传入一个函数，函数的参数传入event，使用event.target.value获取，再通过this.setState()设置新的状态。
    2. 在组件外定义一个高阶函数，这个高阶函数要接受组件内的状态作为参数，并返回一个函数根据条件求值。

- 不受控组件
表单元素比如`<input> <textarea> <select>`会以原生html的形式保存它们自己的状态。一旦有人从外部做了一些修改，它们就会修改内部的值。

**不受控组件变受控组件：手动设置上述元素的value值**

- 单向数据流<=>单页面应用

- 组件的拆分
通过组件外部属性传入和组件内部的props对象的属性解构来实现
- 组件的组合
使用props对象的children属性，children可以是简单的字符串，也可以是一个组件
```
  <Search 
    value={searchTerm}
    onChange={this.onSearchChange}
  >Search
  </Search>

  class Search extends Component{
  render(){
    const { value, onChange, children } = this.props;
    return(
      <form>
        {children} <input
          type="text"
          value={value}
          onChange={onChange} 
        />
      </form>
    );
  }
}
```
- 可复用组件
当没有制定className属性时，它的值就是一个空字符串，而不是undefined
```
class Button extends Component{
  render(){
    const {onClick, className, children} = this.props;
    return (
      <button
        onClick={onClick}
        className={className}
        type="button"
      >{children}</button>
    );
  }
}
```

- 函数式无状态组件
函数式无状态组件，接收一个props输入，返回一个普通的JSX组件实例。使用箭头函数形式简化函数式无状态组件（在参数中{a, b, c}表示props对象的解构）
1. 没有内部状态。不能使用this.state或者this.setState()
2. 没有生命周期方法。

- ES6组件
extends会注册所有生命周期方法，只要在React component API中，都可以在这个组件中使用。

- 样式
  1. 纯css
  2. 内联样式

- 生命周期
  1. constructor(): 它在组件初始化时被调用。在这个方法中，可以**设置初始化状态**以及**绑定类方法**；
  2. render(): 在组件挂载的过程中被调用，同时当组件更新的时候也会被调用。返回作为组件输出的元素。这个方法应该是一个纯函数，不应该在这个方法中修改组件的状态。
  3. componentWillMount():在render()方法之前被调用，可以用作去设置组件内部的状态，因为它不会触发组件的再次渲染。
  4. componentDidMount()：仅在组件挂载后执行一次。这是发起异步请求去API获取数据的绝佳时期。获取到的数据将保存在内部组件的状态中然后在render()生命周期方法中展示出来。
  5. componentWillReceiveProps(nextProps):这个方法在一个更新生命周期中被调用。新的属性会作为它的输入。因此你可以利用this.props来对比之后的属性和之前的属性，基于对比的结果去实现不同的行为。
  6. shouldComponentUpdate(nextProps, nextState)：每次组件因为状态或者属性更改而更新时，它都会被调用。在一个更新生命周期中，组件及其子组件将根据该方法返回的布尔值来决定是否重新渲染。
  7. componentWillUpdate(nextProps, nextState):这个方法是render（）执行前的最后一个方法。此刻已经拥有下一个属性和状态，它们可以在这个方法中任由你处置，可以利用这个方法在渲染前进行最后的准备
  8. componentDidUpdate(prevProps, prevState):这个方法在render（）之后立即调用。可以把它当成操作dom或者执行更多异步请求的机会
  9. componentWillUnmount（）：会在组件销毁前被调用。可以利用这个生命周期方法去执行任何清理任务。
  10. componentDidCatch(error, info):用来捕获组件的错误

  在挂载过程中这四个生命周期方法的调用顺序是：
    - constructor()
    - componentWillMount()
    - render()
    - componentDidMount()

  组件状态或者属性改变的时候用来更新组件的生命周期顺序：
    - componentWillReceiveProps()
    - shouldComponentUpdate()
    - componentWillUpdate()
    - render()
    - componentDidUpdate()
  
  组件卸载的生命周期
    - componentWillUnmount()

- 模板字符串
可以用来拼接字符串

- fetch API
无论请求成功与否都会返回一个promise对象

- React允许组件通过返回null来不渲染任何东西。

- 获取api 生命周期顺序
首先组件通过构造函数得到初始化，之后他将初始化的状态渲染出来。但是此刻组织了组件的显示，因为此时本地状态中的结果为空。接着componentDidMount()生命周期函数执行。在这个方法中，从Hacker News API中异步拿到数据。一旦数据到达，组件就通过setSearchTopStories()函数改变组件内部的状态。之后，因为状态的更新，更新生命周期开始运行。组件再次执行render()方法，这次组件的内部状态中的结果已经填充，不再是空，因此组件将重新渲染Table组件的内容。
```
  componentDidMount(){
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm); 
  }
```

- Object.assign(obj1, obj2, obj3...)
这个函数把接收的第一个参数作为目标对象，后面的所有参数作为源对象，然后将所有的源对象合并到目标对象中。

- React用户不可变数据结构。因此，不应该改变一个对象，更好的办法是基于现有的资源来创建一个新的对象。

- 扩展运算符:...
当使用它时，**数组**或**对象**中的每个值都会被拷贝到一个新的数组或对象中
```
const oldUsers = ['Robin', 'Andrew'];
const newUsers = ['Dan', 'Jordan'];
const allUsers = [...oldUsers, ...newUsers];
```
...扩展运算符用在对象上时，相同key值的后面的会覆盖前面的

- 客户端缓存
使用react的setState()方法来实现客户端缓存。