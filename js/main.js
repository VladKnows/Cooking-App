db.collection("recipes").get()
  .then(snapshot => {
    const container = document.getElementById("categories");
    const uniqueCategories = new Set();

    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.category) {
        uniqueCategories.add(data.category);
      }
    });

    uniqueCategories.forEach(cat => {
      const div = document.createElement("div");
      div.className = "category-card";
      div.textContent = cat.charAt(0).toUpperCase() + cat.slice(1); // ex: paste → Paste
      div.onclick = () => {
        window.location.href = `category.html?category=${cat}`;
      };
      container.appendChild(div);
    });
  })
  .catch(err => {
    console.error("Eroare la încărcarea categoriilor:", err);
  });
