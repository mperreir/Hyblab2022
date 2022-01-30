class Steps extends React.Component {
    constructor(props) {
        super(props);
    }
    // il faut un state dans un des composants parents qui gère et garde en mémoire quel candidat est à quel étape (= marche)
    // en mode characters = {1: [liste des candidats], 2: [...]}
    render() {
        const maxZ = 100;
        let c = [];
        let step = 1;

        return (
            <div className="steps">
                <div>
                    <img src="img/steps_bg.svg" className="steps_bg" alt="steps"></img>
                </div>
                <div>
                    {
                        Object.entries(stepsCandidates).map(function([stepNumber, candidatesList]) {
                            candidatesList.forEach(candidate => {
                                const imgStyle = {
                                    position: "absolute",
                                    width: "14%",
                                    left: (8*stepNumber + (10 - stepNumber*0.5)*candidate.id) + "%",
                                    bottom: ((7 + 0.015*stepNumber)*stepNumber) + "%",
                                    //left: (8*stepNumber + (10 - stepNumber*0.5)*candidate.id) + "%",
                                    //bottom: ((7 + 0.015*stepNumber)*stepNumber) + "%",
                                    zIndex: (maxZ - (step * 8) - candidate.id)
                                };
                                c.push(<img src={candidate.img_full} style={imgStyle} key={candidate.id} alt={candidate.nom}></img>);
                            })
                            ++step;
                        })
                        
                    }
                    {c}
                </div>
            </div>
        );
    }
}