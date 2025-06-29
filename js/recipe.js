function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    category: params.get("category"),
    recipe: params.get("recipe")
  };
}

async function loadRecipe() {
  const { category, recipe } = getParams();
  if (!category || !recipe) return;

  const container = document.getElementById("recipe-container");
  const path = `data/${category}/${recipe}.json`;

  try {
    const data = await fetch(path).then(res => res.json());

    const section = document.createElement("section");
    section.innerHTML = `
      <h2>${data.name}</h2>
      <p><strong>Timp:</strong> ${data.time}</p>
      <p><strong>Dificultate:</strong> ${data.difficulty}</p>
      <p><strong>Porții:</strong> ${data.portions}</p>
      <h3>Ingrediente</h3>
      <ul>${data.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
      <h3>Pași</h3>
      <ol>${data.steps.map(s => `<li>${s}</li>`).join('')}</ol>
    `;

    container.appendChild(section);
  } catch (err) {
    console.error("Eroare la încărcarea rețetei:", err);
    container.innerHTML = "<p>Rețeta nu a putut fi încărcată.</p>";
  }
}

loadRecipe();
