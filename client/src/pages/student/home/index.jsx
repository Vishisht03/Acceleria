import { courseCategories } from '@/config';
import banner from './../../../../src/assets/banner-img.png';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useContext, useEffect } from 'react';
import { StudentContext } from '@/context/student-context';
import { fetchStudentViewCourseListService } from '@/services';

function StudentHomePage() {
  const { studentViewCoursesList, setStudentViewCoursesList } = useContext(StudentContext);
  const navigate = useNavigate();

  function handleNavigateToCoursesPage(getCurrentId) {
    sessionStorage.removeItem('filters');
    const currentFilter = {
      category: [getCurrentId],
    };
    sessionStorage.setItem('filters', JSON.stringify(currentFilter));
    navigate('/courses');
  }

  async function fetchAllStudentViewCourses() {
    const response = await fetchStudentViewCourseListService();
    if (response?.success) setStudentViewCoursesList(response?.data);
  }

  async function handleCourseNavigate(getCurrentCourseId) {
    navigate(`/course/details/${getCurrentCourseId}`);
  }

  useEffect(() => {
    fetchAllStudentViewCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between py-20 px-8 lg:px-20 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-500 text-white dark:bg-gradient-to-b dark:from-blue-700 dark:to-indigo-700 shadow-lg">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-5xl font-extrabold leading-tight mb-6 animate-fade-in">
            Elevate Your Learning Experience
          </h1>
          <p className="text-lg font-medium opacity-90">
            Unlock knowledge that will shape your future. Begin your journey with us today.
          </p>
          <Button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-blue-100 transition duration-300">
            Get Started
          </Button>
        </div>
        <div className="lg:w-1/2 flex justify-center animate-slide-in">
          <img src={banner} alt="Learning Banner" className="rounded-xl shadow-xl w-3/4" />
        </div>
      </section>

      {/* Course Categories */}
      <section className="text-gray-800 dark:text-gray-100 py-16 px-8 lg:px-20 bg-gray-100 dark:bg-gray-800 rounded-t-3xl shadow-lg">
        <h2 className="text-4xl font-bold mb-8 text-center">Explore Course Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {courseCategories.map((categoryItem) => (
            <Button
              key={categoryItem.id}
              onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
              className="p-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-110 text-center"
            >
              {categoryItem.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 px-8 lg:px-20 bg-white dark:bg-gray-900 shadow-lg rounded-b-3xl">
        <h2 className="text-4xl font-bold mb-8 text-center">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
            studentViewCoursesList.map((courseItem) => (
              <div
                key={courseItem?._id}
                onClick={() => handleCourseNavigate(courseItem?._id)}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105 cursor-pointer"
              >
                <img
                  src={courseItem?.image}
                  alt={courseItem?.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">
                    {courseItem?.title}
                  </h3>
                  <p className="text-md text-gray-600 dark:text-gray-400 font-medium">
                    {courseItem?.instructorName}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-xl font-medium text-gray-500 dark:text-gray-400">
              No Courses Found
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentHomePage;