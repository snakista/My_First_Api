//creating a simple server
var express=require('express');
var app=express();
var bodyParser=require('body-parser');
//type npm init first
//type npm install --save express
// npm install --save body-parser --------helops to send json and objects
// normally we store data in database but here i store in array


app.use(bodyParser.json()); //runs first before all code
app.use(bodyParser.urlencoded({extended: false}));
var ingredient=[
    {
        "id":"232kAk",
        "text":"Eggs"
    },
    {
        "id":"dkP345",
        "text":"Milk"
    },
    {
        "id":"dkfig",
        "text":"Bacon"
    },
    {
        "id":"fgdfh",
        "text":"Frog Legs"
    },
    
];

app.get('/',function(request,response){
    response.send(ingredient);
});
app.get('/funions',function(req,res){
    res.send("Yo give me some funions");
});

//to post use postman app

app.post('/',function(request,response){
    var ingre=request.body;
    if(!ingre||ingre.text==="")
    {
        response.status(500).send({error:"Your ingredient must have a name"});
    }
    else{
        ingredient.push(ingre);
        response.status(200).send(ingredient);
    }
});
app.listen(3000,function(){
    console.log("First API running on port 3000!");
});