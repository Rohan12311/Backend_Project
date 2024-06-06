//  using       < -- Promises -- >

const aysncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}


export {aysncHandler}


// const asyncHandler = () =>{}
// const asyncHandler = (func) => { () => {} }
// const asyncHandler = () => async () => {}

// using       < -- TryCatach -- > 

// const asyncHandler = (fn) => async(req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }