const User = require('../model/user');


const registerUser = async(req,res)=>{
    try{
    const user = await User.create(req.body);
    res.status(200).json({
        status: 'success',
        message: "User registration success",
        data: user
    })

}catch(err){
    res.status(500).json({
        status: "Fail",
        msg: err.message
    })
}

}


const loginUser = async(req,res)=>{
    const { email, password}  = req.body;
    if(!email || !password){
        return res.send("Please provide the email and password", 400);
    };

    const user = await User.findOne({email:email}).select('+password');
    if(!user){
        return res.send("Invalid credentials", 401)
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch){
        return res.send("Password Incorrect")
    }
    return res.json({
        status: 'success',
        msg: "Login Successfull"

    });
};


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            data: users,
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Fail', 
            message: err.message, 
        });
    };
};


const updateUser = async (req, res) => {
    try {
        const { name, password, phoneNumber } = req.body;
        if (!name || !password || !phoneNumber) {
            return res.status(400).json({
                status: 'Fail',
                message: 'Please enter the required fields',
            });
        }

        const user = await User.findByIdAndUpdate(req.params.id, { name, password, phoneNumber }, { new: true });

        if (!user) {
            return res.status(404).json({
                status: 'Fail',
                message: 'User not found',
            });
        }

        res.status(200).json({
            status: 'success',
            data: user,
        });
    } catch (err) {
        res.status(500).json({
            status: 'Fail',
            message: err.message,
        });
    }
};


const deleteUser = async(req,res)=>{
    try{
    const id = req.params.id;
    const user =  User.findByIdAndDelete(id);
    res.json({
        status: 'success',
        data: null
    })
}catch(err){
    return res.json({
        status: "fail",
        message: err.message
    });
};
};


module.exports = {registerUser,loginUser,getAllUsers,updateUser,deleteUser}