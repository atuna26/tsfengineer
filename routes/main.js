const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog")
const Word = require("../models/Word")
const Question = require("../models/Question")

router.get("/", async (req,res)=>{
    res.render("web/main/index")
})
router.get("/kurumsal",(req,res)=>{
    res.render("web/main/aboutUs")
})

router.get("/hizmetlerimiz",(req,res)=>{
  res.render("web/main/services")
})

router.get("/iletisim",(req,res)=>{
  res.render("web/main/contact")
})

router.get("/sorular",async(req,res)=>{
  const question = await Question.find({}).sort({questionName:1}).lean()
  res.render("web/main/questions",{question})
})

router.get("/sorular/:id",async(req,res)=>{
  const question = await Question.findOne({_id:req.params.id}).lean()
  res.render("web/main/singleQuestion",{question})
})

router.get("/sozluk",async(req,res)=>{
  const word = await Word.find({}).sort({wordName:1}).lean()
  res.render("web/main/words",{word})
})
router.get("/sozluk/:id",async(req,res)=>{
  const word = await Word.findOne({_id:req.params.id}).lean()
  res.render("web/main/singleWord",{word})
})

router.get("/muhendislik-makina/blog/:id", async (req,res)=>{
  const blog = await Blog.findOne({_id:req.params.id}).lean()
  res.render("web/main/singleBlog",{blog})
})


router.get("/muhendislik-makina/:type", async (req,res)=>{
  try{
    let type = req.params.type
    if(type==="muhendislik")
        type="Mühendislik"
    else if(type==="vincler")
        type="Vinçler"
    else if(type==="raylar")
        type="Raylar"
    const blog = await Blog.find({blogCategory:type}).lean()
    res.render("web/main/blog",{blog,type})
  }  catch(err){
    res.send(err)
  }
})


router.get("/muhendislik-makina", async (req, res) => {
    const blog = await Blog.find({}).lean();
    const type = "Mühendislik & Makina";
    res.render("web/main/blog", {blog:blog,type});
  });


module.exports = router;
