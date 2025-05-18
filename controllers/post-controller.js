const Post = require('../models/post-model');

// create a new post
exports.createPost = async (req, res) => {
    try {
        const { title, body } = req.body;
        if (!title || !body) {
            return res.status(400).json({ body: "Please provide title and body" });
        }
        const post = await Post.create({ title, body });
        return res.status(200).json({
            status: "success",
            data: {
                post
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ body: "Internal server error" });
    }
};

// find all posts
exports.findAllPosts = async (req, res) => {

    try{
        const posts = await Post.find();
        if(!posts){
            return res.send({body: "No posts found"});
        }
        return res.status(200).json({
            status: "success",
            data: {
                posts
            }
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({ body: "Internal server error" });

    }

}

// find a post by id
exports.findPostById = async (req, res) => {

    try{
        const {id} = req.params;
        const post = await Post.findById(id);
        if(!post){
            return res.send({body: "No post found"});
        }
        return res.status(200).json({
            status: "success",
            data: {
                post
            }
        });

    }catch(err){
        console.log(err);
        return res.status(500).send({ body: "Internal server error" });
    }
}

// update a post
exports.updatePostById = async (req, res) =>{
    try{
        const {id} = req.params;
        const {title, body} =  req.body;
        if(!title || !body){
            return res.status(400).json({body: "Please provide title and body"});
        }

        const post = await Post.findByIdAndUpdate(id, {title, body}, {new: true});

        return res.status(200).json({
            status: "success",
            data: {
                post
            }
        });

    }catch(err){
        console.log(err);
        return res.status(500).send({ body: "Internal server error" });
    }
}

// delete a post
exports.deletePostById = async (req, res) =>{
const {id } = req.params;
try{
    console.log("deleting blog with id", id );
    const post = await Post.findOneAndDelete(id);
    return res.status(200).json({
        status: "success"
    });

}catch(err){
console.log(err);
return res.status(500).send({ body: "Internal server error" });
}
 }
 

