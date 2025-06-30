function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("category");
}

function loadCategory() {
  const category = getCategoryFromURL();
  if (!category) return;

  const container = document.getElementById("types");

  db.collection("recipes").where("category", "==", category).get()
    .then(snapshot => {
      if (snapshot.empty) {
        container.innerHTML = "<p>Nu există rețete în această categorie.</p>";
        return;
      }

      snapshot.forEach(doc => {
        const data = doc.data();
        const id = doc.id;

        const div = document.createElement("div");
        div.className = "category-card";
        div.textContent = data.name;
        div.onclick = () => {
          window.location.href = `recipe.html?category=${category}&recipe=${id}`;
        };
        container.appendChild(div);
      });
    })
    .catch(err => {
      console.error("Eroare la încărcarea rețetelor:", err);
    });
}

loadCategory();
