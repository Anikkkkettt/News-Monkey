import React, { useEffect, useState } from 'react'
import LoadGen from './LoadGen';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    document.title = `News Monkey - ${capitalizeFirstLetter(props.category)}`

    const handleCLick = async() => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(35);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    const fetchMoreData = async () => {
        setPage(page+1)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };

    useEffect(() => {
        handleCLick();
    },[])
    
    /*    handleNext = async () => {
            this.setState({ page: this.state.page + 1 })
            this.handleCLick();
    
        }
    
        handlePrev = async () => {
            this.setState({ page: this.state.page - 1 })
            this.handleCLick();
        }
    */
        return (
            <>
                <h2 className='text-center font-weight-bold mt-4'>News Monkey - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
                {loading && <LoadGen />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length < totalResults}
                    loader={<LoadGen />}
                >
                    <div className="container my-3">
                        <div className="row">
                            {articles.map((element,index) => {
                                return <div className="col-md-4" key={index}>
                                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} time={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/*<div className="d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} onClick={this.handlePrev} className="btn btn-dark">	&larr; Prev</button>
                    <button type="button" onClick={this.handleNext} className="btn btn-dark">Next &rarr;</button>
                </div>*/}
            </>
        )
}

News.defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News