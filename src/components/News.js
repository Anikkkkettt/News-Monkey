import React, { Component } from 'react'
import LoadGen from './LoadGen';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'

export class news extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 9,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalizeFirstLetter =(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
        document.title = `News Monkey - ${this.capitalizeFirstLetter(this.props.category)}`
    }

    async handleCLick() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            loading: false
        })
    }

    async componentDidMount() {
        this.handleCLick();
    }

    handleNext = async () => {
        this.setState({ page: this.state.page + 1 })
        this.handleCLick();

    }

    handlePrev = async () => {
        this.setState({ page: this.state.page - 1 })
        this.handleCLick();
    }

    render() {
        return (
            <div className="container my-3">
                <h2 className='text-center font-weight-bold'>News Monkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
                {this.state.loading && <LoadGen />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} time={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className="d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} onClick={this.handlePrev} className="btn btn-dark">	&larr; Prev</button>
                    <button type="button" onClick={this.handleNext} className="btn btn-dark">Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default news