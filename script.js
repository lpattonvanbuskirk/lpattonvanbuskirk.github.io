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
    container.innerHTML = ""; // clear existing cards

    const folders = await fetch(jsonPath).then((r) => r.json());

    const items = await Promise.all(
      folders.map(async (folder) => {
        const base = `${jsonPath.replace("index.json", "")}${folder}`;
        const title = await fetch(`${base}/title.txt`).then((r) => r.text());
        const desc = await fetch(`${base}/desc.txt`).then((r) => r.text());
        const date = await fetch(`${base}/date.txt`).then((r) => r.text());
        const img = `${base}/img.png`;
        return { title, desc, date, img };
      })
    );

    items.sort((a, b) => new Date(b.date) - new Date(a.date));

    for (const item of items) {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <div class="container">
          <h4><b>${item.title}</b></h4>
          <p>${item.desc}</p>
          <small>${item.date}</small>
        </div>
      `;
      container.appendChild(card);

      card.querySelector("img").addEventListener("click", () => {
        openLightbox(item.img, item.title);
      });
    }
  }

  window.loadGallery = loadGallery;
});