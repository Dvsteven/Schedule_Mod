const Pedidos = require('../models/Pedidos');

exports.nuevoPedido = async (req, res, next) => {
    try {
        //await Pedidos.save();
        //reemplazo "la funcion", "Pedidos.save()" por una instancia y luego llamo a save
        const nuevoPedido = new Pedidos(req.body);
        await nuevoPedido.save();
        res.json({mensaje: 'Se ha agregado un nuevo pedido'});
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.mostrarPedido = async (req, res, next) => {

    try{
        const pedido = await Pedidos.find({}).populate('cliente').populate({
            path:'pedido.producto',
            model: 'Productos'
        });
        res.json(pedido);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.mostrarPedidos = async  (req, res, next) => {
    const pedido = await Pedidos.findById(req.params.idPedido).populate({
        path:'pedido.producto',
        model:'Productos'
    })
    if(!pedido){
        res.json({mensaje: 'El pedido no existe'});
        return next();
    }
    //Mostrar pedido
    res.json(pedido);
}

//Actualizar el pedido
exports.actualizarPedido = async (req, res, next) => {
    try {
        //construir un nuevo producto
        let pedido = await Pedidos.findOneAndUpdate({_id : req.params.idPedido}, req.body, {
            new: true
        }).populate({
            path:'pedido.producto',
            model:'Productos'
        });
        res.json(pedido);
    } catch (error) {
        console.log(error);
        next(); 
    }
}

exports.eliminarPedido = async (req, res, next) => {
    try {
        await Pedidos.findOneAndDelete({_id : req.params.idPedido});
        res.json({mensaje: 'El pedido se ha eliminado correctamente'});
    } catch (error) {
        console.log(error)
        next();
    }
}