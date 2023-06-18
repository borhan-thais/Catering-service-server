const express = require('express')
const cors = require("cors");
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://borhanthais2:borhanthais@cluster0.tk0d5mb.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    //crud operation
    const foodCollection = client.db("food-service").collection("foods")

     //Api for creating a new food service
     app.post("/add-a-service", async(req, res)=>{
      const Food = req.body
      const result= await foodCollection.insertOne(Food);
      //console.log(req.body);
      res.send(result);
     });

     //Api for fetching all info from database
     app.get("/all-food", async(req,res)=>{
      const result=await foodCollection.find({}).toArray();
      res.send(result);
     });
     //API for fatching sigle card information
     app.get("/food/:id", async(req, res)=> {
      const id =req.params.id;
      //console.log(id);
      const result = await foodCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
     });

     //Api for Updating Foods
     app.put("/update-by-if/:id",async(req,res)=>{
      const id= req.params.id;
      const filter ={_id: new ObjectId(id)};
      res.send({});
     })

  } finally {
 
  }
}
run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})