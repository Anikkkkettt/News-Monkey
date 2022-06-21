import React from 'react'

const newsitem = (props) => {

        let { title, description, imageUrl, newsUrl, time, source,author } = props;
        return (
            <div>
                <div className="card my-3" >
                    <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger text-white">{source}
                    </span>

                    <img src={!imageUrl? "https://upload.wikimedia.org/wikipedia/commons/3/36/NULL.jpg":imageUrl} className="card-img-top" alt={"https://upload.wikimedia.org/wikipedia/commons/3/36/NULL.jpg"} />
                    <div className="card-body">
                        <h5 className="card-title bolder">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small class="text-muted">By {author ? author : "Anonymous"} at {new Date(time).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark btn-sm">Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default newsitem