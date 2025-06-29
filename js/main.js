// Lista hardcodată de categorii pentru început (se va înlocui cu citire din sistemul de fișiere când vei hosta cu un backend)
const categories = [
  { id: "paste", name: "Paste" },
  { id: "orez", name: "Orez" },
  { id: "supe", name: "Supe" },
  { id: "deserts", name: "Deserturi" }
];

const container = document.getElementById("categories");

categories.forEach(category => {
  const card = document.createElement("div");
  card.className = "category-card";
  card.textContent = category.name;
  card.onclick = () => {
    window.location.href = `category.html?name=${category.id}`;
  };
  container.appendChild(card);
});
