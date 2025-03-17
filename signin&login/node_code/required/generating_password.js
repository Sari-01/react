// const crypto=require('crypto')

// exports.randomPassword=()=>
// {
//     return crypto.randomBytes(6).toString('hex')
// }

exports.randomPassword = () => {
    return Math.floor(Math.random() * 1E8)
    // the next way to create a OTP using js
}