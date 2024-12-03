import InstructorCourses from "@/components/instructor-view/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import { fetchInstructorCourseListService } from "@/services";
import { BarChart, Book, LogOut } from "lucide-react";
import { useContext, useEffect, useState } from "react";




function InstructorDashboardPage() {

    const [activeTab, setActiveTab] = useState('dashboard');
    const { resetCredentials } = useContext(AuthContext);
    const { instructorCoursesList, setInstructorCoursesList } =
        useContext(InstructorContext);
    
    async function fetchAllCourses() {
        const response = await fetchInstructorCourseListService();
        if (response?.success) setInstructorCoursesList(response?.data);
    }
    
    useEffect(() => {
        fetchAllCourses()
    }, [])

    const menuItems = [
        {
            icon: BarChart,
            label: "Dashboard",
            value: "dashboard",
            component: <InstructorDashboard />
        },
        {
            icon: Book,
            label: "Courses",
            value: "courses",
            component: <InstructorCourses listOfCourses={instructorCoursesList} />
        },
        {
            icon: LogOut,
            label: "Logout",
            value: "logout",
            component: null,
        }
    ];

    function handleLogout() {
        resetCredentials();
        sessionStorage.clear();
    }

    return (
        <div className="flex h-full min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-500">
  {/* Sidebar */}
  <aside className="w-64 bg-white shadow-lg rounded-r-3xl hidden md:block p-4">
    <div className="flex flex-col items-start">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Instructor View</h2>
      <nav className="space-y-4 w-full">
        {menuItems.map((menuItem) => (
          <Button
            className="w-full justify-start mb-2 p-3 rounded-lg transition-all duration-300 transform hover:bg-blue-700 hover:text-white hover:scale-105"
            key={menuItem.value}
            variant={activeTab === menuItem.value ? "secondary" : "ghost"}
            onClick={menuItem.value === 'logout' ? handleLogout : () => setActiveTab(menuItem.value)}
          >
            <menuItem.icon className="mr-3 h-5 w-5 text-gray-700" />
            {menuItem.label}
          </Button>
        ))}
      </nav>
    </div>
  </aside>

  {/* Main Content */}
  <main className="flex-1 p-8 overflow-y-auto bg-gray-50 rounded-l-3xl">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8">Dashboard</h1>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {menuItems.map((menuItem) => (
          <TabsContent key={menuItem.value} value={menuItem.value} className="transition-all duration-500 ease-in-out">
            {menuItem.component !== null ? menuItem.component : null}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  </main>
</div>

    );
}

export default InstructorDashboardPage;