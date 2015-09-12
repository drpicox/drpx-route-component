# drpx-route-component
An angular directive that replicates a component for each route. It is a kind of custom ng-view.

It's main purpose is to enable the definition of powerful components that can be configured by the route itself. For example, in addition to the main ng-view, you can define custom views for header and footer.

Example:

```html
<body>
  <h1 drpx-route-component data-route-property="title">
     {{title}}
  </h1>
  <ng-view></ng-view>
</body>
```


Install - npm
-------------

```bash
$ npm install --save drpx-route-component
```

add to your module the dependence:

```javascript
    angular.module('yourModule', [ require('drpx-route-component') ]);
```


Install - bower
---------------

```bash
$ bower install --save drpx-route-component
```

add to your module the dependence:

```javascript
    angular.module('yourModule', ['drpxRouteComponent']);
```

include the javascript library in your application:

```html
<script src="bower_components/drpx-route-component/drpx-route-component.js"></script>
```



How to use
----------

### Simple use

```html
<div drpx-route-component>
   <!-- the html to show, do something with your controllerAs -->
   {{vm.something()}}
</div>
```

### With ngAnimate

```html
<style>
    .transition-slideleft.ng-enter {
        transform: translatex(100%);
    }
    .transition-slideleft.ng-enter.ng-enter-active {
        transform: translatex(0%);
    }
    .transition-slideleft.ng-leave.ng-leave-active {
        transform: translatex(-100%);
    }
</style>
<div drpx-route-component class="slideleft">
   <!-- the html to show, do something with your controllerAs -->
   {{vm.something()}}
</div>
```

### Parametrized in route

```javascript
    $routeProvider.when('/items/:item', {
        templateUrl: 'ItemsItemRoute.tpl.html',
        title: 'An Item',
        controller: ItemsItemController,
        controllerAs: 'vm'
    });
```

```html
<h1 drpx-route-component data-route-property="title" >
   <!-- the html to show, do something with your controllerAs -->
   {{title}}
</h1>
```
