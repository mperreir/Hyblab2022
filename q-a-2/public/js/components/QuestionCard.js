class QuestionCard extends React.Component {
    
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div className='questionCard-container'>
                <div className='questionCard'>
                    <h2 className='questionCard-questionTitle'>{this.props.questionTitle}</h2>
                    <div className='questionCard-questionBlock'>
                        <p className='questionCard-question'>{this.props.question}</p>
                        <p className='questionCard-answer'>{this.props.answer}</p>
                        <a href='https://www.perdu.com'>en savoir plus</a>
                    </div>
                    <div className='questionCard-nextStep'>
                        <p>lorem ipsum</p>
                        <button>A modifier</button>
                    </div>
                </div>
            </div>
        )
    }
}