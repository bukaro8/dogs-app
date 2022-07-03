import React from "react";
import {Link } from "react-router-dom";
import "./Welcome.css";

export default function Welcome() {
    return (
        <div className="main_class">
            <h1>The Bible Of Dogs</h1>
            <Link to="/home" style={{ textDecoration: 'none' }}>
                <button className="btn-primary">Bienvenido</button>
            </Link>
        </div>
    );
}
