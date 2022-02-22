const express = require('express')
const app = express()
const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://spyder:password123@blogapp.vpdet.mongodb.net/databasename?retryWrites=true&w=majority';
const Blog = require('./models/blog')
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.set('view engine' ,'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
mongoose.connect(dbURI).then((result)=>
{
  app.listen(3000);
})
.catch((err)=>{
  console.log(err);
});

 
app.get('/about', function (req, res) {
  Blog.find().then((result)=>
  {
     res.render('about',{home:'blog',blog:result});
  })
 
})

app.get('/add-blog' , (req,res)=>
{
  const blog = new Blog({
    title: 'my new blog',
    snippet:'This is my newer first blog',
    body:'Hello everyone this is my first ever blog'
  });
  blog.save().then((result)=>
  {
    res.send(result);
  })
;
});

app.get('/all-blogs',(req,res)=>{
Blog.find().then((result)=>
{
 res.send(result);
})
.catch((err)=>{
  console.log(err);
})
});
app.get('/findby-id',(req,res)=>
{
  Blog.findById("6153200c95b99d89b8cd8030")
  .then((result)=>
  {
    res.send(result);
  })
  .catch((err)=>
  {
    console.log(err);
  })
});

app.get('/blog/create', function (req, res) {
  res.render('create');
})

app.post("/blogs",(req,res)=>
{
 const blog = new Blog(req.body);
 blog.save()
 .then((result)=>
 {
   res.redirect('/about');
 })
 .catch((err)=>{
   console.log(err);
 });
});

app.get('/blogs/:id',(req,res)=>{
  var id = req.params.id;
  Blog.findById(id)
  .then((result)=>
  {
    res.render('show',{blog:result});
  })
  .catch((err)=>
  {
    console.log(err);
  })
})
app.delete('/blogs/:id',(req,res)=>
{
  var id =  req.params.id;
  Blog.findByIdAndDelete(id)
  .then((result)=>
  {
    res.redirect('/about');
  })
  .catch((err)=>
  {
    console.log(err);
  })
});
