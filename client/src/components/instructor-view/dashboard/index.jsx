import { StudentContext } from "@/context/student-context";
import { fetchStudentViewCourseListService } from "@/services";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function InstructorDashboard() {
    const { studentViewCoursesList, setStudentViewCoursesList } = useContext(StudentContext);
    const navigate = useNavigate();

    // function handleNavigateToCoursesPage(getCurrentId) {
    //     console.log(getCurrentId);
    //     sessionStorage.removeItem("filters");
    //     const currentFilter = {
    //       category: [getCurrentId],
    //     };
    
    //   sessionStorage.setItem("filters", JSON.stringify(currentFilter));
      
    //   navigate("/courses");
    
  // }
  // const [instructorCourses, setInstructorCourses] = useState([]);

// useEffect(() => {
//     async function fetchCourses() {
//         const response = await fetchStudentViewCourseListService(); // Ideally, use a separate instructor API
//         if (response?.success) setInstructorCourses(response?.data);
//     }
//     fetchCourses();
// }, []);



    async function fetchAllStudentViewCourses() {
        const response = await fetchStudentViewCourseListService();
        if(response?.success) setStudentViewCoursesList(response?.data);
    }
  //   async function handleCourseNavigate(getCurrentCourseId) {
  //       navigate(`/course/details/${getCurrentCourseId}`)
  // }
  
    useEffect(() => {
        fetchAllStudentViewCourses();
    }, []);
    
    return (
      <section className="py-12 px-4 lg:px-8">
      {/* Uploaded Courses Section */}
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800 dark:text-white">
        Uploaded Courses
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
          studentViewCoursesList.map((courseItem) => (
            <div
              onClick={() => navigate(`/instructor/edit-course/${courseItem?._id}`)}
              className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              key={courseItem?._id}
            >
              <img
                src={courseItem?.image}
                alt={courseItem?.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 bg-gray-50 dark:bg-gray-800">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  {courseItem?.title}
                </h3>
                {/* <p className="text-sm text-gray-600 dark:text-gray-300">
                  By {courseItem2?.instructorName || "Unknown"}
                </p> */}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            <h1 className="text-lg font-semibold">No Courses Found</h1>
          </div>
        )}
      </div>
    
      {/* Uploaded Assignments Section */}
      {/* <div className="mt-16">
        <h2 className="text-3xl font-extrabold mb-8 text-gray-800 dark:text-white">
          Uploaded Assignments
        </h2>
        {studentViewAssignmentsList && studentViewAssignmentsList.length > 0 ? (
          <ul className="space-y-6">
            {studentViewAssignmentsList.map((assignment, index) => (
              <li
                key={index}
                className="border p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                    {assignment.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Submitted on: {assignment.dateSubmitted}
                  </p>
                </div>
                <a
                  href={assignment.downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline text-sm font-medium"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500">
            <h1 className="text-lg font-semibold">No Assignments Found</h1>
          </div>
        )}
      </div> */}
    </section>
    
    );
}
export default InstructorDashboard;