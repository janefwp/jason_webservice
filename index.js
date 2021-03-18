const PORT = process.env.PORT || 3000

  var express = require('express');
//   var bodyParser = require('body-parser');
  var app = express();
  //create request body
  // app.use(bodyParser.urlencoded({extended: true}));
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
  app.use(express.json({
      inflate: true,
      reviver: null,
      strict: true,
      type: 'application/json',
      verify: undefined
  }
  ));
  
  app.use((err, req, res, next) => {
      if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
          console.error(err);
          return res.status(400).send({ status: 400, error: "Could not decode request: JSON parsing failed" }); // Bad request
      }
      next();
  });
  
  app.post('/', function (request, res) {
  
      // console.log(req)
          var payload = request.body.payload;
          console.log(payload)
          let filterData = payload.filter(item => {
              return item.drm && item.episodeCount >0
              }) 
          var newArray = [];
          if (filterData && typeof filterData === 'object') {
              
              filterData.map((item, index) =>{
                  
                  var image = item.image
                  console.log(image)
                  newArray[index] = {
                      "image": item.image.showImage,
                      "slug": item.slug,
                      "title": item.title
                  };
              });
              let newJason= JSON.stringify({response:newArray},null,"\t");
              res.setHeader("Content-Type", "application/json");
              res.send(newJason);
              // return newJason;
  
          } else {
              var data = {
                  message: 'Could not decode request: JSON parsing failed'
              };
              console.log(data)
              res.send("Could not decode request: JSON parsing failed").status(400);
              // return data;
          }
      // res.send("Welcome!").status(200);
      
  });
  
  app.get('/',function(req,res){
        res.setHeader("Content-Type", "application/json");
        res.send("Welcome!").status(200);
   });
  // app.listen(3000);
  // module.exports = app
