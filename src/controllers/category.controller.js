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


const deleteCategory = async (req, res) => {
    Category.findByIdAndRemove(req.params.id).then( category => {
        if(category){
            return res.status(200).send({success: true, message: "category deleted successfully"})
        }else{
            res.status(400).send({success: false, message: "category not found"})
        }
    }).catch(err => {
        return res.status(400).send({success: false, error: err})
    })
}

const getCategory = async(req, res) => {
    const category = await Category.findById(req.params.id)

    if(category){
        return res.status(200).send(category)
    }
    res.status(404).send('category not found')
}

const getCategoryList = async (req, res) => {
    const categoryList = await Category.find()
    if(!categoryList){
        return res.status(500).json({success: false, message: 'Category not found'})
    }
    res.status(200).send(categoryList)
}

const updateCategory = async (req, res) => {
    const updateCategory = await Category.findByIdAndUpdate(req.params.id, {
        name : req.body.name,
        icon: req.body.icon
    }, {new : true})

    if(!updateCategory) {
        return res.status(404).send("the category was not found and can't be updated")
    }
    res.status(200).send(updateCategory)
}
module.exports = {createCategory, deleteCategory, getCategory, getCategoryList, updateCategory}