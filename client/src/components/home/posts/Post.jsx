import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';

import { Categories } from '../../../constants/data.js';
import { API } from '../../../service/api.js'

import '../../styles/post.css'
import '../../styles/carousel.css'
import Postcard from './Postcard'

export default function Post() {
    const [posts, setPosts] = useState([])
    const [searchParam] = useSearchParams()
    let category = searchParam.get('category')

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await API.getAllPosts({ category: category || "" });
                if (response.isSuccess) {
                    setPosts(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [category])

    return (
        <div className="main">
            <div className="posts" id='post'>
                <h2 className="title">Recent articles</h2>
                <div className="Row">
                    {
                        posts?.length ? posts.slice(posts.length - 6, posts.length).reverse().map(post => ( //remember to slice the element to 6th position according to decreasing order  ".slice(3, 9).reverse()"
                            <Link to={`/detail/${post._id}`} key={post._id}>
                                <Postcard post={post} />
                            </Link>

                        )) : <h4 className="title"> No data available </h4>
                    }
                </div>

                <Link to='/allpost'><div className="allpost " style={{ margin: 'auto' }} >All Posts <i className="fa-solid fa-arrow-right"></i></div></Link>
            </div>
            <div className="right">
                <ul className="categ">
                    <h5 className="tag" style={{ fontSize: '1.2rem' }}>Search with popular tags</h5>
                    <div className="row">
                        {
                            Categories.slice(0,15).map(category => (
                                <Link to={`?category=${category.type}`} key={category.id}>
                                    <div className="category-s content">{category.type}</div>
                                </Link>
                            ))
                        }
                    </div>
                </ul>
                <div className="newsletter categ">
                    <h5 style={{textAlign:'center',fontWeight:'bold'}}>Newsletter</h5>
                    <div className="Row">
                        <p className="" style={{width: '90%',margin:'1rem auto'}}>Subscribe to get interested article at your fingertip</p>
                        <input type="email" className="email" name='username' placeholder='email' />
                        <p className="" style={{width: '90%',margin:'1rem auto'}}>No spam, unsubscribe later</p>
                        <button className="subs allpost">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
