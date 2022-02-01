class Step2Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            candidates: [],
            hint: false,
        }
    }

    check(i) {
        if(this.state.checked.includes(i)) {
            document.getElementById('step2Game-character-' + i).setAttribute('class', 'step2Game-checkbox step2Game-checkbox-unchecked');
            this.state.checked = this.state.checked.filter(e => e !== i);
        }
        else {
            console.log(document.getElementById('step2Game-character-' + i));
            document.getElementById('step2Game-character-' + i).setAttribute('class', 'step2Game-checkbox step2Game-checkbox-checked');
            console.log(document.getElementById('step2Game-character-' + i));
            this.state.checked.push(i);
            console.log(this.state.checked);
        }
    }

    render() {
        this.state.candidates = [0,1,2,3,4,5];
        
        console.log(candidates);

        const imageCandidates = this.state.candidates.map(i => (
            <svg width="100%" height="100%">
                <image href={'img/step2Game/signature-perso-' + i + '.svg'}></image>
                <g>
                <text
                    className='step2Game_signature_text'
                    x={candidates[i].stepTwoGame.x}
                    y={candidates[i].stepTwoGame.y}
                    transform={candidates[i].stepTwoGame.transform}
                    fontSize={candidates[i].stepTwoGame.fontsize}>
                {candidates[i].stepTwoGame.signatures}
                </text>
                </g>
            </svg>));

        // let  i = 0;
        // const test = (
        //     <svg width='200' height='200'>
        //         <image href={'img/step2Game/signature-perso-' + i + '.svg'}></image>
        //         <g transform='translate(0,0)'>
        //         <text
        //             className='step2Game_signature_text'
        //             x={candidates[i].stepTwoGame.x}
        //             y={candidates[i].stepTwoGame.y}
        //             transform={candidates[i].stepTwoGame.transform}
        //             fontSize={candidates[i].stepTwoGame.fontsize}>
        //         {candidates[i].stepTwoGame.signatures}
        //         </text>
        //         </g>
        //     </svg>
        //     );

        return(            
            <div className='step2Game'>
                <Header step={2} />
                <h1 className='step2Game-title'>À toi de jouer ! Valide le nombre de signatures</h1>
                <p className='step2Game-explaination'>Voici le nombre de signatures de chaque candidat. Sélectionne ceux qui peuvent continuer.</p>
                <div className='step2Game-images-container'>
                    <svg height='100%' width='100%' viewBox='0 0 900 600'>{imageCandidates}</svg>
                </div>
                <Button value={'Valider'} disabled={false} white={false} onClick={() => this.props.buttonOnClick()}/>
            </div>
        );
    }
}