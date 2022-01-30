class ProfilCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className='profilCard'>
                <img className='profilCard_img' src={this.props.profil.img} alt='Dossier'/>

                <div className='profilCard_information'>
                    <div className='profilCard_civility'>
                        <div className='profilCard_div_text'>
                            <p><span className='profilCard_label'>Nom&nbsp;:</span> {this.props.profil.name}</p>
                        </div>
                        <div className='profilCard_div_text'>
                            <p><span className='profilCard_label'>Âge&nbsp;:</span> {this.props.profil.age}ans</p>
                        </div>
                        <div className='profilCard_div_text'>
                            <p><span className='profilCard_label'>Adresse&nbsp;:</span> {this.props.profil.address}</p>
                        </div>
                    </div>
                    <div className='profilCard_div_tex'>
                        <p><span className='profilCard_label'>Orientation Politique&nbsp;:</span></p><p>{this.props.profil.politicalOrientation}</p>
                    </div>
                    <div className='profilCard_div_tex'>
                        <p><span className='profilCard_label'>Justice&nbsp;:</span></p><p>{this.props.profil.legalStatus}</p>
                    </div>
                </div>
            </div>
        )
    }
}