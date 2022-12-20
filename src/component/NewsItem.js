import React, { Component } from 'react'
import imgNews from './News.jpg'

export default class NewsItem extends Component {
    render() {
        let {title,desc,imgLink,newsUrl}=this.props;
        return (
            <div>
                <div className="card">
                    <img src={imgLink==null?imgNews:imgLink} className="card-img-top" style={{height: "10rem"}} alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title.slice(1,50)}...</h5>
                            <p className="card-text">{desc.slice(1,100)}...</p>
                            <a href={newsUrl} className="btn btn-dark">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}
