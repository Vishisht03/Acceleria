import { createContext, useState } from "react";


export const StudentContext = createContext(null);


export default function StudentProvider({ children }) {

    const [studentViewCoursesList,setStudentViewCoursesList] = useState([]);
    const [loadingState, setLoadingState] = useState(true);
    const [studentViewCourseDetails, setStudentViewCourseDetails] = useState(null);
    const [currentCourseDetailsId, setcurrentCourseDetailsId] = useState(null);

    return (
        <StudentContext.Provider
            value={{
                studentViewCoursesList,
                setStudentViewCoursesList,
                loadingState,
                setLoadingState,
                studentViewCourseDetails,
                setStudentViewCourseDetails,
                currentCourseDetailsId,
                setcurrentCourseDetailsId,
                
            }}
        >
            {children}
        </StudentContext.Provider>
    );
}