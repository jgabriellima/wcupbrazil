window.wc.controller('MatchesController', ['$scope', '$http',
    function($scope, $http) {
        // $scope.apikey = 'bc6d6fac9954d187d0706e4f9aeb26c6';
        $scope.apikey = '58f85cc20d5fc2ff8a70947eced2435d';
        $scope.limit = 1000;
        $scope.objs = [];
        $scope.local_key = 'wcupbrazil_matches';
        $scope.api = 'matches';
        $scope.sort = 'startTime';

        $scope.init = function() {
            $scope.list();
        }

        $scope.list = function() {
            navigator.notification.activityStart('Loading ' + $scope.api + '...', 'loading...');
            if (window.localStorage.getItem($scope.local_key) === null) {
                $http.get('http://worldcup.kimonolabs.com/api/' + $scope.api + '?sort=' + $scope.sort + '&limit=' + $scope.limit + '&apikey=' + $scope.apikey).success(function(result) {

                    result = _.groupBy(result, function(obj) {
                        return obj.startTime.split('T')[0];
                    });
                    // = _.groupBy(result, $scope.sort)

                    window.localStorage.setItem($scope.local_key, JSON.stringify(result));
                    $scope.objs = result;
                    navigator.notification.activityStop();
                    console.log(result);
                });
            } else {
                $scope.objs = JSON.parse(window.localStorage.getItem($scope.local_key));
                navigator.notification.activityStop();
            }


        }
    }
]);
