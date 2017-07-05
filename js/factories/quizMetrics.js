/**
 * Created by shreya on 21/2/17.
 */

angular.module("turtleFacts")
    .factory('quizMetrics', QuizMetrics);

QuizMetrics.$inject= ["dataService"];

function QuizMetrics(dataService) {
    var quizObj={
        quizActive: false,
        resultsActive: false,
        changeState: ChangeState,
        correctAnswers: [],
        markQuiz: markQuiz,
        numCorrect: 0
    };

    function ChangeState(metric, state) {
        if(metric == 'quiz'){
            quizObj.quizActive= state;
        }else if(metric == "results"){
            quizObj.resultsActive= state;
        }else{
            return false;
        }
    }

    function markQuiz() {
        quizObj.correctAnswers= dataService.$$state.value.correctAnswers;
        for(var i=0; i<dataService.$$state.value.quizQuestions.length; ++i){
            if(dataService.$$state.value.quizQuestions[i].selected == quizObj.correctAnswers[i]){
                quizObj.numCorrect++;
                dataService.$$state.value.quizQuestions[i].correct= true;
            }else{
                dataService.$$state.value.quizQuestions[i].correct= false;
            }
        }
    }

    return quizObj;
}
