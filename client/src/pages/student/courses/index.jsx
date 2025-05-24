import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { filterOptions, sortOptions } from "@/config";
import { StudentContext } from "@/context/student-context";
import { fetchStudentViewCourseListService } from "@/services";
import { DropdownMenuRadioGroup, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) { 
    const queryParams = [];
    for (const [key, value] of Object.entries(filterParams)) { 
        if (Array.isArray(value) && value.length > 0) { 
            const paramValue = value.join(',');
            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
        }
    }
    return queryParams.join('&');
}

function StudentViewCoursesPage() {
    const [sort, setSort] = useState('title-atoz')
    const [filters, setFilters] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();

    const { studentViewCoursesList, setStudentViewCoursesList,
        loadingState, setLoadingState } = useContext(StudentContext);
    
    const navigate = useNavigate();
    

    function handleFilterOnChange(getSectionId, getCurrentOption) { 
        let cpyFilters = { ...filters };
        const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

        console.log(indexOfCurrentSection, getSectionId);
        if (indexOfCurrentSection === -1) {
            cpyFilters = {
                ...cpyFilters,
                [getSectionId]: [getCurrentOption.id],
            };
            console.log(cpyFilters);
        }
        else {
            const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(
                getCurrentOption.id
              );
        
              if (indexOfCurrentOption === -1)
                cpyFilters[getSectionId].push(getCurrentOption.id);
              else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
        }
        setFilters(cpyFilters);
        sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
    }
    



    async function fetchAllStudentViewCourses(filters,sort) {
        const query = new URLSearchParams({
            ...filters,
            sortBy: sort
        })
        const response = await fetchStudentViewCourseListService(query);
        if (response?.success) {
            setStudentViewCoursesList(response?.data);
            setLoadingState(false);
        }
    }

    useEffect(() => { 
        const buildQueryStringForFilters = createSearchParamsHelper(filters);
        setSearchParams(new URLSearchParams(buildQueryStringForFilters));
    },[filters])


    useEffect(() => {
        setSort('title-atoz')
        setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
    },[])

    useEffect(() => {
        if (filters !== null && sort !== null)

        fetchAllStudentViewCourses(filters,sort);
    }, [filters, sort]);
    
    useEffect(() => {
        return () => {
            sessionStorage.removeItem("filters");
        }
    },[])

    console.log(filters);
    
    return (
        <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
  {/* Page Title */}
  <h1 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white">
    All Courses
  </h1>

  {/* Layout: Sidebar and Main Content */}
  <div className="flex flex-col md:flex-row gap-6">
    {/* Sidebar */}
    <aside className="w-full md:w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 dark:text-white">
        Filters
      </h2>
      <div className="space-y-6">
        {Object.keys(filterOptions).map((keyItem) => (
          <div className="border-b pb-4" key={keyItem}>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
              {keyItem.toUpperCase()}
            </h3>
            <div className="grid gap-2">
              {filterOptions[keyItem].map((option) => (
                <label
                  className="flex items-center gap-3 font-medium text-gray-700 dark:text-gray-300"
                  key={`${keyItem}${option.id}`}
                >
                  <Checkbox
                    checked={
                      filters &&
                      Object.keys(filters).length > 0 &&
                      filters[keyItem] &&
                      filters[keyItem].indexOf(option.id) > -1
                    }
                    onCheckedChange={() => handleFilterOnChange(keyItem, option)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>

    {/* Main Content */}
    <main className="flex-1">
      {/* Sorting and Results Count */}
      <div className="flex justify-between items-center mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
            >
              <ArrowUpDownIcon className="h-5 w-5" />
              <span className="font-medium">Sort By</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px] bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <DropdownMenuRadioGroup value={sort} onValueChange={(value) => setSort(value)}>
              {sortOptions.map((sortItem) => (
                <DropdownMenuRadioItem
                  value={sortItem.id}
                  key={sortItem.id}
                  className="text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {sortItem.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="text-lg font-semibold">
          {studentViewCoursesList.length} Results
        </span>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
          studentViewCoursesList.map((courseItem) => (
            <div
              onClick={() => navigate(`/course/details/${courseItem?._id}`)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
              key={courseItem?._id}
            >
              <img
                src={courseItem?.image}
                alt={courseItem?.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {courseItem?.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                  Created by <span className="font-semibold">{courseItem?.instructorName}</span>
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-400 mt-3">
                  {`${courseItem?.curriculum?.length} ${
                    courseItem?.curriculum?.length <= 1 ? "Lecture" : "Lectures"
                  } - ${courseItem?.level.toUpperCase()} Level`}
                </p>
              </div>
            </div>
          ))
        ) : loadingState ? (
          <Skeleton />
        ) : (
          <h1 className="col-span-full text-3xl font-bold text-center text-gray-500 dark:text-gray-400">
            No Courses Found
          </h1>
        )}
      </div>
    </main>
  </div>
</div>

    )
}
export default StudentViewCoursesPage;