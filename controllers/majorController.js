const Major = require('../models/major');

// Display list of all Majors.
exports.major_list = async function(req, res) {
    const entries = await Major.find();
    res.json(entries);
};

// Display detail page for a specific Major.
exports.major_detail = async function(req, res) {
    const entry = await Major.findOne({ _id: req.params.id })
    res.json(entry)
};

// Handle Major create on POST.
exports.major_create_post = async function(req, res) {
    try{
        const entry = new Major(req.body)
        await entry.save()
        res.json(entry)
    } catch (err) {
        res.json({ error: err })
    }
};

// Handle Major delete on POST.
exports.major_delete = async function(req, res) {
    try {
        await Major.deleteOne({ _id: req.params.id })
        res.json({msg: "Entry has been deleted!"})
    } catch {
        res.json({ error: "Entry doesn't exist!" })
    }
};

// Handle Major update on POST.
exports.major_update_patch = async function (req, res) {
    try {
        const entry = await Major.findOne({ _id: req.params.id })

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

        await entry.save()
        res.json(entry)
    } catch {
        res.status(404)
        res.json({ error: "Entry doesn't exist!" })
    }
}
