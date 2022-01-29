const User = require('../models/user');

// Display list of all Users.
exports.user_list = async function(req, res) {
    const entries = await User.find();
    res.json(entries);
};

// Display detail page for a specific User.
exports.user_detail = async function(req, res) {
    const entry = await User.findOne({ _id: req.params.id })
    res.json(entry)
};

// Handle User create on POST.
exports.user_create_post = async function(req, res) {
    try{
        const entry = new User(req.body)
        await entry.save()
        res.json(entry)
    } catch (err) {
        res.json({ error: err })
    }
};

// Handle User delete on POST.
exports.user_delete = async function(req, res) {
    try {
        await User.deleteOne({ _id: req.params.id })
        res.json({msg: "Entry has been deleted!"})
    } catch {
        res.json({ error: "Entry doesn't exist!" })
    }
};

// Handle User update on POST.
exports.user_update_patch = async function (req, res) {
    try {
        const entry = await User.findOne({ _id: req.params.id })

        if (req.body.name) {
            entry.name = req.body.name
        }

        if (req.body.email) {
            entry.head = req.body.head
        }

        if (req.body.password) {
            entry.tel = req.body.tel
        }

        await entry.save()
        res.json(entry)
    } catch {
        res.status(404)
        res.json({ error: "Entry doesn't exist!" })
    }
}
