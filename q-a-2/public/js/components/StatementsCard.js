class StatementsCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className='statementsCard'>
                <img className='statementsCard_img' src={this.props.profile.img} alt={"Déclarations de " + this.props.profile.name}/>
                <div className='step3Game_nameDiv' style={{fontSize: 2.5+(10/this.props.profile.name.length < 1 ? -(1 - 10/this.props.profile.name.length) : 10/this.props.profile.name.length-1)+"vh"}}>{this.props.profile.name}</div>
                <div className='statementsCard_information'>
                    {
                        Object.entries(this.props.info).map(function([key, value]) {
                            return (
                            <div className="checkbox_container" key={key}>
                                <label className="checkbox_label" htmlFor={this.props.profile.id+"-"+key} key={key}>
                                    <input type="checkbox" className="checkbox_round" id={this.props.profile.id+"-"+key} name={key} key={key} checked={value.valid} onChange={() => this.props.select(this.props.profile.id, key)}/>
                                    {value.statement}
                                </label>
                            </div>)
                        }, this)
                    }
                </div>
            </div>
        )
    }
}