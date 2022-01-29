const College = require('../models/college');

// Display list of all colleges.
exports.college_list = async function(req, res) {
    const entries = await College.find();
    res.json(entries);
};

// Display detail page for a specific college.
exports.college_detail = async function(req, res) {
    const entry = await College.findOne({ _id: req.params.id })
    res.json(entry)
};

// Handle college create on POST.
exports.college_create_post = async function(req, res) {
    const entry = new College(req.body)
    await entry.save()
    res.json(entry)
};

// Handle college delete on POST.
exports.college_delete = async function(req, res) {
    try {
        await College.deleteOne({ _id: req.params.id })
        res.json({msg: "Entry has been deleted!"})
    } catch {
        res.json({ error: "Entry doesn't exist!" })
    }
};

// Handle college update on POST.
exports.college_update_patch = async function (req, res) {
    try {
        const entry = await College.findOne({ _id: req.params.id })

        if (req.body.name) {
            entry.name = req.body.name
        }

        if (req.body.head) {
            entry.head = req.body.head
        }

        if (req.body.tel) {
            entry.tel = req.body.tel
        }

        if (req.body.address) {
            entry.address = req.body.address
        }

        if (req.body.desc) {
            entry.desc = req.body.desc
        }

        if (req.body.college) {
            entry.college = req.body.college
        }

        await entry.save()
        res.json(entry)
    } catch {
        res.status(404)
        res.json({ error: "Entry doesn't exist!" })
    }
}
