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
  for (let i = 0; i < 1000; i++) {
    const html = `
     <li class="names">
                  <span>${daten[i]}</span>
                  <i class="names_delete"></i>
      </li>
      `;
    list.innerHTML += html;
  }
}



//   name_input.addEventListener('keyup', (e) => {
//     const searchString = e.target.value.toLowerCase();

//     const filteredNames = daten.filter(() => {
//         return (
//             //personen.value.toLowerCase().includes(searchString)
//             daten.includes(searchString)
//         );
//     });
//     displayNames(filteredNames);
//   });

//   const displayNames = (Names) => {
//     const htmlString = Names
//         .map((Name) => {
//             return `
//             <li class="names">
//                   <span>${Name}</span>
//                   <i class="names_delete"></i>
//       </li>
//         `;
//         })
//         .join('');
//     list.innerHTML = htmlString;
// };

loadNames();
// displayNames();
  // const filterTodos = (term) => {
  //   Array.from(daten.children)
  //     .filter((show) => !show.textContent.toLowerCase().includes(term))
  //     .forEach((show) => show.classList.add("filtered"));
    
    
    
  //   Array.from(daten.children)
  //     .filter((search_field) => search_field.textContent.toLowerCase().includes(term))
  //     .forEach((search_field) => search_field.classList.remove("filtered"));
    
  // };

  // const search = document.querySelector('.search_field');
  // search.addEventListener("keyup", () => {
  //   const term = search.value.trim().toLowerCase();
  //     filterTodos(term);
  //   }); 



