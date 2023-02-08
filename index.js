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
        name: 'Node.js Course',
        auther: 'Ellie',
        tags:['node', 'backend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);

}
createCourse();