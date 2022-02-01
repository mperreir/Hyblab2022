class Step3Game extends React.Component {
    constructor(props) {
        super(props);

        const profilesState = candidates.reduce((previous, candidate) => {
            return {
                ...previous,
                [candidate.nameId]: {
                    error: false,
                    gameInfo: candidate.stepThreeGame.statements,
                    profile: {id: candidate.nameId, img:`img/step3Game/${candidate.nameId}.svg`, name: candidate.name},
                },
            }
        }, {});

        Object.entries(profilesState).forEach(([nameId, info]) => {
            Object.entries(info.gameInfo).forEach(([key, sInfo]) => {
                sInfo.valid = true;
            })
        });

        this.state = {
            ...profilesState,
        };
    }

    componentDidMount() {
        this.props.enableGameButton();
        new Swiper('.step3Game_profiles', {
            direction: 'horizontal',
            slidesPerView: 1,
            mousewheel: true,
        });
    }

    select = (id, key) => {
        let newGameInfo = this.state[id].gameInfo;
        newGameInfo[key].valid = !newGameInfo[key].valid;
        console.log(this.state[id].gameInfo[key])
        this.setState({ [id]: {...this.state[id], gameInfo: newGameInfo }}, () => {console.log(this.state[id].gameInfo[key])});

    }

    isWin() {
        const tmpState = {...this.state};
        return Object.entries(tmpState).map(([nameId, info]) => {
            info.gameInfo.map(([key, statementInfo]) => {
                const candidateStatements = stepsCandidates["3"].find(c => c.nameId === nameId).stepThreeGame.statements;
                return ((statementInfo.valid && candidateStatements[key].valid) || (!statementInfo.valid && !candidateStatements[key].valid));
            }).reduce((previous, current) => {
                previous && current
            }, true);
        }).reduce((previous, current) => {
            previous && current
        }, true);
    }

    render() {
        const profils = candidates.map((candidate, id) => {
            const candidateState = this.state[candidate.nameId];
            return (
                <div className='swiper-slide step3Game_profile' key={id}>
                    <StatementsCard profile={candidateState.profile} info={candidateState.gameInfo} select={this.select} />
                </div>
            )
        });

        return (
            <div className='step3Game_profiles swiper'>
                <div className='swiper-wrapper'>
                    {profils}
                </div>
            </div>
        );
    }
}