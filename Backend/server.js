const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const DB = require("./Db/Database");
const Auth = require('./Routes/Api/Auth');
const Member = require('./Routes/Api/Member');
const multer = require('multer');
const path = require('path');

const port = process.env.PORT || 3000;
multer({dest: "uploads/"});

const corsOptions = {
    origin: 'http://localhost:5173' 
  };
  
  app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send('Api is working');
});

app.use("/api/auth",Auth);
app.use("/api/member",Member);


app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
    DB();
})