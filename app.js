const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const url = "mongodb+srv://subhamsharmalnps123:GcL1ge3sMAzhLIDJ@dbforbeer.49linpl.mongodb.net/?retryWrites=true&w=majority&appName=dbForBeer"

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(e => console.log("Error connecting to MongoDB: ", e));

// Database to store the user details
const newSchema = new mongoose.Schema({
    email: {
        type: String, 
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

// Database to store rating of beers
const beerSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    ratingCount: {
        type: Number,
        required: true
    }
});

const users_data = mongoose.model("users_data", newSchema)
const beer_data = mongoose.model("beer_data", beerSchema)

app.post("/login", async(req, res) => {
    const{email,password} = req.body

    try{
        const check = await users_data.findOne({email: email})
        if(check) {
            const isPasswordCorrect = check.password === password;
            if (isPasswordCorrect) {
                console.log("User exists, logging in");
                res.json("exist");
            } else {
                console.log("Incorrect password");
                res.json("wrongpassword");
            }   
        } else {
            console.log("Need to register")
            res.json("notexist")
        }
    } catch(e) {
        res.json("not-exist")
    }
})

app.post("/register", async (req, res) => {
    const { email, password, name } = req.body;
  
    try {
      console.log("Checking if user exists");
      const existingUser = await users_data.findOne({ email: email });
      
      if (existingUser) {
        console.log("User Exist")
        res.json("exist");
      } else {
        console.log("Creating new user");
        const newUser = new users_data({ email, password, name });
        await newUser.save();
        res.json("notexist");
      }
    } catch (e) {
      console.log(e);
      res.status(500).json("error");
    }
});

app.post("/ratingchange", async (req, res) => {
    const {id, rating} = req.body;

    try {
        console.log("Check for id exists");
        const existId = await beer_data.findOne({id: id});

        if(existId) {
            const new_rating = (existId.rating + rating )
            const new_ratingCount = (existId.ratingCount + 1)

            // Updating the existing value
            await beer_data.findOneAndUpdate(
                { id: id },
                { rating: new_rating, ratingCount: new_ratingCount }
            );
            res.json("updated")

        } else {
            const newBeerRating = new beer_data({id, rating, ratingCount:1});
            await newBeerRating.save();
            res.json("First-Rating")
        }
    } catch (e) {
        console.log(e);
        res.status(500).json("error");
    }
});

app.post("/getrating", async (req, res) => {
    const {id} = req.body;

    try {
        console.log("Check for id exists");
        const existId = await beer_data.findOne({id: id});

        if(existId) {
            const rating = existId.rating
            const ratingCount = existId.ratingCount

            // returning the rating of the beer
            console.log("Id exist with rating "+rating/ratingCount)
            res.json(rating/ratingCount)

        } else {
            res.json(0)
        }
    } catch (e) {
        console.log(e);
        res.status(500).json("error");
    }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});