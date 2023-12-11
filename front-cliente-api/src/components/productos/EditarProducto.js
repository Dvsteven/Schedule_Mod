import React, { Fragment, useState, useEffect } from "react";
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { withRouter } from "react-router-dom";

function EditarProducto(props){
    const { id } =  props.match.params;

    const [producto, datosProducto] = useState({
        nombre: '',
        precio: '',
        imagen: '', 
    });

    useEffect(() => {
        const obtenerProducto = async () => {
            try {
                const resultado = await clienteAxios.get(`/productos/${id}`);
                datosProducto(resultado.data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerProducto();
    }, [id]);

    const actualizarState = e => {
        if (e.target.name === 'imagen') {
            // Si se cambia la imagen, se guarda el archivo
            datosProducto({
                ...producto,
                [e.target.name]: e.target.files[0],
            });
        } else {
            // Para otros campos (nombre, precio, etc.)
            datosProducto({
                ...producto,
                [e.target.name]: e.target.value,
            });
        }
    }

    const validarFormulario = () => {
        const { nombre, precio, imagen } = producto;
        return !nombre || !precio || !imagen;
    }

    const actualizarProducto = async e => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', producto.imagen);

        try {
            const resultado = await clienteAxios.put(`/productos/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Asegura que la solicitud incluya la imagen
                }
            });
            Swal.fire(
                "Producto Actualizado",
                "El producto se actualizó correctamente",
                "success"
            );
            props.history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment>
            <h1>Editar Producto</h1>
            <form onSubmit={actualizarProducto}>
                <legend>Modifica los campos</legend>
                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" name="nombre" onChange={actualizarState} value={producto.nombre} />
                </div>
                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" name="precio" min="0.00" step="0.01" placeholder="Precio" onChange={actualizarState} value={producto.precio} />
                </div>
                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file" name="imagen" onChange={actualizarState} />
                </div>
                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Guardar Cambios" disabled={validarFormulario()} />
                </div>
            </form>
        </Fragment>
    )
}

export default withRouter(EditarProducto);