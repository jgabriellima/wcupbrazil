window.wc.controller('PlayerController', ['$scope', '$http', '$webSql',
    function($scope, $http, $webSql) {
        // $scope.apikey = 'bc6d6fac9954d187d0706e4f9aeb26c6';
        $scope.apikey = '58f85cc20d5fc2ff8a70947eced2435d';
        $scope.limit = 1000;
        $scope.objs = [];
        $scope.local_key = 'wcupbrazil_players';
        $scope.api = 'players';
        $scope.sort = 'firstName';
        $scope.page = 1;
        $scope.limit = ($scope.page - 1) * 20;
        $scope.skip = 0;
        $scope.player = {};

        $scope.init = function() {
            $scope.initdb();
            $scope.list();
            // 
            
        }

        $scope.select = function(id) {
            navigator.notification.activityStart('Loading ' + $scope.api + '...', 'loading...');
            console.log(id);
            $scope.db.executeQuery("SELECT * FROM player where id='" + id + "'", [], function(results) {
                for (i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    window.localStorage.setItem('wcupbrazil_player', JSON.stringify(row));
                }
                $scope.$apply();
                navigator.notification.activityStop();
                $scope.ons.screen.presentPage('players_detail.html');
            });
        }
        $scope.get = function() {
            $scope.player = JSON.parse(window.localStorage.getItem('wcupbrazil_player'));
        }

        $scope.initdb = function() {
            $scope.db = $webSql.openDatabase('wcbrazil2', '1.0', 'WcupBrazil', 2 * 1024 * 1024);
        }

        $scope.list = function() {
            navigator.notification.activityStart('Loading ' + $scope.api + '...', 'loading...');
            if (window.localStorage.getItem($scope.local_key) === null) {
                $scope.db.executeQuery("SELECT * FROM player LIMIT 0, 10", [], function(results) {
                    for (i = 0; i < results.rows.length; i++) {
                        var row = results.rows.item(i);
                        console.log(row);
                        $scope.objs.push(row);
                    }
                    $scope.$apply();
                    window.localStorage.setItem($scope.local_key, JSON.stringify($scope.objs));
                    navigator.notification.activityStop();
                });
            } else {
                $scope.objs = JSON.parse(window.localStorage.getItem($scope.local_key));
                navigator.notification.activityStop();
            }
        }
        $scope.pagination = function() {
            navigator.notification.activityStart('Loading more ' + $scope.api + '...', 'loading...');
            $scope.page += 1;
            $scope.limit = ($scope.page - 1) * 20;
            $scope.db.executeQuery("SELECT * FROM player LIMIT " + $scope.limit + ", 20", [], function(results) {
                // $scope.objs = [];
                for (i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    $scope.objs.push(row);
                }
                $scope.$apply();
                navigator.notification.activityStop();
            });
        }
        $scope.blockbackbuton = function() {
            document.addEventListener("backbutton", function() {
                $scope.ons.screen.dismissPage();
                // document.removeEventListener("backbutton", function() {
                //     return true;
                // }, false);
                return false;
            }, false);
        };
    }
]);
