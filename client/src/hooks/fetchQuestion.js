// This is the fetch question hook
import { useEffect, useState } from "react"
import data, {answers} from "../database/data"
import { useDispatch } from "react-redux";
import * as Action from '../redux/question-reducer'

export const useFetchQuestion = () => { 
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({isLoading : false, apiData: [], serverError:null});

    useEffect(() => {
        setGetData(prev => ({ ...prev, isLoading: true }));


        // async function to fetch data
        (async () => {
            try {
                let question = await data;

                if (question.length > 0) {
                    setGetData(prev => ({ ...prev, isLoading: false }));
                    setGetData(prev => ({ ...prev, apiData: { question,answers } }));

                    dispatch(Action.startExamAction({question,answers}));
                } else {
                    throw new Error("No data found");
                }
            } catch (error) {
                setGetData(prev => ({ ...prev, isLoading: false }));
                setGetData(prev => ({ ...prev, serverError: error }));
            }
        })();
    }, [dispatch]);

    return [getData,setGetData];
}

// Move Action Dispatch
export const MoveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction())
    }catch(error){
        console.log(error);
    }
}

export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction())
    }catch(error){
        console.log(error);
    }
}