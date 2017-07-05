/**
 * Created by shreya on 21/2/17.
 */

angular
    .module("turtleFacts")
    .factory("dataService", DataFactory);

// DataFactory.$inject= ["$http", "$q"];
function DataFactory($http, $q) {

    var promises= {
        turtlesData: $http.get('../../utilities/turtlesData.json'),
        quizQuestions: $http.get('../../utilities/quizQuestions.json')
    };

    var correctAnswers= [1, 2, 3, 0, 2, 0, 3, 2, 0, 3];
    return $q.all(promises).then(function (res) {
        var dataObj= {};

        dataObj.turtlesData= res.turtlesData.data;
        dataObj.quizQuestions= res.quizQuestions.data;
        dataObj.correctAnswers= correctAnswers;
        return dataObj;
    });

}
