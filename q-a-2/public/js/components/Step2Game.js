class Step2Game extends React.Component {

    constructor(props) {
        super(props);

        if (Object.keys(this.props.game.data).length) {     //en cas d'echec, la page est rechargée, on garde les données d'avant
            this.state = { ...this.props.game.data};
        }
        else {
            const selectedCharacters = {} 
            stepsCandidates['2'].map((e) => {
                if(e.id < 6) selectedCharacters[e.id] = false    //enlever le if quand on aura tout
            });

            this.state = {
                selected: selectedCharacters,
                IDloser: stepsCandidates['2'][Math.floor(Math.random()*6)].id,
                candidates: stepsCandidates['2'],
            };
            candidates[this.state.IDloser].stepTwoGame.valid = false;
        }
    }

    handleClick(i) {
        const tmpcpy = {...this.state.selected};
        tmpcpy[i] = !tmpcpy[i]
        this.setState({selected: tmpcpy}, () => this.checkWin());
        this.props.enableGameButton();
    }

    checkWin() {
        const tmpState = JSON.parse(JSON.stringify(this.state));
        let winner = true;

        if (this.state.selected[this.state.IDloser]) winner = false;
    
        for(const [key, value] of Object.entries(this.state.selected)) {
            if(parseInt(key) !== this.state.IDloser && value === false) winner = false;
        }

        const gameState = {
            win: winner,
            data: {...tmpState},
            candidatesNextStep: this.state.candidates.filter((e) => e.stepTwoGame.valid === true),
        }
        this.props.gameSaveState(gameState);
    }

    render() {
        const imageCandidates = this.state.candidates.map((e) => {
            return (
            <th 
                id={"step2Game_perso_" + e.id} 
                className={this.state.selected[e.id] ? "step2Game_img_selected" : "step2Game_img_not_selected"}
                onClick={() => this.handleClick(e.id)}
                width="30%">
                <svg className="step2Game_img" viewBox="0 0 100 100" transform={e.stepTwoGame.scale}>
                    <g>
                        <image 
                            width="100%" 
                            height="100%" 
                            href={'img/step2Game/signature-perso-' + e.id + (e.stepTwoGame.valid ? '.svg' : '-F.svg')}
                            >
                        </image>
                    </g>
                </svg>
            </th>)});

        return(            
            <div className='step2Game'>
                <table className='step2Game-images-container'>
                    <tr>
                        {imageCandidates[0]}
                        {imageCandidates[1]}
                        {imageCandidates[2]}
                    </tr>
                    <tr>
                        {imageCandidates[3]}
                        {imageCandidates[4]}
                        {imageCandidates[5]}
                    </tr>
                </table>
            </div>
        );
    }
}