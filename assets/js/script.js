let uploadPhoto = document.querySelector(".upload-photo");
let uploadInput = document.querySelector(".upload-input");
let images = document.querySelector(".images");
let image = document.querySelector(".image");
let desktop = document.querySelector(".desktop")
let count = 0;
let deleted

uploadPhoto.addEventListener("click", (e) => {
  e.stopPropagation();
  uploadInput.click();
});

uploadInput.addEventListener("change", (e) => {
  let files = Array.from(e.target.files);

  files.forEach((file) => {
    if (!file.type.includes("image/")) {
      alert("you can add just image");
      return;
    }
    ShowImage(file);
  });
});

function ShowImage(file) {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.addEventListener("loadend", () => {

    let src = fileReader.result;
    let img = document.createElement("img");
    img.classList.add("img");
    img.src = src;
    
    let image = document.createElement("div");
    image.classList.add("image");
    image.addEventListener("dblclick", (e) => {
      e.stopPropagation();
      if (count == 0) {
        image.classList.add("image-dbleclick");
      } else {
        image.classList.toggle("image-dbleclick");
      }
      image.classList.add("toDelete");
      let deleteAll = document.createElement("button");
      deleteAll.innerText = "Delete all";
      deleteAll.classList.add("delete-all");
      let head = document.getElementById("head");
      if (count == 0) {
        head.append(deleteAll);
        ++count;
      }
      deleteAll.addEventListener("click", (e) => {
        e.stopPropagation();
        let yesOrNo = confirm("Delete?");
        if (yesOrNo) {          
            let toDelete = document.querySelectorAll(".toDelete");
            toDelete.forEach((Element) => {
              Element.remove();
            });
            deleteAll.remove();
        } 
        else {
          return;
        }
        --count;
      });
    });

    let del = document.createElement("button");
    del.classList.add("del");
    del.innerText = "Delete";
    del.addEventListener("click", function (e) {
      e.stopPropagation();
      let yesOrNo = confirm("Delete?");
      if (yesOrNo) {
        this.parentElement.classList.add("deleted")
        deleted = document.querySelectorAll(".deleted")
        this.parentElement.remove();
      } 
      else {
        return;
      }

      let redo = document.createElement("button")
      redo.classList.add("redo")
      redo.innerText = "Redo"
      if (count == 0) {
        head.append(redo);
        ++count;
      }
      redo.addEventListener("click", (e) => {
        e.stopPropagation()
        deleted.forEach(Element => {
            images.append(Element)
            redo.remove()
        })
        --count
      })
    });

    let openImage = document.createElement("button");
    openImage.classList.add("open-image");
    openImage.innerText = "Open";
    openImage.addEventListener("click", (e) => {
      e.stopPropagation();
      image.classList.toggle("image");
      image.classList.add("image-when-open");
      openImage.remove();
      let closeImage = document.createElement("button");
      closeImage.classList.add("close-image");
      closeImage.innerText = "Close";
      image.append(closeImage);
      closeImage.addEventListener("click", (e) => {
        e.stopPropagation();
        image.classList.toggle("image-when-open");
        image.classList.add("image");
        closeImage.remove();
        image.append(openImage);
      });
    });
    image.append(img, del, openImage);
    images.append(image);
  });
}
