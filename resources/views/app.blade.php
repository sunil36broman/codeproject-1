
<!DOCTYPE html>
<html lang="pt-br" ng-app="app">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
	<meta name="description" content="">
	<meta name="author" content="">
	<link rel="icon" href="favicon.ico">

	<title>Curso de Laravel/AngularJS</title>

	@if (Config::get('app.debug'))
		<!--
		<link href="build/css/vendor/bootstrap.min.css" rel="stylesheet">
		<link href="build/css/vendor/bootstrap-theme.min.css" rel="stylesheet">
		-->
		<link href="build/css/vendor/loading-bar.min.css" rel="stylesheet">
		<link href="build/css/font-awesome.css" rel="stylesheet">
		<link href="build/css/style.css" rel="stylesheet">
		<link href="build/css/flaticon.css" rel="stylesheet">
		<link href="build/css/components.css" rel="stylesheet">
		<link href="build/css/app.css" rel="stylesheet">
		<link href="build/css/vendor/angular-ui-notification.min.css" rel="stylesheet">
	@else
		<link rel="stylesheet" href="{{ elixir("css/all.css") }}">
	@endif


	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->

	<meta charset="utf-8" />

</head>

<body role="document">

<load-template url="build/view/template/menu.html"></load-template>

<div class="container theme-showcase" role="main" id="container">

	<ng-view></ng-view>

</div> <!-- /container -->

@if (Config::get('app.debug'))
	<!-- Bootstrap core JavaScript
	================================================== -->
	<!-- Placed at the end of the document so the pages load faster -->
	<script src="{{asset('build/js/vendor/jquery.min.js')}}"></script>
	<script src="{{asset('build/js/vendor/bootstrap.min.js')}}"></script>

	<script src="{{asset('build/js/vendor/angular.min.js')}}"></script>

	<script src="{{asset('build/js/vendor/angular-route.min.js')}}"></script>
	<script src="{{asset('build/js/vendor/angular-messages.min.js')}}"></script>
	<script src="{{asset('build/js/vendor/angular-resource.min.js')}}"></script>
	<script src="{{asset('build/js/vendor/angular-animate.min.js')}}"></script>
	<script src="{{asset('build/js/vendor/angular-strap.min.js')}}"></script>
	<script src="{{asset('build/js/vendor/ui-bootstrap-tpls.min.js')}}"></script>
	<script src="{{asset('build/js/vendor/loading-bar.min.js')}}"></script>
	<script src="{{asset('build/js/vendor/ng-file-upload.min.js')}}"></script>
	<script src="{{asset('build/js/vendor/dirPagination.js')}}"></script>
	<script src="{{asset('build/js/vendor/pusher.js')}}"></script>
	<script src="{{asset('build/js/vendor/pusher-angular.js')}}"></script>
	<script src="{{asset('build/js/vendor/angular-ui-notification.min.js')}}"></script>

	<!-- Angular-OAuth2 -->
	<script src="{{asset('build/js/vendor/angular-cookies.min.js')}}"></script>
	<script src="{{asset('build/js/vendor/query-string.js')}}"></script>
	<script src="{{asset('build/js/vendor/angular-oauth2.min.js')}}"></script>
	<script src="{{asset('build/js/vendor/http-auth-interceptor.js')}}"></script>

	<!-- Controllers -->
	<script src="{{asset('build/js/controllers/app.module.controllers.js')}}"></script>

	<script src="{{asset('build/js/controllers/loginController.js')}}"></script>
	<script src="{{asset('build/js/controllers/loginModalController.js')}}"></script>
	<script src="{{asset('build/js/controllers/homeController.js')}}"></script>
	<script src="{{asset('build/js/controllers/clientController.js')}}"></script>
	<script src="{{asset('build/js/controllers/projectController.js')}}"></script>
	<script src="{{asset('build/js/controllers/projectNoteController.js')}}"></script>
	<script src="{{asset('build/js/controllers/projectTaskController.js')}}"></script>
	<script src="{{asset('build/js/controllers/memberController.js')}}"></script>
	<script src="{{asset('build/js/controllers/projectFileController.js')}}"></script>

	<!-- Services -->
	<script src="{{asset('build/js/services/app.module.services.js')}}"></script>

	<script src="{{asset('build/js/services/clientService.js')}}"></script>
	<script src="{{asset('build/js/services/projectService.js')}}"></script>
	<script src="{{asset('build/js/services/projectNoteService.js')}}"></script>
	<script src="{{asset('build/js/services/projectTaskService.js')}}"></script>
	<script src="{{asset('build/js/services/userService.js')}}"></script>
	<script src="{{asset('build/js/services/memberService.js')}}"></script>
	<script src="{{asset('build/js/services/projectFileService.js')}}"></script>
	<script src="{{asset('build/js/services/url.js')}}"></script>
	<script src="{{asset('build/js/services/oauthFixInterceptor.js')}}"></script>

	<!-- Filters -->
	<script src="{{asset('build/js/filters/app.module.filters.js')}}"></script>
	<script src="{{asset('build/js/filters/date-br.js')}}"></script>
	<script src="{{asset('build/js/filters/status-project.js')}}"></script>

	<!-- Directives -->
	<script src="{{asset('build/js/directives/app.module.directive.js')}}"></script>
	<script src="{{asset('build/js/directives/projectFileDownload.js')}}"></script>
	<script src="{{asset('build/js/directives/loginForm.js')}}"></script>
	<script src="{{asset('build/js/directives/loadTemplate.js')}}"></script>
	<script src="{{asset('build/js/directives/menuActivated.js')}}"></script>
	<script src="{{asset('build/js/directives/tabProject.js')}}"></script>
	<script src="{{asset('build/js/directives/projectStatus.js')}}"></script>

	<!-- Principal -->
	<script src="{{asset('build/js/app.route.js')}}"></script>

	<!-- Principal -->
	<script src="{{asset('build/js/app.js')}}"></script>
@else
	<link rel="stylesheet" href="{{ elixir("js/all.js") }}">
@endif

</body>
</html>


