class Tampon extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        const valid = 'img/tampon_valid.svg';
        const cancel = 'img/tampon_cancel.svg';
        return (
            <div className='tampon'>
                <img src={this.props.isValid ? valid : cancel } alt='Tampon'/>
            </div>
        )
    }
}