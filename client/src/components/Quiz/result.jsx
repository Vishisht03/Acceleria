import { Link } from "react-router-dom";
import ResultTable from "./resultTable";
import { useDispatch, useSelector } from "react-redux";
import { resetResultAction } from "@/redux/result-reducer";
import { resetAllAction } from "@/redux/question-reducer";
import { useEffect } from "react";
import { attempt_Number, earnPoints_Number,flagResult } from "@/helper/helper"; 
export default function ResultPage() {
  const dispatch = useDispatch()
  const {questions:{queue,answers},result:{result,userId}} = useSelector(state => state)

  useEffect(() => {
    console.log(flag)
  })

  const totalPoints = queue.length * 10;
  const attempts = attempt_Number(result);
  const earnPoints = earnPoints_Number(result, answers, 10);
  
  const flag = flagResult(totalPoints,earnPoints)
  


  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">
          Quiz for Assessment
        </h1>

        <div className="grid grid-cols-2 gap-4 text-lg text-gray-700 mb-8">
          <div className="flex justify-between">
            <span className="font-semibold">Username:</span>
            <span>Vishisht</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Total Quiz Points:</span>
            <span>{totalPoints || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Total Questions:</span>
            <span>{queue.length || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Total Attempts:</span>
            <span>{attempts || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Total Earn Points:</span>
            <span>{earnPoints || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Quiz Result:</span>
            <span className={`font-bold ${flag ? 'text-green-600' : 'text-red-600'}`}>
  {flag ? "Passed" : "Failed"}
</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <Link
            to="/main"
            onClick={onRestart}
            className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Restart
          </Link>
        </div>

        {/* <div>
          <ResultTable />
        </div> */}
      </div>
    </div>
  );
}
