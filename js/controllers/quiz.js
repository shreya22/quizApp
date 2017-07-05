/**
 * Created by shreya on 23/2/17.
 */

angular.module("turtleFacts")
    .controller("quizCtrl", QuizController);

QuizController.$inject= ["quizMetrics", "dataService"];

function QuizController(quizMetrics, dataService){
    var vm= this;
    vm.quizMetrics= quizMetrics;
    vm.dataService= dataService.$$state; console.log('vm.dataService', vm.dataService);
    vm.activeQuestion= 0;
    vm.questionAnswered= questionAnswered;
    vm.setActiveQuestion= setActiveQuestion;
    vm.activeQuestion= 0;
    vm.selectAnswer= selectAnswer;
    vm.error= false;
    vm.finalize= false;
    vm.finalizeAnswers= finalizeAnswers;

    var numQuestionsAnswered= 0;
    
    function setActiveQuestion(index) {

        if(index == undefined) {

            var breakOut = false;
            var quizLength = dataService.$$state.value.quizQuestions.length - 1;

            while (!breakOut) {
                vm.activeQuestion = (vm.activeQuestion < quizLength) ? ++vm.activeQuestion : 0;
                if(vm.activeQuestion==0) {
                    vm.error= true;
                }

                if (dataService.$$state.value.quizQuestions[vm.activeQuestion].selected == null) {
                    breakOut = true;
                }
            }
        }
        else{
            vm.activeQuestion= index;
        }
    }
    
    function questionAnswered() {
        var quizLength= dataService.$$state.value.quizQuestions.length;
        for(var x=0; x<quizLength; ++x)
        {
            if(dataService.$$state.value.quizQuestions[vm.activeQuestion].selected != null)
            {
                numQuestionsAnswered++;
                if(numQuestionsAnswered >= quizLength){
                    //    finalize quiz
                    for(var i=0; i<quizLength; ++i){
                        if(dataService.$$state.value.quizQuestions[i].selected == null){
                            setActiveQuestion(i);
                            return;
                        }
                    }
                    vm.error= false;
                    vm.finalize= true;
                    return;
                }
            }
        }

        vm.setActiveQuestion();
    }
    
    function selectAnswer(index) {
        dataService.$$state.value.quizQuestions[vm.activeQuestion].selected= index;
    }
    
    function finalizeAnswers() {
        vm.finalize= false;
        numQuestionsAnswered=0;
        vm.activeQuestion= 0;

        quizMetrics.markQuiz();
        quizMetrics.changeState("quiz", false);
        quizMetrics.changeState("results", true);
    }
}