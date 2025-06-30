const params = new URLSearchParams(window.location.search);
const recipeId = params.get("recipe");

const container = document.getElementById("recipe-container");

if (recipeId) {
  db.collection("recipes").doc(recipeId).get()
    .then(doc => {
      if (!doc.exists) {
        container.innerHTML = "<p>Rețeta nu a fost găsită.</p>";
        return;
      }

      const data = doc.data();
      const section = document.createElement("section");

      section.innerHTML = `
        <h2>${data.name}</h2>
        <p><strong>Categorie:</strong> ${data.category}</p>
        <p><strong>Timp:</strong> ${data.time}</p>
        <p><strong>Dificultate:</strong> ${data.difficulty}</p>
        <p><strong>Porții:</strong> ${data.portions}</p>
        <h3>Ingrediente</h3>
        <ul>
          ${data.ingredients.map(i => `<li>${i.amount} ${i.unit} ${i.name}</li>`).join('')}
        </ul>
        <h3>Pași</h3>
        <ol>
          ${data.steps.map(s => `<li>${s}</li>`).join('')}
        </ol>
      `;

      container.appendChild(section);
    })
    .catch(err => {
      console.error("Eroare la citirea rețetei:", err);
      container.innerHTML = "<p>Eroare la citirea rețetei.</p>";
    });
} else {
  container.innerHTML = "<p>Lipsește parametrul ?recipe din URL.</p>";
}
