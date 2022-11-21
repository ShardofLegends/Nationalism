const list = document.querySelector(".nameslist_container")
const name_input = document.getElementById('name_input');



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
                  <i class="names_delete"></i>
      </li>
        `;
        })
        .join('');
    list.innerHTML = htmlString;
};
loadNames();

  name_input.addEventListener('keyup', (e) => {
    const searchString = e.target.value;

    
    const filteredNames = daten.filter((name) => String(name).includes(searchString))
    console.log(searchString)
    console.log(filteredNames)
    displayNames(filteredNames);
  });



 



