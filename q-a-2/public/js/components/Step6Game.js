class Step6Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urneState: 0,
            maxUrneState: 8,
            vote: [0, 0, 0, 0, 0],
            candidates: stepsCandidates["6"]
        }
    }

    get2MaxIndex() {
        const maxValue = [...this.state.vote].sort((x, y) => y - x).slice(0, 2);
        return [
            this.state.vote.indexOf(maxValue[0]),
            this.state.vote.indexOf(maxValue[1])
        ]
    }

    giveRandomVote() {
        if (this.state.urneState < this.state.maxUrneState) {
            this.setState({ vote: this.state.vote.map(_ => Math.random() * 10000), urneState: this.state.urneState+1 }, () => {
                if (this.state.urneState === this.state.maxUrneState) {
                    this.props.enableGameButton();
                    this.props.gameSaveState({
                        win: true,
                        data: {},
                        candidatesNextStep: this.state.candidates.filter((_, i) => this.get2MaxIndex().includes(i))
                    })
                }
            });
        }
    }

    render() {
        return (
            <div className='step6Game'>
                <Step6GameChart data={this.state.vote} candidates={this.state.candidates} />
                <img src={`img/step67Game/Urne${this.state.urneState}.svg`} alt='urne' onClick={() => this.giveRandomVote()} />
            </div>
        )
    }
}