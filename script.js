document.addEventListener("DOMContentLoaded", function () {
  let lightbox = document.getElementById("lightbox");
  let lightboxImg = document.getElementById("lightbox-img");
  let lightboxClose = document.getElementById("lightbox-close");

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.style.display = "flex";
  }

  function closeLightbox() {
    lightbox.style.display = "none";
    lightboxImg.src = "";
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  async function loadGallery(jsonPath) {
    const container = document.getElementById("cards");
    container.innerHTML = ""; 

    const folders = await fetch(jsonPath).then((r) => r.json());

    for (const folder of folders) {
      const base = `${jsonPath.replace("index.json", "")}${folder}`;

      const title = await fetch(`${base}/title.txt`).then((r) => r.text());
      const desc = await fetch(`${base}/desc.txt`).then((r) => r.text());
      const date = await fetch(`${base}/date.txt`).then((r) => r.text());
      const img = `${base}/img.png`;

      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${img}" alt="${title}">
        <div class="container">
          <h4><b>${title}</b></h4>
          <p>${desc}</p>
          <small>${date}</small>
        </div>
      `;
      container.appendChild(card);

      card.querySelector("img").addEventListener("click", () => {
        openLightbox(img, title);
      });
    }
  }

  window.loadGallery = loadGallery;
});