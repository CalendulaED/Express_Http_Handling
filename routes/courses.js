const express = require('express');
const router = express.Router();

const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"},
];

router.get('/', (req, res) => {
    // should get from database instead
    res.send(courses)
});

router.post('/', (req, res) => {

    // set a schema
    // const schema = {
    //     name: Joi.string().min(3).required()
    // }

    // const result = Joi.validate(req.body, schema);
    // // console.log(result);

    // if (result.error) {
    //     // 4000 Bad Request
    //     res.status(400).send(result.error.details[0].message);
    //     return; // return here to not continue the rest
    // }

    const { error } = validateCourse(req.body); // same as result.error this is object destruction
    if (error) {
        // 4000 Bad Request
        return res.status(400).send(error.details[0].message);
        // return; // return here to not continue the rest
    }


    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.get('/:id', (req, res)=> {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with given Id is not found');
    res.send(course);

});

router.put('/:id', (req, res) => {
    // check the course
    // if not exist return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with given Id is not found');

    // Validare
    // if not valid, 400 - Bad request
    // const schema = {
    //     name: Joi.string().min(3).required()
    // }

    // const result = Joi.validate(req.body, schema);
    // const result = validateCourse(req.body);
    const { error } = validateCourse(req.body); // same as result.error this is object destruction
    if (error) {
        // 4000 Bad Request
        return res.status(400).send(error.details[0].message);
        // return here to not continue the rest
    }

    // Update courese
    // return updated course
    course.name = req.body.name;
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
}


router.delete('/:id', (req, res)=> {
    // if not exists 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with given Id is not found');

    // delete the course
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // return the same course
    res.send(course);
});

module.exports = router;