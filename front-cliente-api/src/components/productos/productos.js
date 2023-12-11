import React, { Fragment } from "react";

//Se importa funcion productoAxios
import clienteAxios from "../../config/axios";
import { useEffect, useState } from "react";
import Producto from './producto';
import { Link } from 'react-router-dom';


function Productos() {

    //Trabajar con el state (hooks)
    //Todos los resultados se guardan en productos donde productos = state
    //GuardarCliente = funcion para guardar el state

    const [productos, guardarProducto] = useState([]);
    //Query al api
    const consultarApi = async () => {
        const consultarProducto = await clienteAxios.get('/productos');

        //Colocar el resultado en el state qu se llamaer productos
        //console.log(consultarProducto);
        guardarProducto(consultarProducto.data);
    }


    /**Use effect es similar a componentdidmount y willmount para controlar el cciclo de vida
     * los componentes */

    useEffect( () => {
        consultarApi();
        
    }, [productos] );
    return (
        <Fragment>
            <h1>Productos</h1>

                <Link to="/productos/nuevo" className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                    Nuevo Producto
                </Link>

            <ul className="listado-productos">
                {productos.map(producto => (
                    //Console.log(cliente)
                    <Producto 
                        key={producto._id}
                        producto={producto}
                    />
                ))}

            </ul>

        </Fragment>
            
    )

}

export default Productos;