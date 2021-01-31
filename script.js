//return current data
let date = () =>{
    let today = new Date();
    today = today.toLocaleDateString('en-us' ,{
        year:'numeric',
        month: 'long',
        day: 'numeric'
    });
    return today;
};


//function to fetch data from API
let getDataFromApi = () =>{
    //get input
    let place = document.querySelector('.search-input').value;
    //console.log(place)
    document.querySelector('.search-input').value = '';
    document.querySelector('.search-input').focus();

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + place + '&units=metric&appid=dbc17f90e7876abfb91c723abb2d290f')
    .then(result =>{
        return result.json();
    })
    .then(data =>{
        //console.log(data);
        displayData(data);
    })

};


//function to display data from API
let displayData = (data) =>{

    //display data from API
    if(data.cod === '404'){
        alert('City not found!');
    }
    else{
        document.getElementById('country-name').textContent = data.name;
        document.getElementById('description').textContent = data.weather[0].description;
        document.getElementById('feels-like').textContent = data.main.feels_like + '°C';
        document.getElementById('description-img').textContent = data.weather[0].main;
        document.getElementById('date').textContent = date();
        document.getElementById('min-temp').textContent = data.main.temp_min + '°C';
        document.getElementById('max-temp').textContent = data.main.temp_max + '°C';
        document.getElementById('humidity').textContent = data.main.humidity + '%';
        document.getElementById('wind-speed').textContent = data.wind.speed + ' mph';
        document.getElementById('pressure').textContent = data.main.pressure + ' Pascal';

        if(data.weather[0].main){
            document.getElementById('main-img').src = "../imgs/" + data.weather[0].main + ".png";
        }
    }

};

//event listeners
document.querySelector('.search-button').addEventListener('click' , getDataFromApi);
document.addEventListener('keydown' , (e) => {
    if(e.keyCode === 13){
        getDataFromApi();
    }
});