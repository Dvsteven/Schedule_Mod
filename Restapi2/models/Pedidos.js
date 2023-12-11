const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pedidoSchema = new Schema({
    cliente: {
        type: Schema.ObjectId,
        ref: 'Clientes'
    },
    pedido: [{
        producto: {
            type: Schema.ObjectId,
            ref: 'Productos'
        },
        cantidad: Number
    }],
    total: {
        type: Number
    }
});

/**  Middleware para calcular el campo "total" antes de guardar
pedidoSchema.pre('save', function(next) {
    // Calcular el total sumando el costo de los productos en el pedido
    const pedido = this;
    let total = 0;

    for (const item of pedido.pedido) {
        // Suponiendo que cada producto tiene un campo "precio"
        total += item.producto.precio * item.cantidad;
    }

    pedido.total = total;
    next();
});
*/

module.exports = mongoose.model('Pedidos', pedidoSchema);