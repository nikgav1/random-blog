const express = require('express')
const app = express()
const port = 5000

const fs = require('fs');

app.set('view engine', 'ejs');
app.set('views', 'public')

app.use(express.static('view'))
app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/blogs', (req, res)=>{
    const files = fs.readdirSync('./blogs')
    let chosenFile = files[Math.floor(Math.random() * files.length)] 
    fs.readFile(`./blogs/${chosenFile}`, (err, data) => {
        if (err) throw err;
        let randomBlog = JSON.parse(data);
        res.render('blogs', {randomBlog})
    });
})

app.get('/create', (req, res)=>{
    res.render('create')
})

app.use(express.urlencoded({extended: false}))

app.post('/login', (req, res, next) => {

 const blog = req.body;


 let data = JSON.stringify(blog, null, 2);

 let random = Math.floor(Math.random() * 10000000000);

 fs.writeFile(`./blogs/${random + blog.firstName}.json`, data, (err) => {
     if (err) throw err;
 });
 
 res.redirect('/')
})

app.use((req,res)=>{
    res.status(404).render('404')
})

app.listen(port,()=>{
    console.log(`Server is listening on localhost:${port}`)
})