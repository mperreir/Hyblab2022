function getDays(jour1, jour2) {

    if(jour1 >= jour2) {
        return [jour1]
    } else {
        const jour_temp = new Date(jour1)
        jour_temp.setDate(jour_temp.getDate() + 1)
        return [jour1, ...getDays(jour_temp, jour2)]
    }

}




const a = getDays(new Date("2021-09-02"), new Date("2021-11-25"))


console.log(a.map(x => x.toUTCString() + ", "))