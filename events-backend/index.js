const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Added this line

// Database connection with MongoDB

mongoose.connect("mongodb+srv://reezyevents:reezy255@cluster1.2cnme39.mongodb.net/events", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });


// Image Storage Engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// Creating Upload Endpoint for images
app.use('/images', express.static(path.join(__dirname, 'upload/images')));


// Schema for creating products
const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  location_det: {
    type: String,
    required: true,
  },
  date_det: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const Product = mongoose.model("Product", productSchema);

// API Creation
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Upload Endpoint for images
app.post("/upload", upload.single('product'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: "No file uploaded" });
  }

  res.json({
    success: true,
    imageUrl: `https://events-website.onrender.com/images/${req.file.filename}`
  });
});

// Create API for adding products
app.post('/addproduct', async (req, res) => {
  try {
    const products = await Product.find({});
    const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const newProduct = new Product({
      id,
      name: req.body.name,
      image: req.body.image, // Use the imageUrl passed from the /upload endpoint
      category: req.body.category,
      location_det: req.body.location_det,
      date_det: req.body.date_det,
    });

    await newProduct.save();
    console.log("Product Saved");
    
    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});


// Create API for deleting products
app.post('/removeproduct', async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Product Removed");
    
    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

//Creating API for getting all products
app.get('/allproducts', async (req,res)=>{
    let products = await Product.find({});
    console.log('All Products Fetched');
    res.send(products);

})
//Schema Creating for User  model

const  Users = mongoose.model('Users',{
  name:{
    type:String,

  },
  email:{
    type:String,
    unique:true,
  },
  password:{
    type:String,
  },
  cartData:{
    type:Object,
  },
  date:{
    type:Date,
    default:Date.now,
  }
})

//Creating endpoint for registering the user
app.post('/signup', async (req, res) => {
  try {
    // Check if request contains a valid JSON body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false, error: "Invalid JSON data in the request body" });
    }

    let check = await Users.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({ success: false, errors: "Existing user found with the same email address" });
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    const user = new Users({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart
    });

    await user.save();

    const data = {
      user: {
        id: user.id
      }
    };

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error in /signup:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

//Creating endpoint for user login
app.post('/login',async(req,res)=>{
  let user =await Users.findOne({email:req.body.email});
  if(user){
    const passCompare =req.body.password ===user.password;
    if (passCompare){
      const data ={
        user:{
          id:user.id
        }
      }
      const token = jwt.sign(data, 'secret_ecom', { expiresIn: '7d' });
      res.json({success:true,token});
    }
    else{
      res.json({success:false,errors:"Wrong password"});
    }
  }
  else{
    res.json({success:false,errors:"Wrong email Id"})
  }

})

//Creating endpoint for new collection  data
app.get('/newcollection', async (req,res)=>{
  let products= await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("NewCollections Fetched");
  res.send(newcollection);
})
//Creating endpoint for popular in women section
app.get('/popularinwomen',async (req,res)=>{
  let products =await Product.find({category:"women"});
  let popular_in_women =products.slice(0,4);
  console.log("Popular in women fetched");
  res.send(popular_in_women);
})
//creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  } else {
    try {
      const data = jwt.verify(token, 'secret_ecom');
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
  }
};  // Add this closing parenthesis


//Creating endpoint  for adding products in cartdata
app.post('/addtocart',fetchUser,async (req,res)=>{
  console.log("Added",req.body.itemId);
  let userData= await Users.findOne({_id:req.user.id});
  userData.cartData[req.body.itemId] +=1;
  await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
  res.send('Added')

})
// Creating endpoint to remove product from cartdata
app.post('/removefromcart',fetchUser,async (req,res)=>{
  console.log("removed",req.body.itemId);
  let userData= await Users.findOne({_id:req.user.id});
  if(userData.cartData[req.body.itemId]>0)
  userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
  res.send('Removed')
})
//Creating endpoint to get cart data
app.post('/getcart',fetchUser,async(req,res)=>{

  console.log("GetCart");
  let userData =await Users.findOne({_id:req.user.id});
  res.json(userData.cartData);
})

// Start the server
app.listen(port, () => {
  console.log("Server Running on Port " + port);
});
