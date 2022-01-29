class ProfilCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className='profilCard'>
                <img className='profilCard_img' src={this.props.person.img} alt='Dossier'/>

                <div className='profilCard_information'>
                    <div className='profilCard_civility'>
                        <div className='profilCard_div_text'>
                            <p className='profilCard_label'>Nom: </p><p>{this.props.person.name}</p>
                        </div>
                        <div className='profilCard_div_text'>
                            <p className='profilCard_label'>Âge: </p><p>{this.props.person.age}</p><p>ans</p>
                        </div>
                        <div className='profilCard_div_text'>
                            <p className='profilCard_label'>Adresse: </p><p>{this.props.person.address}</p>
                        </div>
                    </div>
                    <div className='profilCard_div_text'>
                        <p className='profilCard_label'>Orientation Politique: </p><p>{this.props.person.political_orientation}</p>
                    </div>
                    <div className='profilCard_div_text'>
                        <p className='profilCard_label'>Justice: </p><p>{this.props.person.justice}</p>
                    </div>
                </div>
            </div>
        )
    }
}