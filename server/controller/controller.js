const model = require('../models/model');



// categories
async function create_Categories(req, res) {
    try {
        const Create = new model.Categories({
            type: "Investment",
            color: "#FCBE44",
        });

        await Create.save();
        return res.json(Create);
    } catch (err) {
        return res.status(400).json({ message: `Error while creating Categories: ${err}` });
    }
}

//get
async function get_Categories(req, res) {
    let data = await model.Categories.find({})

    let filter = await data.map(v=>Object.assign({},{type:v.type,color:v.color}));
    return res.json(filter);
}
//post
async function create_Transaction(req,res){
    if(!req.body) return res.status(400).json("POST HTTp Data not provided");
    let {name,type,amount} = req.body;

    const create = new model.Transaction({
        name,
        type,
        amount,
        date: new Date()
    });
    await create.save();
        return res.json(create);
}

//get
async function get_Transaction(req,res){
    let data = await model.Transaction.find({});
    return res.json(data);
}

//delete
async function delete_Transaction(req, res) {
    try {
        if (!req.body || !req.body._id) {  // Ensure the request body contains the necessary fields
            return res.status(400).json({ message: "Request body or ID not found" });
        }

        const result = await model.Transaction.deleteOne({ _id: req.body._id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.json({ message: "Record deleted successfully" });
    } catch (err) {
        console.error("Error while deleting Transaction record:", err);
        res.status(500).json({ message: "Error while deleting Transaction record", error: err.message });
    }
}

//get
async function get_Labels(req,res){
    model.Transaction.aggregate([
        {
            $lookup:{
                from:"categories",
                localField:"type",
                foreignField:"type",
                as:"categories_info"
            }
        },
        {
           $unwind:"$categories_info" 
        }
    ]).then(result=>{
        let data = result.map(v=>Object.assign({},{_id:v._id,name:v.name,type:v.type,amount:v.amount,color:v.categories_info['color']}));
        res.json(data);
    }).catch(error=>{
        res.status(400).json("Look up Connection Error");
    })
}


module.exports = {
    create_Categories,
    get_Categories,
    create_Transaction,
    get_Transaction,
    delete_Transaction,
    get_Labels
};
