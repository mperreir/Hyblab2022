class Step1Game extends React.Component {
    constructor(props) {
        super(props);

        const profilsState = candidates.reduce((previous, candidate) => {
            return {
                ...previous,
                [candidate.nameId]: {
                    error: false,
                    isAcceptClick: false,
                    isCancelClick: false,
                    profil: { ...candidate.stepOneGame, img:`img/step1Game/${candidate.nameId}.svg`, name: candidate.name},
                },
            }
        }, {});

        this.state = {
            ...profilsState, 
        };

    }
    componentDidMount() {
        new Swiper('.step1Game_profils', {
            direction: 'horizontal',
            slidesPerView: 1,
            mousewheel: true,
        });
    }

    clickCancel(id) {
        this.setState({ [id]: {...this.state[id], isAcceptClick: false, isCancelClick: !this.state[id].isCancelClick }}, () => { this.isEnd()});
        // this.isEnd();
    }
    clickAccept(id) {
        this.setState({ [id]: {...this.state[id], isAcceptClick: !this.state[id].isAcceptClick, isCancelClick: false }}, () => { this.isEnd()});
        // this.isEnd();
    }

    isEnd() {
        const tmpState = {...this.state};
        const keys = Object.keys(tmpState);
        const validateDisabled = keys.reduce((previous, current) => previous && (tmpState[current].isAcceptClick || tmpState[current].isCancelClick));
        if (validateDisabled) {
            this.isWin();
            this.props.enableGameButton();
        } 
        else {
            this.props.disableGameButton();
        }
    }

    isWin() {
        const tmpState = {...this.state};
        //const keys = Object.keys(tmpState);
        const isWin = candidates.reduce((previous, current) => {
            const valid = current.stepOneGame.valid;
            console.log(current);
            return previous && ((valid && tmpState[current.nameId].isAcceptClick) || (!valid && tmpState[current.nameId].isCancelClick))
        }, true);
    }

    render(){
        const profils = candidates.map((candidate, id) => {
            const candidateState = this.state[candidate.nameId];
            return(
                <div className='swiper-slide step1Game_profil' key={id}>
                    <ProfilCard profil={candidateState.profil}/>
                    <div className={`step1Game_tampon ${candidateState.isAcceptClick ? 'step1Game_tampon_valid': 'step1Game_tampon_cancel'}`} hidden={!(candidateState.isAcceptClick || candidateState.isCancelClick)}>
                        <Tampon isValid={candidateState.isAcceptClick}/>
                    </div>
                    <div className='step1Game_pannelError' hidden={!candidateState.error}>
                        <img src='img/pannel.svg'/>
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
                </div>
            </div>
        )
    }
}