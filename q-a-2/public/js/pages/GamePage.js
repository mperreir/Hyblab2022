class GamePage extends Page {
    constructor(props) {
        super(props);
        this.state = {
            buttonDisabled: true
        }
    }

    enableGameButton() {
        this.setState({ buttonDisabled: false });
    }

    disableGameButton() {
        this.setState({ buttonDisabled: true });
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
                    {
                        React.cloneElement(this.props.children, { enableGameButton: () => this.enableGameButton(), disableGameButton: () => this.disableGameButton() })
                    }
                </div>
                <Button value={this.props.buttonTitle} onClick={() => this.props.buttonOnClick()} disabled={this.state.buttonDisabled} />
            </div>
        )
    }
}