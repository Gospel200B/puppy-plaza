const {Category} = require ('../models/category.model')

const createCategory = async (req, res) => {
    let category = new Category({
        name : req.body.name,
        icon: req.body.icon,
    })
    category = await category.save();

    if(!category){
        return res.status(400).send('the category not created')
    }
    res.status(200).send(category)
}

module.exports = {createCategory}