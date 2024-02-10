const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog")
const Word = require("../models/Word")
const Question = require("../models/Question")
const Category = require("../models/Category")
const User = require("../models/User")
const bcrypt = require("bcrypt")

router.get("/panele-giris", (req,res)=>{
  res.render("web/login",{layout:""})
})

router.get("/", async (req,res)=>{
  let title = "TSF Mühendislik Makina Vinç Sistemleri Raylı Sistemler Imalat Ticaret Projelendirme"
  const category = await Category.find({}).lean();
    res.render("web/main/index",{category,title})
})
router.get("/kurumsal", async (req,res)=>{
  let title = "TSF Mühendislik Makina Vinç Sistemleri Raylı Sistemler Imalat Ticaret Projelendirme"
  const category = await Category.find({}).lean();
    res.render("web/main/aboutUs",{category,title})
})

router.get("/hizmetlerimiz", async (req,res)=>{
  let title = "TSF Mühendislik Makina Vinç Sistemleri Raylı Sistemler Imalat Ticaret Projelendirme"
  const category = await Category.find({}).lean();
  res.render("web/main/services",{category,title})
})

router.get("/iletisim", async (req,res)=>{
  let title = "İletişim TSF Mühendislik Makina Vinç Sistemleri Raylı Sistemler Imalat Ticaret Projelendirme"
  const category = await Category.find({}).lean();
  res.render("web/main/contact",{category,title})
})


router.get("/sorular",async(req,res)=>{
  let title = "Sorular - TSF Mühendislik Makina Vinç Sistemleri Raylı Sistemler Imalat Ticaret Projelendirme"
  const category = await Category.find({}).lean();
  const question = await Question.find({}).sort({questionName:1}).lean()
  res.render("web/main/questions",{question,category,title})
})

router.get("/sorular/:id",async(req,res)=>{
  const question = await Question.findOne({_id:req.params.id}).lean()
  const category = await Category.find({}).lean();
  let title = `${question.questionName} Makina Vinç Sistemleri Raylı Sistemler Imalat Ticaret Projelendirme`
  res.render("web/main/singleQuestion",{question,category,title})
})

router.get("/sozluk",async(req,res)=>{
  const category = await Category.find({}).lean();
  const word = await Word.find({}).sort({wordName:1}).lean()
  let title = `TSF Makina Mühendislik Makina Vinç Sistemleri Raylı Sistemler Imalat Ticaret Projelendirme`
  res.render("web/main/words",{word,category,title})
})
router.get("/sozluk/:id",async(req,res)=>{
  const category = await Category.find({}).lean();
  const word = await Word.findOne({_id:req.params.id}).lean()
  let title = `${word.wordName} Nedir? Makina Vinç Sistemleri Raylı Sistemler Imalat Ticaret Projelendirme`
  res.render("web/main/singleWord",{word,category,title})
})

router.get("/muhendislik-makina/blog/:id", async (req,res)=>{
  const category = await Category.find({}).lean();
  const blog = await Blog.findOne({_id:req.params.id}).populate({path:"blogCategory", model:Category}).lean()
  let title = `${blog.blogName}`
  res.render("web/main/singleBlog",{blog,category,title})
})


router.get("/muhendislik-makina/:id", async (req,res)=>{
  const category = await Category.find({}).lean();
  const categoryBlog = await Category.findOne({_id:req.params.id}).lean()
  const categoryName=categoryBlog.categoryNameTR
  let title = `${categoryName} Makina Vinç Sistemleri Raylı Sistemler Imalat Ticaret Projelendirme`
  try{
    const blog = await Blog.find({blogCategory:req.params.id}).lean()
    res.render("web/main/blog",{blog,category,categoryName,title})
  }  catch(err){
    res.send(err)
  }
})


router.get("/muhendislik-makina", async (req, res) => {
  const category = await Category.find({}).lean();
    const blog = await Blog.find({}).lean();
    const categoryName = "Mühendislik & Makina";
    let title = `${categoryName} Makina Vinç Sistemleri Raylı Sistemler Imalat Ticaret Projelendirme`
    res.render("web/main/blog", {blog:blog,categoryName,category,title});
  });

// ! ENGLISH PART

router.get("/en", async (req,res)=>{
  let title = "TSF Engineering Machinery Crane Systems Rail Systems Manufacturing Trade Projecting"
  const category = await Category.find({}).lean();
    res.render("web/mainEN/index",{layout:"mainEN",category,title})
})


