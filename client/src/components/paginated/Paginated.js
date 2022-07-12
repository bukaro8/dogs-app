import React from "react";

export default function Paginated({ setPagina, paginaActual }) {
    //264 es la cantidad total de razas
    const paginasTotal = Math.ceil(172 / 8);

    return (
        <div>
            {[...Array(paginasTotal)].map((e, i) =>
                paginaActual === i ? (
                    <button disabled key={i} onClick={() => ""}>
                        {i + 1}
                    </button>
                ) : (
                    <button key={i} onClick={() => setPagina(i)}>
                        {i + 1}
                    </button>
                )
            )}
        </div>
    );
}
