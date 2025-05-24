import InstructorCourses from "@/components/instructor-view/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import DarkMode from "@/DarkMode";
import { fetchInstructorCourseListService } from "@/services";
import { BarChart, Book, LogOut, FilePlus, Menu } from "lucide-react";
import { useContext, useEffect, useState } from "react";

function InstructorDashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { resetCredentials } = useContext(AuthContext);
  const { instructorCoursesList, setInstructorCoursesList } = useContext(InstructorContext);

  async function fetchAllCourses() {
    const response = await fetchInstructorCourseListService();
    if (response?.success) setInstructorCoursesList(response?.data);
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <InstructorDashboard />, 
    },
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: <InstructorCourses listOfCourses={instructorCoursesList} />,
    },
    // {
    //   icon: FilePlus,
    //   label: "Assignment",
    //   value: "add-assignment",
    //   component: <div className='p-6'>Add New Assignment Feature Coming Soon!</div>,
    // },
    {
      icon: LogOut,
      label: "Logout",
      value: "logout",
      component: null,
    },
  ];

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-500 text-white">
      {/* Sidebar */}
      <aside className={`bg-gray-900 shadow-lg p-6 rounded-r-3xl transition-all duration-300 ${sidebarOpen ? "w-72" : "w-20"} hidden md:block`}>
        <div className="flex justify-between items-center mb-6">
          {sidebarOpen && <h2 className="text-2xl font-bold">Instructor Panel</h2>}
          <Button variant="ghost" className="p-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <nav className="space-y-4">
          {menuItems.map((menuItem) => (
            <Button
              key={menuItem.value}
              className={`w-full flex items-center gap-3 p-4 rounded-lg transition-transform transform hover:scale-105 ${
                activeTab === menuItem.value ? "bg-blue-600" : "bg-gray-800"
              }`}
              onClick={
                menuItem.value === "logout" ? handleLogout : () => setActiveTab(menuItem.value)
              }
            >
              <menuItem.icon className="h-5 w-5" />
              {sidebarOpen && menuItem.label}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gray-50 dark:bg-gray-900 rounded-l-3xl overflow-y-auto">
        <div className="absolute top-4 right-4">
          <DarkMode />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Dashboard</h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="transition-all duration-500">
          {menuItems.map((menuItem) => (
            <TabsContent key={menuItem.value} value={menuItem.value}>
              {menuItem.component !== null ? menuItem.component : null}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}

export default InstructorDashboardPage;
