const express = require("express");
const { route } = require("./main");
const router = express.Router();
const path = require("path")
const Word = require("../models/Word")
const Blog = require("../models/Blog")
const Question = require("../models/Question")
const Category = require("../models/Category")
const fileUpload = require("express-fileupload")

router.get("/",(req,res)=>{
    res.render("web/admin/index",{layout:"panel"})
})

router.get("/sozluk/kelimeler", async (req,res)=>{
    const word = await Word.find({}).lean()
    res.render("web/admin/words",{layout:"panel",word})
})
router.get("/sozluk/yeni-kelime", async (req,res)=>{
    res.render("web/admin/newWord",{layout:"panel"})
})
router.get("/yazilar/tum-yazilar",async(req,res)=>{
    const blog = await Blog.find({}).lean();
    res.render("web/admin/blogs",{layout:"panel",blog})
})
router.get("/yazilar/yeni-yazi",(req,res)=>{
    res.render("web/admin/newBlog",{layout:"panel"})
})

router.get("/sorular/tum-sorular", async (req,res)=>{
    const question = await Question.find({}).lean();
    res.render("web/admin/questions",{layout:"panel",question})
})

router.get("/sorular/yeni-soru",async (req,res)=>{
    res.render("web/admin/newQuestion",{layout:"panel"})
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

module.exports = router;