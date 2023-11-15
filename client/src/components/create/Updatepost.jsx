import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

import { DataContext } from '../../context/dataProvider.jsx'
import { API } from '../../service/api.js'
import { Categories } from '../../constants/data.js'

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

export default function Createpost(props) {

    // const location = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const [post, setPost] = useState(initialPost)
    const [file, setFile] = useState('')
    const [err,showErr]=useState('')
    const { account } = useContext(DataContext)
    const url = post.picture ? post.picture : "https://plus.unsplash.com/premium_photo-1674500522724-3d2a371d4c1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80"
    props.togglenav(0)

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }
    // select categories 
    const handleit = () => {
        let formid = document.querySelector('form[name=formid]')
        setPost({ ...post, ['categories']: formid.selected[formid.selected.selectedIndex].text });
    }

    const updatePost = async () => {
        try {
            let response = await API.updatePost(post)
            if (response.isSuccess) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Uploaded successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(`/detail/${id}`)
            }
        } catch (error) {
            return console.log("Update failed..")
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id)
            if (response.isSuccess) {
                setPost(response.data)
            }
        }
        fetchData()
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file)
                // API call
                try {
                    const response = await API.uploadFile(data)
                    if (response.isSuccess) post.picture = response.data.msg
                } catch (error) {
                    showErr(error)
                }
            }
        }
        getImage()
        post.username = account.username
    }, [file])

    return (
        <>
            <div className="contain" style={{ margin: '7rem auto' }}>
                {/* <img src={url} alt="" className='p-img' /> */}
                <div className="img-file">
                    <label htmlFor="fileInput" style={{ cursor: 'pointer', fontSize: 'xx-large', width: '100%' }}>
                        <img src={url} alt="" className='p-img' />
                    </label>
                    {/* image input */}
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <h5 style={{ textAlign: 'center', color: '#0c4f36' }}>click to import</h5>
                </div>
                <textarea className='posttext' name="title" onChange={(e) => handleChange(e)} value={post.title} style={{ height: '4rem', fontWeight: '700' }}></textarea>
                <textarea
                    className='posttext'
                    style={{ width: '100%' }}
                    name="description"
                    value={post.description}
                    onChange={(e) => handleChange(e)}
                ></textarea>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div className="publish">
                        <form name='formid' onChange={() => handleit()}>
                            <select className='allpost' name='selected' >
                                {
                                    // categories
                                    Categories.map((category) => {
                                        return <option key={category.id} value={category.type} >{category.type}</option>
                                    })
                                }
                            </select>
                        </form>
                    </div>
                    <div className="publish">
                        <button type="button" className="allpost createpost" onClick={() => updatePost()}>Update</button>
                    </div>
                </div>
            </div>

        </>
    )
}
