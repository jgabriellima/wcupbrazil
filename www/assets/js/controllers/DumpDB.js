window.wc.controller('DumpController', ['$scope', '$http', '$webSql',
    function($scope, $http, $webSql) {
        // $scope.apikey = 'bc6d6fac9954d187d0706e4f9aeb26c6';
        $scope.apikey = '58f85cc20d5fc2ff8a70947eced2435d';
        $scope.limit = 1000;
        $scope.objs = [];
        $scope.local_key = 'wcupbrazil_matches';
        $scope.api = 'matches';
        $scope.sort = 'startTime';

        $scope.init = function() {
            $scope.initdb();
            // $scope.dropplayer();
            if (window.localStorage.getItem("wcupbrazil_playerDB") === null) {
                console.log('DUMP OK');
                $scope.createTablePlayer();
                $scope.insertPlayer();
                window.localStorage.setItem("wcupbrazil_playerDB", true);
            }

        }

        $scope.initdb = function() {

            $scope.db = $webSql.openDatabase('wcbrazil2', '1.0', 'WcupBrazil', 2 * 1024 * 1024);
        }
        $scope.dropplayer = function() {
            $scope.db.dropTable('player');
        }
        $scope.insertPlayer = function(players) {

            var mainInfo = $http.get('db/players.json').success(function(response) {
                console.log(response);
                angular.forEach(response, function(val, key) {
                    // console.log(val, key);
                    $scope.db.insert('player', {
                            age: val.age,
                            assists: val.assists,
                            birthCity: val.birthCity,
                            birthCountry: val.birthCountry,
                            birthDate: val.birthDate,
                            clubId: val.clubId,
                            firstName: val.firstName,
                            foot: val.foot,
                            goals: val.goals,
                            heightCm: val.heightCm,
                            id: val.id,
                            image: val.image,
                            lastName: val.lastName,
                            nationality: val.nationality,
                            nickname: val.nickname,
                            ownGoals: val.ownGoals,
                            penaltyGoals: val.penaltyGoals,
                            position: val.position,
                            teamId: val.teamId,
                            type: val.type,
                            weightKg: val.weightKg
                        },
                        function(results) {
                            // console.log(results.insertId);
                        })
                });
            });

        }

        $scope.createTablePlayer = function() {

            $scope.db.createTable('player', {
                "id": {
                    "type": "STRING",
                    "null": "NOT NULL", // default is "NULL" (if not defined)
                    "primary": true // primary
                },
                "age": {
                    "type": "INTEGER"
                },
                "assists": {
                    "type": "INTEGER"
                },
                "birthCity": {
                    "type": "STRING"
                },
                "birthCountry": {
                    "type": "STRING"
                },
                "birthDate": {
                    "type": "STRING"
                },
                "clubId": {
                    "type": "STRING"
                },
                "firstName": {
                    "type": "STRING"
                },
                "foot": {
                    "type": "STRING"
                },
                "goals": {
                    "type": "INTEGER"
                },
                "heightCm": {
                    "type": "INTEGER"
                },
                "image": {
                    "type": "STRING"
                },
                "lastName": {
                    "type": "STRING"
                },
                "nationality": {
                    "type": "STRING"
                },
                "nickname": {
                    "type": "STRING"
                },
                "ownGoals": {
                    "type": "INTEGER"
                },
                "penaltyGoals": {
                    "type": "INTEGER"
                },
                "position": {
                    "type": "STRING"
                },
                "teamId": {
                    "type": "INTEGER"
                },
                "type": {
                    "type": "STRING"
                },
                "weightKg": {
                    "type": "INTEGER"
                }
            })
        }

    }
]);
