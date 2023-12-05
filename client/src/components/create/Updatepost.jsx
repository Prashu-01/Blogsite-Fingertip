import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

import { DataContext } from '../../context/dataProvider.jsx'
import { API } from '../../service/api.js'
import { Categories } from '../../constants/data.js'
import BeatLoader from "react-spinners/BeatLoader";

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
    const [img, setImg] = useState('')
    const [err, showErr] = useState('')
    const [loading, setLoading] = useState(false)
    const [disable, setDisable] = useState(false)
    const { account } = useContext(DataContext)
    const url = post.picture ? post.picture : "https://th.bing.com/th/id/R.69937825d1e99fa4aef30ef04aeef944?rik=lbO9N0ZyHqUcsA&riu=http%3a%2f%2fsamclient.spacialaudio.com%2fimages%2fDrop-Files-Here-extra.png&ehk=VtYg2CE%2fOsDDfiKhDykSA2F9LyE39SlPO08K9fXbTc0%3d&risl=&pid=ImgRaw&r=0"
    props.togglenav(0)

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }
    // select categories 
    const handleit = () => {
        let formid = document.querySelector('form[name=formid]')
        setPost({ ...post, ['categories']: formid.selected[formid.selected.selectedIndex].text });
    }

    const getImage = async () => {
        setLoading(true)
        setDisable(true)
        if (file) {
            const data = new FormData();
            data.append("name", file.name);
            data.append("file", file)
            // API call
            try {
                let response = await API.uploadFile(data)
                if (response.isSuccess) {
                    post.picture = response.data.msg
                    // setLoading(false)
                }
            } catch (error) {
                showErr(error)
                // setLoading(false)
            }
        }
        setLoading(false)
        setDisable(false)
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
            showErr(error)
        }
    }
    const handleimg = (e) => {
        setImg(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
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
        post.username = account.username
    }, [])

    return (
        <>
            <div className="contain" style={{ margin: '7rem auto' }}>
                <div className="img-file">
                    <label htmlFor="fileInput" style={{ cursor: 'pointer', fontSize: 'xx-large', width: '100%' }}>
                        <img src={img === '' ? post.picture : img} alt="" className='p-img' />
                        <button type="button" className="allpost createpost pos" onClick={() => getImage()}>{
                            (loading === true) ? <BeatLoader
                                loading={loading}
                                color='#ffff'
                                size={10}
                                loader='BounceLoader'
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /> : 'Update Image'
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
                <textarea className='posttext' disabled={disable} name="title" onChange={(e) => handleChange(e)} value={post.title} style={{ height: '4rem', fontWeight: '700' }}></textarea>
                <textarea
                    className='posttext'
                    disabled={disable}
                    style={{ width: '100%' }}
                    name="description"
                    value={post.description}
                    onChange={(e) => handleChange(e)}
                ></textarea>
                <span style={{ color: 'red', fontSize: 'smaller' }}>{err}</span>
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
