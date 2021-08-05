const express=require('express');
const app=express();
app.use(express.json());

const books=require("./BookLibrary.js")

app.get('/',(req,res)=>{
    res.send("Welcome to the world of books !")
})

app.get('/api/getAllBooks',(req,res)=>{
    res.send(books);
})


app.get('/api/getSingleBook/:uuid',(req,res)=>{
    let id=req.params.uuid;
    let arr=books.find(b=>b.UUID==id)
    if(!arr) res.status(404).send("There is no book found with this ID !");
    res.send(arr);
})

app.get('/api/getBooksCount',(req,res)=>{
    let {author,year}=req.query;
    if(year!=="")
    {
        let arr=books.filter(b=>b.Year==year)
        if(!arr) res.status(404).send("There is no book found with this author !");
        res.send({"Books count":arr.length});
    }
    else if(author!=="")
    {
        let arr=books.filter(b=>b.Author==author)
        if(!arr) res.status(404).send("There is no book found with this author !");
        res.send({"Books count":arr.length});
    }
    else
    {
        res.send("Invalid Parameter !");
    }
})

app.get('/api/getSingleBook/:uuid',(req,res)=>{
    let id=req.params.uuid;
    let arr=books.find(b=>b.UUID==id)
    if(!arr) res.status(404).send("There is no book found with this ID !");
    res.send(arr);
})

app.post('/api/addBook',(req,res)=>{
    let new_book={
        "UUID":books.length+1,
        "Name":req.body.Name,
        "Year":req.body.Year,
        "Author":req.body.Author
    }
    books.push(new_book);
    res.send(books);
})

app.delete('/api/deleteBook/:uuid',(req,res)=>{
    let id=req.params.uuid;
    let arr=books.find(b=>b.UUID==id)
    if(!arr) res.status(404).send("There is no book found with this ID to delete !");
    else
    {
        const index=req.params.uuid;
        books.splice(index,1);
        res.send("Book is deleted !")
    }
})

app.put('/api/upYearSingleBook/:uuid',(req,res)=>{
    let id=req.params.uuid;
    let arr=books.find(b=>b.UUID==id)
    if(!arr) res.status(404).send("There is no book found with this ID to upYear !");
    else
    {
        arr['Name']=req.body.Name;
        arr['Author']=req.body.Author
        arr['Year']=req.body.Year
        res.send(books);
    } 

})


app.listen(8080,()=>{
    console.log("App is listening on port 8080....");
})