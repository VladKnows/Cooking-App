fetch("data/categories.json")
  .then(res => res.json())
  .then(categories => {
    const container = document.getElementById("categories");
    categories.forEach(cat => {
      const div = document.createElement("div");
      div.className = "category-card";
      div.textContent = cat.name;
      div.onclick = () => {
        window.location.href = `category.html?category=${cat.id}`;
      };
      container.appendChild(div);
    });
  })
  .catch(err => {
    console.error("Eroare la încărcarea categoriilor:", err);
  });
