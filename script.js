const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");

function openLightbox(imgSrc, altText) {
  lightboxImg.src = imgSrc;
  lightboxImg.alt = altText || "";
  lightbox.style.display = "flex";
}

function closeLightbox() {
  lightbox.style.display = "none";
  lightboxImg.src = "";
}

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", function(e) {
  if (e.target === lightbox) closeLightbox();
});

document.querySelectorAll(".card img").forEach(img => {
  img.addEventListener("click", () => {
    openLightbox(img.src, img.alt);
  });
});