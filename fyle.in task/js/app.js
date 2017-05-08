'use strict';

angular.module('myApp', [])
  .controller('MovieController', function($scope, $http){
    $scope.$watch('search', function() {
      $scope.fetch();
    $scope.$watch('auto',function(){
    autocomplete();
  });
    });
  
    $scope.search = "Baahubali";

$scope.names = [];
    $scope.fetch=function(){
      
      $scope.search=document.getElementById("search").value;
      // console.log($scope.search);
      $http.get("http://www.omdbapi.com/?t=" + $scope.search + "&tomatoes=true&plot=full")
      .then(function(response){ $scope.details = response.data; });

      $http.get("http://www.omdbapi.com/?s=" + $scope.search)
      .then(function(response){ $scope.related = response.data; 
        console.log(response.data.Search[0].Title);});
    };
    $scope.fetch();



    function autocomplete() {

    $http.get("http://www.omdbapi.com/?s=" + $scope.auto)
    .then(function(response) {
      $scope.related = response.data;
      //console.log($scope.related);
      if($scope.related.Response === "True") {
    var len = $scope.related.Search.length;
    if(len > 10)
    {
      len = 10;
    }
    console.log($scope.related.Search);
    
    for(var i = 0; i<len; i++) {
      $scope.names.push($scope.related.Search[i].Title);
    }
   
  }
    });
  }

  $scope.update = function(movie){
    $scope.search = movie.Title;
   // $scope.fetch();
  };

  $scope.select = function(){
    this.setSelectionRange(0,this.value.length);
  }
  })

.directive('autoComplete', function($timeout) {
    return function(scope, iElement, iAttrs) {
            iElement.autocomplete({
                source: scope[iAttrs.uiItems],
                select: function() {
                    $timeout(function() {
                      iElement.trigger('input');
                    }, 0);
                }
            });
    };
});
