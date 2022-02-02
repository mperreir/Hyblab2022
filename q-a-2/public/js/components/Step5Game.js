class Step5Game extends React.Component {
    

    render() {
        const videos = candidates.map((candidate, id) => {
            //const candidateState = this.state[candidate.nameId];
            if (id < 5) {
                
                return(
                    <div className='step5Game_video' key={id}>
                    <video controls='play' preload className='step5Game_video_control'>
                        <source src={`video/${candidate.nameId}.mp4`} type='video/mp4'/>
                    </video>
                </div>
                ) 
            }

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