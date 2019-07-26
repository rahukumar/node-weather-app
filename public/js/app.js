console.log('from the js file under public folder')

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // TO PREVENT FORM DEFAULT BEHAVIOUR OF REFRES

    const location = search.value;
    console.log(location);
    if (location) {
        // fetch('http://localhost:3000/weather?address='+location).then((response) => {
            fetch('/weather?address='+location).then((response) => {
            response.json().then((data) => {
                console.log(data)
            })
        })
    }

})