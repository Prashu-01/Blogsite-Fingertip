import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import { DataContext } from '../../context/dataProvider.jsx'
import { API } from '../../service/api.js'
import { Categories } from '../../constants/data.js'
import BeatLoader from "react-spinners/BeatLoader"

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
    const [img, setImg] = useState('')
    const [err, showErr] = useState('')
    const [disable, setDisable] = useState(false)
    const [loading, setLoading] = useState(false)
    const { account } = useContext(DataContext)
    
    useEffect(() => {
        props.togglenav(0)
        window.scrollTo(0, 0)
        post.picture = ''
        post.username = account.username
    }, [])
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

    const getImage = async () => {
        setDisable(true)
        setLoading(true)
        if (file) {
            const data = new FormData();
            data.append("name", file.name);
            data.append("file", file)
            // API call
            try {
                let response = await API.uploadFile(data)
                if (response.isSuccess) {
                    post.picture = response.data.msg
                }
            } catch (error) {
                showErr(error)
            }
        }
        setDisable(false)
        setLoading(false)
    }
    const handleimg = (e) => {
        setImg(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
    }

    return (
        <>
            <div className="contain" style={{ margin: '7rem auto' }}>
                <div className="img-file">
                    <label htmlFor="fileInput" style={{ cursor: 'pointer', fontSize: 'xx-large', width: '100%' }}>
                        <img src={img === '' ? 'https://th.bing.com/th/id/R.69937825d1e99fa4aef30ef04aeef944?rik=lbO9N0ZyHqUcsA&riu=http%3a%2f%2fsamclient.spacialaudio.com%2fimages%2fDrop-Files-Here-extra.png&ehk=VtYg2CE%2fOsDDfiKhDykSA2F9LyE39SlPO08K9fXbTc0%3d&risl=&pid=ImgRaw&r=0' : img} alt="" className='p-img' />
                        <button type="button" className="allpost createpost pos" onClick={() => getImage()}>{
                            (loading === true) ? <BeatLoader
                                loading={loading}
                                color='#ffff'
                                size={10}
                                loader='BounceLoader'
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /> : 'Upload Image'
                        }</button>
                    </label>
                    {/* image input */}
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={handleimg}
                    />
                </div>
                {/* title */}
                <textarea className='posttext' disabled={disable} name="title" onChange={(e) => handleChange(e)} placeholder='title' style={{ height: '4rem', fontWeight: '700' }}></textarea>
                {/* <discription > */}
                <textarea
                    className='posttext'
                    disabled={disable}
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
