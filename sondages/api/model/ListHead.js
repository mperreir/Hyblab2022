class ListHead extends Observable {
    
    constructor(candidate, politicalsParty, borne_spp, borne_inf, intention){
        super();
        this.candidate = candidate;
        this.politicalsParty = politicalsParty;
        this.borne_spp = borne_spp;
        this.borne_inf = borne_inf;
        this.intention = intention;
    }
}

module.exports = ListHead;