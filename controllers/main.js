const { BadRequestError } = require("../errors");
const jwt = require('jsonwebtoken');

const login = async (req,res) => {
    const {username,password} = req.body;
    console.log(username,password)

    if(!username || !password){
        throw new BadRequestError('Please provide email and password');
    }
    const id = new Date().getDate();
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn: '30d'},{algorithm: 'RS256'})
  
    res.status(200).json({msg: 'user created',token})
}

const dashboard = async (req,res) => {
    const {id,username} = req.user;
    const luckyNumber = Math.floor(Math.random()*1000);
    res.status(200).json({msg: `Hello ${username}`,id: id, secret: `${luckyNumber}`})
}

module.exports = {login, dashboard}