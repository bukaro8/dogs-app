import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_DOG_DETAIL = "GET_DOGS";

export function getDogs(query, pagina, pesoRaza) {
    return function (dispatch) {
        return axios
            .get(
                `http://localhost:3001/dogs?name=${query}&pagina=${pagina}&pesoRaza=${pesoRaza}`
            )
            .then(({ data }) => {
                dispatch({ type: GET_DOGS, payload: data });
            });
    };
}


