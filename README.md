## react学习之路笔记

**读完用模块重构代码**


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

- 错误处理
本质上错误是React的另一种状态,当一个错误发生时,先将它存在本地状态中,然后利用条件渲染在组件中显示错误信息.
  1. 在内部状态中引入error
  2. 使用catch捕获error并使用setState设置给error状态
  3. 若果错误发生,在render()方法中在本地状态里里获取到error对象,然后利用条件渲染来显示一个错误信息.
  4. table组件和error信息择一显示

- 模块
在es6中,可以从模块中导入或导出某些功能.
这些功能可以是函数,类,组件,常量等.

模块可以是单个文件,也可以是一个带有入口文件的文件夹.
  - 命名导出
  ```
  //file1.js
  const firstname = 'robin';
  const lastname = 'wieruch';

  export {firstname, lastname};

  //file2.js
  import { firstname, lastname } from './file1.js';

  console.log(firstname);
  ```
  - 使用对象导入
  ```
  //file2.js
  import * as person from './file1.js';
  ```
  - 导入使用别名
  ```
  //file2.js
  import {firstname as foo} from './file1.js';
  ```
  - default语句
    - 为了导出或导入单一功能
    - 为了强调一个模块输出api中的主要功能
    - 向后兼容es5只要一个导出物的功能
    ```
    const robin = {
      firstname: 'robin',
      lastname: 'wieruch',
    };
    export default robin;
    ```
    在导入default输出时可以省略花括号
    ```
    import developer from './file1.js';
    ```
- 代码组织
  - 一种可能的代码结构
  这种方式会有很多的命名冗余,只有扩展名不同
    ```
    src/
      index.js
      index.css
      App.js
      App.test.js
      App.css
      Button.js
      Button.test.js
      Button.css
      Table.js
      Table.test.js
      Table.css
      Search.js
      Search.test.js
      Search.css
    ```
  - 另一种代码结构
  index表示是这个文件夹的入口文件.
  ```
  src/
    index.js
    index.css
    App/
      index.js
      test.js
      index.css
    Button/
      index.js
      test.js
      index.css
    Table/
      index.js
      test.js
      index.css
    Search/
      index.js
      test.js
      index.css
  ```

  - 在上述结构基础上将变量抽出
  ```
  src/
    index.js
    index.css
    constants/
      index.js
    components/
    App/
      index.js
      test.js
      index..css
    Button/
      index.js
      test.js
      index..css
    ...

  // src/constants/index.js
  export const DEFAULT_QUERY = 'redux';
  export const DEFAULT_HPP = '5';
  export const PATH_BASE = 'https://hn.algolia.com/api/v1';
  export const PATH_SEARCH = '/search';
  export const PARAM_SEARCH = 'query=';
  export const PARAM_PAGE = 'page=';
  export const PARAM_HPP = 'hitsPerPage=';

  //在App/index.js中导入上述变量
  import {
    DEFAULT_QUERY,
    DEFAULT_HPP,
    PATH_BASE,
    PATH_SEARCH,
    PARAM_SEARCH,
    PARAM_PAGE,
    PARAM_HPP,
    } from '../constants/index.js';
  
  //如果使用index.js这个命名共识,可以省略index.js
    import {
    DEFAULT_QUERY,
    DEFAULT_HPP,
    PATH_BASE,
    PATH_SEARCH,
    PARAM_SEARCH,
    PARAM_PAGE,
    PARAM_HPP,
    } from '../constants';
  ```
  **!!!index文件是一个模块的入口,它描述了一个模块的公共api.外部模块只允许通过index.js文件导入模块中的共享代码!!!**
  ```
  //一个index.js的示例
  import SubmitButton from './SubmitButton';
  import SaveButton from './SaveButton';
  import CancelButton from './CancelButton';
  export {
    SubmitButton,
    SaveButton,
    CancelButton,
  };
  ```
  - 测试
    - 单元测试: 用来测试一块独立的小块代码.一组单元.
    - 集成测试: 可以覆盖验证是否这些单元组如预期般工作
    - 端到端测试: 模拟用户的真实操作
  
  - react测试
    - 组件测试
    - 快照测试
  Jest: 测试框架,用来做React的组件测试.

  it块
  描述了一个测试用例

  descibe块
  定义一个测试套件,包含一系列关于特定组件的it块

  步骤: 
    1. 将需要测试的组件从src/App.js中导出
    2. 在不同的单个文件里去测试
  
  具体测试 npm test
    - componentDidMount()中触发的fetchSearchTopStories()中的fetch不被支持引发错误, 解决办法
      1. npm install isomorphic-fetch
      2. app.js中引入 import fetch from 'isomorphic-fetch'
  
  快照测试
  这些测试会生成一份渲染好的组件的快照,用来和未来的快照比对.当未来的一个测试改变,测试就会给出提示.采用这种方式,可以确保DOM保持稳定而不会意外被改变.
  1. 安装工具库
    npm install --save-dev react-test-renderer
  2. 从node包中引入新功能,并将之前测试App组件的it块包裹在一个描述性的describe块中.这个测试套件仅用来测试App组件

  - 单元测试和Enzyme
  Enzyme是一个测试工具,可以用来断言,操作,遍历React组件,可以用来管理单元测试,在React测试中与快照测试互补

  步骤:
    1. npm install --save-dev enzyme react-addons-test-utils enzyme-adapter-react-16
    2. 在测试启动配置中引入node包,并为React初始化这个适配器
      ```
      import Enzyme from 'enzyme';
      import Adapter from 'enzyme-adapter-react-16';

      Enzyme.configure({adapter: new Adapter()});
    3. 写单元测试
    使用shallow方法渲染组件,并断言Table有两个子项.断言仅仅检查这个元素两个带有类名叫table-row的元素.

  Enzyme中的渲染方法:shallow(),mount(), render().
  使用规则:
    - 不论怎样都优先尝试使用浅渲染( shallow() )
    - 如果需要测试 componentDidMount() 或 componentDidUpdate() ,使用 mount()
    - 如果你想测试组件的生命周期和子组件的行为,使用 mount()
    - 如果你想测试一个组件的子组件的渲染,并且不关心生命周期方法和减少些渲染的
      花销的话,使用 render()

- 组件接口和propTypes
一个类型语言更不容易出错,因为代码会根据它的程序文本进行验证.编辑器或者其他工具可以在程序运行之前就捕获这些错误.

React中有一种内建的类型检查器来防止出现Bug,可以使用PropTypes来描述组件接口.所有从父组件传递给子组件的props都会基于子组件的PropTypes接口得到验证.

步骤:
  1. npm install prop-types
  2. 在App.js中导入这个包
  3. 为某个组件的所有参数签名添加一个PropTypes(或者一个具体定义),可选性

基本类型和复杂对象的PropTypes有:
  - PropTypes.array
  - PropTypes.bool
  - PropTypes.func
  - PropTypes.number
  - PropTypes.object
  - PropTypes.string
  - PropTypes.node
  - PropTypes.element

可以使用这个包在组件中定义默认props <=> es6默认参数

PropTypes类型检查会在默认props生效后执行校验.

### 高级React组件
- 在React中与DOM节点交互,ref属性可以让我们访问元素中的一个节点.在无状态组件和es6组件中均可使用.

- 加载

- 高阶组件
默认以with前缀命名HOC

应用:
1. 条件渲染

对象展开作为组件输入
```
// before you would have to destructure the props before passing them
const { foo, bar } = props;
<SomeComponent foo={foo} bar={bar} />
// but you can use the object spread operator to pass all object properties
<SomeComponent { ...props } />
```

- 高级排序
