class MainStepPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='mainStepPage'>
                <Header disableStepText={true} step={this.props.step} />
                <h1 className='mainStepPage_title'>Etape {this.props.step}</h1>
                <p className='mainStepPage_subtitle'>{this.props.subtitle}</p>
                <Button value="C'est parti !" buttonText="Continuer" className='mainStepPage_button' onClick={() => this.props.nextSubStep()} />
                <Steps />
            </div>
        )
    }
}