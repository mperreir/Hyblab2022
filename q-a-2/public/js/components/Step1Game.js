class Step1Game extends React.Component {
    constructor(props) {
        super(props);

        const profilsState = candidates.reduce((previus, candidate) => {
            return {
                ...previus,
                [candidate.nameId]: {
                    error: false,
                    isAcceptClick: false,
                    isCancelClick: false,
                    profil: { ...candidate.stepOneGame, img:`img/step1Game/${candidate.nameId}.svg`, name: candidate.name},
                },
            }
        }, {});

        this.state = {
            validateDisabled: true,
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
        console.log('cancel');
        const tampon = (<Tampon isValid={false}/>);
        this.setState({ [id]: {...this.state[id], isAcceptClick: false, isCancelClick: !this.state[id].isCancelClick }});
    }
    clickAccept(id) {
        console.log('accept');
        this.setState({ [id]: {...this.state[id], isAcceptClick: !this.state[id].isAcceptClick, isCancelClick: false }});
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
                <div className='step1Game_header'>
                    <a href='#' className='step1Game_help_point'><img src='img/help_point.svg' alt='Aide'/></a>
                    <h2 className='step1Game_title'>À toi de jouer ! </h2><h2>Examine ces candidatures</h2>
                    <p className='step1Game_subtitle'>Les candidats t’ont envoyé leurs profils, à toi de sélectionner ceux qui peuvent continuer.</p>
                </div>
                <div className='step1Game_profils swiper'>
                    <div className='swiper-wrapper'>
                        {profils}
                    </div>
                </div>
                <Button value={'Valider'} disabled={this.state.validateDisabled} white={false}/>
            </div>
        )
    }
}