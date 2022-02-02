class Step5Game extends React.Component {
    constructor(props) {
        super(props);

        stepsCandidates['5'].forEach(candidate => {
            this[candidate.nameId] = React.createRef();
        })
        const stateCandidates = stepsCandidates['5'].reduce((previous, candidate) => {
            return {
                ...previous,
                [candidate.nameId]: {
                    play: false,
                    end: false,
                }
            }
        }, {});

        this.state = {...stateCandidates};
    }

    onClickPlay(id) {
        if (!this.state[id].play && !this.state[id].end) {
            this[id].current.play();
            this.setState({ [id]: {...this.state[id], play: true}});
        } else {
            this[id].current.pause();
            this.setState({ [id]: {...this.state[id], play: false}});
        }
    }

    onPause(id) {
        if(this[id].current.currentTime >= 5) {
            this.onEnded(id);
        }
    }
    
    onEnded(id) {
        this.setState({ [id]: {...this.state[id], end: true, play: false}}, this.isWin);
    }


    isWin() {
        console.log('isWin')
        const isWin = stepsCandidates['5'].reduce((previous, candidate) => {
            return previous && this.state[candidate.nameId].end;
        }, true);
        if (isWin) {
            console.log('heho')
            const gameState = {
                win: isWin,
                data: {},
                candidatesNextStep: stepsCandidates['5'],
            }
            this.props.gameSaveState(gameState);
            this.props.enableGameButton()
        }

        
    }

    render() {
        const videos = stepsCandidates['5'].map((candidate, id) => {
            //const candidateState = this.state[candidate.nameId];
            return(
                <div className='step5Game_video_container' key={id}>
                    <PlayButton play={this.state[candidate.nameId].play}  onClick={() => this.onClickPlay(candidate.nameId)}/>
                    <div className='step5Game_video'>
                        <video ref={this[candidate.nameId]} preload='' height={window.innerHeight / 12+'px'} onPause={()=> this.onPause(candidate.nameId)} onEnded={() => this.onEnded(candidate.nameId)}>
                            <source src={`video/${candidate.nameId}.mp4`} type='video/mp4'/>
                        </video>                      
                    </div>
                </div>
            )
        });
        return (
            <div className='Step5Game'>
                <div className='step5Game_videos'>
                    {videos}
                </div>
            </div>
        )
    }
}