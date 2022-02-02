class EndGameCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let image;
        if(this.props.isWin) {
            if (this.props.step == 6) {
                image = <div className='endGameCard_image'>
                    <img src='img/endGameCard-sparkles.svg' className='sparkles' />
                    <div className='enveloppes'>
                        <img src={`img/enveloppes/enveloppe-${stepsCandidates['7'][0].nameId}.svg`} />
                        <img src={`img/enveloppes/enveloppe-${stepsCandidates['7'][1].nameId}.svg`} />
                    </div>
                </div>;
            } else if (this.props.step == 7) {
                image = <div className='endGameCard_image enveloppe'>
                    <img src='img/endGameCard-sparkles.svg' className='sparkles' />
                    <img src={`img/enveloppes/enveloppe-${stepsCandidates['8'][0].nameId}.svg`} />
                </div>;
            } else {
                image = <div className='endGameCard_image'><img src='img/endGameCard-sparkles.svg'></img><img src='img/endGameCard-eyes-win.svg'></img></div>;
            }
        }
        else {
            image = <div className='endGameCard_image'><img src='img/endGameCard-eyes-lose.svg'></img></div>;
        }

        return (
            <div className='endGameCard_container'>
                <div className='endGameCard'>
                    <div className='endGameCard_title'>{this.props.isWin ? 'Félicitations !' : 'Oops ...'}</div>
                    <div className='endGameCard_text'>
                        {this.props.isWin ? 'Tu as réussi le mini-jeu ! Les candidats sont prêts à passer à l\'étape suivante.' : 'On dirait qu\'il y a quelques erreurs... Pas de panique, tu peux toujours modifier ta sélection !'}
                    </div>
                    {image}
                    <Button onClick={() => this.props.onClickButton()} white={true} value={this.props.isWin ? 'Etape suivante' : 'Réessayer'} className='endGameCard_button' />
                </div>
            </div>
        )
    }
}