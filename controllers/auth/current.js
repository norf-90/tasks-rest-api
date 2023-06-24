const {ctrlWrapper} = require ('../../helpers')

const current = async (req, res) => {
    const {email, name} = req.user
    res.json({email, name})
}

module.exports = {current: ctrlWrapper(current)}