import { GraduationCap, TvMinimalPlay } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import DarkMode from "@/DarkMode";



function StudentViewCommonHeader() {
    const navigate = useNavigate();
    const { resetCredentials } = useContext(AuthContext);


    function handleLogout() {
        resetCredentials();
        sessionStorage.clear();
    }
    return (
        <header className="flex items-center justify-between p-4 border-b relative">
            <div className="flex items-center space-x-4">
                <Link to="/home" className="flex items-center hover:text-black">
                    <GraduationCap className="h-8 w-8 mr-4 " />
                    <span className="font-extrabold md:text-xl text-[14px]">Acceleria</span>
                </Link>
                <div className="flex items-center space-x-1">
                    <Button
                        onClick={()=>navigate('/courses')}
                        variant="ghost"
                        className="text-[14px] md:text-[16px] font-medium"
                    >
                        Explore Courses
                    </Button>
                </div>
                <div className="flex items-center space-x-1">
                    <Button
                        onClick={()=>navigate('/main')}
                        variant="ghost"
                        className="text-[14px] md:text-[16px] font-medium"
                    >
                        Explore Assignments
                    </Button>
                </div>
                <div className="flex items-center space-x-1">
                    <Button
                        onClick={()=>navigate('/assistant')}
                        variant="ghost"
                        className="text-[14px] md:text-[16px] font-medium"
                    >
                        Prep with AI
                    </Button>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex gap-4 items-center">
                    <div
                        className="flex items-center gap-3"
                    
                    >
                        {/* <span className="font-extrabold md:text-xl text-[14px]">My Courses</span> */}
                        <TvMinimalPlay className="w-8 h-8 cursor-pointer"/>
                    </div>
                    <DarkMode/>
                    <Button onClick={handleLogout}>Sign Out</Button>
                </div>
            </div>
        </header>
    );
}

export default StudentViewCommonHeader;