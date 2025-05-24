// import React, { useEffect, useState } from 'react'
import { useEffect, useState } from 'react';
import Questions from './questions'


/** redux store import */
import { useSelector, useDispatch } from 'react-redux'
import { MoveNextQuestion, MovePrevQuestion } from '@/hooks/fetchQuestion';
import { pushAnswer } from '@/hooks/setResult';
import { Navigate } from 'react-router-dom';

export default function QuizPage() {
  const [check,setChecked] = useState(undefined)

  const result = useSelector(state => state.result.result)
  const {queue, trace} = useSelector(state => state.questions)
  const dispatch = useDispatch();
  
    

    function onNext(){
      if (trace < queue.length) {
        
        dispatch(MoveNextQuestion());
        
        if (result.length <= trace) {
          dispatch(pushAnswer(check));
        }
      }

      // reset the value of the checked variable
      setChecked(undefined);
    }
     
        /** reset the value of the checked variable */
        // setChecked(undefined)
    // }

   

    function onPrev(){
      if (trace > 0) {
        dispatch(MovePrevQuestion());
        
      }
    }

    function onChecked(check){
      console.log(check)
      setChecked(check)
    }

    /** finished exam after the last question */
    if(result.length && result.length >= queue.length){
        return <Navigate to={'/result'} replace={true}></Navigate>
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">
            <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Take a Quiz</h1>
      
            {/* Questions Component */}
            <div className="mb-6">
            <Questions onChecked={onChecked} />
            </div>
      
            {/* Navigation Buttons */}
            <div className="flex justify-between">
            {
               trace>0 ? <button
               className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-full disabled:opacity-50"
               onClick={onPrev}
             >
               Prev
             </button>  : <div></div>
              }
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full"
                onClick={onNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      );
      
}