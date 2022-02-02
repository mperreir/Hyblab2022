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
        console.log(data);
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
    //const mapLink = document.querySelector('#map-link');
  
    //mapLink.href = '';
    //mapLink.textContent = '';
  
    function success(position) {
      let latitude  = position.coords.latitude;
      let longitude = position.coords.longitude;
  
      status.textContent = '';
      //mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      //mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

      latitude = latitude.toFixed(7);
      longitude = longitude.toFixed(7);

      displayBureauxVotefromLocation(latitude, longitude);
  
      /*getPostCodefromCoordinates(latitude, longitude)
        .then(function(result) {
          //On récupère le code postal ici
          let post_code = result.results[0].components.postcode;
          console.log(result);
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
      //status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  
  }


//document.addEventListener('DOMContentLoaded', geoFindMe);

const button_to_slide2 = document.getElementById('bureaux_localisation');
button_to_slide2.addEventListener('click', geoFindMe);


async function displayBureauxVotefromLocation(latitude, longitude){
  swiper.slideNext();
  
  let response = await fetch('api/bureaux_vote/' + latitude + '/' + longitude + '/');
  let data = await response.json();
  console.log(data);

  let global_div = document.querySelector('#liste_bureaux');

  let waiting_time = 0;

  for(let i=0; i<3; i++){
    waiting_time += 0.7;
    let div = document.createElement('div');
    div.setAttribute('class', 'div_bureau');


    div.style["-webkit-animation"] = 'slide-in-bottom 1.1s ' + waiting_time + 's both';
    div.style.animation = 'slide-in-bottom 1.1s ' + waiting_time + 's both';

    nb_bureaux_same_adress = data[i].length;
  
    let bold_name_bureau = document.createElement('b');
    let bold_hours = document.createElement('b');

    let p_name = document.createElement('p');
    let p_adress = document.createElement('p');
    let p_hours = document.createElement('p');
    let p_distance = document.createElement('p');
    let p_others = document.createElement('p');

    p_name.appendChild(bold_name_bureau);
    p_name.style["font-size"] = '18%';
  
    bold_name_bureau.textContent = "Bureau " + data[i][0].fields.code_bureau_vote + " : " + data[i][0].fields.nom_bureau_vote;
    p_adress.textContent = data[i][0].fields.adresse;
    p_hours.textContent = "Horaires : " + data[i][0].fields.ouverture + "h - " + data[i][0].fields.fermeture + "h";
    p_distance.textContent = "À ";
    bold_hours.textContent = data[i][0].fields.dist.toFixed(2);
    p_distance.appendChild(bold_hours);
    p_distance.textContent = p_distance.textContent + "km de toi";
    p_others.textContent = nb_bureaux_same_adress - 1 + " autre(s) bureau(x) à cette adresse";
  
    div.appendChild(p_name);
    div.appendChild(p_adress);
    div.appendChild(p_hours);
    div.appendChild(p_distance);
    div.appendChild(p_others);
  
    global_div.appendChild(div);
  }

}
