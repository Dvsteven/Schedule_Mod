import React, { Fragment, useState } from "react";
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';

import { withRouter } from "react-router-dom";

function NuevoProducto({history}){

    //Arreglo para guardar los cmpos del modelo en useState
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: '',
        imagen: null,
    });

    const actualizarState = e => {
        if (e.target.name === 'imagen') {
            guardarProducto({
                ...producto,
                [e.target.name]: e.target.files[0], // Almacena el archivo en el estado
            });
        } else {
            guardarProducto({
                ...producto,
                [e.target.name]: e.target.value,
            });
        }
    }

    //Validar Formulario
    const validaFormulario = () => {
        const { nombre, precio, imagen } = producto;
        return !nombre || !precio || !imagen;
    }

    //Añade el REST API un cliente nuevo
    const agregarProducto = e => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', producto.imagen); // Agrega el archivo al FormData

        clienteAxios.post('/productos', formData)
            .then(res => {
                if (res.data.code === 11000) {
                    Swal.fire({
                        type: "error",
                        title: "Hubo un Error!",
                        text: "El Producto ya está registrado",
                    });
                } else {
                    Swal.fire(
                        "Se agregó el Producto",
                        res.data.mensaje,
                        "success"
                    );
                }
                history.push('/');
            });
    }

    return(
        <Fragment>
            <h2>Nuevo Producto</h2>
            <form 
            onSubmit={agregarProducto} encType="multipart/form-data"
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" name="nombre" onChange={actualizarState}/>
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" name="precio" min="0.00" step="0.01" placeholder="Precio" onChange={actualizarState}/>
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file"  name="imagen" onChange={actualizarState} />
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Agregar Producto" disabled= {validaFormulario()} />
                </div>
            </form>

        </Fragment>
        
    )
}

export default withRouter(NuevoProducto);