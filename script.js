const key = "fsq3JmSPiSeKO+PYrMnISH5ebeBE28mEnpOo+ChfSdHkUOA="
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'fsq3JmSPiSeKO+PYrMnISH5ebeBE28mEnpOo+ChfSdHkUOA='
    }
  };


async function fetchRestrauntsNearby(keywords, lat, long) {
    const uri = `https://nominatim.openstreetmaps.org/search?q=${encodeURIComponent(keywords)}&format=json&addressdetails=1&extratags=1&viewbox=${long - 0.02},${lat - 0.02},${long + 0.02},${lat + 0.02}&bounded=1`;
    const newUri = `https://api.foursquare.com/v3/places/search?query=${keywords}&ll=${lat}%2C${long}&radius=20000&categories=13065`

    try {
        const res = await fetch(newUri, options)
        const data = await res.json();
        console.log(data.results)
        return data.results;
    } catch (e) {
        alert("Failed to fetch" + e)
    }
}

async function getCurrentLocationResults(keywords, exact = null) {
    navigator.geolocation.getCurrentPosition(async (pos) => {
        const resultsDiv = document.getElementById('results')
        resultsDiv.innerHTML = "<li>Loading</li>"
        const lat = pos.coords.latitude;
        const long = pos.coords.longitude;
        console.log(lat, long)
        const rests = await fetchRestrauntsNearby(keywords, lat, long);
        
        resultsDiv.innerHTML = ""
        rests.forEach(element => {
            if (exact != null) {
                if (element.name.includes(exact)) {
                    console.log(element)
                const li = document.createElement("li")
                li.innerHTML = `<p><strong>Name:</strong>${element.name}</p><p><small>${element.location.formatted_address}</small></p>`
                resultsDiv.appendChild(li);
                }
                
            } else {
                console.log(element)
                const li = document.createElement("li")
                li.innerHTML = `<p><strong>Name:</strong>${element.name}</p><p><small>${element.location.formatted_address}</small></p>`
                resultsDiv.appendChild(li);
            }
            
        });
    })
}
