class Tampon extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        const tamponSrc = (() => {
            if (this.props.cheque) {
                if (this.props.isValid) {
                    return 'img/tampon-cheque-accepte.svg';
                } else {
                    return 'img/tampon-cheque-refuse.svg';
                }
            } else {
                if (this.props.isValid) {
                    return 'img/tampon_valid.svg';
                } else {
                    return 'img/tampon_cancel.svg';
                }
            }
        })();
        return (
            <div className='tampon'>
                <img src={tamponSrc} alt='Tampon'/>
            </div>
        )
    }
}