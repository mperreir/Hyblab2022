class GamePage extends Page {
    constructor(props) {
        super(props);
        this.state = {
            gameButtonDisabled: true
        }
    }

    render() {
        return (
            <div className='gamePage'>
                <Header step={this.props.step} />
                <div className='gamePage_title_container'>
                    <img src='img/help_point.svg' onClick={() => this.props.returnToExplanations()} />
                    <h2>{this.props.title}</h2>
                    <p>{this.props.subtitle}</p>
                </div>
                <div className='gamePage_container'>
                    {this.props.children}
                </div>
                <Button value={this.props.buttonTitle} onClick={() => this.props.buttonOnClick()} disabled={this.state.gameButtonDisabled} />
            </div>
        )
    }
}