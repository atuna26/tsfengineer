const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog")
const Word = require("../models/Word")
const Question = require("../models/Question")
const Category = require("../models/Category")

router.get("/", async (req,res)=>{
  const category = await Category.find({}).lean();
    res.render("web/main/index",{category})
})
router.get("/kurumsal", async (req,res)=>{
  const category = await Category.find({}).lean();
    res.render("web/main/aboutUs",{category})
})

router.get("/hizmetlerimiz", async (req,res)=>{
  const category = await Category.find({}).lean();
  res.render("web/main/services",{category})
})

router.get("/iletisim", async (req,res)=>{
  const category = await Category.find({}).lean();
  res.render("web/main/contact",{category})
})

router.get("/sorular",async(req,res)=>{
  const category = await Category.find({}).lean();
  const question = await Question.find({}).sort({questionName:1}).lean()
  res.render("web/main/questions",{question,category})
})

router.get("/sorular/:id",async(req,res)=>{
  const question = await Question.findOne({_id:req.params.id}).lean()
  const category = await Category.find({}).lean();

  res.render("web/main/singleQuestion",{question,category})
})

router.get("/sozluk",async(req,res)=>{
  const category = await Category.find({}).lean();

  const word = await Word.find({}).sort({wordName:1}).lean()
  res.render("web/main/words",{word,category})
})
router.get("/sozluk/:id",async(req,res)=>{
  const category = await Category.find({}).lean();

  const word = await Word.findOne({_id:req.params.id}).lean()
  res.render("web/main/singleWord",{word,category})
})

router.get("/muhendislik-makina/blog/:id", async (req,res)=>{
  const category = await Category.find({}).lean();
  const blog = await Blog.findOne({_id:req.params.id}).populate({path:"blogCategory", model:Category}).lean()
  res.render("web/main/singleBlog",{blog,category})
})


router.get("/muhendislik-makina/:id", async (req,res)=>{
  const category = await Category.find({}).lean();
  const categoryBlog = await Category.findOne({_id:req.params.id}).lean()
  const categoryName=categoryBlog.categoryNameTR
  try{
    const blog = await Blog.find({blogCategory:req.params.id}).lean()
    res.render("web/main/blog",{blog,category,categoryName})
  }  catch(err){
    res.send(err)
  }
})


router.get("/muhendislik-makina", async (req, res) => {
  const category = await Category.find({}).lean();
    const blog = await Blog.find({}).lean();
    const type = "Mühendislik & Makina";
    res.render("web/main/blog", {blog:blog,type,category});
  });


module.exports = router;
