async function loadArtwork() {
  const container = document.getElementById("content");

  const items = await fetch("assets/index.json").then(r => r.json());

  for (const item of items) {
    const title = await fetch(item.title).then(r => r.text());
    const desc = await fetch(item.description).then(r => r.text());
    const date = await fetch(item.date).then(r => r.text());

    const card = document.createElement("div");

    const img = document.createElement("img");
    img.src = item.image;
    img.style.maxWidth = "300px";

    const h2 = document.createElement("h2");
    h2.textContent = title;

    const p = document.createElement("p");
    p.textContent = desc;

    const d = document.createElement("small");
    d.textContent = date;

    card.appendChild(h2);
    card.appendChild(img);
    card.appendChild(p);
    card.appendChild(d);

    container.appendChild(card);
  }
}

loadArtwork();
