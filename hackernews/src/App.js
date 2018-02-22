import React, { Component } from 'react';
import './App.css';
import fetch from 'isomorphic-fetch';
import PropTypes from 'prop-types';
import {sortBy} from 'lodash';
import classNames from 'classnames';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '5';

// const PATH_BASE = 'https://hn.foo.bar.com/api/v1';//test api error
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

// const url = '${PATH_BASE}${PATH_SEATCH}?${PARAM_SEARCH}${DEFAULT_QUERY}';

// const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
  };



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,
      sortKey: 'NONE',
      isSortReverse: false,
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.onSort = this.onSort.bind(this);
  }

  onSort(sortKey){
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({sortKey, isSortReverse});
  }
  needsToSearchTopStories(searchTerm){
    return !this.state.results[searchTerm];
  }
  
  onSearchSubmit(event){
    const { searchTerm } = this.state;
    if(this.needsToSearchTopStories(searchTerm)){
      this.fetchSearchTopStories(searchTerm);
    }
    this.setState({searchKey: searchTerm});
    event.preventDefault();
  }

  setSearchTopStories(result){
    const {hits, page} = result;
    const {searchKey, results} = this.state;

    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];
    this.setState({results: {
      ...results,
      [searchKey] : {hits: updatedHits, page}
    },
    isLoading: false
  });
  }

  fetchSearchTopStories(searchTerm, page = 0){
    this.setState({isLoading: true});
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(results => this.setSearchTopStories(results))
      .catch(e => this.setState({error: e}));
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
    this.setState({results: {
      ...results,
      [searchKey]: {hits: updatedHits, page}
    }});
    // console.log(this);
  }
  render() {
    const { searchTerm, results, searchKey, error, isLoading, sortKey, isSortReverse } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];
    // console.log(results);
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
      {
        error ? <div className="interaction"><p>Something went wrong.</p></div> : 
        <Table 
          list={list}
          sortKey={sortKey}
          onSort={this.onSort}
          onDismiss={this.onDismiss}
          isSortReverse={isSortReverse}

        />
      }

        <div className="interactions">
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >More</ButtonWithLoading>
        </div>
      </div>
    );
  }
}
/*
class Search extends Component{
  componentDidMount(){
    if(this.input){
      this.input.focus();
    }
  }
  render(){
    const {
      value,
      onChange,
      onSubmit,
      children
    } = this.props;
    return(
      <form onSubmit={onSubmit}>
        <input 
          type="text"
          value={value}
          onChange={onChange}
          ref={(node) => {this.input = node;}}
        />
        <button type="submit">
          {children}
        </button>
      </form>
    );
  }
}
*/

const Search = ({value, onChange, onSubmit, children}) => {
  // let input;
  return (
  <form onSubmit={onSubmit}>
  <input
    type="text"
    value={value}
    onChange={onChange} 
    //ref={(node) => input = node}
  />
  <button type="submit">{children}</button>
  </form>
  );
};

Search.propTypes={
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};


const largeColumn = {
  width: '40%',
};

const midColumn = {
  width: '30%',
};

const smallColumn = {
  width: '10%',
}




const Table = ({list, sortKey, onSort, onDismiss, isSortReverse}) => {
  const sortedList = SORTS[sortKey](list);
  const reverseSortedList = isSortReverse ?
  sortedList.reverse() : sortedList;
  return (
  <div className="table">
    <div className="table-header">
      <span style={{ ...largeColumn }}>
        <Sort
          sortKey={'TITLE'}
          onSort={onSort}
          activeSortKey={sortKey}
          isSortReverse={isSortReverse}
        >
        Title 
        </Sort>
      </span>
      <span style={{ ...midColumn }}>
        <Sort
          sortKey={'AUTHOR'}
          onSort={onSort}
          activeSortKey={sortKey}
          isSortReverse={isSortReverse}
        >
        Author 
        </Sort>
      </span>
      <span style={{ ...smallColumn }}>
        <Sort
          sortKey={'COMMENTS'}
          onSort={onSort}
          activeSortKey={sortKey}
          isSortReverse={isSortReverse}
        >
        Comments 
        </Sort>
      </span>
      <span style={{ ...smallColumn }}>
        <Sort
          sortKey={'POINTS'}
          onSort={onSort}
          activeSortKey={sortKey}
          isSortReverse={isSortReverse}
        >
        Points 
        </Sort>
      </span>
      <span style={{ ...smallColumn }}>
        Archive
      </span>
    </div>
  {

    reverseSortedList.map(item => 
      <div key={item.title + item.objectID} className="table-row">
        <span style={{ ...largeColumn }}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ ...midColumn }}>{item.author}</span>
        <span style={{ ...smallColumn }}>{item.num_comments}</span>
        <span style={{ ...smallColumn }}>{item.points}</span>
        <span style={{ ...smallColumn }}>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >Dismiss</Button>
          
        </span>
      </div>
    )
  }
  </div>)};

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number,
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  isSortReverse: PropTypes.bool.isRequired,
};

const Sort = ({sortKey, onSort, children, activeSortKey, isSortReverse}) => {
  const sortClass = classNames(
    'button-inline',
    {'button-active': sortKey === activeSortKey}
  );

  return (
    <Button 
      onClick={() => onSort(sortKey)}
      className={sortClass}
    >
      {children}
    </Button>
  );
}



const Button = ({onClick, className, children}) => 
  <button
  onClick={onClick}
  className={className}
  type="button"
  >{children}</button>;

  Button.defaultProps = {
    className: '',
  }

  Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

const Loading = () => 
  <div className="fa-3x"><i className="fas fa-spinner fa-pulse"></i></div>;

const withLoading= (Component) => ({isLoading, ...rest}) => isLoading ?
  <Loading /> : <Component {...rest} />;

const ButtonWithLoading = withLoading(Button);






export default App;


export {
  Button,
  Search,
  Table,
};