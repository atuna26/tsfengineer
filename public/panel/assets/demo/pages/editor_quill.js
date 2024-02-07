/* ------------------------------------------------------------------------------
 *
 *  # Quill editor
 *
 *  Demo JS code for editor_quill.html page
 *
 * ---------------------------------------------------------------------------- */

// Setup module
// ------------------------------

    const quillFull = new Quill(".quill-full", {
      modules: {
        toolbar: [
          [{ font: [] }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ direction: "rtl" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["formula", "image", "video"],
          ["clean"],
        ],
      },
      bounds: ".content-inner",
      placeholder: "Please add your text here...",
      theme: "snow",
    });
    function submitFormsss() {
      var quillContent = quillFull.root.innerHTML;

      // Alınan içeriği hidden input'a set et
      document.getElementById('quillText').value = quillContent;
  

    // Formu submit et
    document.querySelector("form").submit();
    }


// Initialize module
// ------------------------------

