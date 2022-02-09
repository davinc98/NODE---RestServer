const { response } = require("express");


const esAdminRole = (req, res = response, next)=>{
    
    if(!req.usuario){
        return res.status(500).json({
            msg: "No se puede verificar ROL sin el TOKEN"
        });
    }
    const {rol, nombre}  = req.usuario;

    if(rol!== "ADMIN_ROLE"){
        return res.status(401).json({
            msg: `${nombre} no es administrador. No Autorizado`
        });
    }

    next();
}

const tieneRole = ( ...roles)=>{
    return (req, res, next) => {
        console.log(req.usuario.rol );

        if(!req.usuario){
            return res.status(500).json({
                msg: "No se puede verificar ROL sin el TOKEN"
            });
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(500).json({
                msg: `El servicio requiere rol: ${roles}`
            });
        }
        
        next();
    }
}


module.exports = {
    esAdminRole, 
    tieneRole
}