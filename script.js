window.addEventListener('load', () => {
  if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'light');
  }

  const themeSelector = document.querySelector('#themeSelector');
  if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
      themeSelector.textContent = '☀️';
  } else {
      themeSelector.textContent = '🌙️';
  }

  themeSelector.addEventListener('click', () => {
      if (localStorage.getItem('theme') === 'light') {
          localStorage.setItem('theme', 'dark');
          themeSelector.textContent = '☀️';
      } else {
          localStorage.setItem('theme', 'light');
          themeSelector.textContent = '🌙️';
      }

      document.body.classList.toggle('dark');
  });
});
document.querySelector("#input").addEventListener("keydown", (event) => {
  if(event.key === "Enter"){
    const input = document.querySelector("#input");
    if(input.value==""){
      alert("Please enter the data");
    }
    else{
    addItem(input.value);
    }
  }
    
});

document.querySelector("#add_item").addEventListener("click", () => {
  const input = document.querySelector("#input");
  if(input.value==""){
    alert("Please enter the data");
  }
  else{
  addItem(input.value);
  }
});

addItem = (input) => {
  const item = document.createElement("div");
  const div = document.createElement("div");
  const checkIcon = document.createElement("i");
  const trashIcon = document.createElement("i");
  const text = document.createElement("p");

  item.className = "item";
  text.textContent = input;

  trashIcon.className = "fas fa-trash";
  trashIcon.style.color = "red";
  trashIcon.addEventListener("click", () => {
    item.remove();
  })
  div.appendChild(trashIcon);

  item.appendChild(text);
  item.appendChild(div);

  document.querySelector("#to_do_list").appendChild(item);
  document.querySelector("#input").value = "";
}
