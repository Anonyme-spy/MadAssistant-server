import express from 'express';
import morgan from 'morgan';
import router from "./router.js";


const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
// Middleware pour parser JSON
app.use(express.json());
// Configuration CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});


app.get("/", (req, res) => {
  console.log("GET /users");
  res.status(200)
  res.json({message: "FK U!"});
})

app.use("/api" , router);

export default app;