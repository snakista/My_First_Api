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

app.get('/ingredients',function(request,response){
    response.send(ingredient);
});
app.get('/funions',function(req,res){
    res.send("Yo give me some funions");
});

//to post use postman app

app.post('/ingredients',function(request,response){
    var ingre=request.body;
    if(!ingre||ingre.text=="")
        {
            response.status(500).send({error: "Your ingredeint must have text"});
            
        }
    else{
        ingredient.push(ingre);
        response.status(200).send(ingredient);
    }
});
// working on updates
//:ingredientId is url parameter whenever we pass id it gets copy into ingredientId variable which we can use
app.put('/ingredients/:ingredientId',function(request,response){
    //var ingredientId=request.params.ingredientId;
    var newText=request.body.text;
    if(!newText||newText=="")
        {
            response.status(500).send({error:"You must provide ingredient text"});
        }
    else{
    for(var x=0;x<ingredient.length;x++)
        {
            var objfound=false;
            var ing=ingredient[x];
            if(ing.id===request.params.ingredientId){
                ingredient[x].text=newText;
                objfound=true;
                break;
            }
        }
    if(!objfound)
        response.status(500).send({error:"Ingredient Not Found"});
    else{
        response.send(ingredient); //default status is 200 so dont need to write
    }
    }
});

app.listen(3000,function(){
    console.log("First API running on port 3000!");
});
