import {aysncHandler} from "../utils/asyncHandler.js ";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = aysncHandler( async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already  : username email password
    // check for images , check for avatar
    // uplaod in coludinary, avatar check
    // create user object - creact entry in db call
    // remove password and refresh token field from response
    //  check for user creaction
    // return res 

    const {username, email, fullname, password} = req.body
    console.log("email", email);
    
    if (
        [fullname,email,username, password].some((field) => field?.trim() === "")
    ) {
         throw new ApiError(400, "All fields are requried")
    }

    const existedUser = User.findOne({
        $or: [{ username },{ email }]
    })
    console.log(existedUser);
    if (existedUser) {
        throw new ApiError(409, "User with email or username is exist")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    console.log("avatarLocalPath",avatarLocalPath);
    console.log("coverImageLocalPath",coverImageLocalPath);

    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "avatar file is required")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken "
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering a user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User register successfully")
    )

})

export {registerUser}