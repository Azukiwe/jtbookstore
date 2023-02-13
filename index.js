console.log("Hello There!");
let {addition}  = require("./addition");
addition(5,9);
addition(7,10);

// let http = require("http");
// //create a port
// const port = parseInt(process.env.PORT)
// || 4000;

// //web server
// http.createServer( (req, res)=>{
//     const currUrl = req.url;
//     console.log('Url: ', currUrl, '\nMethod: ', req.method);
//     res.writeHead(200, {'Content-type': 'text/html'});
//     switch(currUrl) {
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

const express = require('express');
//Port
const port = parseInt(process.env.PORT) || 4000;
///Express App
const app = express();
//Router
const route = express.Router();

app.use(

    route
)
route.get('/',(req, res,)=>{
    res.status(200).send("Well done");
})

app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
})



