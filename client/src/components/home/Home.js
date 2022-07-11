import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getDogs } from "../../actions";
import Card from "../card/Card";
import Paginated from "../paginated/Paginated";
import "./Home.css";

function Home(props) {
    const [query, setQuery] = useState("");
    const [pagina, setPagina] = useState(0);
    const [pesoRaza, setPesoRaza] = useState("");

    useEffect(() => {
        props.getDogs(query, pagina, pesoRaza);
    }, [query, pagina, pesoRaza]);

    const handleChange = (q) => {
        setQuery(q);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleChangePesoRaza = (seleccion) => {
        setPesoRaza(seleccion.target.value);
    };

    return (
        <>
            <section>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input
                        type="text"
                        placeholder="Search"
                        onChange={(e) => handleChange(e.target.value)}
                    />
                </form>
            </section>
            <div>
                <select
                    name="ordenar_peso_raza"
                    value={pesoRaza}
                    onChange={handleChangePesoRaza}
                >
                    <option value="">Ordenar</option>
                    <option value="peso_asc">Peso Ascendente</option>
                    <option value="peso_desc">Peso Descendente</option>
                    <option value="abc_asc">Alfebetico Ascendente</option>
                    <option value="abc_desc">Alfabetico Descendente</option>
                </select>
                {/* <select name="ordenar_temperamento" id="temperamento">
                    <option value="">Temperamento</option>
                    <option value="dog">Peso Ascendente</option>
                </select>
                <select name="filtrar_raza" id="raza">
                    <option value="">Raza</option>
                    <option value="dog">Peso Ascendente</option>
                </select> */}
            </div>

            <div className="grid">
                {props.dogs
                    ? props.dogs.map((d) => (
                          <div className="card" key={d.dog_id}>
                              <Card
                                  dog={d}
                                  detalle={query ? true : false}
                              />
                          </div>
                      ))
                    : null}
                {!query && (
                    <div>
                        <hr />
                        <Paginated
                            setPagina={setPagina}
                            paginaActual={pagina}
                        />
                    </div>
                )}
            </div>
        </>
    );
}

function mapStateToProps(state) {
    return {
        ...state,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getDogs: (query, pagina, pesoRaza) =>
            dispatch(getDogs(query, pagina, pesoRaza)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
