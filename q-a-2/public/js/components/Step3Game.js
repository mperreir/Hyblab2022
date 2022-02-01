class Step3Game extends React.Component {
    constructor(props) {
        super(props);

        const profilsState = candidates.reduce((previous, candidate) => {
            return {
                ...previous,
                [candidate.nameId]: {
                    error: false,
                    isAcceptClick: false,
                    isCancelClick: false,
                    profile: { ...candidate.stepThreeGame, img:`img/step3Game/${candidate.nameId}.svg`, name: candidate.name},
                },
            }
        }, {});

        this.state = {
            validateDisabled: true,
            ...profilsState, 
        };

    }
    componentDidMount() {
        new Swiper('.step3Game_profiles', {
            direction: 'horizontal',
            slidesPerView: 1,
            mousewheel: true,
        });
    }

    render() {
        const profils = candidates.map((candidate, id) => {
            const candidateState = this.state[candidate.nameId];
            return(
                <div className='swiper-slide step3Game_profile' key={id}>
                    <StatementsCard profile={candidateState.profile}/>
                </div>
            ) 
        });

        return (
            <div className='step3Game_profiles swiper'>
                <div className='swiper-wrapper'>
                    {profils}
                </div>
                <Button value={'Valider'} disabled={this.state.validateDisabled} white={false}/>
            </div>
        );
    }
}