class EndingPage extends Page {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        new Swiper('.endingPage', {
            direction: 'vertical',
            slidesPerView: 1,
            mousewheel: true,
        })
    }

    render() {
        const members = [
            {
                name: 'Baptiste Batard',
                school: 'Polytech',
                eyes: 'eyes_bb.svg'
            },
            {
                name: 'Simon Perrin',
                school: 'Polytech',
                eyes: 'eyes_sp.svg'
            },
            {
                name: 'Léopold Cudilla',
                school: 'Polytech',
                eyes: 'eyes_lc.svg'
            },
            {
                name: 'Julie James',
                school: 'Polytech',
                eyes: 'eyes_jj.svg'
            },
            {
                name: 'Marcel Kawski',
                school: 'Polytech',
                eyes: 'eyes_mk.svg'
            },
            {
                name: 'Emma Brochard',
                school: 'AGR',
                eyes: 'eyes_eb.svg'
            },
            {
                name: 'Harmony Maisonhaute',
                school: 'AGR',
                eyes: 'eyes_hm.svg'
            },
        ]

        return (
            <div className='endingPage swiper'>
                <div className='swiper-wrapper'>
                    <div className='swiper-slide endingPage_firstSlide'>
                        <img src="img/logo_starting_page.svg" alt='logo_endingcard' />
                        <div className='endingPage_card'>
                            <span className='endingPage_card_title'>Félicitations !</span>
                            <p>Grâce à toi, les élections se sont déroulées sans encombres.</p>
                            <p>Le·a nouveau·elle président·e a pu prendre ses fonctions quelques jours plus tard. Son mandat sera valable 5 ans. Nous aurons peut-être à nouveau besoin de toi à ce moment !</p>
                            <div className='endingPage_eyes'>
                                <img src='img/endGameCard-sparkles.svg' alt='sparkles' />
                                <img src='img/endGameCard-eyes-win.svg' alt='eyes_win' />
                            </div>
                        </div>
                    </div>
                    <div className='swiper-slide endingPage_secondSlide'>
                        <div className='endingPage_card'>
                            <span className='endingPage_card_title'>Merci !</span>
                            <img src='img/logo_partners/logo_hyblab.png' alt='hyblab' className='hyblab' />
                            <img src='img/logo_partners/logo_nouvelle_republique.png' alt='Nouvelle République' className='nr' />
                            <div>
                                <img src='img/logo_partners/logo_polytech.png' alt='Polytech' className='polytech' />
                                <img src='img/logo_partners/logo_agr.png' alt='Agr' className='agr' />
                            </div>
                            <div>
                                <img src='img/logo_partners/logo_nantesuniversite.png' alt='Nantes Université' className='nu' />
                                <img src='img/logo_partners/logo_oml.png' alt='OML' className='OML' />
                            </div>
                            <img src='img/logo_partners/logo_nantesmetropole.png' alt='Nantes Metropole' className='NM' />
                            <div>
                                <img src='img/logo_partners/logo_cc.png' alt='CC' className='CC' />
                                <img src='img/logo_partners/logo_opensource.png' alt='OpenSource' className='OS' />
                            </div>
                        </div>
                    </div>
                    <div className='swiper-slide endingPage_thirdSlide'>
                        <div className='endingPage_members'>
                            {members.map(member => {
                                return (
                                    <div className='endingPage_member' key={member.name}>
                                        <img src={'img/' + member.eyes} alt={member.name} />
                                        <span className='endingPage_member_name'>{member.name}</span>
                                        <span className='endingPage_member_school'>{member.school}</span>
                                    </div>
                                )
                            })}
                        </div>
                        <Button value="Revenir à l'accueil" white={true} className='endingPage_button' onClick={() => this.nextStep()} />
                        <img src='img/personnages_starting_page.svg' alt='personnages' className='endingPage_persos' />
                    </div>
                </div>
            </div>
        )
    }
}