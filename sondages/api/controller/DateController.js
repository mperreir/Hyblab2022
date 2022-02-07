/**
 * @name : DataRetrievalController.js
 * @description : Automatically retrieves data from nsppolls and parses it for the Poll Position application
 * @author : Team Genesis
 */

let lastDataRetrieval = new Date(70, 1);


class DateController {
    /**
     * Allows to know the days between two dates
     * @param start The first date
     * @param end The last date
     * @return {*[]} An array of days between start and end
     */
    getDaysBetween(start, end) {
        let days = [];
        let dt = start;
        while(dt <= end){
            let [date, heure] = dt.toISOString().split('T');
            days.push(date);
            dt.setDate(dt.getDate()+1);
        }
        return days;
    }

    /**
     * Compares the current date with the last date of data retrieval
     * @return {boolean}
     */
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
