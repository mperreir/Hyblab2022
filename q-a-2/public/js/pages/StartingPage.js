class StartingPage extends Page {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        new Swiper('.startingPage', {
            direction: 'vertical',
            slidesPerView: 1,
            mousewheel: true,
        });
    }

    render() {
        return (
            <div className='startingPage swiper'>
                <div className='swiper-wrapper'>
                    <div className='swiper-slide startingPage_firstSlide'>
                        <img src='img/logo_starting_page.svg' alt='logo_mainpage' className='startingPage_logo' />
                        <div className='startingPage_swipeToStart'>
                            <span>Swipe pour commencer</span>
                            <img src="img/bulles_starting_page.svg" className="startingPage_bulles" alt="bulles" />
                        </div>
                    </div>
                    <div className='swiper-slide startingPage_secondSlide'>
                        <div className='startingPage_card'>
                            <h1>Bienvenue sur Elys'able !</h1>
                            <p>
                                Les candidats n'attendent plus que toi pour commencer leur campagne !
                                Tu vas pouvoir les suivre tout au long de ces huit étapes vers l'Élysée.
                            </p>
                            <p>
                                Tu auras la responsabilité de valider ou non leur candidature à plusieurs étapes.
                                Mais pas de panique, tu aras toutes les clefs pour faire les bons choix.
                            </p>
                            <span>À toi de jouer !</span>
                            <Button value="Commencer l'aventure !" className='startingPage_button' onClick={() => this.nextStep()} />
                        </div>
                        <img src='img/personnages_starting_page.svg' alt='Personnages' className='startingPage_persos' />
                    </div>
                </div>
            </div>
        )
    }
}