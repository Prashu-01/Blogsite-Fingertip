import Comment from '../model/comment.js'

export const addComment = async (request, response) => {
    try {
        if(request.body.comment=='') return response.status(400).json({msg: "Empty Comment"})
        const comment = await new Comment(request.body)
        comment.save()
        return response.status(200).json({ msg: 'comment saved successfully' })
    } catch (error) {
        return response.status(500).json({ msg: error.message })
    }
}

export const getAllComment = async (request, response) => {
    try {
        const comment = await Comment.find({ postId: request.params.id })
        return response.status(200).json(comment)
    }
    catch (error) {
        return response.status(500).json({ msg: error.message })
    }
}

export const deleteComment = async (request, response) => {
    try{
        await Comment.findByIdAndDelete(request.params.id)
        return response.status(200).json({msg:'deleted'})
    }
    catch(error){
        return response.status(500).json({msg: error.message})
    }
}
// delete comment with post
export const delComment = async (request, response) => {
    try{
        await Comment.deleteMany({postId:request.params.id})
        return response.status(200).json({msg:'deleted'})
    }
    catch(error){
        return response.status(500).json({msg: error.message})
    }
}