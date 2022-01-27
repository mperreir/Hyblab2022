class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button className={'button ' + 
                                (this.props.disabled ? 'button_disabled ' : ' ') + (this.props.negative ? 'button_negative' : ' ')} 
                onClick={() => this.props.onClick()
            }>
                {this.props.value}
            </button>
        );
    }
}