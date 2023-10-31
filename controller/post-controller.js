import Post from "../model/post.js"
// import {delComment } from '../controller/comment-controller.js';

export const createPost = async (request, response) => {
    try {
        const post = new Post(request.body)
        await post.save()
        return response.status(200).json("saved successfully")
    } catch (error) {
        return response.status(500).json({ msg: error.message })
    }
}
 
export const getAllPosts = async (request, response) => {
    let category = request.query.category
    let posts
    try {
        if (category) {
            posts = await Post.find({ categories: category })
        }
        else {
            posts = await Post.find({})
        }
        return response.status(200).json(posts)
    } catch (error) {
        return response.status(500).json(error)
    }
}

export const getPost = async (request, response) => {
    try {
        let post = await Post.findById(request.params.id)
        return response.status(200).json(post)
    } catch (error) {
        return response.status(500).json({ msg: error.message })
    }
}

export const updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id)
        if (!post) return response.status(404).json({ msg: 'Post not found' })
        await Post.findByIdAndUpdate(request.params.id, { $set: request.body })
        response.status(200).json({ msg: 'updated successfully' })
    } catch (error) {
        return response.status(500).json({ msg: error.message })
    }
}

export const deletePost = async (request, response) => {
    try {
        // const post = await Post.findById(request.params.id)
        // if(!post) return response.status(404).json({msg:'post not found'})
        // await post.remove()
        await Post.findByIdAndDelete(request.params.id)
        // await delComment(request,response) to delete the respective comment
        return response.status(200).json({ msg: 'deleted successfully' })
    } catch (error) {
        return response.status(500).json({ msg: error.message })
    }
}