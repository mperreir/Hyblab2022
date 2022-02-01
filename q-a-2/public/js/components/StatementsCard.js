class StatementsCard extends React.Component {
    constructor(props) {
        console.log("props: " + props);
        super(props);
    }
    render(){
        return (
            <div className='statementsCard'>
                <img className='statementsCard_img' src={this.props.profile.img} alt={"Déclarations de " + this.props.profile.name}/>

                <div className='statementsCard_information'>
                    {
                        Object.entries(this.props.profile.statements).map(function([key, value]) {
                            return (
                            <div className="checkbox_container">
                                <label className="checkbox_label" for={this.props.profile.name+"-"+key}>
                                <input type="checkbox" className="checkbox_round" id={this.props.profile.name+"-"+key} name={key} checked={value.valid}/>
                                    {value.statement}
                                </label>
                            </div>)
                        }, this).slice(0, 4)
                    }
                </div>
            </div>
        )
    }
}