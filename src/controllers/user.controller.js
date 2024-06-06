import {aysncHandler} from "../utils/asyncHandler.js ";


const registerUser = aysncHandler( async (req, res) => {
    res.status(200).json({
        message: "IT's running"
    })
})

export {registerUser}