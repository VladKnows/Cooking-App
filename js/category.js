function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("category");
}

async function loadCategory() {
  const category = getCategoryFromURL();
  if (!category) return;

  const indexPath = `data/${category}/index.json`;
  const container = document.getElementById("types");

  try {
    const files = await fetch(indexPath).then(res => res.json());

    for (const file of files) {
      const recipePath = `data/${category}/${file}.json`;
      const data = await fetch(recipePath).then(res => res.json());

      const div = document.createElement("div");
      div.className = "category-card";
      div.textContent = data.name;
      div.onclick = () => {
        window.location.href = `recipe.html?category=${category}&recipe=${file}`;
      };
      container.appendChild(div);
    }
  } catch (err) {
    console.error("Eroare la încărcarea rețetelor:", err);
  }
}

loadCategory();
