import React from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import clienteAxios from "../../config/axios";
//Se trae de Clientes .js el parametro con la informacion de los clientes

function Producto({producto}) {
    //console.log(cliente.nombre);
    //Extraer todos los valores 
    const {_id, nombre, precio, imagen} = producto;

    // Eliminar cliente
    const eliminarProducto = _id => {
        // console.log('Eliminando...', id);
        Swal.fire({
            title: 'Esta seguro ?',
            text: 'El producto Eliminado no se puede Recuperar.',
            type: 'Warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminarlo!',
            cancelButtonText: 'Cancelar',
        })
        .then((result) => {
            if (result.value) {
                // Se llama el clienteAxios
                clienteAxios.delete(`/productos/${_id}`)
                .then(res => {
                    Swal.fire(
                        'Eliminando',
                        // Comunicamos el backend con el FrontEnd en el mensaje de eliminar 
                        res.data.mensaje,
                        'success'
                    );
                })
            }
        });


    }
    
    return(
        <li className="producto">
            <div className="info-producto">
                <p className="nombre">{nombre}</p>
                <p className="empresa">{precio}</p>
                <img  src={`http://localhost:5000/uploads/${imagen}`} ></img>
            </div>
            <div className="acciones">
                <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Producto
                </Link>
                <button type="button" className="btn btn-rojo btn-eliminar" onClick={() => eliminarProducto(_id)}>
                    <i className="fas fa-times"></i>
                    Eliminar Producto
                </button>
            </div>
        </li>
    )
}

export default Producto;