/* global angular */

angular.module('angularD3', ['d3'])
.directive('d3Circle', 
    [
        'd3Service',
        function (d3Service) {
            return {
                restrict: 'E',
                scope: {
                    message: '='
                },
                link: function (scope, element, attrs) {
                    d3Service.d3().then(function (d3) {
                        var isBlue = true;
                        var defaultColor = '#2196F3';

                        var baseElem = d3.select(element[0])
                            .append('svg')
                            .attr('width', 100)
                            .attr('height', 100);

                        baseElem.append('circle')
                            .style('stroke', 'gray')
                            .style('fill', '#2196F3')
                            .attr('r', 20)
                            .attr('cx', 50)
                            .attr('cy', 50)
                            .on('mouseover', mouseOverFunction)
                            .on('mouseout', mouseOutFunction)
                            .on('click', clickFunction);

                        d3.select(element[0])
                            .append('h3')
                            .html(scope.message);

                        function mouseOverFunction() {
                            d3.select(this)
                                .transition()
                                .delay(0)
                                .duration(300)
                                .attr('r', 40)
                                .style('fill', '#00E676');
                        }
                        function mouseOutFunction() {
                            d3.select(this)
                                .transition()
                                .delay(100)
                                .duration(300)
                                .attr('r', 20)
                                .style('fill', defaultColor);
                        }
                        function clickFunction() {
                            defaultColor = isBlue ? '#FF9800' : '#2196F3'
                            isBlue = !isBlue;
                        }
                    });
                }
            };
        }
    ]
)
.controller('mainViewCtrl', 
    [
        '$scope',
        function ($scope, d3Service) {
            $scope.appName = 'Angular and D3, together!';
        }
    ]
);