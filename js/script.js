const list = document.querySelector(".nameslist_container");
const name_input = document.getElementById("search_field");
const new_input = document.getElementById("new_name_field");

//fetch date from json file into array
async function getNames() {
  const data = await fetch("../names.json");
  const json = await data.json();

  return json.map((v) => v.vorname);
}

let daten = await getNames();

console.log(daten);

//call display names without Filter (names from array)
const loadNames = () => {
  displayNames(daten);
};

//Display Names
const displayNames = (Names) => {
  const htmlString = Names.map((Name) => {
    return `
            <li class="names">
                  <span>${Name}</span>
                  <button id="delete_button" type="submit"><img id="delete_img" src="../images/delete.png" alt="paper bin"></button>
                  <button id="edit_button" type="submit"><img id="delete_img" src="../images/pen.png" alt="paper bin"></button>
                  <button id="like_button" type="submit"><img id="like_img" src="../images/heart_empty.png" alt="paper bin"></button>
      </li>
        `;
  }).join("");
  list.innerHTML = htmlString;
  // var listItem = document.createElement("li");
  // listItem.appendChild(edit_button);
  // listItem.appendChild(delete_button);
};

loadNames();

//Search Function and call filtered names to display
name_input.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredNames = daten.filter((name) =>
    String(name).toLowerCase().includes(searchString)
  );
  displayNames(filteredNames);
});

//Add new Name
save_button.addEventListener("click", function () {
  const newSearchString = new_input.value;
  daten.unshift(newSearchString);
  displayNames(daten);
  document.getElementById('new_name_field').value='';
});

// const nameSelector = document.querySelectorAll(".names");
// nameSelector.forEach((element) => {
//   element.addEventListener("click", () => {
//     console.log(element.querySelector("span").innerHTML);
//   });
// });



//identify clicked name
document.addEventListener("click", (e) => {
  if(e.target?.querySelector("span")?.innerHTML != undefined && e.target.classList.contains('names')){
    apiCall(e.target?.querySelector("span")?.innerHTML);
  }
});

//API-call
function apiCall(nameToSearch){
  let url = `https://api.nationalize.io/?name=${nameToSearch}`
  console.log(url)
  async function fetchData(){
    const response = await fetch(url);
    console.log(response)
    var data = await response.json();
    console.log(data)
    }
    fetchData();
}



// delete_button.addEventListener('click', function() {
//   var listItem = this.parentNode;
// 	var ul = listItem.parentNode;
// 	//Remove the parent list item from the ul.
// 	ul.removeChild(listItem);
// });






// TEST für einfügen der Namen auf die Webseite 



const loadOrigin = () => {
  displayOrigin(daten);
};

//Display Names
const displayOrigin = (country_id, probability) => {
  const htmlString = country_id.map((country_id) => {
    return `
            <li class="origin">
            <p class="origin_percentages" >${country_id} : ${probability}</p>
        </li>
        `;
  }).join("");
  list.innerHTML = htmlString;
  // var listItem = document.createElement("li");
  // listItem.appendChild(edit_button);
  // listItem.appendChild(delete_button);
};