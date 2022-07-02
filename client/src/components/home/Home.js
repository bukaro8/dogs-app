import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getDogs } from "../../actions";
import Card from "../card/Card";
import "./Home.css";

function Home(props) {
    const [query, setQuery] = useState("");
    useEffect(() => {
        props.getDogs(query);
    }, [query]);

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
                              <Card key={d.dog_id} dog={d} detalle={query ? true : false} />
                          </div>
                      ))
                    : null}
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
        getDogs: (query) => dispatch(getDogs(query)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
