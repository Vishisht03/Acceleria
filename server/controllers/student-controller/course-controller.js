const Course = require("../../models/Course");


const getAllStudentViewCourses = async (req, res) => {
    try {
        const { category = [],
            level = [],
            primaryLanguage = [],
            sortBy = "title-atoz"
        } = req.query;

        let filters = {}
        if (category.length) { 
            filters.category = {$in: category.split(",")};
        }
        if (level.length) { 
            filters.level = {$in: level.split(",")};
        }
        if (primaryLanguage.length) { 
            filters.primaryLanguage = {$in: primaryLanguage.split(",")};
        }

    let sortParam = {};
    switch (sortBy) {
      case "title-atoz":
        sortParam.title = 1;

        break;
      case "title-ztoa":
        sortParam.title = -1;

        break;

      default:
        sortParam.title = 1;
        break;
    }

        const coursesList = await Course.find(filters).sort(sortParam);
        
        res.status(200).json({
            success: true,
            data: coursesList,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getStudentViewCourseDetails = async (req, res) => {
    try {
        const {id} = req.params;
        const courseDetails = await Course.findById(id);
        if(!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
                data: null
            });
        }
        res.status(200).json({
            success: true,
            data: courseDetails
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getAllStudentViewCourses,
    getStudentViewCourseDetails
};