router.get("/corporate", async (req,res)=>{
  let title = "TSF Engineering Machinery Crane Systems Rail Systems Manufacturing Trade Projecting"
  const category = await Category.find({}).lean();
    res.render("web/mainEN/aboutUs",{layout:"mainEN",category,title})
})

router.get("/services", async (req,res)=>{
  let title = "TSF Engineering Machinery Crane Systems Rail Systems Manufacturing Trade Projecting"
  const category = await Category.find({}).lean();
  res.render("web/mainEN/services",{layout:"mainEN",category,title})
})

router.get("/contact", async (req,res)=>{
  let title = "Contact - TSF Engineering Machinery Crane Systems Rail Systems Manufacturing Trade Projecting"
  const category = await Category.find({}).lean();
  res.render("web/mainEN/contact",{layout:"mainEN",category,title})
})


router.get("/questions",async(req,res)=>{
  let title = "Questions - TSF Engineering Machinery Crane Systems Rail Systems Manufacturing Trade Projecting"
  const category = await Category.find({}).lean();
  const question = await Question.find({language:"EN"}).sort({questionName:1}).lean()
  res.render("web/mainEN/questions",{layout:"mainEN",question,category,title})
})

router.get("/questions/:id",async(req,res)=>{
  const question = await Question.findOne({_id:req.params.id}).lean()
  const category = await Category.find({}).lean();
  
  let title = `${question.questionName} - TSF Engineering Machinery Crane Systems Rail Systems Manufacturing Trade Projecting`
  res.render("web/mainEN/singleQuestion",{layout:"mainEN",question,category,title})
})

router.get("/dictionary",async(req,res)=>{
  const category = await Category.find({}).lean();
  const word = await Word.find({language:"EN"}).sort({wordName:1}).lean()
  let title = `TSF Engineering Machinery Crane Systems Rail Systems Manufacturing Trade Projecting`
  res.render("web/mainEN/words",{layout:"mainEN",word,category,title})
})
router.get("/dictionary/:id",async(req,res)=>{
  const category = await Category.find({}).lean();
  const word = await Word.findOne({_id:req.params.id}).lean()
  let title = `What is ${word.wordName} ? TSF Engineering Machinery Crane Systems Rail Systems Manufacturing Trade Projecting`
  res.render("web/mainEN/singleWord",{layout:"mainEN",word,category,title})
})

router.get("/engineering-machinery/blog/:id", async (req,res)=>{
  const category = await Category.find({}).lean();
  const blog = await Blog.findOne({_id:req.params.id}).populate({path:"blogCategory", model:Category}).lean()
  let title = `${blog.blogName}`
  res.render("web/mainEN/singleBlog",{layout:"mainEN",blog,category,title})
})


router.get("/engineering-machinery/:id", async (req,res)=>{
  const category = await Category.find({}).lean();
  const categoryBlog = await Category.findOne({_id:req.params.id}).lean()
  const categoryName=categoryBlog.categoryNameEN
  let title = `${categoryName} TSF Engineering Machinery Crane Systems Rail Systems Manufacturing Trade Projecting`
  try{
    const blog = await Blog.find({blogCategory:req.params.id,language:"EN"}).lean()
    res.render("web/mainEN/blog",{layout:"mainEN",blog,category,categoryName,title})
  }  catch(err){
    res.send(err)
  }
})


router.get("/engineering-machinery", async (req, res) => {
  const category = await Category.find({}).lean();
    const blog = await Blog.find({language:"EN"}).lean();
    const categoryName = "Engineering & Machinery";
    let title = `${categoryName} TSF Engineering Machinery Crane Systems Rail Systems Manufacturing Trade Projecting`
    res.render("web/mainEN/blog", {layout:"mainEN",blog:blog,categoryName,category,title});
  });






 //POST PART
  router.post("/login",async (req,res)=>{
    const {username,userPassword} = req.body;
    const user = await User.findOne({username:username}).lean();
    console.log(username,userPassword)
    if(!user){
        res.redirect("/admin/giris")
    }else{
        if(await bcrypt.compare(userPassword,user.password)){
            req.session.userId= user._id;
            res.redirect("/admin")
        }else{
            res.redirect("/panele-giris")
        }
    }
  })
module.exports = router;
