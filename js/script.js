const list = document.querySelector(".nameslist_container")
const name_input = document.getElementById('search_field');



async function getNames() {
  const data = await fetch("../names.json");
  const json = await data.json();

  return json.map((v) => v.vorname);
  }

let daten = await getNames();

console.log(daten);

const loadNames = () => {
  displayNames(daten);
  }

  const displayNames = (Names) => {
    const htmlString = Names
    .map((Name) => {
            return `
            <li class="names">
                  <span>${Name}</span>
                  <button id="edit_button" type="submit">Edit</button>
                  <button id="delete_button" type="submit">Del</button>
      </li>
        `;
        })
        .join('');
    list.innerHTML = htmlString;
};

loadNames();

  name_input.addEventListener('keyup', (e) => {
    const searchString = e.target.value;

    
    const filteredNames = daten.filter((name) => String(name).toLowerCase().includes(searchString))
    console.log(searchString)
    console.log(filteredNames)
    displayNames(filteredNames);
  });



 



