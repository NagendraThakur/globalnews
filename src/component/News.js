import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export default class News extends Component {
  static defaultProps={
    category:"general"
  }
  static propTypes={
    category: PropTypes.string
  }
  articles = [];
  pageSize=6;
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      totalResults:this.totalResults,
      page: 1,
      pageSize: this.pageSize
    }
  }
  async componentDidMount() {
    // let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=cf734fa20f574e288e4dbbeb7c7d2801&page=2";
    // let data = await fetch(url);
    // let parsedata = await data.json();
    this.callAPIreturnValue();
    // this.setState(
    //   { articles: articles }
    // )
    // console.log(parsedata.articles);
  }
  gotoPreviousPage = () => {
    if(this.state.page>1){
      this.callAPIreturnValue(this.state.page-1);
    }
  }
  gotoNextPage = () => {
    if (this.state.totalResults/this.state.pageSize>=this.state.page) {
      this.callAPIreturnValue(this.state.page+1)
    }
  }
  async callAPIreturnValue(page = 1) {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=cf734fa20f574e288e4dbbeb7c7d2801&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    this.setState({
      loading:true
    })
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState(
      {
        articles: parsedata.articles,
        totalResults:parsedata.totalResults,
        page: page,
        loading:false
      }
    )
  }
  render() {
    return (
      <div className="container my-3">
        <h2 className='text-center my-0.5'>NewsMonkey - Top Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return <div className='col-md-4 my-1' key={element.url}>
                <NewsItem title={element.title ? element.title : ""} desc={element.description ? element.description : ""} imgLink={element.urlToImage} newsUrl={element.url} />
              </div>
            })
          }
        </div>
        <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page <= 1} type="button" className="btn btn-secondary" onClick={this.gotoPreviousPage}>&larr; Previous</button>
          <button disabled={Math.ceil(this.state.totalResults/this.state.pageSize<=this.state.page)} type="button" className="btn btn-secondary" onClick={this.gotoNextPage}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
