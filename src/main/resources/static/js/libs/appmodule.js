(function () {
    var app = angular.module('modone', []);
    app.controller('plan_control', function ($scope, $http, $log) {
        $scope.arreglo = [];
        $scope.seleccionado = "";

        $scope.loadData = function () {
            var configList = {
                method: "GET",
                url: "blueprints"
            };

            var response = $http(configList);

            response.success(function (data, status, headers, config) {
                $scope.arreglo = data;
            });

            response.error(function (data, status, headers, config) {
                alert("The petition has failed. HTTP Status:" + status);
            });
        };
        // $scope.loadData();

        $scope.charge = function (blueprintname) {
            $http({
                method: 'GET',
                url: '/blueprints/' + blueprintname
            }).success(function (data) {
                //console.log(data);
                var cnv = document.getElementById("grafica");
                var ctx = cnv.getContext("2d");

                switch (data.name) {
                    case 'rayon':
                        ctx.beginPath();
                        ctx.lineJoin = "round";
                        ctx.moveTo(20, 20);
                        ctx.lineTo(100, 50);
                        ctx.lineTo(20, 100);
                        ctx.stroke();
                        break;
                    case 'larecta':
                        ctx.beginPath();
                        ctx.lineJoin = "round";
                        ctx.moveTo(20, 20);
                        ctx.lineTo(500, 50);
                        ctx.stroke();
                        break;
                    case 'poligono1':
                        ctx.rect(20, 30, 145, 124);
                        ctx.stroke();
                        break;
                }
            });
            
        };
        $scope.chargeSVG = function (blueprintname) {
            $http({
                method: 'GET',
                url: '/blueprints/' + blueprintname
            }).success(function (data) {
                //console.log(data);
                var svg0 = document.getElementById("graficaSVG");

                switch (data.name) {
                    case 'rayon':
                        svg = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                        svg.setAttribute('points',"20,20 40, 25 60,40 80, 120 120,140 200,180");
                        svg.setAttribute('stroke','black');
                        svg0.appendChild(svg);
                        break;
                    case 'larecta':
                        svg = document.createElementNS("http://www.w3.org/2000/svg", "line");
                        svg.setAttribute('x1',20);
                        svg.setAttribute('y1',40);
                        svg.setAttribute('x2',30);
                        svg.setAttribute('y2',50);
                        svg.setAttribute('stroke','black');
                        svg0.appendChild(svg);
                        alert("Entro");
                        break;
                    case 'poligono1':
                        svg = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                        svg.setAttribute('points',"200,10 250,190 160,210");
                        svg.setAttribute('stroke','black');
                        svg0.appendChild(svg);
                        break;
                }
            });
        };
    });
})();





