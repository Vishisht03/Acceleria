const mongoose = require('mongoose');

const LectureSchema = new mongoose.Schema({ 
    title: String,
    videoUrl: String,
    public_id: String,
    freePreview: Boolean,
})
const CourseSchema = new mongoose.Schema({
    instructorId: String,
    instructorName: String,
    date: Date,
    title: String,
    category: String,
    level: String,
    primaryLanguage: String,
    subtitle: String,
    description: String,
    image: String,
    welcomeMessage: String,
    objectives: String,
    students: [
        {
            studentId: String,
            studentName: String,
            studentEmail: String,
        },
    ],
    curriculum: [LectureSchema],
    isPublished: Boolean,
});

module.exports = mongoose.model('Course', CourseSchema);