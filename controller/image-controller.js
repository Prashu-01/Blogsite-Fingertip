
// import grid from 'gridfs-stream'
import { v2 as cloudinary } from 'cloudinary';
import DataURIParser from 'datauri/parser.js';
import path from 'path';
import dotenv from 'dotenv'

dotenv.config()
cloudinary.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_Key,
    api_secret: process.env.Cloud_Key_S
});

// upload to gridfs
// const url=''
// let gfs,gridfsBucket 
// const conn=mongoose.connection
// conn.once('open' , ()=>{
//     gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db,{
//         bucketName: 'fs'
//     })
//     gfs=grid(conn.db , mongoose.mongo)
//     gfs.collection('fs');
// })
// export const uploadImage=(request,response)=>{
//     if(!request.file){
//         return response.status(404).json({ msg: "file not found"})
//     }
//     const imgurl=`${url}/file/${request.file.filename}`
//     return response.status(200).json(imgurl)
// }
// export const getImage = async (request, response) => {
//     try {
//         const file = await gfs.files.findOne({ filename: request.params.filename })
//         const readstream = gridfsBucket.openDownloadStream(file._id)
//         readstream.pipe(response)
//     } catch (error) {
//         response.status(500).json({ msg: error.message })
//     }
// }

// uplaod using cloudinary
export const uploadImage = async (request, response) => {
    const parser = new DataURIParser()
    if (!request.files.file) return response.status(404).json({ msg: 'file not found' })
    // make string of buffer data(image)
    const extName = path.extname(request.files.file.name).toString();
    const file64 = parser.format(extName, request.files.file.data);
    try {
        await cloudinary.uploader.upload(file64.content, (error, result) => {
            if (result && result.secure_url) {
                return response.status(200).json({ msg: result.secure_url });
            }
        })
    }
    catch (error) {
        response.status(500).json({ msg: error.message })
    }
};
