const express = require("express");
const { route } = require("./main");
const router = express.Router();
const path = require("path")
const Word = require("../models/Word")
const Blog = require("../models/Blog")
const Question = require("../models/Question")
const Category = require("../models/Category")
const fileUpload = require("express-fileupload")
const User = require("../models/User")
const bcrypt = require("bcrypt")


router.get("/",(req,res)=>{
    res.render("web/admin/index",{layout:"panel"})
})

router.get("/login",(req,res)=>{
    res.render("web/admin/login",{layout:"panel"})
})

router.get("/sozluk/kelimeler", async (req,res)=>{
    const word = await Word.find({}).lean()
    res.render("web/admin/words",{layout:"panel",word})
})
router.get("/sozluk/yeni-kelime", async (req,res)=>{
    res.render("web/admin/newWord",{layout:"panel"})
})
router.get("/yazilar/tum-yazilar",async(req,res)=>{
    const blog = await Blog.find({}).populate({path:"blogCategory", model:Category}).lean();
    res.render("web/admin/blogs",{layout:"panel",blog})
})
router.get("/yazilar/yeni-yazi",async (req,res)=>{
    const category = await Category.find({}).lean();
    res.render("web/admin/newBlog",{layout:"panel",category})
})

router.get("/kategoriler/tum-kategoriler",async (req,res)=>{
    const category = await Category.find({}).lean()
    res.render("web/admin/categories",{layout:"panel",category})
})


router.get("/kategoriler/yeni-kategori",async (req,res)=>{
    res.render("web/admin/newCategory",{layout:"panel"})
})

router.get("/sorular/tum-sorular", async (req,res)=>{
    const question = await Question.find({}).lean();
    res.render("web/admin/questions",{layout:"panel",question})
})

router.get("/sorular/yeni-soru",async (req,res)=>{
    res.render("web/admin/newQuestion",{layout:"panel"})
})

// ! EDIT SECTION GET

router.get("/sorular/soru/:id",async(req,res)=>{
    const question = await Question.findOne({_id:req.params.id}).lean();
    res.render("web/admin/editQuestion",{layout:"panel",question})
})

router.get("/kategoriler/kategori/:id",async(req,res)=>{
    const category = await Category.findOne({_id:req.params.id}).lean();
    res.render("web/admin/editCategory",{layout:"panel",category})
})

router.get("/sozluk/kelime/:id",async(req,res)=>{
    const word = await Word.findOne({_id:req.params.id}).lean();
    res.render("web/admin/editWord",{layout:"panel",word})
})

router.get("/yazilar/yazi/:id",async(req,res)=>{
    const category = await Category.find({}).lean();
    const blog = await Blog.findOne({_id:req.params.id}).lean();
    res.render("web/admin/editBlog",{layout:"panel",blog,category})
})

// ! DELETE SECTION POST


router.post("/sorular/soru/delete/:id",async(req,res)=>{
    try{
        await Question.findByIdAndDelete(req.params.id)
        res.redirect("/admin/sorular/tum-sorular")
    }catch(err){
        res.status(500).send("Hata yetkili ile iletişime geçiniz:"+err)
    }
})

router.post("/kategoriler/kategori/delete/:id",async(req,res)=>{
    try{
        await Category.findByIdAndDelete(req.params.id)
        res.redirect("/admin/kategoriler/tum-kategoriler")
    }catch(err){
        res.status(500).send("Hata yetkili ile iletişime geçiniz:"+err)
    }
})

router.post("/sozluk/kelime/delete/:id",async(req,res)=>{
    console.log("wrok")
    try{
        await Word.findByIdAndDelete(req.params.id)
        res.redirect("/admin/sozluk/kelimeler")
    }catch(err){
        res.status(500).send("Hata yetkili ile iletişime geçiniz:"+err)
    }
})

router.post("/yazilar/yazi/delete/:id",async(req,res)=>{
    try{
        await Blog.findByIdAndDelete(req.params.id)
        res.redirect("/admin/yazilar/tum-yazilar")
    }catch(err){
        res.status(500).send("Hata yetkili ile iletişime geçiniz:"+err)
    }
})


// ! EDIT SECTION POST

router.post("/kategoriler/editCategory/:id",async (req,res)=>{
    let category = await Category.findOne({_id:req.params.id});
    await Object.assign(category,req.body)
    await category.save();
    res.redirect("/admin/kategoriler/tum-kategoriler");
})

router.post("/sorular/editQuestion/:id",async (req,res)=>{
    let question = await Question.findOne({_id:req.params.id});
    await Object.assign(question,req.body)
    await question.save();
    res.redirect("/admin/sorular/tum-sorular");
})
router.post("/sozluk/kelimeler/editWord/:id",async (req,res)=>{
    let word = await Word.findOne({_id:req.params.id});
    await Object.assign(word,req.body)
    await word.save();
    res.redirect("/admin/sozluk/kelimeler");
})

router.post("/yazilar/editBlog/:id",async (req,res)=>{
    let blog = await Blog.findOne({_id:req.params.id});
    if(req.files && req.files.blogImage){
        let image = req.files.blogImage;

        // Dosya yükleme işlemi
        await image.mv(path.resolve(__dirname,"../public/main/blogImages/", image.name));
        await Object.assign(blog,{...req.body,blogImage:`/main/blogImages/${image.name}`})

    }else{
        await Object.assign(blog,req.body)
    }
    await blog.save();
    res.redirect("/admin/yazilar/tum-yazilar");
})



// ! POST SECTION

router.post("/kategoriler/newCategory",async (req,res)=>{
    Category.create({...req.body})
    res.redirect("/admin/kategoriler/tum-kategoriler");
})


router.post("/sorular/newQuestion",async (req,res)=>{
    await Question.create({...req.body})
    res.redirect("/admin/sorular/tum-sorular");
})

router.post("/yazilar/newBlog", async (req, res) => {
    try {
        let image = req.files.blogImage;

        // Dosya yükleme işlemi
        await image.mv(path.resolve(__dirname,"../public/main/blogImages/", image.name));

        // Yükleme tamamlandıktan sonra veritabanına blog oluşturma işlemi
        req.body.blogImage = "/main/blogImages/" + image.name;
        await Blog.create({ ...req.body });

        res.redirect("/admin/yazilar/tum-yazilar");
    } catch (error) {
        console.error("Dosya yüklenirken bir hata oluştu:", error);
        res.status(500).send("Dosya yüklenirken bir hata oluştu.");
    }
});

router.post("/sozluk/kelimeler/newWord", async (req,res)=>{
    Word.create({...req.body}).then(word=>{
        res.redirect("/admin/sozluk/kelimeler")
    })
})


router.post("/register", async (req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({username:req.body.username,password:hashedPassword})
    }catch(err){
        console.log(err);
        res.status(500).send("Hata. Yetkili ile iletişime geçiniz.")
    }
})

module.exports = router;