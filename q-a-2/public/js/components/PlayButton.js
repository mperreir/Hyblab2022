class PlayButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            play: false
        }
    }

    render() {
        const play = 'img/playButton_play.svg';
        const pause = 'img/playButton_pause.svg';
        return (
            <div className='playButton' onClick={() => this.props.onClick()}>
                <img src={!this.props.play ? play : pause}/>
            </div>
        )
    }
}