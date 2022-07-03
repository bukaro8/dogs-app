import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_DOG_DETAIL = "GET_DOGS";

export function getDogs(query) {
    return function (dispatch) {
        return axios
            .get(
                `http://localhost:3001/dogs?name=${query}`
            )
            .then(({ data }) => {
                dispatch({ type: GET_DOGS, payload: data });
            });
    };
}


