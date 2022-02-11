/** Converts numeric degrees to radians */
if(typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }
  }
  
  // start and end are objects with latitude and longitude
  //decimals (default 2) is number of decimals in the output
  //return is distance in kilometers. 
function getDistance(start, end, decimals) {
    decimals = decimals || 2;
    var earthRadius = 6371; // km
    var lat1 = parseFloat(start.latitude);
    var lat2 = parseFloat(end.latitude);
    var lon1 = parseFloat(start.longitude);
    var lon2 = parseFloat(end.longitude);
  
    var dLat = (lat2 - lat1).toRad();
    var dLon = (lon2 - lon1).toRad();
    var lat1 = lat1.toRad();
    var lat2 = lat2.toRad();
  
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = earthRadius * c;
    return Math.round(d * Math.pow(10, decimals)) / Math.pow(10, decimals);
  };