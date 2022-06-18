import React, { Component } from 'react'
import LoadGen from './LoadGen';
import NewsItem from './NewsItem'

export class news extends Component {
    constructor(){
        super();
        this.state = {
            articles : [],
            loading:false,
            page:1
        }

    }

    async componentDidMount()
    {
        let url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=8d5238de0f324311bd264ca112742cf7&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles:parsedData.articles,
            loading:false
            })
    }

     handleNext = async ()=>{
        let url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=8d5238de0f324311bd264ca112742cf7&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page+1,
            articles:parsedData.articles,
            loading:false
        })

    }

    handlePrev = async() =>{
        console.log("prev");
        let url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=8d5238de0f324311bd264ca112742cf7&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page-1,
            articles:parsedData.articles,
            loading:false
        })
    }

    render() {
        return (
            <div className="container my-3">
                <h2 className='text-center'>News Monkey - Top Headlines</h2>
                {this.state.loading && <LoadGen/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element)=>{
                        return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title} description = {element.description} imageUrl = {element.urlToImage} newsUrl = {element.url}/>
                    </div>
                    })}
                </div>
                <div className="d-flex justify-content-between">
                    <button type="button" disabled={this.state.page<=1} onClick={this.handlePrev} className="btn btn-dark">	&larr; Prev</button>
                    <button type="button" onClick={this.handleNext} className="btn btn-dark">Next &rarr;</button>
                    </div>
            </div>
        )
    }
}

export default news