class Step7Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urneState: 0,
            maxUrneState: 8,
            vote: [0, 0],
            candidates: stepsCandidates["7"]
        }
    }

    getMaxIndex() {
        const maxValue = [...this.state.vote].sort((x, y) => y - x)[0];
        return this.state.vote.indexOf(maxValue)
    }

    giveRandomVote() {
        if (this.state.urneState < this.state.maxUrneState) {
            this.setState({ vote: this.state.vote.map(_ => Math.random() * 10000), urneState: this.state.urneState+1 }, () => {
                if (this.state.urneState === this.state.maxUrneState) {
                    this.props.enableGameButton();
                    this.props.gameSaveState({
                        win: true,
                        data: {},
                        candidatesNextStep: this.state.candidates.filter((_, i) => this.getMaxIndex() === i)
                    })
                }
            });
        }
    }

    render() {
        return (
            <div className='step6Game'>
                <Step7GameChart data={this.state.vote} candidates={this.state.candidates} />
                <img src={`img/step67Game/Urne${this.state.urneState}.svg`} alt='urne' onClick={() => this.giveRandomVote()} />
            </div>
        )
    }
}