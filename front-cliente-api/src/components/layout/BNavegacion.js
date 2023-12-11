import React from "react";

import {link} from "react-router-dom";

const Navegacion = () => {
    return (
        <aside className="sidebar col-3">
            <h2>Administración</h2>

            <nav className="navegacion">
                <link to={"/"} className="clientes">Clientes</link>
                <link to={"/productos"} className="productos">Productos</link>
                <link to={"/pedidos"} className="pedidos">Pedidos</link>
            </nav>
        </aside>
    );
}

export default Navegacion;