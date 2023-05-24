var accordions = document.getElementsByClassName("accordion");
var i;
var previewContainer = document.querySelector(".preview-container");
var imageUpload = document.getElementById("imageUpload");

for (i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener("click", function() {
        var isActive = this.classList.contains("active");

        // Collapse all accordions
        for (var j = 0; j < accordions.length; j++) {
            accordions[j].classList.remove("active");
            accordions[j].nextElementSibling.style.display = "none";
        }

        // Expand/collapse clicked accordion
        if (!isActive) {
            this.classList.add("active");
            this.nextElementSibling.style.display = "block";
        }
    });
}

var leftSidebarImages = document.querySelectorAll(".left-sidebar .grid img");
var rightSidebarImages = document.querySelectorAll(".right-sidebar .grid img");

leftSidebarImages.forEach(function (image) {
    image.addEventListener("click", function () {
      var previewImage = document.querySelector(".preview-container .left-image");
  
      // Remove previously added right sidebar image
      var previousRightImage = document.querySelector(".preview-container .right-image");
      if (previousRightImage) {
        previousRightImage.remove();
      }
  
      // Remove previously added custom image
      var previousCustomImage = document.querySelector(".preview-container .custom-image");
      if (previousCustomImage) {
        previousCustomImage.remove();
      }
  
      if (previewImage) {
        previewImage.src = this.src;
      } else {
        previewImage = document.createElement("img");
        previewImage.src = this.src;
        previewImage.classList.add("preview-image");
        previewImage.classList.add("left-image");
        previewContainer.appendChild(previewImage);
      }
    });
  });
  

rightSidebarImages.forEach(function(image) {
    image.addEventListener("click", function() {
        var previewImage = document.createElement("img");
        previewImage.src = this.src;

        // Remove previously added custom image
        var previousCustomImage = document.querySelector(".preview-container .custom-image");
        if (previousCustomImage) {
            previousCustomImage.remove();
        }

        // Remove previously added right sidebar image
        var previousRightImage = document.querySelector(".preview-container .right-image");
        if (previousRightImage) {
            previousRightImage.remove();
        }

        // Add the new right sidebar image
        previewImage.classList.add("preview-image");
        previewImage.classList.add("right-image");
        previewContainer.insertBefore(previewImage, previewContainer.firstChild);

    });
});

imageUpload.addEventListener("change", function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        var image = new Image();
        image.src = event.target.result;

        image.addEventListener("load", function() {
            var previewImage = document.createElement("img");
            previewImage.src = image.src;

            // Remove previously added custom image
            var previousCustomImage = document.querySelector(".preview-container .custom-image");
            if (previousCustomImage) {
                previousCustomImage.remove();
            }

            // Remove previously added right sidebar image
            var previousRightImage = document.querySelector(".preview-container .right-image");
            if (previousRightImage) {
                previousRightImage.remove();
            }

            // Add the new custom image
            previewImage.classList.add("preview-image");
            previewImage.classList.add("custom-image");
            previewContainer.appendChild(previewImage);
        });
    };

    reader.readAsDataURL(file);
});




// Get all image options and attach change event listeners
var imageOptions = document.querySelectorAll(".image-option");
imageOptions.forEach(function(option) {
    var image = option.querySelector("img");
    var select = option.querySelector(".image-versions");
    
    // Set initial image source based on selected version
    image.src = select.value;
    
    // Update image source when the version is changed
    select.addEventListener("change", function() {
        image.src = select.value;
    });
    

});



///

document.getElementById("btn-Convert-Html2Image").addEventListener("click", function() {
  html2canvas(document.getElementById("preview-sc")).then(function (canvas) {
    var anchorTag = document.createElement("a");
    anchorTag.download = "filename.jpg";
    anchorTag.href = canvas.toDataURL();
    anchorTag.target = '_blank';
    anchorTag.click();
  });
});

