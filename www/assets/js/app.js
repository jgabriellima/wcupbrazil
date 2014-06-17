(function() {
    'use strict';
    window.wc = angular.module('WC', ['onsen.directives', 'angular-websql', 'infinite-scroll']);
window.wc.directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];
        
        elm.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});
})();
