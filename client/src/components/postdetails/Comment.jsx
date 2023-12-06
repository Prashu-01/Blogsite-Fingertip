import React, { useContext, useState, useEffect } from 'react'
import '../styles/comment.css'
import { DataContext } from '../../context/dataProvider'
import Swal from 'sweetalert2'
import { API } from '../../service/api'
import { useParams } from 'react-router-dom'

const initComment = {
    name: '',
    postId: '',
    comment: '',
    date: new Date()
}
export default function Comment({ Id }) {
    const { account } = useContext(DataContext)
    const [err, showErr] = useState('')
    const [comment, setComment] = useState(initComment)
    const [comm, setComm] = useState([])
    const [toggle, setToggle] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        // show all comments
        const Comment = async () => {
            try {
                let comments = await API.getComment(id)
                if (comments.isSuccess) {
                    setComm(comments.data)
                }
            } catch (error) {
                showErr(error)
            }
        }
        Comment()
    }, [toggle])

    // user can comment
    const addComment = async () => {
        try {
            let response = await API.Comment(comment);
            if (response.isSuccess) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Comment saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                setComment(initComment)
            }
            // Comment()
            showErr('')
        } catch (error) {
            showErr(error)
        }
        setToggle(prevState => !prevState)
        document.querySelector('.comments').value = ""
    }

    // only user can remove
    const removeComment = async (commentid) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: 'grey',
            confirmButtonText: 'Delete!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await API.deleteComment(commentid)
                    if (response.isSuccess) {
                        Swal.fire(
                            'Deleted!',
                            'Comment has been deleted.',
                            'success'
                        )
                    }
                    setToggle(prevState => !prevState)
                    showErr('')
                } catch (error) {
                    showErr(error)
                    Swal.fire(error)
                }
            }
        })
    }

    const handlechange = (e) => {
        setComment({
            ...comment,
            name: account.name,
            postId: Id,
            comment: e.target.value
        })
    }

    return (
        <>
            {/* post comment */}
            <div style={{ display: 'flex', marginTop: '1.5rem', alignItems: 'center' }}>
                <i className="fa-solid fa-circle-user" style={{ transform: 'scale(2.4)' }}></i>
                <textarea className="comments" name="comments" id="" cols="90" style={{ width: '100%', padding: '1rem', margin: '1rem' }} rows="1" onChange={(e) => handlechange(e)} placeholder='comment here'></textarea>
                <button className='allpost' onClick={() => addComment()}>Comment</button>
            </div>
            <span style={{ color: 'red', margin: '0.5rem' }}>{err}</span>
            {/* comments */}
            <div className="comments">
                {
                    (comm.length > 0) ?
                        comm.map(comment => (
                            <div className="comm" key={comment._id}>
                                <div className="auth">
                                    <span className="name" style={{ fontSize: '0.9rem' }}>{comment.name} <span className='date tag'> &nbsp; -{new Date(comment.date).toDateString()}</span></span>
                                    {(account.name === comment.name) ? <i className="fa-solid fa-trash" style={{ float: 'right', color: '#e50000e0', cursor: 'pointer' }} onClick={() => removeComment(comment._id)}></i> : ''}
                                </div>
                                <div className="text content">
                                    {comment.comment}
                                </div>
                            </div>
                        ))
                        : err
                }
            </div>
        </>
    )
}
