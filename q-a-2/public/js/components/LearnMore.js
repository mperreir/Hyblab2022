class LearnMore extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a href={this.props.link} className={'learn_more ' + (this.props.negative ? 'learn_more_negative' : '')}>
                En savoir plus
                <img className="learn_more_img" src="img/eyes_black.svg"></img>
            </a>
        );
    }
}