import express from 'express';
import { signupUser,loginUser, logoutUser} from '../controller/user_controller.js';
import { uploadImage,getImage } from '../controller/image-controller.js';
import { createPost,getAllPosts, getPost, updatePost, deletePost } from '../controller/post-controller.js';
import { addComment, getAllComment, delComment } from '../controller/comment-controller.js';

import upload from '../utils/upload.js'
import { authenticateToken } from '../controller/jwt-authentication.js';

const router=express.Router();

router.post('/signup',signupUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
// image upload 
router.post('/file/upload', upload.single('file') ,authenticateToken, uploadImage);
router.get('/file/:filename', getImage);
// post
router.get('/posts',getAllPosts);
router.post('/create', authenticateToken ,createPost);
router.put('/update/:id',authenticateToken,updatePost)
router.get('/post/:id', authenticateToken ,getPost);
router.delete('/delete/:id', authenticateToken ,deletePost);
// comment
router.post('/comment/new',authenticateToken,addComment);
router.get('/comments/:id', authenticateToken, getAllComment);
router.delete('/comment/delete/:id',authenticateToken, delComment);

export default router;