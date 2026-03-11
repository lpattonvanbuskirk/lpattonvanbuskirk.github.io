async function loadAssets() {
  const container = document.getElementById("content");

  const files = await fetch("assets/files.json").then(r => r.json());
  console.log(files);
  for (const file of files) {
    const text = await fetch(`assets/${file}`).then(r => r.text());
    
    const pre = document.createElement("pre");
    pre.textContent = text;

    console.log(text);

    container.appendChild(pre);
  }
}

loadAssets();
