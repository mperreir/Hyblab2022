class EndGameCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isWin: true,
        };
    }

    render() {
        let image;
        if(this.state.isWin) {
            image = <div className='endGameCard-image'><img src='img/endGameCard-sparkles.svg'></img><img src='img/endGameCard-eyes-win.svg'></img></div>;
        }
        else {
            image = <div className='endGameCard-image'><img src='img/endGameCard-eyes-lose.svg'></img></div>;
        }

        return (
            <div className='endGameCard-container'>
                <div className='endGameCard'>
                    <div className='endGameCard-title'>{this.state.isWin ? 'Félicitations !' : 'Oops ...'}</div>
                    <div className='endGameCard-text'>
                        {this.state.isWin ? 'Tu as réussi le mini-jeu ! Les candidats sont prêts à passer à l\'étape suivante.' : 'On dirait qu\'il y a quelques erreurs... Pas de panique, tu peux toujours modifier ta sélection !'}
                    </div>
                    {image}
                    <button className='endGameCard-button'>{this.state.isWin ? 'Etape suivante' : 'Réessayer'}</button>
                </div>
            </div>
        )
    }
}