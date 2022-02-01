const Course = require('../models/course');

// Display list of all Courses.
exports.course_list = async function(req, res) {
    const entries = await Course.find();
    res.json(entries);
};

// Display detail page for a specific Course.
exports.course_detail = async function(req, res) {
    const entry = await Course.findOne({ _id: req.params.id })
    res.json(entry)
};

// Handle Course create on POST.
exports.course_create_post = async function(req, res) {
    try{
        const entry = new Course(req.body)
        await entry.save()
        res.json(entry)
    } catch (err) {
        res.json({ error: err })
    }
};

// Handle Course delete on POST.
exports.course_delete = async function(req, res) {
    try {
        await Course.deleteOne({ _id: req.params.id })
        res.json({msg: "Entry has been deleted!"})
    } catch {
        res.json({ error: "Entry doesn't exist!" })
    }
};

// Handle Course update on POST.
exports.course_update_patch = async function (req, res) {
    try {
        const entry = await Course.findOne({ _id: req.params.id })

        if (req.body.name) {
            entry.name = req.body.name
        }

        if (req.body.desc) {
            entry.desc = req.body.desc
        }

        if (req.body.major) {
            entry.major = req.body.major
        }

        await entry.save()
        res.json(entry)
    } catch {
        res.status(404)
        res.json({ error: "Entry doesn't exist!" })
    }
}
