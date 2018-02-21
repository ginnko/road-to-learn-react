import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '5';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

const url = '${PATH_BASE}${PATH_SEATCH}?${PARAM_SEARCH}${DEFAULT_QUERY}';

const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      result: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }
  
  onSearchSubmit(event){
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    this.setState({searchKey: searchTerm});
    event.preventDefault();
  }

  setSearchTopStories(result){
    const {hits, page} = result;
    const {searchKey, results} = this.state;

    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];
    this.setState({result: {
      ...results,
      [searchKey] : {hits: updatedHits, page}
    }
  });
  }

  fetchSearchTopStories(searchTerm, page = 0){
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => e);
  }

  componentDidMount(){
    const { searchTerm } = this.state;
    this.setState({searchKey: searchTerm});
    this.fetchSearchTopStories(searchTerm); 
  }

  onSearchChange(event){
    this.setState({searchTerm: event.target.value});
  }

  onDismiss(id){
    const {searchKey, results} = this.state;
    const {hits, page} = results[searchKey];
    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({result: {
      ...results,
      [searchKey]: {hits: updatedHits, page}
    }});
    console.log(this);
  }
  render() {
    const { searchTerm, results, searchKey } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];
    console.log(results);
    // 下面这行代码阻止了组件的显示，因为此时本地状态中的结果为空。
    if(!results) return null;
    return (
      <div className="page">
      <div className="interactions">
        <Search 
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
        >Search
        </Search>
      </div>
        <Table 
          list={list}
          // pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>More</Button>
        </div>
      </div>
    );
  }
}

const Search = ({value, onChange, onSubmit, children}) =>
  <form onSubmit={onSubmit}>
  <input
    type="text"
    value={value}
    onChange={onChange} 
  />
  <button type="submit">{children}</button>
  </form>;

const largeColumn = {
  width: '40%',
};

const midColumn = {
  width: '30%',
};

const smallColumn = {
  width: '10%',
}





const Table = ({list, /*pattern, */onDismiss}) => 
  <div className="table">
  {
    list./*filter(isSearched(pattern)).*/map(item => 
      <div key={item.objectID} className="table-row">
        <span style={{largeColumn}}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{midColumn}}>{item.author}</span>
        <span style={{smallColumn}}>{item.num_comments}</span>
        <span style={{smallColumn}}>{item.points}</span>
        <span style={{smallColumn}}>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >Dismiss</Button>
          
        </span>
      </div>
    )}
  </div>;

const Button = ({onClick, className, children}) => 
  <button
  onClick={onClick}
  className={className}
  type="button"
  >{children}</button>;


export default App;
