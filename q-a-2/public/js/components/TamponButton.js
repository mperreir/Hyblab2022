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
            <div className='tamponButton'>
                <img src={this.props.isValid ? this.props.isWhite ? valid_white : valid_dark : this.props.isWhite ? cancel_white : cancel_dark } alt='Tampon Bouton'/>
            </div>
        )
    }
}