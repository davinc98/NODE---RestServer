
const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async (req, res = response) => {

    const {limite=5, desde=0} = req.query;

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({estado: true}),
        Usuario.find({estado: true})
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
};

const usuariosPost = async (req, res) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({
        nombre, correo, password, rol
    });


    //Verificar la contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await usuario.save();

    res.json({
        msg: "Usuario registrado.",
        usuario
    });
};

const usuariosPut = async (req, res) => {

    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;
    
    //Validar en BD
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Usuario Actualizado',
        usuario
    });
};

const usuariosDelete = async (req, res) => {

    const {id} = req.params;

    const usuarioAutenticado = req.usuario;

    //Borrado fisico:
    // const usuario = await Usuario.findByIdAndDelete(id);

    //Borrado alternativo
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
        msg: 'Usuario eliminado',
        usuario,
        usuarioAutenticado
    });
};

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch Api - Controlador'
    });
};



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch, 
    usuariosDelete
}