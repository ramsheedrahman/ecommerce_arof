import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { searchReducer } from "./reducers/Search.js";
const store=configureStore({
    reducer:{
     user:userReducer,
     search:searchReducer
    }
})
export default store