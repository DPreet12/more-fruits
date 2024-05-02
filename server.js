const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const methodOverride = require("method-override")
//-----------DATA------

const { fruits, fruitsNew } = require("./models/fruits");
const { meats, meatsFind } = require("./models/meats");
const { veggies, veggiesNew,  } = require("./models/veggies");
const { snacks, snacksNew } = require("./models/snacks");

//----------MIDDLEWARE-----
app.use(methodOverride("_method"));
app.set("view engine", "ejs"); 
app.use("/", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
//add middleware for update and delete methods


//console.log(fruits)

// "Apple", "Kiwi", "Blueberries", "Mangos", "Strawberry"
// ---------Routes---------

app.get("/fruits", (req, res) => {
    // send arrray as response
    //res.send(fruits);
    res.render("fruits/index", { allFruits: fruits, anotherFruit: fruitsNew });
});
app.get("/fruits/new", (req,res) => {
    res.render("fruits/new.ejs")
})

// ***** Show Route**********
app.get("/fruits/:indexofFruitsArray", (req, res) => {
    let idx = parseInt(req.params.indexofFruitsArray);
    if(idx >= fruits.length) {
       // res.send("There is no fruit at that index")// one solution
      // res.send(fruits);
      res.render("404", {});
    } else {
       // res.send(fruits[idx])
       //res.render("show", {})
       res.render("fruits/show", {fruit: fruits[idx], id: idx});
    }
})


// -------------- routes for snacks ------------ // 

app.get("/snacks", (req, res) => {
    // send arrray as response
    //res.send(fruits);
    res.render("snacks/index", { allSnacks: snacks, anotherSnack: snacksNew  });
});
app.get("/snacks/new", (req,res) => {
    res.render("snacks/new.ejs")
})

// ***** Show Route**********
app.get("/snacks/:indexofFruitsArray", (req, res) => {
    let idx = parseInt(req.params.indexofSnacksArray);
    if(idx >= snacks.length) {
       // res.send("There is no fruit at that index")// one solution
      // res.send(fruits);
      res.render("404", {});
    } else {
       // res.send(fruits[idx])
       //res.render("show", {})
       res.render("snacks/show", {snack: snacks[idx], id: idx});
    }
})


// -------------- edit page for snacks ------------ // 
app.get("/fruits/:id/edit", (req,res) => {
    const snack = snacks[req.params.id];
    
    let id = parseInt(req.params.id);

    res.render("snacks/edit", {snack: snack, id:id  })
})

app.get("/snacks/:id/delete", (req,res) => {
    const snackDel = snacks[req.params.id];
    let idDel = parseInt(req.params.id);
    res.render("snacks/delete", {snack: snackDel, id:idDel})
})
// ---- post new route for snacks  ----------- // 

app.post("/snacks", (req,res) => {
    console.log("form body", req.body);
    if(req.body.readyToEat === "on") {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    if(snacks.length > snacksNew.length) {
        snacksNew.push(req.body)
    } else {
        snacks.push(req.body)
    }
    
    res.redirect("/snacks")
})


//----------PUT Update snack ------------------- //

app.put("/snacks/:id", (req,res) => {
    console.log("--update snack-----", req.body);
    if(req.body.readyToEat === "on") {
        req.body.readyToEat = true;
    }else {
        req.body.readyToEat = false;
    }
    snacks[parseInt(req.params.id)] = req.body
    res.redirect("/snacks")
})

// ------delete route for snack -------------- //

app.delete("/snacks/:id", (req,res)=> {
    fruits.splice(parseInt(req.params.id),1);
    res.redirect("/snacks")
})





//---Edit page for get route-----------

app.get("/fruits/:id/edit", (req,res) => {
    const fruit = fruits[req.params.id];
    
    let id = parseInt(req.params.id);

    res.render("fruits/edit", {fruit: fruit, id:id  })
})

app.get("/fruits/:id/delete", (req,res) => {
    const fruitDel = fruits[req.params.id];
    let idDel = parseInt(req.params.id);
    res.render("fruits/delete", {fruit: fruitDel, id:idDel})
})
//----post new route---

app.post("/fruits", (req,res) => {
    console.log("form body", req.body);
    if(req.body.readyToEat === "on") {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    if(fruits.length > fruitsNew.length) {
        fruitsNew.push(req.body)
    } else {
        fruits.push(req.body)
    }
    
    res.redirect("/fruits")
})

//----------PUT Update fruit

app.put("/fruits/:id", (req,res) => {
    console.log("--update fruit-----", req.body);
    if(req.body.readyToEat === "on") {
        req.body.readyToEat = true;
    }else {
        req.body.readyToEat = false;
    }
    fruits[parseInt(req.params.id)] = req.body
    res.redirect("/fruits")
})

//------delete route--------

app.delete("/fruits/:id", (req,res)=> {
    fruits.splice(parseInt(req.params.id),1);
    res.redirect("/fruits")
})

app.get("/veggies", (req, res) => {
    res.render("veggies/indexVeggie", {allVeggies: veggies, another:veggiesNew});
})

app.get("/veggies/newVeggie", (req,res)=> {
   res.render("veggies/newveggie")
})

app.get("/veggies/:indexOfVeggie", (req,res) => {
    let turn = parseInt(req.params.indexOfVeggie);
    if(turn >= veggies.length) {
        res.send("There are no Veggies at that index");
    } else {
        res.render("veggies/showVeggie", { veggie : veggies[turn], id: turn});
    }
});
//--edit page get route
app.get("/veggies/:id/edit", (req, res) => {
 const veggie = veggies[req.params.id];
 let id = parseInt(req.params.id);
 res.render("veggies/edit", {veggie: veggie, id:id})
});

//---Get- Delete Page----
app.get("/veggies/:id/delete", (req, res) => {
    const veggie = veggies[req.params.id];
    let id = parseInt(req.params.id);
    res.render("veggies/delete", {veggie, id})
})



//-------------Post NEW FRUIT--------

app.post("/veggies", (req,res) => {
    console.log("--------FORM BODY-------\n", req.body);
    // add 
    if(req.body.readyToEat === "on") {
        req.body.readyToEat = true;
    } else { // req.body.readyTOEat wiil be undefined
         req.body.readyToEat = false;
    }
    veggies.push(req.body);
    res.redirect("/veggies");
})

//----- Update veggie
app.put("/veggies/:id", (req, res) => {
    console.log("-----Update Veggie--", req.body)
  if(req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  veggies[parseInt(req.params.id)] = req.body
  res.redirect("/veggies");
})

//-------Delete route--
app.delete("/veggies/:id", (req, res) => {
    //remove the fruit item from the fruits array
    veggies.splice(parseInt (req.params.id), 1);
    res.redirect("/veggies");
})



app.get("/meats", (req,res) => {
    res.render("meats/indexMeat", {allMeats: meats, anotherMeat: meatsFind});
})


app.get("/meats/newMeat", (req,res)=> {
    res.render("meats/newMeat.ejs")
})

app.get("/meats/:indexOfMeats", (req, res) => {
    let number = parseInt(req.params.indexOfMeats);
    if(number >= meats.length) {
        res.send("There are no meats at that index");
    } else {
        res.render("meats/showMeat", {meat: meats[number], id: number});
    }
})

app.get("/meats/:id/editMeat", (req,res)=> {
    const meat = meats[req.params.id];
    let id  = parseInt(req.params.id);
    res.render("meats/editMeat", {meat: meat, id: id })
})

app.get("/meats/:id/delete", (req,res)=> {
    const meat = meats[req.params.id];
    let id = parseInt(req.params.id);
    res.render("meats/delete", {meat, id})
})


app.post("/meats", (req,res) => {
    console.log("meats update", req.body );
    if(req.body.readyToEat === "on") {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }

    if(meats.length > meatsFind.length) {
        meatsFind.push(req.body)
    } else {
        meats.push(req.body)
    }
    
    res.redirect("/meats")
})

app.put("/meats/:id", (req,res)=> {
    if(req.body.readyToEat === "on") {
        req.body.readyToEat =true;
    } else {
        req.body.readyToEat =false;
    }
    meats[parseInt(req.params.id)] = req.body
    res.redirect("/meats")
})


app.delete("/meats/:id", (req,res) => {
    meats.splice(parseInt(req.params.id), 1);
    res.redirect("/meats")
})








app.get("/home", (req,res) => {
    res.render("home/indexHome", {})
})

app.get("/about", (req,res) => {
    res.render("about/indexAbout", {})
})
//---------Listen For Server------





app.listen(PORT, () => {
    console.log("Server is running PORT", PORT);
});