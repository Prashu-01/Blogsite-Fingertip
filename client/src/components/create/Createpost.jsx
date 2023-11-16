import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
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

    const navigate = useNavigate()
    const [post, setPost] = useState(initialPost)
    const [file, setFile] = useState('')
    const [err, showErr] = useState('')
    const { account } = useContext(DataContext)
    props.togglenav(0)

    const url = post.picture ? post.picture : 'https://th.bing.com/th/id/R.69937825d1e99fa4aef30ef04aeef944?rik=lbO9N0ZyHqUcsA&riu=http%3a%2f%2fsamclient.spacialaudio.com%2fimages%2fDrop-Files-Here-extra.png&ehk=VtYg2CE%2fOsDDfiKhDykSA2F9LyE39SlPO08K9fXbTc0%3d&risl=&pid=ImgRaw&r=0'
    // listen value for post
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }
    // listen value from dropdown
    const handleit = () => {
        let formid = document.querySelector('form[name=formid]')
        setPost({ ...post, ['categories']: formid.selected[formid.selected.selectedIndex].text });
    }

    const savePost = async () => {
        try {
            let response = await API.createPost(post)
            if (response.isSuccess) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Uploaded successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                setPost(initialPost)
                navigate('/')
            }
        } catch (error) {
            showErr(error)
        }
    }

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file)
                // API call
                try {
                    const response = await API.uploadFile(data)
                    if(response.isSuccess) post.picture = response.data.msg
                } catch (error) {
                    showErr(error)
                }
            }
        }
        getImage()
        window.scrollTo(0, 0)
        post.username = account.username
    }, [file])

    return (
        <>
            <div className="contain" style={{ margin: '7rem auto' }}>
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
                </div>
                {/* title */}
                <textarea className='posttext' name="title" onChange={(e) => handleChange(e)} placeholder='title' style={{ height: '4rem', fontWeight: '700' }}></textarea>
                {/* <discription > */}
                <textarea
                    className='posttext'
                    style={{ width: '100%' }}
                    name="description"
                    placeholder='Your story here . . .'
                    onChange={(e) => handleChange(e)}
                ></textarea>
                <span style={{ color: 'red', fontSize: 'smaller' }}>{err}</span>  {/* to be removed by notification popper */}
                {/* categories */}
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
                        <button type="button" className="allpost createpost" onClick={() => savePost()}>Publish</button>
                    </div>
                </div>
            </div>
        </>
    )
}
