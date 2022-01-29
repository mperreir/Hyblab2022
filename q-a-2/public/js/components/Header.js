class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='header'>
                <div className='header_frow' style={this.props.disableStepText ? { justifyContent: 'end' } : null}>
                    {this.props.disableStepText || 
                        <span className='header_step'>
                            ETAPE {this.props.step}
                        </span>
                    }
                    <img className='header_logo' src='img/logo.svg' alt='logo' />
                </div>
                <StepBar nbStep={8} currStep={this.props.step - 1} />
            </div>
        )
    }
}
