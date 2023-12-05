import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { API } from '../../../service/api.js'

import '../../styles/post.css'
import '../../styles/carousel.css'
import Postcard from './Postcard'

export default function Allpost(props) {
    // fetch all post
    const [posts, setPosts] = useState([])
    const [err,showErr] = useState('')
    const [searchParam] = useSearchParams()
    let category = searchParam.get('category')
    props.togglenav(0) //navbar toggle transparent to color
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await API.getAllPosts({ category: category || "" });
                if (response.isSuccess) {
                    setPosts(response.data)
                }
            } catch (error) {
                showErr(error)
            }
        }
        fetchData()
    }, [category])
    
    return (
        <>
            <div className="all-posts" >
                <h2 className="title">All posts</h2>
                <div className="Row">
                    {
                        posts?.length ? posts.slice(0, posts.length).reverse().map(post => ( //remember to slice the element to 6th position according to decreasing order  ".slice(3, 9).reverse()"
                            <Link to={`/detail/${post._id}`} key={post._id}>
                                <Postcard post={post} />
                            </Link>

                        )) : <h4 className="title"> No data available </h4>
                    }
                    <span style={{ color: 'red', fontSize: 'smaller' }}>{err}</span>
                </div>
            </div>
        </>
    )
}
