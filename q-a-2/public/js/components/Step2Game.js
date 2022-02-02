class Step2Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: Array(6).fill(false),
            IDloser:Math.floor(Math.random()*6),
        };

        candidates[this.state.IDloser].stepTwoGame.valid = false;
    }

    handleClick(i) {
        const tmpcpy = this.state.selected.slice();
        tmpcpy[i] = !tmpcpy[i]
        this.setState({selected: tmpcpy});
    }

    checkWin() {
        let win = true;
        if (this.state.selected[this.state.IDloser]) win = false;

        this.state.selected.forEach((e, i) => {
            if(i !== this.state.IDloser && e === false) win = false;
        });

        return win;
    }

    render() {

        const imageCandidates = candidates.map((e, i) => {
            return (
            <th 
                id={"step2Game_perso_" + i} 
                className={this.state.selected[i] ? "step2Game_img_selected" : "step2Game_img_not_selected"}
                onClick={() => this.handleClick(i)}
                width="30%">
                <svg className="step2Game_img" viewBox="0 0 100 100" transform={candidates[i].stepTwoGame.scale}>
                    <g>
                        <image 
                            width="100%" 
                            height="100%" 
                            href={'img/step2Game/signature-perso-' + i + (candidates[i].stepTwoGame.valid ? '.svg' : '-F.svg')}
                            >
                        </image>
                    </g>
                </svg>
            </th>)});

        return(            
            <div className='step2Game'>
                <Header step={2} />
                <h1 className='step2Game-title'>À toi de jouer ! Valide le nombre de signatures</h1>
                <p className='step2Game-explaination'>Voici le nombre de signatures de chaque candidat·e. Sélectionne celleux qui peuvent continuer.</p>
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
                {/* TODO: Ajouter le passage à la page suivante */}
                <Button value={'Valider'} disabled={false} white={false} onClick={() => this.props.buttonOnClick()}/>
            </div>
        );
    }
}