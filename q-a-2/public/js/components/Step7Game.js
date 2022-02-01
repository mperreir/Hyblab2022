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

    giveRandomVote() {
        if (this.state.urneState < this.state.maxUrneState) {
            const it = 100 / this.state.maxUrneState;
            const vote = Array(this.state.vote.length).fill(0);
            let toGive = 1000;
            for (let i = 0; i < it; i++) {
                const g = Math.random() * toGive
                toGive -= g;
                vote[Math.floor(Math.random() * 2)] += g;
            }
            this.setState({ vote: vote.map((v, i) =>  this.state.vote[i] + (v / it / this.state.vote.length)), urneState: this.state.urneState+1 }, () => {
                if (this.state.urneState === this.state.maxUrneState) {
                    this.props.enableGameButton();
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