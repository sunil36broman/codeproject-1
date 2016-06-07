var app = angular.module('app.module.controllers');

app.controller('memberCtrlList', ['$scope', 'Member', 'Project',
        function($scope, Member, Project){
    $scope.projects = Project.query();
    $scope.show = false;

    $scope.loadMembers = function(project){
        $scope.members = Member.query({id: project});
        $scope.project_id = project;
        console.log($scope.project_id);
        $scope.project = Project.get({id: project});
        $scope.show = true;
    }
}]);

app.controller('memberCtrlSave', ['$scope', 'User', 'Project', '$routeParams',
    function($scope, User, Project, $routeParams){

        $scope.action_button = "Salvar";
        $scope.title = "Novo Membro"
        $scope.members = User.query();
        $scope.projects = Project.query();

}]);

app.controller('memberCtrlRemove', ['$scope', '$routeParams', 'Member', '$location', 'appConfig', '$http',
    function($scope, $routeParams, Member, $location, appConfig, $http){

        $scope.title = 'Excluir Nota';
        $scope.action_button = "Excluir"

        $scope.remove = Member.get({id: $routeParams.id, idMember: $routeParams.idMember});

        $scope.save = function(remove){
            $scope.remove.$delete({id: $routeParams.id, idMember: $routeParams.idMember}).then(function(){
                $location.path('/members');
            });
        }

}]);



