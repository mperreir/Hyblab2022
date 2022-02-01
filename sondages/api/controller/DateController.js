/**
 * @name : DataRetrievalController.js
 * @description : Automatically retrieves data from nsppolls and parses it for the Poll Position application
 * @author : Team Genesis
 */


/**
 *
 * @param start
 * @param end
 * @return *[]
 */
function getDaysBetween(start, end) {
    let days = [];
    let dt = start
    while(dt <= end){
        let [date, heure] = dt.toISOString().split('T')
        days.push(date);
        dt.setDate(dt.getDate()+1);
    }
    return days;
}

module.exports = getDaysBetween;
