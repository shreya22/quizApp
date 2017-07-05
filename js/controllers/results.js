/**
 * Created by shreya on 24/2/17.
 */

angular.module("turtleFacts")
    .controller("resultsCtrl", ResultsController);

ResultsController.$inject= ['quizMetrics', 'dataService'];

function ResultsController(quizMetrics, dataService) {
    var vm= this;

    vm.activeQuestion= 0;
    vm.quizMetrics= quizMetrics;
    vm.dataService= dataService.$$state;
    vm.setActiveQuestion= setActiveQuestion;
    vm.getAnswerClass= getAnswerClass;
    vm.calculatePerc= calculatePerc;
    vm.reset= reset;

    function setActiveQuestion(index) {
        vm.activeQuestion= index;
    }
    
    function getAnswerClass(index) {
        if(index === quizMetrics.correctAnswers[vm.activeQuestion]){
            return "bg-success";
        }else if(index === dataService.$$state.value.quizQuestions[vm.activeQuestion].selected){
            return "bg-danger";
        }
    }
    
    function calculatePerc() {
        // return quizMetrics.numCorrect/dataService.$$state.value.quizQuestions.length*100;
    }
    
    function reset() {
        quizMetrics.changeState("results", false);
        quizMetrics.numCorrect= 0;

        dataService.value.quizQuestions.forEach(function (question) { console.log(question);
            question.selected= null;
            question.correct= null;
        })
    }
}