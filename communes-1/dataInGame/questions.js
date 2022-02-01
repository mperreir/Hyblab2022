function q2(code, year, candidate1, candidate2, compare, answer) {
    let data = dataList.get(year, 2);
    let commune = data.get(code);
    let voix1, voix2;
    let nameList = new Array();
    for(let i = 0; i < commune.nom.length; i++) {
        nameList.push(commune.prenom[i] + commune.nom[i]);
    }
    voix1 = commune.votant[nameList.indexOf(candidate1)];
    voix2 = commune.votant[nameList.indexOf(candidate2)];
    let ans;
    if(compare == "plus") ans = voix1 > voix2;
    else if (compare == "moins") ans = voix1 < voix2;
    
    return ans == answer;
}

function q3(code, ans, answer) {

}

function q4(code, year, compare, value, answer) {
    let data = dataList.get(year, 1);
    let commune = data.get(code);
    let taux = commune.pour_abs.ins;
    let ans;
    if(compare == "plus") ans = taux > value;
    else if (compare == "moins") ans = taux < vaue;
    return ans == answer;
}

function q7(code, candidate, year, answer) {
    let data = dataList.get(year, 1);
    let commune = data.get(code);
    let nameList = new Array();
    for(let i = 0; i < commune.nom.length; i++) {
        nameList.push(commune.prenom[i] + commune.nom[i]);
    }
    function arrayMax(arrs) {
        let max = arrs[0];
        for(let i = 1; i < arrs.length; i++) {
            if(arrs[i] > max) {
                max = arrs[i];
            }
        }
        return max;
    }
    let ans =  commune.votant(nameList.indexOf(candidate)) == arrayMax(commune.votant);
    return ans == answer;
}

function q10(code, code1, answer) {
    let commune = data.get(code);
    let commune1 = data.get(code1);
    let ans = commune.votant / commune.inscrit > commune1.votant / commune1.inscrit;
    return ans == answer;
}

function q13(code, compare, value, answer) {
    let commune = data.get(code);
    let ans;
    if(compare == "supérieur") ans = commune.pour_bl_nuls.Vot > value;
    else if (compare == "inférieur") ans = commune.pour_bl_nuls.Vot < vaue;
    return ans == answer;
}

function q14(code, candidate1, candidate2, year, compare, answer) {
    let data = dataList.get(year, 1);
    let nameList = new Array();
    for(let i = 0; i < commune.nom.length; i++) {
        nameList.push(commune.prenom[i] + commune.nom[i]);
    }
    voix1 = commune.votant[nameList.indexOf(candidate1)];
    voix2 = commune.votant[nameList.indexOf(candidate2)];
    let ans;
    if(compare == "plus") ans = voix1 > voix2;
    else if (compare == "moins") ans = voix1 < voix2;

    return ans == answer;

}


