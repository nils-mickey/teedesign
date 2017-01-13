	var dashboardDirective = angular.module('DashboardModule')
        dashboardDirective.directive('shirtDesignPane', ShirtDesignPane);
        dashboardDirective.directive('func2', func2);

    function ShirtDesignPane(){
        var Initial = function(scope, element){


        },
    	return {
    		restrict: 'E,A',
    		scope: {
                text: '=',
                selectTextFunc: '=',
                dragendfunc: '=',
                dragfunc: '=',
                boolshow: '=',
                maskimageurl: '=',
                deselectlayerfunc: '=',
                deletelayerfunc: '='
    		},
    		link: Initial,
            template: '/template/shirtDesignPane.html'
    	};
    }
