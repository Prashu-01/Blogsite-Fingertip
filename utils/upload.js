// middleware for image
import multer from 'multer'
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();
const user=process.env.User_name;
const pass=process.env.User_pass;

const storage=new GridFsStorage({
    url:`mongodb://${user}:${pass}@ac-bo0zohc-shard-00-00.hphhfit.mongodb.net:27017,ac-bo0zohc-shard-00-01.hphhfit.mongodb.net:27017,ac-bo0zohc-shard-00-02.hphhfit.mongodb.net:27017/?ssl=true&replicaSet=atlas-r1oljn-shard-0&authSource=admin&retryWrites=true&w=majority`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.memeType) === -1){
            return `${Date.now()}-blog-${file.originalname}`
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export default multer({storage})
