import express from "express";
import cors from "cors";
import Users from "./model.js";
import bodyParser from "body-parser";


const app = express();
app.use(cors({ origin: 'https://artinet.netlify.app' }));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());



//get route 

app.get("/api/fetch", async(req, res) => {
    try{
        const fetch = await Users.find();
        res.json(fetch);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"error fetching data"});
    }
}); 

app.post("/api/posts", async(req, res) => {
    /* const data={
        name: req.body.name,
        password: req.body.password
    }

    await Collection1.insertMany([data])
    res.json(); */
    try{
       /// const posts = await Collection1.create(req.body)

       const {write, title} = req.body;

        //create a new article document
        const newArticle = new Users({
            content: write,
            title: title

        })

        //save article to database
        await newArticle.save();


        res.status(200).json({message: "Article saved successfully"});


    }catch(err){
        console.log("Error saving article", err);
        res.status(500).json({message: err.message})
    }

})




app.listen((5186), ()=>{
    console.log("Server is running");
})



