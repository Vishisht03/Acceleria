import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

//  redux store import

// Custom Hook
import { useFetchQuestion } from "../../hooks/fetchQuestion";
import { updateResult } from "@/hooks/setResult";

updateResult
export default function Questions({onChecked}) {

    const [checked, setChecked] = useState(undefined);
    const {trace} = useSelector(state => state.questions)
    const result = useSelector(state => state.result.result)
    const [{isLoading, apiData, serverError}] = useFetchQuestion();
    const questions = useSelector(state => state.questions.queue[state.questions.trace])
    useSelector(state => console.log(state));
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(trace,checked);
        dispatch(updateResult({ trace, checked }));
    },[checked])

    function onSelect(i) {
        onChecked(i);
        setChecked(i);
        dispatch(updateResult({ trace, checked }));
    }

    if(isLoading) return <h3>isLoading</h3>
    if(serverError) return <h3>{serverError || "Unknown Error"}</h3>
    return (
        <div>
            <h2>{questions?.question}</h2>

            <ul key={questions?.id}>
                {
                    questions?.options.map((q, i) => (
                        <li key={i}>
                            <input
                                type="radio"
                                value={false}
                                name="options"
                                id={`q${i}-option`}
                                onChange={() => onSelect(i)}
                                // checked={result[trace] === i}
                    
                            />
                            <label htmlFor={`q${i}-option`}>{q}</label>
                            <div className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
    result[trace] === i ? 'bg-blue-100 border border-blue-500' : 'bg-blue'
  }`}></div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}