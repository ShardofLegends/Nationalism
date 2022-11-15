const form = document.getElementById('form');
const log = document.getElementById('log');
const fishlist = document.getElementById('fishlist');
const fisharray = [];

fetch('https://www.fishwatch.gov/api/species')
    .then(function(response) {
        //successful return as Json
        return response.json();
    })
    .then(function(data) {
        for(var i in data) fisharray.push([i, data[i]]);
        console.log(fisharray);
        for(var i in fisharray)
        fishlist.innerHTML += `<p>${fisharray[i][1]['Color']}</p>`
    })
    .catch(function (error) {
        console.log(error)
    })

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('fishsearch').value;
    console.log(query)
    const fishes = fetchSomeFishes(query);
})

function fetchSomeFishes(fish) {
    fetch(`https://www.fishwatch.gov/api/species/${fish}`)
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.log(error);
        })

}