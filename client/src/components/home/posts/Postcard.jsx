import React from 'react'

import { addElipsis } from '../../../utils/common-utils.js'

export default function Postcard({ post }) {
  const picture = post.picture ? post.picture : "https://plus.unsplash.com/premium_photo-1674500522724-3d2a371d4c1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80"
  return (
    <div className="card">
      <img src={picture} className="card-img" alt="error" />
      <div style={{ padding: '0 1rem 0 1rem' }}>
        <h5 className='name' >{post.title}</h5>
        <p className='tag'>{post.categories} <span className="date">- {new Date(post.createdDate).toString().slice(0, 16)}</span></p>
        <div className="card-body my-1">
          <p className="card-text date">{addElipsis(post.description, 150)}<br /></p>
          <div className='author'>
            <span className='name'>Author </span>
            <span className='date'>{post.username} </span>
          </div>
        </div>
      </div>
    </div>
  )
}

