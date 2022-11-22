const list = document.querySelector(".nameslist_container");
const name_input = document.getElementById("search_field");
const new_input = document.getElementById("new_name_field");

async function getNames() {
  const data = await fetch("../names.json");
  const json = await data.json();

  return json.map((v) => v.vorname);
}

let daten = await getNames();

console.log(daten);

const loadNames = () => {
  displayNames(daten);
};

const displayNames = (Names) => {
  const htmlString = Names.map((Name) => {
    return `
            <li id="li" class="names">
                  <span>${Name}</span>
                  <button id="edit_button" type="submit">Edit</button>
                  <button id="delete_button" type="submit">Del</button>
      </li>
        `;
  }).join("");
  list.innerHTML = htmlString;
  // var listItem = document.createElement("li");
  // listItem.appendChild(edit_button);
  // listItem.appendChild(delete_button);
};

loadNames();

name_input.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredNames = daten.filter((name) =>
    String(name).toLowerCase().includes(searchString)
  );
  displayNames(filteredNames);
});

save_button.addEventListener("click", function () {
  const newSearchString = new_input.value;
  daten.unshift(newSearchString);
  displayNames(daten);
});

/* const nameSelector = document.querySelectorAll(".names");
nameSelector.forEach((element) => {
  element.addEventListener("click", () => {
    console.log(element.querySelector("span").innerHTML);
  });
}); */

document.addEventListener("click", (e) => {
  if(e.target?.querySelector("span")?.innerHTML != undefined){
    console.log(e.target?.querySelector("span")?.innerHTML);
  }
});

// apiCall(e.value)
// function apiCall(nameToSearch){
//   console.log(nameToSearch)
// }

// async function funcName(url){
//   const response = await fetch(url);
//   var data = await response.json();
//   }

// delete_button.addEventListener('click', function() {
//   var listItem = this.parentNode;
// 	var ul = listItem.parentNode;
// 	//Remove the parent list item from the ul.
// 	ul.removeChild(listItem);
// });
