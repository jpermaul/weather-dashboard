const apiKey = "556a3d31a38483079a43881848ba40d1"
let cityName = document.getElementById("searchInput")

//varStoreHistory




document.getElementById('searchBtn').addEventListener('click', function (event) {
    event.preventDefault()
    const apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=imperial`
    const apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName.value}&appid=${apiKey}&units=imperial`
    fetch(apiUrl1)
        .then(response => {
          // Check if the request was successful (status code 200)
          if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Parse the JSON response
        return response.json();  
        })
        .then(data => {
            console.log(data);
            document.getElementById("currentTemp").textContent = data.main.temp
            document.getElementById("currentHumidity").textContent = data.main.humidity
            document.getElementById("currentWindSpeed").textContent = data.wind
            document.getElementById("currentCity").textContent = data.name
            
            
            localStorage.setItem("City", data.name)
            localStorage.getItem("City")
            document.querySelector('.currentWeatherIcon').src=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
           
            
            const para = document.createElement("p");
            const searchedCity = document.createTextNode(data.name);
            para.appendChild(searchedCity);
            const searchHistory = document.getElementById("searchHistory")
            searchHistory.appendChild(para);
        })
    fetch(apiUrl2)
        .then(response => {
          // Check if the request was successful (status code 200)
          if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Parse the JSON response
        return response.json();  
        })
        .then(data => {
            console.log(data);
            console.log(data.list);
            let j = 0
            for (let i = 3; i < data.list.length; i += 8) {
                document.querySelector('.temperature'+(j+2)).textContent=data.list[i].main.temp
                document.querySelector('.humidity'+(j+2)).textContent=data.list[i].main.humidity
                document.querySelector('.windSpeed'+(j+2)).textContent=data.list[i].wind.speed
                document.querySelector('.weathericon'+(j+2)).src=`https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`
                document.querySelector('.forecastTime'+(j+2)).textContent=data.list[i].dt_txt
                j++

            }    
        })
        
})





