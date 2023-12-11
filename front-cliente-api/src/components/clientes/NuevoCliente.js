import React, { Fragment } from "react";
import clienteAxios from '../../config/axios'
import { withRouter } from "react-router-dom";
import Swal from 'sweetalert2';

function NuevoCliente({history}){

    const [cliente, guardarCliente] = useState( {
        nombre: '',
        apellido:  '',
        empresa: '',
        email: '',
        telefono: ''
    });


    const actualizarState = e => {

        guardarCliente({

            ...cliente,
            [e.target.name] : e.target.value
        })
        console.log(cliente);

    }

    const agregarCliente = e => {
        e.preventDefault();

        clienteAxios.post('/clientes', cliente)
            .then(res => {

                if(res.data.code === 11000){
                    //console.log('Error de duplicado en Mongo');
                    Swal.fire({
                        type: "error",
                        title: "Hubo un error!",
                        text: "El cliente ya esta Registrado",
                        icon: "error"
                      });
                }else{
                    //console.log(res.data)
                    Swal.fire(
                        "Se agrego el Cliente",
                        res.data.mensaje,
                        "success"
                      );
                }

                history.push('/');
            });

    }


    const validarFormulario = () => {
        const { nombre, apellido, empresa, email, telefono } = cliente;
        let  valido = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;

        return valido;
    }
    return(
        <Fragment>
            <h1>Nuevo Cliente</h1>
            <form
                onSubmit={agregarCliente}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                    placeholder="Nombre Cliente" 
                    name="nombre"
                    onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" 
                    placeholder="Apellido Cliente" 
                    name="apellido"
                    onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" 
                    placeholder="Empresa Cliente" 
                    name="empresa"
                    onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" 
                    placeholder="Email Cliente" 
                    name="email"
                    onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="email" 
                    placeholder="Teléfono Cliente" 
                    name="telefono"
                    onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                        <input type="submit" 
                        class="btn btn-azul" 
                        value="Agregar Cliente"
                        disabled = { validarFormulario()}
                        />
                </div>

            </form>
        </Fragment> 
    )
}
export default withRouter(NuevoCliente);