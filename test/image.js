const upload = document.querySelector("#upload");
const preview = document.querySelector("#preview");

upload.onchange = function() {
    const file = upload.files[0]; //File对象
    const src = URL.createObjectURL(file);
    preview.src = src;
};
