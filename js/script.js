const list = document.querySelector(".nameslist_container");
const name_input = document.getElementById("search_field");
const new_input = document.getElementById("new_name_field");
var table = document.getElementById("origin");



//fetch date from json file into array
async function getNames() {
  const data = await fetch("../names.json");
  const json = await data.json();

  return json.map((v) => v.vorname);
}

let daten = await getNames();

console.log(daten);

//call disply names without Filter (names from array)
const loadNames = async () => {
  const data = await displayNames(daten);
};

//Display Names
const displayNames = (Names) => {
  let i = 0;
  const htmlString = Names.map((Name) => {
    return `
          <li id="li" class="names">
          <span id="${i++}">${Name}</span>
          <button id="edit_button"  type="submit"><img id="edit_img" class="editbutton" type="${Name}" src="../images/pen.png" alt="paper bin"></button>
          <button id="delete_button"  type="submit"><img id="delete_img" class="deletebutton" type="${Name}" src="../images/delete.png" alt="paper bin"></button>
          <button id="like_button" type="submit"><img id="like_img" class="emptylikebutton" type="${Name}" src="../images/heart_empty.png" alt="paper bin"></button>
          </li>
        `;
  }).join("");
  list.innerHTML = htmlString;
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

//Delete Name
document.addEventListener("click", (e) => {
  if(e.target.classList.contains('editbutton')){
    const name = e.target.getAttribute('type')
    const index = daten.indexOf(name);
    const newname = prompt("Please enter the edited name", name);
    if (newname == null || newname == "") {
      const message = "Process cancelled";
    } else {
      daten[index] = newname;
      displayNames(daten)
    }
  }
});

//Edit Name
document.addEventListener("click", (e) => {
  if(e.target.classList.contains('deletebutton')){
    const name = e.target.getAttribute('type')
    const index = daten.indexOf(name);
    daten.splice(index, 1)
    displayNames(daten)
  }
});

//Lesezeichen (not fully working)
var img = "Test";
document.addEventListener("click", (e) => {
  if(e.target.classList.contains('emptylikebutton')){
    const name = e.target.getAttribute('type')
    const index = daten.indexOf(name); 


    function irg() {
      img = document.getElementById("like_img").getAttribute("src");
      return img;
    };

    irg()

    switch (img) {
      case "./images/heart_empty.png":
        img = document.getElementById('like_img').setAttribute("src", "./images/heart_filled.png");
        break;
      case "./images/heart_filled.png":
        img = document.getElementById('like_img').setAttribute("src", "./images/heart_empty.png");
        break;
    }

    console.log(name)
    //.......
  }
});

//identify clicked name
document.addEventListener("click", (e) => {
  if(e.target?.querySelector("span")?.innerHTML != undefined && e.target.classList.contains('names')){
    apiCall(e.target?.querySelector("span")?.innerHTML);
  }
});

//API-call
var apidata;
function apiCall(nameToSearch){
  let url = `https://api.nationalize.io/?name=${nameToSearch}`
  async function fetchData(){
    const response = await fetch(url);
    apidata = await response.json();
    console.log(apidata)
    async function loadapidata(){
      displayApidata(apidata);
    };
    loadapidata();
    }
    fetchData();
}

function displayApidata(data){
  var table = document.querySelector("#origin tbody");
  let i = 0
  if(i==0){
    table.innerHTML += `<tr><td>${data.country[0].country_id}</td><td>${data.country[0].probability}</td></tr>`;
    table.innerHTML += `<tr><td>${data.country[1].country_id}</td><td>${data.country[1].probability}</td></tr>`;
    table.innerHTML += `<tr><td>${data.country[2].country_id}</td><td>${data.country[2].probability}</td></tr>`;
    table.innerHTML += `<tr><td>${data.country[3].country_id}</td><td>${data.country[3].probability}</td></tr>`;
    table.innerHTML += `<tr><td>${data.country[4].country_id}</td><td>${data.country[4].probability}</td></tr>`;
    i++
  }
    table.innerHTML = '<tr><th>Country</th><th>Probability</th></tr>';
    table.innerHTML += `<tr><td>${data.country[0].country_id}</td><td>${data.country[0].probability}</td></tr>`;
    table.innerHTML += `<tr><td>${data.country[1].country_id}</td><td>${data.country[1].probability}</td></tr>`;
    table.innerHTML += `<tr><td>${data.country[2].country_id}</td><td>${data.country[2].probability}</td></tr>`;
    table.innerHTML += `<tr><td>${data.country[3].country_id}</td><td>${data.country[3].probability}</td></tr>`;
    table.innerHTML += `<tr><td>${data.country[4].country_id}</td><td>${data.country[4].probability}</td></tr>`;
}