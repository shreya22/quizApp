/**
 * Created by shreya on 19/2/17.
 */

angular
    .module("turtleFacts")
    .controller("listCtrl", ListController);

ListController.$inject= ['$http', 'quizMetrics'];

function ListController($http, quizMetrics) {

    var vm= this;

    $http.get('../../utilities/turtlesData.json')
        .then(function(res){
            vm.quizMetrics= quizMetrics;
            vm.data= res.data;
            vm.activeTurtle= {};
            vm.search="";
            vm.activateQuiz= activateQuiz;
            vm.changeActiveTurtle= changeActiveTurtle;
        });

    function changeActiveTurtle(index) {
        vm.activeTurtle= index;
    }

    function activateQuiz() {
        quizMetrics.changeState("quiz", true);
    }
}
