import React from "react";
//importa funcion Clienteaxios
import clienteAxios from "../../config/axios"
import { useEffect, useState, Fragment } from "react";
import Cliente from './Cliente';
import { Link } from 'react-router-dom';

function Clientes() {

    const [clientes, guardarCliente] = useState([]);
    //Query al api
    const consultarApi = async () => {
        const consultarCliente = await clienteAxios.get('./clientes');

        guardarCliente(consultarCliente.data);
    }

    useEffect( () => {
        consultarApi();

    }, [] );
    return (
        <Fragment>
            <h1>Clientes</h1>
                <Link to="nuevo-cliente.html" className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                    Nuevo Cliente
                </Link>
            <ul className="listado-clientes">
                {clientes.map(cliente => (
                    <Cliente 
                        key={cliente._id}
                        cliente={cliente}
                    />
                ))};

            </ul>
        </Fragment>
    )
}
export default Clientes;