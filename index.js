
import express from 'express';
import path from "path";
import { fileURLToPath } from 'url';
import { addReview, registerUser, Checker, getAllReviews, deleteReview } from './services/movrev.js';
import bodyParser from 'body-parser';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './database/database.js';


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const filename = fileURLToPath(import.meta.url); 
const dirname = path.dirname(filename); 

app.set("view engine", "ejs");
app.use(express.static(path.join(dirname, 'public')));

app.get("/register", (req, res) => {
    res.render("register");
});

app.post('/register', async (req, res) => {
    try {
      const signUpSuccess = await registerUser(req.body);
      if (signUpSuccess) {
          res.redirect("/login");
      } else {
          res.redirect("/register");
      }
    } catch (error){
      console.error("Error:", error.message);
      res.status(500).send("Internal Server error");
    }
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post('/login', async (req, res) => {
    try {
      const loginchecked = await Checker(req.body);
      if (loginchecked) {
          res.redirect("/index");
      } else {
          res.redirect("/login");
      }
    } catch (error){
      console.error("Error:", error.message);
      res.status(500).send("Internal Server error");
    }
});

app.get("/index", (req, res) => {
    res.render("index");
});

app.get("/movies", (req, res) => {
  res.render("movies");
});

app.get("/series", (req, res) => {
  res.render("series");
});

app.get("/review", async (req, res) => {
  try {
      const reviews = await getAllReviews();
      res.render("review", { reviews });
  } catch (error) {
      console.error("Error:", error.message);
      res.status(500).send("Error getting reviews");
  }
});

app.post('/review', async (req, res) => {
  const { movieName, reviewText } = req.body;
  try {
    await addReview(movieName, reviewText);
    res.redirect("/review");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Error adding review");
  }
});

app.delete('/review/:id', async (req, res) => {
  try {
    const success = await deleteReview(req.params.id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(500).send('Error deleting review');
    }
  } catch (e) {
    console.error('Error:', e.message);
    res.status(500).send('Error deleting review');
  }
});

app.put('/review/:id', async (req, res) => {
  const { id } = req.params;
  const { movieName, reviewText } = req.body;
  
  try {
      const docRef = doc(db, 'reviews', id);
      await updateDoc(docRef, { movieName, reviewText });
      res.status(200).send('Review updated');
  } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Error updating review');
  }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
