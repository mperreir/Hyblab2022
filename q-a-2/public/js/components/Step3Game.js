class Step3Game extends React.Component {
    constructor(props) {
        super(props);

        if (!this.props.game.data || Object.keys(this.props.game.data).length === 0) {
            const profilesState = JSON.parse(JSON.stringify(stepsCandidates["3"])).reduce((previous, candidate) => {
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
                Object.entries(info.gameInfo).map(([key, sInfo]) => {
                    sInfo.valid = true;
                    sInfo.error = false;
                })
            });
    
            this.state = {
                ...profilesState,
            };

            this.props.gameSaveState({
                win: false,
                data: {},
                candidatesNextStep: stepsCandidates["3"]
            });
        } else {
            this.state = this.props.game.data;

            Object.entries(this.state).forEach(([nameId, info]) => {
                Object.entries(info.gameInfo).map(([key, sInfo]) => {
                    const candidateStatement = Object.values(stepsCandidates["3"].find(c => c.nameId === nameId).stepThreeGame.statements).find(s => s.statement === sInfo.statement);
                    if (candidateStatement.valid !== sInfo.valid) sInfo.error = true;
                })
            });
        }
    }

    componentDidMount() {
        this.props.enableGameButton();
        new Swiper('.step3Game_profiles', {
            direction: 'horizontal',
            slidesPerView: 1,
            mousewheel: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }

    select = (id, key) => {
        let newGameInfo = this.state[id].gameInfo;
        newGameInfo[key].valid = !newGameInfo[key].valid;
        this.setState({ [id]: {...this.state[id], gameInfo: newGameInfo }});
        const win = this.isWin();
        this.props.gameSaveState({
            win: win,
            data: JSON.parse(JSON.stringify(this.state)),
            candidatesNextStep: stepsCandidates["3"]
        });
    }

    isWin() {
        const tmpState = {...this.state};
        return Object.entries(tmpState).map(([nameId, info]) => {
            return Object.values(info.gameInfo).map(({statement, valid}) => {
                const candidateStatement = Object.values(stepsCandidates["3"].find(c => c.nameId === nameId).stepThreeGame.statements).find(s => s.statement === statement);
                return (valid === candidateStatement.valid);
            }).reduce((previous, current) => {
                return (previous && current);
            }, true);
        }).reduce((previous, current) => {
            return (previous && current);
        }, true);
    }

    render() {
        const profils = stepsCandidates["3"].map((candidate, id) => {
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
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
            </div>
        );
    }
}