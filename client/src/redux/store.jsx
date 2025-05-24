import { combineReducers, configureStore } from "@reduxjs/toolkit";


// call reducers
import  questionsReducer  from "./question-reducer";
import  resultReducer  from "./result-reducer";
const rootReducer = combineReducers({
    questions: questionsReducer,
    result: resultReducer
})

// create store with reducer
export default configureStore({reducer: rootReducer})