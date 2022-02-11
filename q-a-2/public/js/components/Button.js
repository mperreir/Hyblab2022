class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button className={'button ' + 
                                (this.props.disabled ? 'button_disabled ' : ' ') + (this.props.white ? 'button_white ' : ' ') + (this.props.className || '')} 
                onClick={() => this.props.onClick()
            }>
                {this.props.value}
            </button>
        );
    }
}