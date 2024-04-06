import axios from "axios";
export const loadUser = () => async (dispatch) => {

    try {
        dispatch({
            type: 'LoginRequest'
        });

        // Retrieve the data from localStorage and parse it as JSON
        const dataString = localStorage.getItem("auth");
        const data = JSON.parse(dataString);
           console.log(data);

            // Check if the data contains a user property
        if (data) {
            dispatch({
                type: 'LoginSuccess',
                payload: data
            });
        } else {
            // Handle the case where user data is missing or not in the expected format
            dispatch({
                type: 'LoginFail',
                payload: 'User data not found in localStorage'
            });
        }
    } catch (error) {
        dispatch({
            type: 'LoginFail',
            payload: error.message
        });
    }
};
