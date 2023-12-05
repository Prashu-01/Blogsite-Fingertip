import React, { useContext, useEffect, useState } from 'react'

import Swal from 'sweetalert2'
import { API } from '../../service/api'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { DataContext } from '../../context/dataProvider.jsx'

import Comment from './Comment'

export default function Detailpost(props) {
  const [post, setpost] = useState({})
  const [err, showError] = useState('')
  const url = post.picture ? post.picture : "https://static.vecteezy.com/system/resources/previews/005/720/408/original/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg"
  const { id } = useParams()
  const navigate = useNavigate()
  const { account } = useContext(DataContext)

  const deleteBlog = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let responsecomment = await API.delComment(post._id)
          let response = await API.deletePost(post._id)
          if (response.isSuccess && responsecomment.isSuccess) {
            Swal.fire(
              'Deleted!',
              'Post has been deleted.',
              'success'
            )
            navigate('/')
          }
          
        } catch (error) {
          showError(error)
          Swal.fire(
            error
          )
        }
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await API.getPostById(id)
        if (response.isSuccess) {
          setpost(response.data)
        }
      } catch (error) {
        showError(error)
      }
    }
    fetchData()
    props.togglenav(0) //navbar toggle transparent to color
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div className='contain' style={{ marginTop: '5rem', paddingTop: '2rem' }} >
        {/* topic */}
        <h3 className="title" >{post.title}</h3>
        {/* edit or delete */}
        {
          account.username === post.username &&
          <div className='post-con' style={{ float: 'right', padding: '.2rem', flexWrap: 'nowrap' }}>
            <Link to={`/update/${post._id}`}><button className="edit btn"><i className="fa-solid fa-pen"></i></button></Link>
            <button className="edit btn btn-danger" onClick={() => deleteBlog()}><i className="fa-solid fa-trash"></i></button>
          </div>
        }
        {/* tag date */}
        <p style={{ padding: '1rem 0 0 0' }} className='tag'>{post.categories} <span className="date">- {new Date(post.createdDate).toString().slice(0, 16)}</span><br />
          <span className="date">- by {post.username}</span>
        </p>

        <img src={url} alt="" className="p-img" />

        {/* content */}
        <p className="content" style={{ fontSize: '1rem', marginTop: '2rem' }}>{post.description ? post.description : err}</p>

        {/* comments */}
        <Comment Id={post._id} />

      </div>
    </>
  )
}
