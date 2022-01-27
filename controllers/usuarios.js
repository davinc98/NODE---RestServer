
const { response } = require('express');

const usuariosGet = (req, res = response) => {

    const {q, nombre='No name', apikey, page=1, limit} = req.query;

    res.json({
        msg: 'get Api - Controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
};

const usuariosPost = (req, res) => {

    const {nombre, edad} = req.body;

    res.json({
        msg: 'post Api - Controlador',
        nombre: nombre,
        edad: edad
    });
};

const usuariosPut = (req, res) => {

    const {id} = req.params;

    res.json({
        msg: 'put Api - Controlador',
        id
    });
};

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch Api - Controlador'
    });
};

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete Api - Controlador'
    });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch, 
    usuariosDelete
}