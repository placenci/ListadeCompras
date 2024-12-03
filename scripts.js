// Referências aos elementos do DOM
const shoppingList = document.getElementById("shopping-list");
const addItemForm = document.getElementById("add-item-form");
const newItemInput = document.getElementById("new-item");
const feedback = document.getElementById("feedback");

// Função para carregar a lista do LocalStorage
function loadList() {
  const savedList = JSON.parse(localStorage.getItem("shoppingList")) || [];
  savedList.forEach((item) => addItemToDOM(item));
}

// Função para salvar a lista no LocalStorage
function saveList() {
  const items = Array.from(shoppingList.children).map((li) => 
    li.textContent.replace("Remover", "").trim()
  );
  localStorage.setItem("shoppingList", JSON.stringify(items));
}

// Função para adicionar um item ao DOM
function addItemToDOM(item) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `${item} <button class="remove-btn">Remover</button>`;
  shoppingList.appendChild(listItem);
}

// Evento para adicionar itens
addItemForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newItem = newItemInput.value.trim();
  if (newItem === "") return;

  // Adicionar o novo item ao DOM
  addItemToDOM(newItem);

  // Salvar a lista atualizada
  saveList();

  // Limpar o campo de entrada
  newItemInput.value = "";

  // Mostrar feedback
  showFeedback(`"${newItem}" foi adicionado à lista.`);
});

// Evento para remover itens
shoppingList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-btn")) {
    const listItem = event.target.parentElement;
    const itemName = listItem.textContent.replace("Remover", "").trim();

    // Remover o item do DOM
    shoppingList.removeChild(listItem);

    // Salvar a lista atualizada
    saveList();

    // Mostrar feedback
    showFeedback(`"${itemName}" foi removido da lista.`);
  }
});

// Função para mostrar feedback
function showFeedback(message) {
  feedback.textContent = message;

  // Limpar feedback após 3 segundos
  setTimeout(() => {
    feedback.textContent = "";
  }, 3000);
}

// Carregar a lista ao abrir o site
loadList();
