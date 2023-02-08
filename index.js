const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('connected to MongoDB...'))
    .catch(err => console.error('could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    auther: String,
    tags: [String],
    date: { type: Date, default: Date.now},
    isPublished: Boolean
});
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        auther: 'Ellie',
        tags:['angular', 'frontend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);

}
createCourse();

async function getCourses() {
    const courses = await Course
        .find({auther:'Ellie', isPublished:true})
        .limit(10)
        .sort({name: 1})
        .select({name: 1, tags: 1});
    console.log(courses);
}
getCourses();