class StatementsCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className='statementsCard'>
                <img className='statementsCard_img' src={this.props.profile.img} alt={"dossier-" + this.props.profile.name}/>

                <div className='statementsCard_information'>
                    <div className='statementsCard_civility'>
                        <div className='statementsCard_div_text'>
                            <p><span className='statementsCard_label'>Nom&nbsp;:</span> {this.props.profile.name}</p>
                        </div>
                        <div className='statementsCard_div_text'>
                            <p><span className='statementsCard_label'>Âge&nbsp;:</span> {this.props.profile.age}ans</p>
                        </div>
                        <div className='statementsCard_div_text'>
                            <p><span className='statementsCard_label'>Adresse&nbsp;:</span> {this.props.profile.address}</p>
                        </div>
                    </div>
                    <div className='statementsCard_div_tex'>
                        <p><span className='statementsCard_label'>Orientation Politique&nbsp;:</span></p><p>{this.props.profile.politicalOrientation}</p>
                    </div>
                    <div className='statementsCard_div_tex'>
                        <p><span className='statementsCard_label'>Justice&nbsp;:</span></p><p>{this.props.profile.legalStatus}</p>
                    </div>
                </div>
            </div>
        )
    }
}