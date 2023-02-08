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
        name: 'Node Course',
        auther: 'Ellie',
        tags:['node', 'backend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);

}
createCourse();

async function getCourses() {
    // const pageNumber = 2;
    // const pageSize = 10;
    
    const courses = await Course
        // .skip(pageNumber - 1 * pageSize)
        // .limit(pageSize)
        .find({auther:'Ellie', isPublished:true})

        //starts with Elli
        // .find({auther: /^Elli/})

        //ends with llie
        // .find({auther: /llie$/i })

        // contains Ellie
        // .find({auther: /.*Ellie.*/i })


        // .find()
        // .or([ {author: 'Ellie'}, {isPublished:true}])
        // .and( [ {}, {}])

        // .find({price: {$gt:10, $lt:20}})
        // .find({price: { $in: [10, 15, 20]}})
        // .count()


        .limit(10)
        .sort({name: 1})
        .select({name: 1, tags: 1});
    console.log(courses);
}
getCourses();