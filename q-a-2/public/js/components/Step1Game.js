class Step1Game extends React.Component {
    constructor(props) {
        super(props);
        if (Object.keys(this.props.game.data).length) {
            this.state = { ...this.props.game.data};
        } else {

            const profilsState = stepsCandidates['1'].reduce((previous, candidate) => {
                return {
                    ...previous,
                    [candidate.nameId]: {
                        // error: false,
                        isAcceptClick: false,
                        isCancelClick: false,
                        profil: { ...candidate.stepOneGame, img:`img/step1Game/${candidate.nameId}.svg`, name: candidate.name},
                    },
                }
            }, {});
            
            const candidatesNextStep = stepsCandidates['1'].filter(candidate => candidate.stepOneGame.valid);
            
            this.state = {
                ...profilsState,
                candidatesNextStep: candidatesNextStep,
            };
        }

    }
    componentDidMount() {
        new Swiper('.step1Game_profils', {
            direction: 'horizontal',
            slidesPerView: 1,
            mousewheel: true,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
        });
    }

    clickCancel(id) {
        this.setState({ [id]: {...this.state[id], isAcceptClick: false, isCancelClick: !this.state[id].isCancelClick }}, () => { this.isEnd()});
    }
    clickAccept(id) {
        this.setState({ [id]: {...this.state[id], isAcceptClick: !this.state[id].isAcceptClick, isCancelClick: false }}, () => { this.isEnd()});
    }

    isEnd() {
        const tmpState = {...this.state};
        delete tmpState.candidatesNextStep;
        const keys = Object.keys(tmpState);
        const validateDisabled = keys.reduce((previous, current) => previous && (tmpState[current].isAcceptClick || tmpState[current].isCancelClick), true);
        if (validateDisabled) {
            this.isWin();
            this.props.enableGameButton();
        }
        else {
            this.props.disableGameButton();
        }
    }
    
    isWin() {
        const tmpState = JSON.parse(JSON.stringify(this.state));
        const isWin = stepsCandidates['1'].reduce((previous, current) => {
            const valid = current.stepOneGame.valid;
            const isValid = ((valid && tmpState[current.nameId].isAcceptClick) || (!valid && tmpState[current.nameId].isCancelClick));
            tmpState[current.nameId].error = !isValid;
            return previous && isValid;
        }, true);
        const gameState = {
            win: isWin,
            data: {...tmpState},
            candidatesNextStep: this.state.candidatesNextStep,
        }
        this.props.gameSaveState(gameState);
    }

    render(){
        const profils = stepsCandidates['1'].map((candidate, id) => {
            const candidateState = this.state[candidate.nameId];
            return(
                <div className='swiper-slide step1Game_profil' key={id}>
                    <ProfilCard profil={candidateState.profil}/>
                    <div className={`step1Game_tampon ${candidateState.isAcceptClick ? 'step1Game_tampon_valid': 'step1Game_tampon_cancel'}`} hidden={!(candidateState.isAcceptClick || candidateState.isCancelClick)}>
                        <Tampon isValid={candidateState.isAcceptClick}/>
                    </div>
                    <div className='step1Game_pannelError' hidden={!candidateState.error}>
                        <img src='img/warning.svg'/>
                    </div>
                    <div className='step1Game_tampon_button'>
                        <TamponButton isValid={true} isBlack={candidateState.isAcceptClick} onClick={() => this.clickAccept(candidate.nameId)}/>
                        <TamponButton isValid={false} isBlack={candidateState.isCancelClick}  onClick={() => this.clickCancel(candidate.nameId)}/>
                    </div>
                </div>
            ) 

        });
        
        return(
            <div className='step1Game'>
                <div className='step1Game_profils swiper'>
                    <div className='swiper-wrapper'>
                        {profils}
                    </div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                </div>
            </div>
        )
    }
}