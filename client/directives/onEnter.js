angular.module('poetry-jam').directive('onEnter', function() {
  return {
    link: function(scope, element, attrs) {
      return element.bind('keydown keypress', function(event) {
        if (event.which === 13) {
          scope.$apply(function() {
            return scope.$eval(attrs.onEnter);
          });
          return event.preventDefault();
        }
      });
    }
  };
});
