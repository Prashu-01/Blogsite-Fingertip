
import grid from 'gridfs-stream'
import mongoose from 'mongoose'

const url='https://famous-tick-lingerie.cyclic.app'

let gfs,gridfsBucket 
const conn=mongoose.connection
conn.once('open' , ()=>{
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName: 'fs'
    })
    gfs=grid(conn.db , mongoose.mongo)
    gfs.collection('fs');
})

export const uploadImage=(request,response)=>{
    if(!request.file){
        return response.status(404).json({ msg: "file not found"})
    }
    const imgurl=`${url}/file/${request.file.filename}`
    return response.status(200).json(imgurl)
}

export const getImage= async (request,response)=>{
    try{
        const file= await gfs.files.findOne({filename:request.params.filename })
        const readstream=gridfsBucket.openDownloadStream(file._id)
        readstream.pipe(response)
    }catch(error){
        response.status(500).json({ msg: error.message })
    }
}
