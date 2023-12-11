const multer = require('multer');
const Productos = require('../models/Productos');
const shortid = require('shortid');
//Agregar nuevos productos
exports.nuevoProducto = async(req, res, next) =>{
    const  producto = new Productos(req.body);
    try {
        await producto.save();
        res.json({mensaje: 'Se ha guardado el producto'});
    } catch (error) {
        console.log(error);
        next();
    }
}
/**
 * Funcion para subir archivos
 * Generar id's unicos 
 * Middleware
 * Manejar Multiplataformas
 */
const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        //nota: no fusionar shif + ctrl_izq
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            //las comillas de abajo son un caracter especial
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    filefilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype ==='image.png' ) {
            cb(null, true)
        } else {
            cb(new Error('Formato No Válido'))
        }
    },
}
// Pasar la configuracion y el campo
const upload = multer(configuracionMulter).single('imagen');

// Sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            res.json({mensaje: error})
        }
        return next();
    })
}

// Agregar nuevos productos
exports.nuevoProducto = async(req, res, next) =>{
    const producto = new Productos(req.body);
    try {
        // vreificar si subieron archivo
        if(req.file.filename){
            producto.imagen = req.file.filename
        }
        await producto.save();
        res.json({mensaje: 'Se ha guardado el producto.'});
    } catch (error) {
        console.log(error);
        next();
    }
}
//Muestra todos los productos
exports.mostrarProductos =async(req, res, next) => {
    try {
        //Obtener todos los productos
        const productos = await Productos.find({});

        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Muestra un producto especificamente por su ID
exports.mostrarProducto = async (req, res, next) => {
    const producto = await Productos.findById(req.params.idProducto);

    if(!producto) {
        res.json({mensaje: 'El producto buscado no existe.'});
        return next();
    }
    //mostrar el producto
    res.json(producto);
}
//Actualizar productos
exports.actualizarProducto = async (req, res, next) => {
    try {
        //construir un nuevo producto
        let nuevoProducto = req.body;
        //verificar si hay imagen nueva
        if(req.file) {
            nuevoProducto.imagen =req.file.filename;
        } else {
            let productoAnterior = await Productos.findById(req.params.idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Productos.findOneAndUpdate({_id : req.params.idProducto}, nuevoProducto, {
            new : true,
        });
        res.json(producto);
    } catch (error) {
        console.log(error);
        next(); 
    }
}
//Eliminar un producto por ID
exports.eliminarProducto = async (req, res, next) => {
    try {
        await Productos.findByIdAndDelete({ _id : req.params.idProducto });
        res.json({mensaje: 'El producto se ha eliminado correctamente'})
    } catch (error) {
        console.log(error);
        next();
    }
}
