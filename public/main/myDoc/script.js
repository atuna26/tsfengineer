function newSearch() {
    var searchInput = document.getElementById("searchInput")
    var searchValue = searchInput.value.toLowerCase()
    var boxes = document.querySelectorAll(".news-wraper .col-md-4")

    boxes.forEach(box=>{
        var wordName = box.querySelector(".header h4").textContent.toLowerCase();
        if(wordName.includes(searchValue)){
            box.style.display="block"
        }else{
            box.style.display ="none";
        }
    })
}
function newBlogSearch() {
    var searchInput = document.getElementById("searchInput")
    var searchValue = searchInput.value.toLowerCase()
    var boxes = document.querySelectorAll(".news-wraper .col-md-6")

    boxes.forEach(box=>{
        var wordName = box.querySelector(".header h4").textContent.toLowerCase();
        if(wordName.includes(searchValue)){
            box.style.display="block"
        }else{
            box.style.display ="none";
        }
    })
}
function newQuestionSearch() {
    var searchInput = document.getElementById("searchInput")
    var searchValue = searchInput.value.toLowerCase()
    var boxes = document.querySelectorAll("#accordion .toggle")

    boxes.forEach(box=>{
        var wordName = box.querySelector(".question").textContent.toLowerCase();
        if(wordName.includes(searchValue)){
            box.style.display="block"
        }else{
            box.style.display ="none";
        }
    })
}