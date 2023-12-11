const Clientes = require('../models/Clientes');

//agregar nuevo cliente

exports.nuevoCliente = async(req, res, next) => {
   const cliente = new Clientes(req.body);

    try{
        //se almacena el registro en la bd
        await cliente.save();
        res.json({ mensaje: 'Se agrego un nuevo registro'});
    }catch(error){
        //si hay error, muestre por console.log y next
        //console.log(error);
        res.json(error)
        next();
    }

}

exports.mostrarClientes = async(req, res, next) => {
    try {
    // mostrar clientes, si no lo encuentra muestra uno en blanco
    const clientes  = await Clientes.find({});
        res.json(clientes);

    } catch (error) {
    console.log(error);
    next();
    }
}

//Obtener cliente por ID
exports.mostrarClientes = async(req, res, next) => {
    const clientes = await Clientes.findById(req.params.idCliente);
    //se valida que exista el cliente
    if(!clientes){
        res.json({mensaje: 'No existe el cliente'});
        next();
    }
    res.json(clientes);
}

//Actualizar cliente
exports.actualizarCliente = async(req, res, next) => {
    try {
    const cliente = await Clientes.findOneAndUpdate({_id:req.params.idCliente} ,
        req.body, {
            new: true
        });
        res.json(cliente); //json utiliza un callback, para el almacenamiento de info vieja o nueva
    }catch (error) {
        //console.log(error)
        res.send(error);
        next();
    }
}


//Eliminar cliente
exports.eliminarCliente = async(req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndDelete({_id: req.params.idCliente});
        res.json({mensaje: 'El cliente ya ha sido eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}