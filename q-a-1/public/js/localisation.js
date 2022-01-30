function getPostCodefromCoordinates(latitude, longitude){
  var api_key = 'ffeaff9b94954d05b109b647cbff9166';

  var api_url = 'https://api.opencagedata.com/geocode/v1/json';

  var request_url = api_url
    + '?'
    + 'key=' + api_key
    + '&q=' + encodeURIComponent(latitude + ',' + longitude)
    + '&pretty=1'
    + '&no_annotations=1';


  return new Promise(function(resolve, reject){
    var request = new XMLHttpRequest();
    request.onload = function(){
      if (request.status === 200){ 
        // Success!
        var data = JSON.parse(request.responseText);
        resolve(data);
  
      } else if (request.status <= 500){ 
        // We reached our target server, but it returned an error
                            
        console.log("unable to geocode! Response code: " + request.status);
        var data = JSON.parse(request.responseText);
        console.log('error msg: ' + data.status.message);
      } else {
        console.log("server error");
      }
    }
    request.onerror = reject;
    request.open('GET', request_url, true);
    request.send();
  })
}




function geoFindMe() {

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');
  
    mapLink.href = '';
    mapLink.textContent = '';
  
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      status.textContent = '';
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
      
      getBureauxVotefromLocation(latitude, longitude);
      /*
      getPostCodefromCoordinates(latitude, longitude)
        .then(function(result) {
          //On récupère le code postal ici
          console.log(result.results[0].components.postcode);
        })
        .catch(function(){
          // There was a connection error of some sort
          console.log("unable to connect to server");
        });*/
    }
  
    function error() {
      status.textContent = 'Unable to retrieve your location';
    }
  
    if (!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  
  }
  
document.querySelector('#find-me').addEventListener('click', geoFindMe);


async function getBureauxVotefromLocation(latitude, longitude){
  let response = await fetch('api/bureaux_vote/' + latitude + '/' + longitude + '/');
  let data = await response.json();
  console.log(data);
}
