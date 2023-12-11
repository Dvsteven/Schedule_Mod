import React, { Fragment, useState, useEffect } from "react";
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

function EditarCliente(props){

    // Obtener ID 
    const { id } =  props.match.params;
    console.log(id);

    // Query a la api
    const consultarApi = async () => {
        const consultaCliente = await clienteAxios.get(`/clientes/${id}`);
        console.log(consultaCliente);

        // Colocar en el state, que inicia vacio pero luego se carga
        datosCliente(consultaCliente.data);
    }

    // usseEffect cuando el componente carga.
    useEffect( () => {
        consultarApi();
    }, [] );

    

    //Arreglo para guardar los cmpos del modelo en useState
    const [cliente, datosCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    const actualizarState = e => {
        //Almacenar lo que el usuario escribe en el state
        datosCliente({
            //Obtener una copia del state actual

            ...cliente,
            [e.target.name] : e.target.value
        })
        console.log(cliente);
    }

    // Enviar la peticion por Axios para actualizar el cliente
    const actualizarCliente = e => {
        e.preventDefault();

    //Enviar peticion por Axios 
    clienteAxios.put(`/clientes/${cliente._id}`, cliente)
        .then(res => {
           //Validar si hay errrores de mongodb
           if (res.data.code === 11000){
            // console.log('error de duplicado mongo');
        
            
            Swal.fire({
                type: "error",
                title: "Hubo un Error!",
                text: "El cliente ya esta registrado",
            })

        }else{
            //console.log(res.data);
            Swal.fire(
                "Correcto",
                // res.data.mensaje,
                'Se actualizoo correctamente',
                "success"
            )
        }

        //Redireccionar
        props.history.push('/');
        })

    }

    //Validar Formulario
    const validarFormulario = () => {
        //Destructuring
        const { nombre, apellido, empresa, email, telefono} = cliente;
        //Validar propiedades el state tengan contenido.
        let valido = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;

        // Se retorna true o false
        return valido;

    }

    

    return(
        <Fragment>
            <h1>editar Cliente</h1>
            <form
                onSubmit={actualizarCliente}
            >
            
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={actualizarState} value={cliente.nombre} />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido" onChange={actualizarState} value={cliente.apellido}/>
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa" onChange={actualizarState} value={cliente.empresa}/>
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email" onChange={actualizarState}value={cliente.email}/>
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" placeholder="Teléfono Cliente" name="telefono" onChange={actualizarState}value={cliente.telefono}/>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Cliente" disabled= { validarFormulario()}/>
                </div>

            </form>


        </Fragment>
        
    )
}

export default withRouter(EditarCliente);