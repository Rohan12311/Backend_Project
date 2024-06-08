import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilepath) => {
    try {
        if (!localFilepath) return null
        //upload the file on cloudinary
        const responce = await cloudinary.uploader.upload(localFilepath, {
            resource_type: "auto"
        })
        // file has been uploaded successfully

        // console.log("file is upload successfully" , responce.url);
        // console.log(responce.url);
        // console.log("Hi te aahai responce \n",responce);
        
        fs.unlinkSync(localFilepath)
        return responce;
    } catch (error) {
        fs.unlinkSync(localFilepath) // remove the locally saved temporay file as the upload get fail
        return null;
    }
}


export {uploadOnCloudinary}