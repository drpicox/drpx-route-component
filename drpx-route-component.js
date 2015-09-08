(function(angular) {

	angular
		.module('drpxRouteComponent', ['ngRoute'])
		.directive('drpxRouteComponent', DrpxRouteComponentDirective);


	DrpxRouteComponentDirective.$inject = ['$animate','$route'];
	function DrpxRouteComponentDirective  ( $animate , $route ) {
		var directive = {
			restrict: 'EA',
			transclude: 'element',
			terminal: true,
			priority: 400,
			link: link
		};
		return directive;

		function link(scope, $element, attrs, ctrl, $transclude) {
			var routeProperty, currentRoute, currentScope, currentElement, previousElement, updateWaiting;

			/* some code from ng-view */
			attrs.$observe('routeProperty', _changeRouteProperty);
			scope.$on('$routeChangeSuccess', _changeRoute);
			_changeRouteProperty(attrs.routeProperty);
			_changeRoute();

			function _changeRouteProperty(newRouteProperty) {
				if (newRouteProperty === routeProperty) {
					return;
				}

				routeProperty = newRouteProperty;
				_update();
			}

			function _changeRoute() {
				if (currentRoute === $route.current) {
					return;
				}

				currentRoute = $route.current;
				_update();
			}

			function _cleanupLastView() {
				if(previousElement) {
					previousElement.remove();
					previousElement = null;
				}
				if(currentScope) {
					currentScope.$destroy();
					currentScope = null;
				}
				if(currentElement) {
					$animate.leave(currentElement, function() {
						previousElement = null;
					});
					previousElement = currentElement;
					currentElement = null;
				}
			}

			function _update() {
				if (!currentRoute) { return; }

				if (!currentRoute.scope && (routeProperty || currentRoute.controllerAs)) {
					// it needs to wait for ng-view
					if (!updateWaiting) {
						scope.$evalAsync(_update);
						updateWaiting = true;
					}
					return;
				}
				updateWaiting = false;

				var newScope = scope.$new();
				var clone = $transclude(newScope, function(clone) {
					$animate.enter(clone, null, currentElement || $element);
					_cleanupLastView();						
				});

				currentElement = clone;
				currentScope = newScope;

				if (routeProperty) {
					currentScope[routeProperty] = currentRoute[routeProperty];
				}
				if (currentRoute.controllerAs) {
					currentScope[currentRoute.controllerAs] = currentRoute.scope[currentRoute.controllerAs];
				}
			}

		}
	}

})(angular);