/**
 * @name : DataRetrievalController.js
 * @description : Automatically retrieves data from nsppolls and parses it for the Poll Position application
 * @author : Team Genesis
 */

let lastDataRetrieval = new Date(70, 1);

/**
 *
 * @param start
 * @param end
 * @return *[]
 */
class DateController {
    getDaysBetween(start, end) {
        let days = [];
        let dt = start
        while(dt <= end){
            let [date, heure] = dt.toISOString().split('T')
            days.push(date);
            dt.setDate(dt.getDate()+1);
        }
        return days;
    }

    shouldWeUpdateData() {
        let currentDate = new Date();
        currentDate.setHours(0,0,0,0);

        if (currentDate > lastDataRetrieval) {
            lastDataRetrieval = currentDate;
            return true;
        } else {
            return false;
        }
    }
}

module.exports = new DateController();
