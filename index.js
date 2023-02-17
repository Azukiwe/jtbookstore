// console.log("Hello There!");
// let { addition } = require("./addition");
// addition(5, 9);
// addition(7, 10);

// let http = require("http");
// //create a port
// const port = parseInt(process.env.PORT)
// || 4000;

// //web server
// http.createServer( (req, res)=>{
//     const currUrl = req.url;
//     console.log('Url: ', currUrl, '\nMethod: ', req.method);
//     res.writeHead(200, {'Content-type': 'text/html'});
//     swi tch(currUrl) {
//         case '/':
//             res.end('You are home');
//         break
//         case '/about':
//             res.end('About me page');
//         break
//         case '/data':
//             res.end('Page data');
//         break
//         default:
//             res.end('Page / content was not found');
//     }
// } )
// .listen(port,()=>{
//     console.log(`Server listening on port ${port}`);
// });

// const express = require('express');
// //Port
// const port = parseInt(process.env.PORT) || 4000;
// ///Express App
// const app = express();
// //Router
// const route = express.Router();

// app.use(

//     route
// )
// route.get('/',(req, res,)=>{
//     res.status(200).send("Well done");
// })

// app.listen(port,()=>{
//     console.log(`Server is running at ${port}`);
// })

const express = require("express");
//path
const path = require("path");
//cors
const cors = require("cors");
//DB
const db = require("./config");
//body-parser
const bodyParser = require("body-parser");
//port
const port = parseInt(process.env.PORT) || 4000;
//Express app
const app = express();
//Router
const route = express.Router();

app.use(route, 
  cors({
    origin:['http://127.0.0.1:8080',
          'http://localhost:8080'],
          credentials:true
  }),
  express.json, bodyParser.urlencoded({ extended: false }));
  //Middleware
  const {errorhandling} = require('./middleware/errorHandling');
  //message
  const {message} = require('./middleware/message');
//HOME OR '/'
route.get("/$|/jtbookstore", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "./view/index.html"));
});
// Users
route.get("/users", (req, res) => {
  const strQry = `
    select firstName,lastName,emailAdd,country
    from Users;
    `;
    //db
  db.query(strQry, (err, data) => {
    if (err) throw err;
    res.status(200).json({ result: data });
  });
});

//Register
route.post("/register",bodyParser.json(), (req, res) =>{
  let detail = req.body;
  console.log(detail);
  //sql query
  const strQry =
  `insert into Users
  set ?;
  where userID = ?;
  `;
  db.query(strQry,[detail], (err)=>{
    if(err){
      res.status(400).json({err});
    }else{
      res.status(200).json({msg:"A user record was saved."})
    }
  })
}) 

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
//Delete
route.delete("/user/:id",(req,res)=>{
  const strQry =
  `
  Delete from Users
  Where userID = ?;
  `;
  //db
  db.query(strQry,[req.params.id],
    (err)=>{
      if(err) throw err;
      res.status(200).json({msg:
      "A record was removed from a databasse"});
    })
});
//Login
route.patch('/login',bodyParser.json(),(req,res)=>{
  const{emailAdd,userPass} = req.body;
  const strQry =
  `Select firstName,lastName,emailAdd,userPass,country
  from users
  where emailAdd = '${emailAdd}'
  `;
})
