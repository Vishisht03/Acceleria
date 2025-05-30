require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes/index');
const mediaRoutes = require('./routes/instructor-routes/media-routes');
const instructorCourseRoutes = require('./routes/instructor-routes/course-routes');
const studentViewCourseRoutes = require('./routes/student-routes/course-routes');
// const assistantChatRoute = require('./routes/assistant-routes/chat')

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(
    cors({
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST", "DELETE", "PUT"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

app.use(express.json());

//database connection
mongoose
    .connect(MONGO_URI)
    .then(() =>  console.log('Connected to MongoDB'))
    .catch((e) => console.log(e));


//routes configurations

app.use('/auth', authRoutes);
app.use("/media", mediaRoutes);
app.use('/instructor/course', instructorCourseRoutes);
app.use('/student/course', studentViewCourseRoutes);
// app.use('/api', assistantChatRoute);



app.use((err, req, next, res) => {
    console.log(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong',
    });
});

app.listen(PORT, () =>
    console.log(`Server is now running on port ${PORT}`));

