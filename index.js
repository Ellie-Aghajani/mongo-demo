// require('dotenv').config()
// const mongoPassword = process.env.MONGO_PASSWORD;
// const mongoHost = process.env.MONGO_HOST;

// console.log('+++++++++++', mongoPassword );
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
// mongoose.connect(`mongodb+srv://admin:${mongoPassword}@${mongoHost}/?retryWrites=true&w=majority`)
    .then(() => console.log('connected to MongoDB...'))
    .catch(err => console.error('could not connect to MongoDB...', err.message));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
        
        },
    category: {
        type: String,
        required: true,
        enum: ['a', 'b', 'c']
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                setTimeout(()=>{
                    const result = v && v. length > 0;
                    callback(result);
                },4000);
                
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() {return this.ispublished; },
        min: 10,
        max:200
    }
});
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Node Course',
        category: '_',
        author: 'Ellie',
        tags:null,
        isPublished: true
    });
    //validation and error
    try {
        const result = await course.save();
        console.log(result);
    }
    catch(ex) {
        for (fields in ex.errors)
        console.log(ex.errors[field]);
        
    }
    

}
createCourse();

// async function getCourses() {
    // const pageNumber = 2;
    // const pageSize = 10;
    
    // const courses = await Course
        // .skip(pageNumber - 1 * pageSize)
        // .limit(pageSize)
        // .find({auther:'Ellie', isPublished:true})

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


//         .limit(10)
//         .sort({name: 1})
//         .select({name: 1, tags: 1});
//     console.log(courses);
// }
// getCourses();

async function updateCourse(id) {
    //query-first approach
    // const course = await Course.findById(id);
    // if (!course) return;

    // course.isPublished = true;
    // course.author = 'Another Author';

    // const result = await course.save();
    // console.log(result);

    const result = await Course.updateMany({_id: id}, {
        $set:{
            author: 'mosh',
            isPublished: false
        }

    });
    console.log(result);
}

updateCourse("63e55cf7348a2cc07175b385");


async function removeCourse(id) {
    //delete the first
    // const result = await Course.deleteOne({_id: id});
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

removeCourse("63e55cf7348a2cc07175b385");