const express = require('express');
const router = express.Router();
const clienteController = require ('../controllers/clienteController');
const productoController = require ('../controllers/productoController');
const pedidoController = require ('../controllers/pedidoController');

module.exports = function() {

    router.post('/clientes', clienteController.nuevoCliente);

    router.get('/clientes', clienteController.mostrarClientes);
    //Obtener cliente por ID
    router.get('/clientes/:idCliente', clienteController.mostrarClientes);
    //Actualizar clientes
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);

/*PRODUCTOS*/
//Agregar nuevo producto
    router.post('/productos', productoController.subirArchivo, productoController.nuevoProducto);

    router.get('/productos', productoController.mostrarProductos);

    router.get('/productos/:idProducto', productoController.mostrarProducto);

    router.put('/productos/:idProducto', productoController.subirArchivo, productoController.actualizarProducto);

    router.delete('/productos/:idProducto', productoController.eliminarProducto);

/**Pedidos */

    router.post('/pedidos', pedidoController.nuevoPedido);
    //Mostrar pedidos
    router.get('/pedidos', pedidoController.mostrarPedido);
    //mostrar pedidos por ID
    router.get('/pedidos/:idPedido', pedidoController.mostrarPedidos)
    //Actualizar Pedido
    router.put('/pedidos/:idPedido', pedidoController.actualizarPedido);
    //Eliminar el pedido
    router.delete('/pedidos/:idPedido', pedidoController.eliminarPedido);

    return router;
}