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
                var canvas = document.getElementById("grafica");
                var canvasContext = canvas.getContext("2d");
                var svg = document.getElementById("graficaSVG");
                var svgContext;
                switch (data.name) {
                    case 'rayon':
                        canvasContext.beginPath();
                        canvasContext.lineJoin = "round";
                        canvasContext.moveTo(data.points[0].x, data.points[0].y);
                        for (var i = 1; i < data.points.length; i++) {
                            canvasContext.lineTo(data.points[i].x, data.points[i].y);
                        }
                        canvasContext.stroke();
                        svgContext = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                        svgContext.setAttribute('points', "20,20 40, 25 60,40 80, 120 120,140 200,180");
                        svgContext.setAttribute('stroke', 'black');
                        svg.appendChild(svgContext);
                        break;
                    case 'larecta':
                        canvasContext.beginPath();
                        canvasContext.lineJoin = "round";
                        canvasContext.moveTo(data.points[0].x, data.points[0].y);
                        canvasContext.lineTo(data.points[1].x, data.points[1].y);
                        canvasContext.stroke();
                        svgContext = document.createElementNS("http://www.w3.org/2000/svg", "line");
                        svgContext.setAttribute('x1', 20);
                        svgContext.setAttribute('y1', 40);
                        svgContext.setAttribute('x2', 30);
                        svgContext.setAttribute('y2', 50);
                        svgContext.setAttribute('stroke', 'black');
                        svg.appendChild(svgContext);
                        break;
                    case 'poligono1':
                        canvasContext.moveTo(data.points[0].x, data.points[0].y);
                        for (var i = 1; i < data.points.length; i++) {
                            canvasContext.lineTo(data.points[i].x, data.points[i].y);
                        }
                        canvasContext.stroke();
                        svgContext = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                        svgContext.setAttribute('points', "200,10 250,190 160,210");
                        svgContext.setAttribute('stroke', 'black');
                        svg.appendChild(svgContext);
                        break;
                }
            });
        };
    });
})();





