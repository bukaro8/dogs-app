import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getDogs } from "../../actions";
import Card from "../card/Card";
import Paginated from "../paginated/Paginated";
import "./Home.css";

function Home(props) {
    const [query, setQuery] = useState("");
    const [pagina, setPagina] = useState(0);

    useEffect(() => {
        props.getDogs(query, pagina);
    }, [query, pagina]);

    const handleChange = (q) => {
        setQuery(q);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
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
            <div className="grid">
                {props.dogs
                    ? props.dogs.map((d) => (
                          <div className="card">
                              <Card
                                  key={d.dog_id}
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
        getDogs: (query, pagina) => dispatch(getDogs(query, pagina)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
