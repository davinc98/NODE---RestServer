const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");


const login = async (req, res=response)=>{

    const {correo, password} = req.body;
    
    try{

        //Verificar si el correo existe
        const usuario = await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                msg: "Usuario o contrasena no son correctos. CORREO"
            });
        }

        //Si el usuario esta acrivo
        if(!usuario.estado){
            return res.status(400).json({
                msg: "Usuario o contrasena no son correctos ESTADO."
            });
        }

        //Verificar la contrasena
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: "Usuario o contrasena no son correctos PASS."
            });
        }

        //Generar el JWT
        const token =  await generarJWT(usuario.id);

        res.json({
            msg: 'Login ok',
            usuario,
            token
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg: 'Ah ocurrido un error'
        });
    }
}

module.exports = {
    login
}