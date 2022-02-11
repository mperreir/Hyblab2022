class TamponButton extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        const valid_dark = 'img/tampon_button_dark_yes.svg';
        const valid_white = 'img/tampon_button_white_yes.svg';
        const cancel_dark = 'img/tampon_button_dark_no.svg';
        const cancel_white = 'img/tampon_button_white_no.svg';
        return (
            <div className='tamponButton' onClick={this.props.onClick}>
                <img src={this.props.isValid ? this.props.isBlack ? valid_dark : valid_white : this.props.isBlack ? cancel_dark : cancel_white } alt='Tampon Bouton'/>
            </div>
        )
    }
}