class Steps extends React.Component {
    constructor(props) {
        super(props);
    }

    /*componentDidMount() {
        let c = [];
        const s = <svg width="100%" height="100%" viewBox="0 0 409 562" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <image xlinkHref="img/steps_bg.svg"  width="409px" height="562px" y="0" x="0"/>
                        <g transform="translate(0,0)">
                        {
                        Object.entries(stepsCandidates).map(function([stepNumber, candidatesList]) {
                            let i = 1;
                            candidatesList.forEach(candidate => {
                                const tempX = 30*(stepNumber-1) + (409 - 30 - 31*(stepNumber-1))/(candidatesList.length+1)*i - candidate.baseWidth/2/stepNumber;
                                const tempY = (562-(parseFloat(candidate.baseY)+parseFloat((stepNumber-1)*33.8)));
                                c.push(<image xlinkHref={"img/candidates/"+candidate.nameId+".svg"} x={tempX} y={tempY} key={candidate.id} alt={candidate.nom}></image>);
                                ++i;
                            });
                        })
                        }
                        {c.reverse()}
                        </g>
                    </svg>;

        const tmpElem = document.createElement('div');
        ReactDOM.render(
            s,
            tmpElem
        )
        console.log(tmpElem.innerHTML);
    }*/

    render() {
        const maxZ = 100;
        let c = [];

        return (

            <div className="steps">
                <div className="steps_bg">
                    <svg width="100%" height="100%" viewBox="0 0 409 562">
                        <image href="img/steps_bg.svg"  width="409px" height="562px" y="0" x="0"/>
                        <g transform="translate(0,0)">
                        {
                        Object.entries(stepsCandidates).map(function([stepNumber, candidatesList]) {
                            let i = 1;
                            candidatesList.forEach(candidate => {
                                const tempX = 30*(stepNumber-1) + (409 - 30 - 31*(stepNumber-1))/(candidatesList.length+1)*i - candidate.baseWidth/2/stepNumber;
                                const tempY = (562-(parseFloat(candidate.baseY)+parseFloat((stepNumber-1)*33.8)));
                                c.push(<image href={"img/candidates/"+candidate.nameId+".svg"} x={tempX} y={tempY} key={candidate.id} alt={candidate.nom}></image>);
                                ++i;
                            });
                        })
                        }
                        {c.reverse()}
                        </g>
                    </svg>
                </div>
                {/*
                    Object.entries(stepsCandidates).map(function([stepNumber, candidatesList]) {
                        candidatesList.forEach(candidate => {
                            const imgStyle = {
                                position: "absolute",
                                width: "14%",
                                left: (8*stepNumber + (10 - stepNumber*0.5)*candidate.id) + "%",
                                bottom: 'calc(10vh - 6vw)',
                                //left: (8*stepNumber + (10 - stepNumber*0.5)*candidate.id) + "%",
                                //bottom: ((7 + 0.015*stepNumber)*stepNumber) + "%",
                                zIndex: (maxZ - (step * 8) - candidate.id)
                            };
                            c.push(<img src={"img/candidates/"+candidate.nameId+".svg"} style={imgStyle} key={candidate.id} alt={candidate.nom}></img>);
                        })
                        ++step;
                    })
                */}
            </div>
        );
    }
}