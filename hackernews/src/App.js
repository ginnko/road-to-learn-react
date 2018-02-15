import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list,
    };
    //下面这行代码的作用是让此函数绑定到类，成为类的方法
    // 下面这行代码中的this分别指向谁？感觉this.onDismiss中的this指向本对象，暂且理解为对本对象中方法的引用好了
    // 感觉此处bind(this)中的this指的是整个App
    this.onDismiss = this.onDismiss.bind(this);
  }
  onDismiss(id){
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({list: updatedList});
    console.log(this);
  }
  render() {
    return (
      <div className="App">
        {
          // list.map(function(item){
          //   return (
          //     <div key={item.objectID}>
          //       <span><a href={item.url}>{item.title}</a></span>
          //       <span>{item.author}</span>
          //       <span>{item.num_comments}</span>
          //       <span>{item.points}</span>
          //     </div>
          //   );
          // })
          this.state.list.map((item) => 
              <div key={item.objectID}>
                <span><a href={item.url}>{item.title}</a></span>
                <span>{item.author}</span>
                <span>{item.num_comments}</span>
                <span>{item.points}</span>
                <span>
                  <button
                  // 箭头函数的this默认指向包裹它的对象
                  // 上面先绑定，到这里和箭头函数啥关系
                  // 错误的理解：包裹的对象此处是button，如果上面不手动绑定，此处onDismiss函数内部的this指向button
                    onClick={() => this.onDismiss(item.objectID)}
                    type="button"
                  >Dismiss</button>
                </span>
              </div>
              )
        }
        <ExplainBindingsComponent />
      </div>
    );
  }
}
class ExplainBindingsComponent extends Component {
  constructor(props){
    super(props);
    this.onClickMe = this.onClickMe.bind(this);
  }
  onClickMe() {
  console.log(this);
  }
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
export default App;
