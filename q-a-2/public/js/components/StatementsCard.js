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
                        Object.entries(this.props.profile).map(function([key, value]) {
                            return (
                            <div>
                                <input type="checkbox" className="checkbox-round" id={this.props.profile.name+"-"+key} name={key}/>
                                <label for={this.props.profile.name+"-"+key}>{value}</label>
                            </div>)
                        }, this).slice(0, 4)
                    }
                </div>
            </div>
        )
    }
}