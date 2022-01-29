class QuestionCard extends React.Component {
    
    constructor(props){
        super(props);
    }

    componentDidUpdate() {
        const s = document.querySelector('.questionCard_questionBlock');
        if (s) {
            s.scrollTop = 0;
        }
    }
    
    render(){
        return(
            <div className='questionCard'>
                <h2 className='questionCard_questionTitle'>{this.props.questionTitle}</h2>
                <div className='questionCard_questionBlock'>
                    <p className='questionCard_question'>{this.props.question}</p>
                    <p className='questionCard_answer'>{this.props.answer}</p>
                    <a className='questionCard_learnMore' href={this.props.learnMoreLink || '#'} target="_blank">En savoir plus</a>
                </div>
                <div className='questionCard_nextStep'>
                    <p>{this.props.nextStepMessage}</p>
                    <Button value={this.props.buttonText} onClick={() => this.props.buttonOnClick()} />
                </div>
            </div>
        )
    }
}