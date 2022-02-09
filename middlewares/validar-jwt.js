
const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next)=>{   

    const token = req.header('x-token');

    if(!token){

        res.status(401).json({
            msg: "El token es requerido."
        });
    }

    try{
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        //leer usuario correspondiente a UID
        const usuarioAutenticado = await Usuario.findById(uid);

        //Validaciones
        if(!usuarioAutenticado){
            return res.status(401).json({
                msg: "Token no valido - Uusario no existe en BD"
            });
        }

        if(!usuarioAutenticado.estado){
            return res.status(401).json({
                msg: "Token no valido - Usario inactivo"
            });
        }

        req.usuario = usuarioAutenticado;
        next();

    }catch(error){
        console.log(error);
        res.status(401).json({
            msg: "Token no valido"
        });
    }

    console.log(token);
    next();

}

module.exports = {
    validarJWT
}