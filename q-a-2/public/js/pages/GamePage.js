class GamePage extends Page {
    constructor(props) {
        super(props);
        this.state = {
            buttonDisabled: true,
            endScreen: false,
            game: {
                win: false,
                data: {},
                candidatesNextStep: []
            }
        }
    }

    enableGameButton() {
        this.setState({ buttonDisabled: false });
    }

    disableGameButton() {
        this.setState({ buttonDisabled: true });
    }

    gameSaveState(game) {
        this.setState({ game: game });
    }

    gameFinish() {
        this.setState({ endScreen: true })
    }

    onClickEndCard() {
        if (this.state.game.win) {
            this.candidatesClimbSteps(this.state.game.candidatesNextStep)
            this.props.nextStep()
        } else {
            this.setState({ endScreen: false })
        }
    }

    render() {
        if (this.state.endScreen) {
            return (
                <div className='gamePage'>
                    <Header step={this.props.step} />
                    <EndGameCard isWin={this.state.game.win} onClickButton={() => this.onClickEndCard()} />
                </div> 
            ) 
        }
        return (
            <div className='gamePage'>
                <Header step={this.props.step} />
                <div className='gamePage_title_container'>
                    <img src='img/help_point.svg' onClick={() => this.props.returnToExplanations()} />
                    <h2>{this.props.title}</h2>
                    <p>{this.props.subtitle}</p>
                </div>
                <div className='gamePage_container'>
                    {
                        React.cloneElement(this.props.children, {
                            enableGameButton: () => this.enableGameButton(),
                            disableGameButton: () => this.disableGameButton(),
                            gameSaveState: (game) => this.gameSaveState(game),
                            game: this.state.game
                        })
                    }
                </div>
                <Button value={this.props.buttonTitle} onClick={() => this.gameFinish()} disabled={this.state.buttonDisabled} />
            </div>
        )
    }
}