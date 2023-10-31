import React from 'react'
import '../styles/carousel.css'


export default function Carousel() {
    return (
        <>
            <span style={{ textAlign: 'center'}}><h2 className='title topic'>Trending</h2></span>
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner" >
                    <div className="carousel-item active" data-bs-interval="3000">
                        <div className="carousel-b">
                            <img src="https://plus.unsplash.com/premium_photo-1674500522724-3d2a371d4c1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80" className="cr-img" alt="..." />
                            <div className="article">
                                <p className='tag'>Buissness,Travel <span className="date">-July 2, 2020</span></p>
                                <h2 className='title'>Your most unhappy customers are your greatest source of learning.</h2>
                                <p className='content'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                                <div className='author'>
                                    <span className='name'>Author </span>
                                    <span className='un'>username </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <div className="carousel-b">
                            <img src="https://plus.unsplash.com/premium_photo-1674500522724-3d2a371d4c1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80" className="cr-img" alt="..." />
                            <div className="article">
                                <p className='tag'>Buissness,Travel <span className="date">-July 2, 2020</span></p>
                                <h2 className='title'>Your most unhappy customers are your greatest source of learning.</h2>
                                <p className='content'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                                <div className='author'>
                                    <span className='name'>Prashu </span>
                                    <span className='un'>username </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <div className="carousel-b">
                            <img src="https://plus.unsplash.com/premium_photo-1674500522724-3d2a371d4c1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80" className="cr-img" alt="..." />
                            <div className="article">
                                <p className='tag'>Buissness,Travel <span className="date">-July 2, 2020</span></p>
                                <h2 className='title'>Your most unhappy customers are your greatest source of learning.</h2>
                                <p className='content'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                                <div className='author'>
                                    <span className='name'>Prashu </span>
                                    <span className='un'>username </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

        </>
    )
}
