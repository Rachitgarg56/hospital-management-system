const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const errorHandler = require('../middlewares/errorHandler');
const jwt = require('jsonwebtoken');

const addNewAdminApiFn = async (req,res) => {
    // Todo: Add your validation for fields
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = {
        ...req.body,
        password: hash,
        role: "ADMIN",
    };
    // const newUser = new UserModel(user);
    // await newUser.save();
    await UserModel.create(user);

    res.json({
        success: true,
        message: "Admin registered successfully",                
    });
};

const addNewDoctorApiFn = async (req,res) => {
    // Todo: Add your validation for fields
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = {
        ...req.body,
        password: hash,
        role: "DOCTOR",
    };
    // const newUser = new UserModel(user);
    // await newUser.save();
    await UserModel.create(user);

    res.json({
        success: true,
        message: "Doctor registered successfully",                
    });
};

const loginUserApiFn = async (req,res) => {
    const { email, password } = req.body;
    // Todo: Add validations here
    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(400).json({
            success: 'false',
            message: 'Invalid username or password',
        })
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({
            success: 'false',
            message: 'Invalid username or password',
        })
    }
    const jwtPayload = {
        role: user.role,
        userId: user._id,
        email: user.email,
        exp: new Date().getTime() + 24 * 3600 * 1000. // 1day expiry
    }
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY);

    res.json({
        success: 'true',
        token,
    })
};


const userController = {
    addNewAdmin: errorHandler.catchAsync(addNewAdminApiFn),
    addNewDoctor: errorHandler.catchAsync(addNewDoctorApiFn),
    loginUser: errorHandler.catchAsync(loginUserApiFn),
}

module.exports = userController;
