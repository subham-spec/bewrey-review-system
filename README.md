# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


GcL1ge3sMAzhLIDJ
mongodb+srv://subhamsharmalnps123:GcL1ge3sMAzhLIDJ@dbforbeer.49linpl.mongodb.net/?retryWrites=true&w=majority&appName=dbForBeer

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