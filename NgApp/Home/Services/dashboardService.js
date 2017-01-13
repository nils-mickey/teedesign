

    var dashboardService = angular.module('DashboardModule')
        dashboardService.service('DashboardService', DashboardService);

    DashboardService.$inject = ['$q', '$http', 'HttpService','$timeout'];

    function DashboardService($q, $http, HttpService, $timeout) {

        var key = 'fstky2e4mdt';

        var _GetGraphics = function () {

            var deferred = $q.defer();

            HttpService.Post("/art_random", {'key':key})
                .then(function (data) {
                  
                    deferred.resolve(data);
                    return deferred.promise;
                }, function (err) {
                deferred.reject(err);
                return deferred.promise;
            });
            return deferred.promise;
        };

        var _GetShirtStyle = function () {

            var deferred = $q.defer();

            HttpService.Post("/styles", {'key':key})
                .then(function (data) {
                  console.log(data);
                    deferred.resolve(data);
                    return deferred.promise;
                }, function (err) {
                deferred.reject(err);
                return deferred.promise;
            });
            return deferred.promise;
        };
 
        var _GetFonts = function () {

            var deferred = $q.defer();

            HttpService.Post("/fonts", {'key':key})
                .then(function (data) {
                  
                    deferred.resolve(data);
                    return deferred.promise;
                }, function (err) {
                deferred.reject(err);
                return deferred.promise;
            });
            return deferred.promise;
        };

        var _GetConfig = function () {

            var deferred = $q.defer();

            HttpService.Post("/config", {'key':key})
                .then(function (data) {
                  
                    deferred.resolve(data);
                    return deferred.promise;
                }, function (err) {
                deferred.reject(err);
                return deferred.promise;
            });
            return deferred.promise;
        };

         var _GetSvg = function (url) {

              var deferred = $q.defer();

            $http.get(url).then(function(data) {
                // process response here..
                deferred.resolve(data);
                return deferred.promise;
                }, function(err) {

                deferred.reject(err);
                return deferred.promise;
            });

            return deferred.promise;
        };

        var _GetColors = function () {

            var deferred = $q.defer();

            HttpService.Post("/colors", {'key':key})
                .then(function (data) {
                  
                    deferred.resolve(data);
                    return deferred.promise;
                }, function (err) {
                deferred.reject(err);
                return deferred.promise;
            });
            return deferred.promise;
        };

        var _GetGoogleFonts = function () {

           var fonts =  [
                            // {
                            //     "family": "ABeeZee",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Abel",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Abril Fatface",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            {
                                "family": "Aclonica",
                                "category": "sans-serif",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v6",
                                "lastModified": "2015-04-06"
                            },
                            // {
                            //     "family": "Acme",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Actor",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            {
                                "family": "Adamina",
                                "category": "serif",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v7",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Advent Pro",
                                "category": "sans-serif",
                                "variants": [
                                    "100",
                                    "200",
                                    "300",
                                    "regular",
                                    "500",
                                    "600",
                                    "700"
                                ],
                                "version": "v4",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Aguafina Script",
                                "category": "handwriting",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v5",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Akronim",
                                "category": "display",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v5",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Aladin",
                                "category": "handwriting",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v5",
                                "lastModified": "2015-04-06"
                            },
                            // {
                            //     "family": "Aldrich",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Alef",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-08"
                            // },
                            // {
                            //     "family": "Alegreya",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic",
                            //         "900",
                            //         "900italic"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Alegreya SC",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic",
                            //         "900",
                            //         "900italic"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            {
                                "family": "Alegreya Sans",
                                "category": "sans-serif",
                                "variants": [
                                    "100",
                                    "100italic",
                                    "300",
                                    "300italic",
                                    "regular",
                                    "italic",
                                    "500",
                                    "500italic",
                                    "700",
                                    "700italic",
                                    "800",
                                    "800italic",
                                    "900",
                                    "900italic"
                                ],
                                "version": "v3",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Alegreya Sans SC",
                                "category": "sans-serif",
                                "variants": [
                                    "100",
                                    "100italic",
                                    "300",
                                    "300italic",
                                    "regular",
                                    "italic",
                                    "500",
                                    "500italic",
                                    "700",
                                    "700italic",
                                    "800",
                                    "800italic",
                                    "900",
                                    "900italic"
                                ],
                                "version": "v3",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Alex Brush",
                                "category": "handwriting",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v6",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Alfa Slab One",
                                "category": "display",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v5",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Alice",
                                "category": "serif",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v7",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Alike",
                                "category": "serif",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v7",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Alike Angular",
                                "category": "serif",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v6",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Allan",
                                "category": "display",
                                "variants": [
                                    "regular",
                                    "700"
                                ],
                                "version": "v7",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Allerta",
                                "category": "sans-serif",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v7",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Allerta Stencil",
                                "category": "sans-serif",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v7",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Allura",
                                "category": "handwriting",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v4",
                                "lastModified": "2015-04-06"
                            },
                            // {
                            //     "family": "Almendra",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Almendra Display",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Almendra SC",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Amarante",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Amaranth",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Amatic SC",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-07-22"
                            // },
                            // {
                            //     "family": "Amethysta",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Amiri",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-07"
                            // },
                            // {
                            //     "family": "Amita",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-06-03"
                            // },
                            // {
                            //     "family": "Anaheim",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Andada",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Andika",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Angkor",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Annie Use Your Telescope",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Anonymous Pro",
                            //     "category": "monospace",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Antic",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Antic Didone",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Antic Slab",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Anton",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Arapey",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Arbutus",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Arbutus Slab",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Architects Daughter",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Archivo Black",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Archivo Narrow",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Arimo",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v9",
                            //     "lastModified": "2015-04-28"
                            // },
                            // {
                            //     "family": "Arizonia",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Armata",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Artifika",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Arvo",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Arya",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-05-21"
                            // },
                            // {
                            //     "family": "Asap",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Asar",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-06-17"
                            // },
                            // {
                            //     "family": "Asset",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Astloch",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Asul",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Atomic Age",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Aubrey",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Audiowide",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Autour One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Average",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Average Sans",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Averia Gruesa Libre",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Averia Libre",
                            //     "category": "display",
                            //     "variants": [
                            //         "300",
                            //         "300italic",
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Averia Sans Libre",
                            //     "category": "display",
                            //     "variants": [
                            //         "300",
                            //         "300italic",
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Averia Serif Libre",
                            //     "category": "display",
                            //     "variants": [
                            //         "300",
                            //         "300italic",
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Bad Script",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Balthazar",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Bangers",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Basic",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Battambang",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v9",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Baumans",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Bayon",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Belgrano",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Belleza",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "BenchNine",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "300",
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Bentham",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Berkshire Swash",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Bevan",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Bigelow Rules",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Bigshot One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Bilbo",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Bilbo Swash Caps",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Biryani",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "200",
                            //         "300",
                            //         "regular",
                            //         "600",
                            //         "700",
                            //         "800",
                            //         "900"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-04-22"
                            // },
                            // {
                            //     "family": "Bitter",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Black Ops One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Bokor",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Bonbon",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Boogaloo",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Bowlby One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Bowlby One SC",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Brawler",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Bree Serif",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Bubblegum Sans",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Bubbler One",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Buda",
                            //     "category": "display",
                            //     "variants": [
                            //         "300"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Buenard",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Butcherman",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Butterfly Kids",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Cabin",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "500",
                            //         "500italic",
                            //         "600",
                            //         "600italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Cabin Condensed",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "500",
                            //         "600",
                            //         "700"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Cabin Sketch",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Caesar Dressing",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Cagliostro",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Calligraffitti",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Cambay",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Cambo",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Candal",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Cantarell",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Cantata One",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Cantora One",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Capriola",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Cardo",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Carme",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Carrois Gothic",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Carrois Gothic SC",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Carter One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Caudex",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Cedarville Cursive",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Ceviche One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Changa One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "italic"
                            //     ],
                            //     "version": "v9",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Chango",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Chau Philomene One",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Chela One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Chelsea Market",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Chenla",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v9",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Cherry Cream Soda",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Cherry Swash",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Chewy",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Chicle",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Chivo",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "900",
                            //         "900italic"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Cinzel",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "700",
                            //         "900"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Cinzel Decorative",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "700",
                            //         "900"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Clicker Script",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Coda",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "800"
                            //     ],
                            //     "version": "v10",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Coda Caption",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "800"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Codystar",
                            //     "category": "display",
                            //     "variants": [
                            //         "300",
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Combo",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Comfortaa",
                            //     "category": "display",
                            //     "variants": [
                            //         "300",
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Coming Soon",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Concert One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Condiment",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Content",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Contrail One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Convergence",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Cookie",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Copse",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Corben",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Courgette",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Cousine",
                            //     "category": "monospace",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v10",
                            //     "lastModified": "2015-04-28"
                            // },
                            // {
                            //     "family": "Coustard",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "900"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Covered By Your Grace",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Crafty Girls",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Creepster",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Crete Round",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Crimson Text",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "600",
                            //         "600italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Croissant One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Crushed",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Cuprum",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Cutive",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Cutive Mono",
                            //     "category": "monospace",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Damion",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Dancing Script",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Dangrek",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Dawning of a New Day",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Days One",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Dekko",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v2",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Delius",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Delius Swash Caps",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Delius Unicase",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v9",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Della Respira",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Denk One",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Devonshire",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Dhurjati",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-07"
                            // },
                            // {
                            //     "family": "Didact Gothic",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Diplomata",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-03-20"
                            // },
                            // {
                            //     "family": "Diplomata SC",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Domine",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Donegal One",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Doppio One",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Dorsa",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Dosis",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "200",
                            //         "300",
                            //         "regular",
                            //         "500",
                            //         "600",
                            //         "700",
                            //         "800"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Dr Sugiyama",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Droid Sans",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Droid Sans Mono",
                            //     "category": "monospace",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Droid Serif",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Duru Sans",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Dynalight",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "EB Garamond",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Eagle Lake",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Eater",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Economica",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Eczar",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "500",
                            //         "600",
                            //         "700",
                            //         "800"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-06-03"
                            // },
                            // {
                            //     "family": "Ek Mukta",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "200",
                            //         "300",
                            //         "regular",
                            //         "500",
                            //         "600",
                            //         "700",
                            //         "800"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Electrolize",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Elsie",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "900"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Elsie Swash Caps",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "900"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Emblema One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Emilys Candy",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Engagement",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Englebert",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Enriqueta",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Erica One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Esteban",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Euphoria Script",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Ewert",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Exo",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "100",
                            //         "100italic",
                            //         "200",
                            //         "200italic",
                            //         "300",
                            //         "300italic",
                            //         "regular",
                            //         "italic",
                            //         "500",
                            //         "500italic",
                            //         "600",
                            //         "600italic",
                            //         "700",
                            //         "700italic",
                            //         "800",
                            //         "800italic",
                            //         "900",
                            //         "900italic"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Exo 2",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "100",
                            //         "100italic",
                            //         "200",
                            //         "200italic",
                            //         "300",
                            //         "300italic",
                            //         "regular",
                            //         "italic",
                            //         "500",
                            //         "500italic",
                            //         "600",
                            //         "600italic",
                            //         "700",
                            //         "700italic",
                            //         "800",
                            //         "800italic",
                            //         "900",
                            //         "900italic"
                            //     ],
                            //     "version": "v3",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Expletus Sans",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "500",
                            //         "500italic",
                            //         "600",
                            //         "600italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Fanwood Text",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Fascinate",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Fascinate Inline",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Faster One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Fasthand",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Fauna One",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Federant",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Federo",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Felipa",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Fenix",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Finger Paint",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Fira Mono",
                            //     "category": "monospace",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v3",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Fira Sans",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "300",
                            //         "300italic",
                            //         "regular",
                            //         "italic",
                            //         "500",
                            //         "500italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Fjalla One",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Fjord One",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Flamenco",
                            //     "category": "display",
                            //     "variants": [
                            //         "300",
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Flavors",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Fondamento",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular",
                            //         "italic"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Fontdiner Swanky",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Forum",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Francois One",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v9",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Freckle Face",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Fredericka the Great",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Fredoka One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Freehand",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Fresca",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Frijole",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Fruktur",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Fugaz One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "GFS Didot",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "GFS Neohellenic",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Gabriela",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Gafata",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Galdeano",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Galindo",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Gentium Basic",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Gentium Book Basic",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Geo",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Geostar",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Geostar Fill",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Germania One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Gidugu",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v3",
                            //     "lastModified": "2015-04-07"
                            // },
                            // {
                            //     "family": "Gilda Display",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Give You Glory",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Glass Antiqua",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Glegoo",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Gloria Hallelujah",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Goblin One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Gochi Hand",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Gorditas",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Goudy Bookletter 1911",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Graduate",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Grand Hotel",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Gravitas One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Great Vibes",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Griffy",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Gruppo",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Gudea",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Gurajada",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-07"
                            // },
                            // {
                            //     "family": "Habibi",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Halant",
                            //     "category": "serif",
                            //     "variants": [
                            //         "300",
                            //         "regular",
                            //         "500",
                            //         "600",
                            //         "700"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-04-01"
                            // },
                            // {
                            //     "family": "Hammersmith One",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Hanalei",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Hanalei Fill",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Handlee",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Hanuman",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Happy Monkey",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Headland One",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Henny Penny",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Herr Von Muellerhoff",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Hind",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "300",
                            //         "regular",
                            //         "500",
                            //         "600",
                            //         "700"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Holtwood One SC",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Homemade Apple",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Homenaje",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "IM Fell DW Pica",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "IM Fell DW Pica SC",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "IM Fell Double Pica",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "IM Fell Double Pica SC",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "IM Fell English",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "IM Fell English SC",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "IM Fell French Canon",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "IM Fell French Canon SC",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "IM Fell Great Primer",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "IM Fell Great Primer SC",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Iceberg",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Iceland",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Imprima",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Inconsolata",
                            //     "category": "monospace",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v11",
                            //     "lastModified": "2015-05-14"
                            // },
                            // {
                            //     "family": "Inder",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Indie Flower",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Inika",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Inknut Antiqua",
                            //     "category": "serif",
                            //     "variants": [
                            //         "300",
                            //         "regular",
                            //         "500",
                            //         "600",
                            //         "700",
                            //         "800",
                            //         "900"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-06-11"
                            // },
                            // {
                            //     "family": "Irish Grover",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Istok Web",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v10",
                            //     "lastModified": "2015-06-11"
                            // },
                            // {
                            //     "family": "Italiana",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Italianno",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Jacques Francois",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Jacques Francois Shadow",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Jaldi",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v2",
                            //     "lastModified": "2015-06-10"
                            // },
                            // {
                            //     "family": "Jim Nightshade",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Jockey One",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Jolly Lodger",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Josefin Sans",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "100",
                            //         "100italic",
                            //         "300",
                            //         "300italic",
                            //         "regular",
                            //         "italic",
                            //         "600",
                            //         "600italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v9",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Josefin Slab",
                            //     "category": "serif",
                            //     "variants": [
                            //         "100",
                            //         "100italic",
                            //         "300",
                            //         "300italic",
                            //         "regular",
                            //         "italic",
                            //         "600",
                            //         "600italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Joti One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Judson",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Julee",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Julius Sans One",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-22"
                            // },
                            // {
                            //     "family": "Junge",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Jura",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "300",
                            //         "regular",
                            //         "500",
                            //         "600"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Just Another Hand",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Just Me Again Down Here",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Kadwa",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-06-17"
                            // },
                            // {
                            //     "family": "Kalam",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "300",
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Kameron",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Kantumruy",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "300",
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v3",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Karla",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Karma",
                            //     "category": "serif",
                            //     "variants": [
                            //         "300",
                            //         "regular",
                            //         "500",
                            //         "600",
                            //         "700"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Kaushan Script",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Kavoon",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Kdam Thmor",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v3",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Keania One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Kelly Slab",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Kenia",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Khand",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "300",
                            //         "regular",
                            //         "500",
                            //         "600",
                            //         "700"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Khmer",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v9",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Khula",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "300",
                            //         "regular",
                            //         "600",
                            //         "700",
                            //         "800"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Kite One",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Knewave",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Kotta One",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Koulen",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v10",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Kranky",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Kreon",
                            //     "category": "serif",
                            //     "variants": [
                            //         "300",
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v9",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Kristi",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Krona One",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Kurale",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-05-14"
                            // },
                            // {
                            //     "family": "La Belle Aurore",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Laila",
                            //     "category": "serif",
                            //     "variants": [
                            //         "300",
                            //         "regular",
                            //         "500",
                            //         "600",
                            //         "700"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-04-01"
                            // },
                            // {
                            //     "family": "Lakki Reddy",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v3",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Lancelot",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Lateef",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v10",
                            //     "lastModified": "2015-04-07"
                            // },
                            // {
                            //     "family": "Lato",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "100",
                            //         "100italic",
                            //         "300",
                            //         "300italic",
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic",
                            //         "900",
                            //         "900italic"
                            //     ],
                            //     "version": "v11",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "League Script",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Leckerli One",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Ledger",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Lekton",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Lemon",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Libre Baskerville",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Life Savers",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Lilita One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Lily Script One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Limelight",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Linden Hill",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Lobster",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v15",
                            //     "lastModified": "2015-07-21"
                            // },
                            // {
                            //     "family": "Lobster Two",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Londrina Outline",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Londrina Shadow",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Londrina Sketch",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Londrina Solid",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Lora",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v9",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Love Ya Like A Sister",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Loved by the King",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Lovers Quarrel",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Luckiest Guy",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Lusitana",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Lustria",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Macondo",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Macondo Swash Caps",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Magra",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Maiden Orange",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Mako",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Mallanna",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-07"
                            // },
                            // {
                            //     "family": "Mandali",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-07"
                            // },
                            // {
                            //     "family": "Marcellus",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Marcellus SC",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Marck Script",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Margarine",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Marko One",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Marmelad",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Martel",
                            //     "category": "serif",
                            //     "variants": [
                            //         "200",
                            //         "300",
                            //         "regular",
                            //         "600",
                            //         "700",
                            //         "800",
                            //         "900"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-04-22"
                            // },
                            // {
                            //     "family": "Martel Sans",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "200",
                            //         "300",
                            //         "regular",
                            //         "600",
                            //         "700",
                            //         "800",
                            //         "900"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-04-07"
                            // },
                            // {
                            //     "family": "Marvel",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Mate",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Mate SC",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Maven Pro",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "500",
                            //         "700",
                            //         "900"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "McLaren",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Meddon",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-08"
                            // },
                            // {
                            //     "family": "MedievalSharp",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Medula One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Megrim",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Meie Script",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Merienda",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Merienda One",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Merriweather",
                            //     "category": "serif",
                            //     "variants": [
                            //         "300",
                            //         "300italic",
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic",
                            //         "900",
                            //         "900italic"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Merriweather Sans",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "300",
                            //         "300italic",
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic",
                            //         "800",
                            //         "800italic"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Metal",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v9",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Metal Mania",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Metamorphous",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Metrophobic",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Michroma",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Milonga",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Miltonian",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Miltonian Tattoo",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v9",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Miniver",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Miss Fajardose",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Modak",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Modern Antiqua",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Molengo",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Molle",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "italic"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Monda",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Monofett",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Monoton",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Monsieur La Doulaise",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Montaga",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Montez",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Montserrat",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Montserrat Alternates",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Montserrat Subrayada",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Moul",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Moulpali",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v9",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Mountains of Christmas",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Mouse Memoirs",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Mr Bedfort",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Mr Dafoe",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Mr De Haviland",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Mrs Saint Delafield",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Mrs Sheppards",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Muli",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "300",
                            //         "300italic",
                            //         "regular",
                            //         "italic"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Mystery Quest",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "NTR",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-07"
                            // },
                            // {
                            //     "family": "Neucha",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Neuton",
                            //     "category": "serif",
                            //     "variants": [
                            //         "200",
                            //         "300",
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "800"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "New Rocker",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "News Cycle",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v13",
                            //     "lastModified": "2015-04-16"
                            // },
                            // {
                            //     "family": "Niconne",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Nixie One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Nobile",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Nokora",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v9",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Norican",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Nosifer",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Nothing You Could Do",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Noticia Text",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Noto Sans",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Noto Serif",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Nova Cut",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Nova Flat",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Nova Mono",
                            //     "category": "monospace",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Nova Oval",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Nova Round",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Nova Script",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Nova Slim",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Nova Square",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Numans",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Nunito",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "300",
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Odor Mean Chey",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Offside",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Old Standard TT",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Oldenburg",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Oleo Script",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Oleo Script Swash Caps",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Open Sans",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "300",
                            //         "300italic",
                            //         "regular",
                            //         "italic",
                            //         "600",
                            //         "600italic",
                            //         "700",
                            //         "700italic",
                            //         "800",
                            //         "800italic"
                            //     ],
                            //     "version": "v13",
                            //     "lastModified": "2015-05-18"
                            // },
                            // {
                            //     "family": "Open Sans Condensed",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "300",
                            //         "300italic",
                            //         "700"
                            //     ],
                            //     "version": "v10",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Oranienbaum",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Orbitron",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "500",
                            //         "700",
                            //         "900"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Oregano",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "italic"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Orienta",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Original Surfer",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Oswald",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "300",
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v10",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Over the Rainbow",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Overlock",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic",
                            //         "900",
                            //         "900italic"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Overlock SC",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Ovo",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Oxygen",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "300",
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Oxygen Mono",
                            //     "category": "monospace",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "PT Mono",
                            //     "category": "monospace",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "PT Sans",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "PT Sans Caption",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v9",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "PT Sans Narrow",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "PT Serif",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "PT Serif Caption",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Pacifico",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Palanquin",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "100",
                            //         "200",
                            //         "300",
                            //         "regular",
                            //         "500",
                            //         "600",
                            //         "700"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-04-22"
                            // },
                            // {
                            //     "family": "Palanquin Dark",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "500",
                            //         "600",
                            //         "700"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-04-22"
                            // },
                            // {
                            //     "family": "Paprika",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Parisienne",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Passero One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Passion One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "700",
                            //         "900"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Pathway Gothic One",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Patrick Hand",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v10",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Patrick Hand SC",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Patua One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Paytone One",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Peddana",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Peralta",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Permanent Marker",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Petit Formal Script",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Petrona",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Philosopher",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Piedra",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Pinyon Script",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Pirata One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Plaster",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Play",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Playball",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Playfair Display",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic",
                            //         "900",
                            //         "900italic"
                            //     ],
                            //     "version": "v10",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Playfair Display SC",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic",
                            //         "900",
                            //         "900italic"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Podkova",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Poiret One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Poller One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Poly",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Pompiere",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Pontano Sans",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Poppins",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "300",
                            //         "regular",
                            //         "500",
                            //         "600",
                            //         "700"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-06-03"
                            // },
                            // {
                            //     "family": "Port Lligat Sans",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Port Lligat Slab",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Pragati Narrow",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v2",
                            //     "lastModified": "2015-06-10"
                            // },
                            // {
                            //     "family": "Prata",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Preahvihear",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Press Start 2P",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Princess Sofia",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Prociono",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Prosto One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Puritan",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Purple Purse",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Quando",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Quantico",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Quattrocento",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Quattrocento Sans",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Questrial",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Quicksand",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "300",
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Quintessential",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Qwigley",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Racing Sans One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Radley",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic"
                            //     ],
                            //     "version": "v9",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Rajdhani",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "300",
                            //         "regular",
                            //         "500",
                            //         "600",
                            //         "700"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Raleway",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "100",
                            //         "200",
                            //         "300",
                            //         "regular",
                            //         "500",
                            //         "600",
                            //         "700",
                            //         "800",
                            //         "900"
                            //     ],
                            //     "version": "v9",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Raleway Dots",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Ramabhadra",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-07"
                            // },
                            // {
                            //     "family": "Ramaraja",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Rambla",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Rammetto One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Ranchers",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Rancho",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Ranga",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Rationale",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Ravi Prakash",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v3",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Redressed",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Reenie Beanie",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Revalia",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Rhodium Libre",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-06-03"
                            // },
                            // {
                            //     "family": "Ribeye",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Ribeye Marrow",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Righteous",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Risque",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Roboto",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "100",
                            //         "100italic",
                            //         "300",
                            //         "300italic",
                            //         "regular",
                            //         "italic",
                            //         "500",
                            //         "500italic",
                            //         "700",
                            //         "700italic",
                            //         "900",
                            //         "900italic"
                            //     ],
                            //     "version": "v15",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Roboto Condensed",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "300",
                            //         "300italic",
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v13",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Roboto Mono",
                            //     "category": "monospace",
                            //     "variants": [
                            //         "100",
                            //         "100italic",
                            //         "300",
                            //         "300italic",
                            //         "regular",
                            //         "italic",
                            //         "500",
                            //         "500italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-05-28"
                            // },
                            // {
                            //     "family": "Roboto Slab",
                            //     "category": "serif",
                            //     "variants": [
                            //         "100",
                            //         "300",
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Rochester",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Rock Salt",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Rokkitt",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Romanesco",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Ropa Sans",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Rosario",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v10",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Rosarivo",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Rouge Script",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Rozha One",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v2",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Rubik",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "300",
                            //         "300italic",
                            //         "regular",
                            //         "italic",
                            //         "500",
                            //         "500italic",
                            //         "700",
                            //         "700italic",
                            //         "900",
                            //         "900italic"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-07-22"
                            // },
                            // {
                            //     "family": "Rubik Mono One",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-07-22"
                            // },
                            // {
                            //     "family": "Rubik One",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-07-22"
                            // },
                            // {
                            //     "family": "Ruda",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "700",
                            //         "900"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Rufina",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Ruge Boogie",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Ruluko",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Rum Raisin",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Ruslan Display",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Russo One",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Ruthie",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Rye",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Sacramento",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Sahitya",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-06-17"
                            // },
                            // {
                            //     "family": "Sail",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Salsa",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Sanchez",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Sancreek",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Sansita One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Sarala",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-06-17"
                            // },
                            // {
                            //     "family": "Sarina",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Sarpanch",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "500",
                            //         "600",
                            //         "700",
                            //         "800",
                            //         "900"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Satisfy",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Scada",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Scheherazade",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v10",
                            //     "lastModified": "2015-04-07"
                            // },
                            // {
                            //     "family": "Schoolbell",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Seaweed Script",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Sevillana",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Seymour One",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Shadows Into Light",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Shadows Into Light Two",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Shanti",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Share",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Share Tech",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Share Tech Mono",
                            //     "category": "monospace",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-07-22"
                            // },
                            // {
                            //     "family": "Shojumaru",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Short Stack",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Siemreap",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v9",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Sigmar One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Signika",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "300",
                            //         "regular",
                            //         "600",
                            //         "700"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Signika Negative",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "300",
                            //         "regular",
                            //         "600",
                            //         "700"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Simonetta",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "900",
                            //         "900italic"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Sintony",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Sirin Stencil",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Six Caps",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Skranji",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Slabo 13px",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v3",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Slabo 27px",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v3",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Slackey",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Smokum",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Smythe",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Sniglet",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "800"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Snippet",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Snowburst One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Sofadi One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Sofia",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Sonsie One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Sorts Mill Goudy",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Source Code Pro",
                            //     "category": "monospace",
                            //     "variants": [
                            //         "200",
                            //         "300",
                            //         "regular",
                            //         "500",
                            //         "600",
                            //         "700",
                            //         "900"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Source Sans Pro",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "200",
                            //         "200italic",
                            //         "300",
                            //         "300italic",
                            //         "regular",
                            //         "italic",
                            //         "600",
                            //         "600italic",
                            //         "700",
                            //         "700italic",
                            //         "900",
                            //         "900italic"
                            //     ],
                            //     "version": "v9",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Source Serif Pro",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "600",
                            //         "700"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Special Elite",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Spicy Rice",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Spinnaker",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Spirax",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Squada One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Sree Krushnadevaraya",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Stalemate",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Stalinist One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-07-23"
                            // },
                            // {
                            //     "family": "Stardos Stencil",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Stint Ultra Condensed",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Stint Ultra Expanded",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Stoke",
                            //     "category": "serif",
                            //     "variants": [
                            //         "300",
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Strait",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Sue Ellen Francisco",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Sumana",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-05-04"
                            // },
                            // {
                            //     "family": "Sunshiney",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Supermercado One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Sura",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-06-17"
                            // },
                            // {
                            //     "family": "Suranna",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Suravaram",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v3",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Suwannaphum",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v9",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Swanky and Moo Moo",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Syncopate",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Tangerine",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Taprom",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Tauri",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Teko",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "300",
                            //         "regular",
                            //         "500",
                            //         "600",
                            //         "700"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Telex",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Tenali Ramakrishna",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v3",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Tenor Sans",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Text Me One",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "The Girl Next Door",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Tienne",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "700",
                            //         "900"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Tillana",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular",
                            //         "500",
                            //         "600",
                            //         "700",
                            //         "800"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-06-03"
                            // },
                            // {
                            //     "family": "Timmana",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-04-07"
                            // },
                            // {
                            //     "family": "Tinos",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v9",
                            //     "lastModified": "2015-04-28"
                            // },
                            // {
                            //     "family": "Titan One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Titillium Web",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "200",
                            //         "200italic",
                            //         "300",
                            //         "300italic",
                            //         "regular",
                            //         "italic",
                            //         "600",
                            //         "600italic",
                            //         "700",
                            //         "700italic",
                            //         "900"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Trade Winds",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Trocchi",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Trochut",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Trykker",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Tulpen One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Ubuntu",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "300",
                            //         "300italic",
                            //         "regular",
                            //         "italic",
                            //         "500",
                            //         "500italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Ubuntu Condensed",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Ubuntu Mono",
                            //     "category": "monospace",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Ultra",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Uncial Antiqua",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Underdog",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Unica One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "UnifrakturCook",
                            //     "category": "display",
                            //     "variants": [
                            //         "700"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "UnifrakturMaguntia",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Unkempt",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Unlock",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Unna",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "VT323",
                            //     "category": "monospace",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Vampiro One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Varela",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Varela Round",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Vast Shadow",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Vesper Libre",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "500",
                            //         "700",
                            //         "900"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-06-03"
                            // },
                            // {
                            //     "family": "Vibur",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Vidaloka",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Viga",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Voces",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Volkhov",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v8",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Vollkorn",
                            //     "category": "serif",
                            //     "variants": [
                            //         "regular",
                            //         "italic",
                            //         "700",
                            //         "700italic"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Voltaire",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Waiting for the Sunrise",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Wallpoet",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Walter Turncoat",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Warnes",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-03"
                            // },
                            // {
                            //     "family": "Wellfleet",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Wendy One",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v4",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Wire One",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Work Sans",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "100",
                            //         "200",
                            //         "300",
                            //         "regular",
                            //         "500",
                            //         "600",
                            //         "700",
                            //         "800",
                            //         "900"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-07-22"
                            // },
                            // {
                            //     "family": "Yanone Kaffeesatz",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "200",
                            //         "300",
                            //         "regular",
                            //         "700"
                            //     ],
                            //     "version": "v7",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Yantramanav",
                            //     "category": "sans-serif",
                            //     "variants": [
                            //         "100",
                            //         "300",
                            //         "regular",
                            //         "500",
                            //         "700",
                            //         "900"
                            //     ],
                            //     "version": "v1",
                            //     "lastModified": "2015-06-03"
                            // },
                            // {
                            //     "family": "Yellowtail",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Yeseva One",
                            //     "category": "display",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v9",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Yesteryear",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v5",
                            //     "lastModified": "2015-04-06"
                            // },
                            // {
                            //     "family": "Zeyada",
                            //     "category": "handwriting",
                            //     "variants": [
                            //         "regular"
                            //     ],
                            //     "version": "v6",
                            //     "lastModified": "2015-04-06"
                            // }
                        ]
        return fonts;

        };

        var _GetCategories = function () {

            var deferred = $q.defer();

            HttpService.Post("/categories", {'key':key})
                .then(function (data) {
                  
                    deferred.resolve(data);
                    return deferred.promise;
                }, function (err) {
                deferred.reject(err);
               
        });
         return deferred.promise;
    };
    var _SearchArts = function (query, page) {

            var deferred = $q.defer();

            HttpService.Post("/art_search", {'key':key, 'page':page, 'query':query })
                .then(function (data) {
                  
                    deferred.resolve(data);
                    return deferred.promise;
                }, function (err) {
                deferred.reject(err);
               
        });
         return deferred.promise;
    };

     var _LaunchCompaign = function (obj) {

            var deferred = $q.defer();
            obj.key = key;
            HttpService.Post("/save", obj)
                .then(function (data) {
                  
                    deferred.resolve(data);
                    return deferred.promise;
                }, function (err) {
                deferred.reject(err);
               
        });
         return deferred.promise;
    }
 
        var services = {

            GetGraphics: _GetGraphics,
            GetShirtStyle:_GetShirtStyle,
            GetFonts:_GetFonts,
            GetGoogleFonts:_GetGoogleFonts,
            GetColors : _GetColors,
            GetConfig: _GetConfig,
            GetSvg:_GetSvg,
            GetCategories: _GetCategories,
            SearchArts:_SearchArts,
            LaunchCompaign :_LaunchCompaign
            
   

        };
        return services;


    }




