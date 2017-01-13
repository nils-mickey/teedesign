var baseURL = "http://teedesign.ae/api";
var imageURL = "http://cdn.teedesign.ae/images/products/apparel/";
var imageURL1 = "http://d1b2zzpxewkr9z.cloudfront.net/images/products/apparel/";
var graphicsURL = "http://cdn.teedesign.ae/vectors/";
var fontsURL="http://cdn.teedesign.ae/webfonts/";
var serverURL = "http://www.teedesign.ae/";
var DashboardModule = angular.module("DashboardModule", [])
DashboardModule.controller('DashboardController', DashboardController);

DashboardController.$inject = ['$scope', '$rootScope', '$modal', '$http', '$location', '$state', 'DashboardService', 'AnimationService', '_', '$popover', '$sce', 'Upload', '$timeout','$interval','SweetAlert','hotkeys'];

function DashboardController($scope, $rootScope, $modal, $http, $location, $state, DashboardService, AnimationService, _, $popover, $sce, Upload, $timeout,$interval,SweetAlert,hotkeys) {
    //ViewModel//

    $scope.image = null
    $scope.imageFileName = ''

    var vm = this;
    vm.loadDefault = loadDefault;
    vm.activate_tab = activate_tab;
    vm.set_design_tab = set_design_tab;
    vm.selectShirt = selectShirt;
    vm.selectGraphic = selectGraphic;
    vm.setStyle = setStyle;
    vm.getValueWithoutPx = getValueWithoutPx;
    vm.fontsURL = fontsURL;
    vm.selectedGraphic = {};
    vm.rotation = false;
    vm.goal_range_max = 0;
    vm.goal_range_min = 0;
    vm.goal_target = 0;
    vm.fontsTag = [];
    vm.customImage = "";
    //vm.isFontLoaded = true;
    vm.fontList = {
        title: 'Font List',
    };
    vm.fontSelected = {
        family: 'Arial',
    }
    vm.rotation = false;
    vm.hexPicker = {
        color: ''
    };

    vm.is_zoomed = false;

    vm.other_apperals = [];

    vm.imageURL1 = imageURL1;


    vm.show_toolbar = show_toolbar;
    vm.hide_toolbar = hide_toolbar;

    vm.alert_invalid = alert_invalid;
    vm.getRandomInAnimation = getRandomInAnimations;
    vm.rotate_goal = rotate_goal;
    vm.zoom = zoom;
    vm.setColor = setColor;
    vm.loadGraphics = loadGraphics;
    vm.add_style = add_style;
    vm.is_available = is_available;
    vm.prepare_shirts = prepare_shirts;
    vm.shirts_in_styles = [];
    vm.select_extra_shirt_colors = select_extra_shirt_colors;
    vm.total_color_selected = 1;
    vm.select_extra_shirt_color = select_extra_shirt_color;
    vm.limit_full = false;
    vm.profit_array = [];
    vm.isFirefox = typeof InstallTrigger !== 'undefined';

    console.log(vm.isFirefox,"mukkkhay");



    vm.extract_tags = extract_tags;
    vm.remove_tag = remove_tag;
    vm.build_url = build_url;
    vm.validate_url = validate_url;


    vm.launch_compaign = launch_compaign;

    vm.selectedProduct = {};


    window.timeoutList = new Array();
    window.intervalList = new Array();

    window.oldSetTimeout = window.setTimeout;
    window.oldSetInterval = window.setInterval;
    window.oldClearTimeout = window.clearTimeout;
    window.oldClearInterval = window.clearInterval;

    window.setTimeout = function(code, delay) {
        var retval = window.oldSetTimeout(code, delay);
        window.timeoutList.push(retval);
        return retval;
    };
    window.clearTimeout = function(id) {
        var ind = window.timeoutList.indexOf(id);
        if(ind >= 0) {
            window.timeoutList.splice(ind, 1);
        }
        var retval = window.oldClearTimeout(id);
        return retval;
    };
    window.setInterval = function(code, delay) {

        var retval = window.oldSetInterval(code, delay);
        window.intervalList.push(retval);
        return retval;
    };
    window.clearInterval = function(id) {

        var ind = window.intervalList.indexOf(id);
        if(ind >= 0) {
            window.intervalList.splice(ind, 1);
        }
        var retval = window.oldClearInterval(id);
        return retval;
    };


    window.clearAllIntervals = function() {
        for(var i in window.intervalList) {
            window.oldClearInterval(window.intervalList[i]);
        }
        window.intervalList = new Array();
    };

    function Alert(message, heading){

        if(!heading){
            heading = "Hang on!";
        }

        SweetAlert.swal({
            title: heading,
            text: message,
            type: 'info',
            showCancelButton: false,
            closeOnConfirm: true,
            disableButtonsOnConfirm: true,
            animation: 'animated fadeInRightBig',
            confirmLoadingButtonColor: '#DD6B55'
        });


    }

    $scope.$watchCollection('vm.front_design', function () {
        vm.flipX = false;
        vm.flipY = false;
    })

    $scope.$watchCollection('vm.back_design', function () {
        vm.flipX = false;
        vm.flipY = false;
    })

    $scope.$watchCollection('vm.left_design', function () {
        vm.flipX = false;
        vm.flipY = false;
    })

    $scope.$watchCollection('vm.right_design', function () {
        vm.flipX = false;
        vm.flipY = false;
    })



    function outsideCollision($div1, $div2,z,side) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        //   var h1 = $div1.outerHeight(true);
        //   var w1 = $div1.outerWidth(true);

        var w1 =document.querySelector("#box"+z+side+" svg").getBoundingClientRect().width;
        var h1 =document.querySelector("#box"+z+side+" svg").getBoundingClientRect().height;


        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = document.querySelector(".printable-area").getBoundingClientRect().height;
        var w2 = document.querySelector(".printable-area").getBoundingClientRect().width;
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }

    vm.offsetCollection = [];
    function collision($div1, $div2,z,side) {
        if(!($div1 || $div2 || z || side)) return;
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        // var h1 = $div1.outerHeight(true);
        // var w1 = $div1.outerWidth(true);
        var w1 =document.querySelector("#box"+z+side+" svg").getBoundingClientRect().width;
        var h1 =document.querySelector("#box"+z+side+" svg").getBoundingClientRect().height;
      //  console.log(w1, h1);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        //console.log($div2[0].className);
        var h2 = document.querySelector(".printable-area").getBoundingClientRect().height;
        var w2 = document.querySelector(".printable-area").getBoundingClientRect().width;
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        //console.log(w2,z,side,"#box"+z+side);

        // Left ((r1 - w1) < x2)
        // Bottom (y1 > (b2 - h1))
        // Top ((b1 - h1) < y2)
        // Right (x1 > (r2 - w1))

        //console.log(x1, r2, w1,r2-w1);

        //y1>=2 b1- < y2 || y1 > (b2-h1) || r1 < x2 || x1 > r2
        if (((b1 - h1) < y2) || (y1 > (b2 - h1)) || ((r1 - w1) < x2) || (x1 > (r2 - w1))) return false;
        return true;
    }



    // window.setInterval(function() {
    // 	if(!collision($('#test1'), $('#test2'))){
    //          $('.printable-area').addClass('crossing_border');
    // 	}
    // 	else $('.printable-area').removeClass('crossing_border');
    // }, 200);


    function getRotationDegrees(obj) {
        var matrix = obj.css("-webkit-transform") ||
            obj.css("-moz-transform") ||
            obj.css("-ms-transform") ||
            obj.css("-o-transform") ||
            obj.css("transform");
        if (matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        } else { var angle = 0; }
        return (angle < 0) ? angle + 360 : angle;
    }





    function launch_compaign() {
        //  debugger;
        if(vm.front_design.length + vm.back_design.length + vm.right_design.length + vm.left_design.length <=0){
            Alert("Please design at least one side before you launch.","Warning");
            return;
        }

        if (vm.front_design.length || vm.back_design.length || vm.right_design.length || vm.left_design.length) {
            var to_be_sent = [];
            var shirts = _.where(vm.shirts_in_styles, { selected: true });
            for (var i = 0; i < shirts.length; i++) {
                to_be_sent[i] = {};
                to_be_sent[i].id = shirts[i].id;
                to_be_sent[i].price = shirts[i].total_unit_cost + shirts[i].profit;

                var colors = _.where(shirts[i].colors_available, { selected: true });
                var clr_ids = [];
                for (var j = 0; j < colors.length; j++) {
                    clr_ids.push(colors[j].color_id);
                }
                //  debugger;
                to_be_sent[i].colors = clr_ids;
                to_be_sent[i].profit = shirts[i].profit;
                //id price colors


            }
            var defaultProduct = {};
            defaultProduct.id = vm.selectedShirt.id;
            var clrs_default = [];
            for (var i = 0; i < vm.selectedShirt.colors_available.length; i++) {
                var color = vm.selectedShirt.colors_available[i];
                if (color.selected)
                    clrs_default.push(color.color_id);


            }
            var tags_arr = "";
            for (var i = 0; i < vm.tags.length - 1; i++) {

                tags_arr = tags_arr + vm.tags[i] + ",";

            }

            tags_arr += vm.tags[vm.tags.length - 1];
            //  tags_arr=tags_arr.substr(0,tags_arr.length-1);
            defaultProduct.colors = clrs_default;
            // debugger;
            // var days = Number(vm.compaign_length.trim().substr(0, 1));
            // var compaign_json = new FormData();
            // compaign_json.append("name",vm.compaign_title);
            // compaign_json.append("url",vm.url);
            // compaign_json.append("description",$scope.htmlcontenttwo);
            // compaign_json.append("length",days);
            // compaign_json.append("products",to_be_sent);
            // compaign_json.append("defaultProduct",defaultProduct);
            // compaign_json.append("tags",tags_arr);
            // compaign_json.append("category_id",vm.description.category);

            var compaign_json = {};
            compaign_json.name = vm.compaign_title;
            compaign_json.url = vm.url;
            // compaign_json.description = vm.desc;
            // compaign_json.description = $scope.desc;
            compaign_json.description = (($scope.desc) ? $scope.desc : '');
            compaign_json.length = vm.compaign_length;
            compaign_json.products = JSON.stringify(to_be_sent);
            compaign_json.defaultProduct = JSON.stringify(defaultProduct);
            compaign_json.tags = JSON.stringify(tags_arr);
            compaign_json.category_id = vm.description.category;
            compaign_json.tipping_point = vm.goal_target;

            console.log("jskldfjklasdf", compaign_json.description);

            var sides = [];
            var activeSide = vm.default_tab === 1 ? "front" : vm.default_tab === 2 ? "back" : vm.default_tab === 3 ? "left" : "right";
            // var front = $("#box1front");
            // var svg = front.find('svg');
            // var view = svg[0].getAttributeNS(null, 'viewBox');
            // var arr = view.split(' ');
            var counter = 0;



            for (var i = 0; i < 4; i++) {

                if (i == 0) {


                    var printableAreaWidthWithoutPX = $('.printable-area').css('width').substr(0, $('.printable-area').css('width').length - 2);
                    var printableAreaHeightWithoutPX = $('.printable-area').css('height').substr(0, $('.printable-area').css('height').length - 2);
                    console.log(printableAreaWidthWithoutPX);

                    console.log(printableAreaHeightWithoutPX);
                    var svgParent = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    //svgParent.setAttribute('style', 'border: 1px solid black');
                    svgParent.setAttribute('width', vm.selectedShirt.printable_front_width);
                    svgParent.setAttribute('height', vm.selectedShirt.printable_front_height);
                    svgParent.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
                    svgParent.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
                    svgParent.setAttributeNS(null, 'viewBox', '0 0 ' + vm.selectedShirt.printable_front_width + ' ' + vm.selectedShirt.printable_front_height);

                    //  var svgimg = document.createElementNS('http://www.w3.org/2000/svg','image');
                    //                 svgimg.setAttributeNS('http://www.w3.org/2000/svg','height','100');
                    //                 svgimg.setAttributeNS('http://www.w3.org/2000/svg','width','100');
                    //                 svgimg.setAttributeNS('http://www.w3.org/1999/xlink','href','http://i.imgur.com/LQIsf.jpg');
                    //                 svgimg.setAttributeNS('http://www.w3.org/2000/svg','x','0');
                    //                 svgimg.setAttributeNS('http://www.w3.org/2000/svg','y','0');


                    var layers = [];
                    for (var j = 0; j < vm.front_design.length; j++) {
                        $('#box' + vm.front_design[j].z_index + "front");
                        var element = $('#box' + vm.front_design[j].z_index + "front");
                        var pipe = j == 0 ? "||" : "";
                        // svgText += _.escape(element.prop('outerHTML')) + pipe;

                        //element.find('svg')[0].removeAttribute("style");
                        //    svgText = element.find('image')[0].outerHTML;
                        //    svgText = svgText.replace(/\r?\n|\r/g,' ');
                        //    svgText = svgText.replace(/\t/g,'');


                        //    svgText = svgText.replace(/\r?\n|\r/g,' ');
                        //    svgText = svgText.replace(/\t/g,'');
                        // console.log(element.find('svg')[0].outerHTML);
                    }

                    for (var k = 0; k < vm.front_design.length; k++) {
                        if (vm.front_design[k].type === 'text') {
                            var obj_ = vm.front_design[k];
                            console.log(vm.front_design[k].z_index);
                            //  var _obj = _.findWhere(vm.graphics, {id:obj_.id});
                            var element = $('#box' + vm.front_design[k].z_index + "front");
                            var svg = element.children('svg')[0];
                            var view = svg.getAttributeNS(null, 'viewBox');
                            var arr = view.split(' ');


                            var element1 = $('#box' + vm.front_design[k].z_index + "front svg");
                            var svg1 = element.children('svg')[0];
                            var view1 = svg.getAttributeNS(null, 'viewBox');
                            var arr1 = view.split(' ');

                            var left = parseInt(element.css('left')) || 136;
                            var top = parseInt(element.css('top')) || 67;




                            var innerSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                            innerSvg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
                            innerSvg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
                            innerSvg.setAttributeNS(null, 'width', parseFloat(element.css('width')));
                            innerSvg.setAttributeNS(null, 'height', parseFloat(element.css('height')));
                            innerSvg.setAttributeNS(null, 'preserveAspectRatio', "none");
                            innerSvg.setAttributeNS(null, 'x', left);
                            innerSvg.setAttributeNS(null, 'y', top);
                            innerSvg.setAttributeNS(null, 'viewBox', '0 0 ' + arr1[2] + ' ' + arr1[3]);

                            // console.log(innerSvg);
                            var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                            // g.setAttributeNS('http://www.w3.org/2000/svg','transform',$('#box' + vm.front_design[k].z_index + "front").css('transform'));


                            if (vm.front_design.length) {

                                var tranformText = element.prop('outerHTML');
                                tranformText = tranformText.substr(tranformText.indexOf('transform'), 85);
                                if (tranformText !== ">") {
                                    tranformText = tranformText.substr(tranformText.indexOf('('), tranformText.indexOf(');'));
                                    var regExp = /\(([^)]+)\)/;
                                    var matches = regExp.exec(tranformText);
                                    tranformText = matches[1];
                                    tranformText = tranformText.substr(0, tranformText.length - 3);

                                    var deg = (parseFloat(tranformText) * (180 / Math.PI));
                                    var cx = parseFloat($('#box' + vm.front_design[k].z_index + "front svg").css('width')) / 2;
                                    var cy = parseFloat($('#box' + vm.front_design[k].z_index + "front svg").css('height')) / 2;

                                    cx = cx + parseFloat(element.css('left'));
                                    cy = cy + parseFloat(element.css('top'));

                                    var rotation = "rotate(" + deg + "," + cx + "," + cy + ")";


                                    console.log(rotation);

                                    g.setAttributeNS('http://www.w3.org/2000/svg', 'transform', rotation);
                                }
                            }


                            var svgText;

                            svgText = $('#box' + vm.front_design[k].z_index + "front text").clone()[0];


                            console.log(svgText);


                            // svgText.children[0].setAttributeNS(null, 'width', parseInt(element.css('width')));
                            // svgText.children[0].setAttributeNS(null, 'height', parseInt(element.css('height')));

                            if (!obj_.transform)
                                obj_.transform = 'translate(0, 0) scale(1,1)';

                            g.appendChild(innerSvg);
                            var flipG = document.createElementNS("http://www.w3.org/2000/svg", "g");
                            flipG.setAttributeNS('http://www.w3.org/2000/svg', 'transform', obj_.transform);

                            innerSvg.appendChild(flipG);
                            flipG.appendChild(svgText)
                            svgParent.appendChild(g);

                            // g.appendChild(innerSvg);
                            // innerSvg.appendChild(svgText);
                            //svgParent.appendChild(g);


                            var textObj = {
                                "string": vm.front_design[k].text,
                                font: {
                                    id: k,
                                    family: vm.front_design[k].font,
                                    filename: vm.front_design[k].font,
                                    tags: [],
                                    priority: 1,
                                    url: null
                                },
                                fontSize: 24,
                                tag: "Popular",
                                lineHeight: 1.2,
                                alignment: "center",
                                colors: obj_.color,
                                outlineThickness: 0,
                                transformations: [],
                                matrix: {},
                                beingEdited: false,
                                origin: "Native",
                                type: "Text",
                                bbox: {
                                    x: parseInt(arr[0]),
                                    y: parseInt(arr[1]),
                                    width: parseInt(arr[2]),
                                    height: parseInt(arr[3]),
                                },
                                filename: "",
                                "preserve-colors": false,
                                fillColor: {
                                    id: k,
                                    value: vm.front_design[k].color,
                                    origin: null,
                                    heather: false,
                                    texture: "",
                                },
                                outlineColor: {
                                    id: "default" + k,
                                    value: "#000000",
                                    origin: null,
                                    heather: false,
                                    texture: "",
                                },
                                newDesignData: {
                                    transform: {

                                    }
                                }

                            }

                            layers.push(textObj);
                        }

                        if (vm.front_design[k].type === "svg" || vm.front_design[k].type === "img") {

                            counter++;

                            var element = $('#box' + vm.front_design[k].z_index + "front");
                            var svgText;

                            var obj_ = vm.front_design[k];
                            //  var tranformText = element.prop('outerHTML');
                            // tranformText = tranformText.substr(tranformText.indexOf('transform'),85);
                            // tranformText = tranformText.substr(tranformText.indexOf('('),tranformText.indexOf(');'));
                            // var regExp = /\(([^)]+)\)/;
                            // var matches = regExp.exec(tranformText);
                            // tranformText = matches[1];
                            // tranformText = tranformText.substr(0,tranformText.length-3);

                            // var deg = (parseFloat(tranformText)*(180/Math.PI));

                            // var rotation = "rotate("+deg+",)";


                            // console.log(rotation);



                            svgText = element.find('image').clone()[0];

                            var g = document.createElementNS("http://www.w3.org/2000/svg", "g");




                            if (vm.front_design.length) {

                                var tranformText = element.prop('outerHTML');

                                tranformText = tranformText.substr(tranformText.indexOf('transform: r'), 85);

                                if (tranformText !== ">") {
                                    tranformText = tranformText.substr(tranformText.indexOf('('), tranformText.indexOf(');'));
                                    var regExp = /\(([^)]+)\)/;
                                    var matches = regExp.exec(tranformText);
                                    tranformText = matches[1];
                                    tranformText = tranformText.substr(0, tranformText.length - 3);

                                    var deg = (parseFloat(tranformText) * (180 / Math.PI));
                                    var cx = parseFloat($('#box' + vm.front_design[k].z_index + "front svg").css('width')) / 2;
                                    var cy = parseFloat($('#box' + vm.front_design[k].z_index + "front svg").css('height')) / 2;

                                    cx = cx + parseFloat(element.css('left'));
                                    cy = cy + parseFloat(element.css('top'));

                                    var rotation = "rotate(" + deg + "," + cx + "," + cy + ")";
                                    console.log(rotation);

                                    g.setAttributeNS('http://www.w3.org/2000/svg', 'transform', rotation);
                                }
                            }


                            // console.log(svgText);
                            var left = parseFloat(element.css('left')) || 30;
                            var top = parseFloat(element.css('top')) || 30;

                            //var element1 = $('#box' + vm.front_design[k].z_index + "front svg");
                            //var svg1 = element.children('svg')[0];
                            //var view1 = svg1.getAttributeNS(null, 'viewBox');
                            //var arr1 = view1.split(' ');

                            var innerSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                            innerSvg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
                            innerSvg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
                            innerSvg.setAttributeNS(null, 'width', parseFloat(element.css('width')));
                            innerSvg.setAttributeNS(null, 'height', parseFloat(element.css('height')));
                            innerSvg.setAttributeNS(null, 'preserveAspectRatio', "none");
                            innerSvg.setAttributeNS(null, 'x', left);
                            innerSvg.setAttributeNS(null, 'y', top);
                            // innerSvg.setAttributeNS(null, 'viewBox', '0 ' + +arr1[1] + ' ' + arr1[2] + ' ' + arr1[3]);

                            //console.log(arr1);

                            //svgText.setAttributeNS(null, 'x', left);
                            //svgText.setAttributeNS(null, 'y', top);
                            svgText.setAttributeNS(null, 'width', parseFloat($('#box' + vm.front_design[k].z_index + "front svg").css('width')));
                            svgText.setAttributeNS(null, 'height', parseFloat($('#box' + vm.front_design[k].z_index + "front svg").css('height')));
                            svgText.setAttributeNS(null, 'y', 0);

                            //console.log("x",parseFloat(element.css('left')));
                            //console.log("y",parseFloat(element.css('top')));
                            //console.log("width",parseFloat($('#box' + vm.front_design[k].z_index + "front svg").css('width')));
                            //console.log("height",parseFloat($('#box' + vm.front_design[k].z_index + "front svg").css('height')));


                            if (!obj_.transform)
                                obj_.transform = 'translate(0, 0) scale(1,1)';

                            var flipG = document.createElementNS("http://www.w3.org/2000/svg", "g");
                            flipG.setAttributeNS('http://www.w3.org/2000/svg', 'transform', obj_.transform);


                            g.appendChild(innerSvg);
                            innerSvg.appendChild(flipG);
                            flipG.appendChild(svgText);
                            svgParent.appendChild(g);
                            //  $('#global')[0].appendChild(oldSvg);
                            //console.log(svgParent).prop('html');

                            var obj_ = vm.front_design[k];
                            var _obj = _.findWhere(vm.graphics, { id: obj_.id });
                             var n = obj_.src.lastIndexOf("/")+1;
                            var fileName = obj_.src.substring(n,obj_.src.length);
                            var element = $('#box' + vm.front_design[k].z_index + "front");
                            var svg = element.find('svg');
                            var view = svg[0].getAttributeNS(null, 'viewBox');
                            var arr = view.split(' ');

                            var svgObj = {
                                "urlParams": {
                                    "filename": ""
                                },
                                name: "",
                                format: "",
                                "original_key": "",
                                sourceFilename: "",
                                svg_key: "",
                                png_key: "",
                                category: [],

                                uploadId: null,
                                initialScale: 1,
                                transformations: [],
                                matrix: {},
                                beingEdited: false,
                                origin: "Native",
                                type: "Art",
                                bbox: {
                                    x: parseInt(arr[0]),
                                    y: parseInt(arr[1]),
                                    width: parseInt(arr[2]),
                                    height: parseInt(arr[3]),
                                },
                                filename: fileName,
                                "preserve-colors": false,
                                fillColor: {
                                    id: k,
                                    value: vm.front_design[k].color,
                                    origin: null,
                                    heather: false,
                                    texture: "",
                                },
                                outlineColor: {
                                    id: "default" + k,
                                    value: "#000000",
                                    origin: null,
                                    heather: false,
                                    texture: "",
                                },
                                newDesignData: {
                                    transform: {

                                    }
                                }

                            }

                            if (vm.front_design[k].type === "svg") {
                                svgObj.colors = _obj.colors;
                            }

                            layers.push(svgObj);

                        }
                    }

                    console.log(svgParent);

                    svgParent = svgParent.outerHTML;
                    // svgParent = svgParent.replace(/\r?\n|\r/g, ' ');
                    // svgParent = svgParent.replace(/\t/g, '');
                    console.log(svgParent);



                    var front = {
                        removeLayerBinding: {},
                        name: "front",
                        layers: layers,
                        colors: vm.total_front_colors,


                        beingViewed: false,
                        initialFreeTransformAttrs: null,
                        initialPrintableArea: null,
                        referencePoint: {},
                        ppi: 18,
                        editable: null,
                        sequence: 2,
                        // priorPrintableBox: parseInt(arr[0]) + "," + $("#box1front").parent().parent().parent().css('top').substr(0, $("#box1front").parent().parent().parent().css('top').length - 2) + "," + parseInt(arr[2]) + ",240",
                        scaleAndMove: null,
                        rasterImageInfo: [],
                        svg: svgParent

                    }

                    if (vm.front_design.length) {
                        front.bbox = {
                            x: parseInt(arr[0]),
                            y: parseInt(arr[1]),
                            width: parseInt(arr[2]),
                            height: parseInt(arr[3]),
                        };
                        front.absoluteBBox = {
                            x: parseInt(arr[0]),
                            y: parseInt(arr[1]),
                            width: parseInt(arr[2]),
                            height: parseInt(arr[3]),
                        }

                    }


                    console.log(front);

                    sides.push(front);
                    //  console.log(front);

                }

                if (i == 1) {

                    var printableAreaWidthWithoutPX = $('.printable-area').css('width').substr(0, $('.printable-area').css('width').length - 2);
                    var printableAreaHeightWithoutPX = $('.printable-area').css('height').substr(0, $('.printable-area').css('height').length - 2);

                    var svgParent1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    //svgParent1.setAttribute('style', 'border: 1px solid black');
                    svgParent1.setAttribute('width', vm.selectedShirt.printable_back_width);
                    svgParent1.setAttribute('height', vm.selectedShirt.printable_back_height);
                    svgParent1.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
                    svgParent1.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
                    svgParent1.setAttributeNS(null, 'viewBox', '0 0 ' + vm.selectedShirt.printable_back_width + ' ' + vm.selectedShirt.printable_back_height);

                    var layers = [];
                    for (var j = 0; j < vm.back_design.length; j++) {
                        var element = $('#box' + vm.back_design[j].z_index + "back");
                        var pipe = j == 0 ? "||" : "";
                        // svgText += _.escape(element.prop('outerHTML')) + pipe;

                        //    element.find('svg')[0].removeAttribute("style");
                        //    svgText = element.find('svg')[0].outerHTML;
                        //    svgText = svgText.replace(/\r?\n|\r/g,' ');
                        //    svgText = svgText.replace(/\t/g,'');
                    }

                    for (var k = 0; k < vm.back_design.length; k++) {
                        if (vm.back_design[k].type === 'text') {

                            var obj_ = vm.back_design[k];
                            // var _obj = _.findWhere(vm.graphics, {id:obj_.id});
                            var element = $('#box' + vm.back_design[k].z_index + "back");
                            var svg = element.children('svg')[0];
                            var view = svg.getAttributeNS(null, 'viewBox');
                            var arr = view.split(' ');


                            var element1 = $('#box' + vm.back_design[k].z_index + "back svg");
                            var svg1 = element.children('svg')[0];
                            var view1 = svg.getAttributeNS(null, 'viewBox');
                            var arr1 = view.split(' ');

                            var left = parseFloat(element.css('left')) || 0;
                            var top = parseFloat(element.css('top')) || 0;


                            var innerSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                            innerSvg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
                            innerSvg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
                            innerSvg.setAttributeNS(null, 'preserveAspectRatio', "none");
                            innerSvg.setAttributeNS(null, 'width', parseFloat(element.css('width')));
                            innerSvg.setAttributeNS(null, 'height', parseFloat(element.css('height')));
                            innerSvg.setAttributeNS(null, 'x', left);
                            innerSvg.setAttributeNS(null, 'y', top);
                            innerSvg.setAttributeNS(null, 'viewBox', '0 0 ' + arr1[2] + ' ' + arr1[3]);

                            // console.log(innerSvg);
                            var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                            // g.setAttributeNS('http://www.w3.org/2000/svg','transform',$('#box' + vm.front_design[k].z_index + "front").css('transform'));


                            if (vm.back_design.length) {

                                var tranformText = element.prop('outerHTML');
                                tranformText = tranformText.substr(tranformText.indexOf('rotate('), 85);
                                if (tranformText !== ">") {
                                    tranformText = tranformText.substr(tranformText.indexOf('('), tranformText.indexOf(');'));
                                    var regExp = /\(([^)]+)\)/;
                                    var matches = regExp.exec(tranformText);
                                    tranformText = matches[1];
                                    tranformText = tranformText.substr(0, tranformText.length - 3);

                                    var deg = (parseFloat(tranformText) * (180 / Math.PI));
                                    var cx = parseFloat($('#box' + vm.back_design[k].z_index + "back svg").css('width')) / 2;
                                    var cy = parseFloat($('#box' + vm.back_design[k].z_index + "back svg").css('height')) / 2;

                                    cx = cx + parseFloat(element.css('left'));
                                    cy = cy + parseFloat(element.css('top'));

                                    var rotation = "rotate(" + deg + "," + cx + "," + cy + ")";


                                    console.log(rotation);

                                    g.setAttributeNS('http://www.w3.org/2000/svg', 'transform', rotation);
                                }
                            }

                            var svgText;

                            svgText = $('#box' + vm.back_design[k].z_index + "back text").clone()[0];

                            if (!obj_.transform)
                                obj_.transform = 'translate(0, 0) scale(1,1)';

                            g.appendChild(innerSvg);
                            var flipG = document.createElementNS("http://www.w3.org/2000/svg", "g");
                            flipG.setAttributeNS('http://www.w3.org/2000/svg', 'transform', obj_.transform);

                            innerSvg.appendChild(flipG);
                            flipG.appendChild(svgText)
                            svgParent1.appendChild(g);


                            console.log(svgText);

                            //g.appendChild(innerSvg);
                            //innerSvg.appendChild(svgText);






                            // svgText.children[0].setAttributeNS(null, 'x', left);
                            // svgText.children[0].setAttributeNS(null, 'y', top);
                            // svgText.children[0].setAttributeNS(null, 'width', parseInt(element.css('width')));
                            // svgText.children[0].setAttributeNS(null, 'height', parseInt(element.css('height')));
                            svgParent1.appendChild(g);

                            var textObj = {
                                "string": vm.back_design[k].text,
                                font: {
                                    id: k,
                                    family: vm.back_design[k].font,
                                    filename: vm.back_design[k].font,
                                    tags: [],
                                    priority: 1,
                                    url: null
                                },
                                fontSize: 24,
                                tag: "Popular",
                                lineHeight: 1.2,
                                alignment: "center",
                                colors: obj_.color,
                                outlineThickness: 0,
                                transformations: [],
                                matrix: {},
                                beingEdited: false,
                                origin: "Native",
                                type: "Text",
                                bbox: {
                                    x: parseInt(arr[0]),
                                    y: parseInt(arr[1]),
                                    width: parseInt(arr[2]),
                                    height: parseInt(arr[3]),
                                },
                                filename: "",
                                "preserve-colors": false,
                                fillColor: {
                                    id: k,
                                    value: vm.back_design[k].color,
                                    origin: null,
                                    heather: false,
                                    texture: "",
                                },
                                outlineColor: {
                                    id: "default" + k,
                                    value: "#000000",
                                    origin: null,
                                    heather: false,
                                    texture: "",
                                },
                                newDesignData: {
                                    transform: {

                                    }
                                }

                            }

                            layers.push(textObj);
                        }

                        if (vm.back_design[k].type === "svg" || vm.back_design[k].type === "img") {

                            var element = $('#box' + vm.back_design[k].z_index + "back");
                            var svgText;
                            var obj_ = vm.back_design[k];


                            svgText = element.find('image').clone()[0];


                            var g = document.createElementNS("http://www.w3.org/2000/svg", "g");



                            // console.log($('#box' + vm.back_design[k].z_index + "back").prop('outerHTML'));

                            if (vm.back_design.length) {

                                var tranformText = $('#box' + vm.back_design[k].z_index + "back").prop('outerHTML');
                                tranformText = tranformText.substr(tranformText.indexOf('rotate('), 85);
                                if (tranformText !== ">") {
                                    tranformText = tranformText.substr(tranformText.indexOf('('), tranformText.indexOf(');'));
                                    console.log(tranformText);
                                    var regExp = /\(([^)]+)\)/;



                                    var matches = regExp.exec(tranformText);

                                    tranformText = matches[1];
                                    tranformText = tranformText.substr(0, tranformText.length - 3);

                                    var deg = (parseFloat(tranformText) * (180 / Math.PI));
                                    var cx = parseFloat($('#box' + vm.back_design[k].z_index + "back svg").css('width')) / 2;
                                    var cy = parseFloat($('#box' + vm.back_design[k].z_index + "back svg").css('height')) / 2;

                                    cx = cx + parseFloat(element.css('left'));
                                    cy = cy + parseFloat(element.css('top'));

                                    var rotation = "rotate(" + deg + "," + cx + "," + cy + ")";


                                    console.log(rotation);

                                    g.setAttributeNS('http://www.w3.org/2000/svg', 'transform', rotation);
                                }
                            }




                            var left = parseFloat(element.css('left')) || 0;
                            var top = parseFloat(element.css('top')) || 0;

                            var innerSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                            innerSvg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
                            innerSvg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
                            innerSvg.setAttributeNS(null, 'preserveAspectRatio', "none");
                            innerSvg.setAttributeNS(null, 'width', parseFloat(element.css('width')));
                            innerSvg.setAttributeNS(null, 'height', parseFloat(element.css('height')));
                            innerSvg.setAttributeNS(null, 'x', left);
                            innerSvg.setAttributeNS(null, 'y', top);

                            //svgText.setAttributeNS(null, 'x', left);
                            //svgText.setAttributeNS(null, 'y', top);
                            svgText.setAttributeNS(null, 'width', parseInt($('#box' + vm.back_design[k].z_index + "back svg").css('width')));
                            svgText.setAttributeNS(null, 'height', parseInt($('#box' + vm.back_design[k].z_index + "back svg").css('height')));
                            svgText.setAttributeNS(null, 'y', 0);

                            if (!obj_.transform)
                                obj_.transform = 'translate(0, 0) scale(1,1)';

                            var flipG = document.createElementNS("http://www.w3.org/2000/svg", "g");
                            flipG.setAttributeNS('http://www.w3.org/2000/svg', 'transform', obj_.transform);


                            g.appendChild(innerSvg);
                            innerSvg.appendChild(flipG);
                            flipG.appendChild(svgText);
                            svgParent1.appendChild(g);

                            // console.log(svgText);
                            //g.appendChild(svgText);
                            //svgParent1.appendChild(g);


                            var obj_ = vm.back_design[k];
                            var _obj = _.findWhere(vm.graphics, { id: obj_.id });
                             var n = obj_.src.lastIndexOf("/")+1;
                            var fileName = obj_.src.substring(n,obj_.src.length);
                            //   debugger;
                            var element = $('#box' + vm.back_design[k].z_index + "back");
                            var svg = element.find('svg');
                            var view = svg[0].getAttributeNS(null, 'viewBox');
                            var arr = view.split(' ');
                            var svgObj = {
                                "urlParams": {
                                    "filename": ""
                                },
                                name: "",
                                format: "",
                                "original_key": "",
                                sourceFilename: "",
                                svg_key: "",
                                png_key: "",
                                category: [],

                                uploadId: null,
                                initialScale: 1,
                                transformations: [],
                                matrix: {},
                                beingEdited: false,
                                origin: "Native",
                                type: "Art",
                                bbox: {
                                    x: parseInt(arr[0]),
                                    y: parseInt(arr[1]),
                                    width: parseInt(arr[2]),
                                    height: parseInt(arr[3]),
                                },
                                filename: fileName,
                                "preserve-colors": false,
                                fillColor: {
                                    id: k,
                                    value: vm.back_design[k].color,
                                    origin: null,
                                    heather: false,
                                    texture: "",
                                },
                                outlineColor: {
                                    id: "default" + k,
                                    value: "#000000",
                                    origin: null,
                                    heather: false,
                                    texture: "",
                                },
                                newDesignData: {
                                    transform: {

                                    }
                                }

                            }

                            if (vm.back_design[k].type === "svg") {
                                svgObj.colors = _obj.colors
                            }

                            layers.push(svgObj);

                        }
                    }

                    console.log(svgParent1);

                    var $this = $(svgParent1);
                    //  console.log($this.get(0).html());
                    svgParent1 = $this.outerHTML();
                    // svgParent1 = svgParent1.replace(/\r?\n|\r/g, ' ');
                    // svgParent1 = svgParent1.replace(/\t/g, '');
                    console.log(svgParent1);


                    var back = {
                        removeLayerBinding: {},
                        name: "back",
                        layers: layers,
                        colors: vm.total_back_colors,

                        beingViewed: false,
                        initialFreeTransformAttrs: null,
                        initialPrintableArea: null,
                        referencePoint: {},
                        ppi: 18,
                        editable: null,
                        sequence: 2,
                        // priorPrintableBox: parseInt(arr[0]) + "," + $("#box1back").parent().parent().parent().css('top').substr(0, $("#box1back").parent().parent().parent().css('top').length - 2) + "," + parseInt(arr[2]) + ",240",
                        scaleAndMove: null,
                        rasterImageInfo: [],
                        svg: svgParent1

                    }

                    if (vm.back_design.length) {
                        back.bbox = {
                            x: parseInt(arr[0]),
                            y: parseInt(arr[1]),
                            width: parseInt(arr[2]),
                            height: parseInt(arr[3]),
                        };
                        back.absoluteBBox = {
                            x: parseInt(arr[0]),
                            y: parseInt(arr[1]),
                            width: parseInt(arr[2]),
                            height: parseInt(arr[3]),
                        };
                        // back.svg= svgParent1
                    }

                    sides.push(back);

                }

                if (i == 2) {

                    var svgParent2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    // svgParent2.setAttribute('style', 'border: 1px solid black');
                    svgParent2.setAttribute('width', vm.selectedShirt.printable_left_width);
                    svgParent2.setAttribute('height', vm.selectedShirt.printable_left_height);
                    svgParent2.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
                    svgParent2.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");

                    svgParent2.setAttributeNS(null, 'viewBox', '0 0 ' + vm.selectedShirt.printable_left_width + ' ' + vm.selectedShirt.printable_left_height);
                    var layers = [];
                    for (var j = 0; j < vm.left_design.length; j++) {
                        var element = $('#box' + vm.left_design[j].z_index + "left");
                        var pipe = j == 0 ? "||" : "";
                        //svgText += _.escape(element.prop('outerHTML')) + pipe;

                        //    element.find('svg')[0].removeAttribute("style");
                        //    svgText = element.find('svg')[0].outerHTML;
                        //    svgText = svgText.replace(/\r?\n|\r/g,' ');
                        //    svgText = svgText.replace(/\t/g,'');
                    }

                    for (var k = 0; k < vm.left_design.length; k++) {
                        if (vm.left_design[k].type === 'text') {

                            var obj_ = vm.left_design[k];
                            // var _obj = _.findWhere(vm.graphics, {id:obj_.id});
                            var element = $('#box' + vm.left_design[k].z_index + "left");
                            var svg = element.children('svg')[0];
                            var view = svg.getAttributeNS(null, 'viewBox');
                            var arr = view.split(' ');

                            var element1 = $('#box' + vm.left_design[k].z_index + "left svg");
                            var svg1 = element.children('svg')[0];
                            var view1 = svg.getAttributeNS(null, 'viewBox');
                            var arr1 = view.split(' ');

                            var left = parseFloat(element.css('left')) || 0;
                            var top = parseFloat(element.css('top')) || 0;


                            var innerSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                            innerSvg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
                            innerSvg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
                            innerSvg.setAttributeNS(null, 'preserveAspectRatio', "none");
                            innerSvg.setAttributeNS(null, 'width', parseFloat(element.css('width')));
                            innerSvg.setAttributeNS(null, 'height', parseFloat(element.css('height')));

                            innerSvg.setAttributeNS(null, 'x', left);
                            innerSvg.setAttributeNS(null, 'y', top);
                            innerSvg.setAttributeNS(null, 'viewBox', '0 0 ' + arr1[2] + ' ' + arr1[3]);

                            // console.log(innerSvg);
                            var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                            // g.setAttributeNS('http://www.w3.org/2000/svg','transform',$('#box' + vm.front_design[k].z_index + "front").css('transform'));


                            if (vm.left_design.length) {

                                var tranformText = element.prop('outerHTML');
                                tranformText = tranformText.substr(tranformText.indexOf('rotate('), 85);
                                if (tranformText !== ">") {
                                    tranformText = tranformText.substr(tranformText.indexOf('('), tranformText.indexOf(');'));
                                    var regExp = /\(([^)]+)\)/;
                                    var matches = regExp.exec(tranformText);
                                    tranformText = matches[1];
                                    tranformText = tranformText.substr(0, tranformText.length - 3);

                                    var deg = (parseFloat(tranformText) * (180 / Math.PI));
                                    var cx = parseFloat($('#box' + vm.left_design[k].z_index + "left svg").css('width')) / 2;
                                    var cy = parseFloat($('#box' + vm.left_design[k].z_index + "left svg").css('height')) / 2;

                                    cx = cx + parseFloat(element.css('left'));
                                    cy = cy + parseFloat(element.css('top'));

                                    var rotation = "rotate(" + deg + "," + cx + "," + cy + ")";


                                    console.log(rotation);

                                    g.setAttributeNS('http://www.w3.org/2000/svg', 'transform', rotation);
                                }
                            }



                            var svgText;

                            svgText = $('#box' + vm.left_design[k].z_index + "left text").clone()[0];

                            if (!obj_.transform)
                                obj_.transform = 'translate(0, 0) scale(1,1)';

                            g.appendChild(innerSvg);
                            var flipG = document.createElementNS("http://www.w3.org/2000/svg", "g");
                            flipG.setAttributeNS('http://www.w3.org/2000/svg', 'transform', obj_.transform);

                            innerSvg.appendChild(flipG);
                            flipG.appendChild(svgText)
                            svgParent2.appendChild(g);

                            console.log(svgText);

                            // var left = parseFloat(element.css('left')) || 0;
                            // var top = parseFloat(element.css('top')) || 0;

                            // svgText.children[0].setAttributeNS(null, 'x', left);
                            // svgText.children[0].setAttributeNS(null, 'y', top);
                            // svgText.children[0].setAttributeNS(null, 'width', parseInt(element.css('width')));
                            // svgText.children[0].setAttributeNS(null, 'height', parseInt(element.css('height')));
                            //g.appendChild(innerSvg);
                            //innerSvg.appendChild(svgText)
                            //svgParent2.appendChild(g);
                            var textObj = {
                                "string": vm.left_design[k].text,
                                font: {
                                    id: k,
                                    family: vm.left_design[k].font,
                                    filename: vm.left_design[k].font,
                                    tags: [],
                                    priority: 1,
                                    url: null
                                },
                                fontSize: 24,
                                tag: "Popular",
                                lineHeight: 1.2,
                                alignment: "center",
                                colors: obj_.color,
                                outlineThickness: 0,
                                transformations: [],
                                matrix: {},
                                beingEdited: false,
                                origin: "Native",
                                type: "Text",
                                bbox: {
                                    x: parseInt(arr[0]),
                                    y: parseInt(arr[1]),
                                    width: parseInt(arr[2]),
                                    height: parseInt(arr[3]),
                                },
                                filename: "",
                                "preserve-colors": false,
                                fillColor: {
                                    id: k,
                                    value: vm.left_design[k].color,
                                    origin: null,
                                    heather: false,
                                    texture: "",
                                },
                                outlineColor: {
                                    id: "default" + k,
                                    value: "#000000",
                                    origin: null,
                                    heather: false,
                                    texture: "",
                                },
                                newDesignData: {
                                    transform: {

                                    }
                                }

                            }

                            layers.push(textObj);
                        }

                        if (vm.left_design[k].type === "svg" || vm.left_design[k].type === "img") {

                            var element = $('#box' + vm.left_design[k].z_index + "left");
                            var svgText;
                            var obj_ = vm.left_design[k];

                            svgText = element.find('image').clone()[0];

                            var g = document.createElementNS("http://www.w3.org/2000/svg", "g");



                            if (vm.left_design.length) {

                                var tranformText = element.prop('outerHTML');
                                tranformText = tranformText.substr(tranformText.indexOf('rotate('), 85);
                                if (tranformText !== ">") {
                                    tranformText = tranformText.substr(tranformText.indexOf('('), tranformText.indexOf(');'));
                                    var regExp = /\(([^)]+)\)/;
                                    var matches = regExp.exec(tranformText);
                                    tranformText = matches[1];
                                    tranformText = tranformText.substr(0, tranformText.length - 3);

                                    var deg = (parseFloat(tranformText) * (180 / Math.PI));
                                    var cx = parseFloat($('#box' + vm.left_design[k].z_index + "left svg").css('width')) / 2;
                                    var cy = parseFloat($('#box' + vm.left_design[k].z_index + "left svg").css('height')) / 2;

                                    cx = cx + parseFloat(element.css('left'));
                                    cy = cy + parseFloat(element.css('top'));

                                    var rotation = "rotate(" + deg + "," + cx + "," + cy + ")";


                                    console.log(rotation);

                                    g.setAttributeNS('http://www.w3.org/2000/svg', 'transform', rotation);
                                }
                            }




                            var left = parseFloat(element.css('left')) || 0;
                            var top = parseFloat(element.css('top')) || 0;

                            var innerSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                            innerSvg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
                            innerSvg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
                            innerSvg.setAttributeNS(null, 'width', parseFloat(element.css('width')));
                            innerSvg.setAttributeNS(null, 'height', parseFloat(element.css('height')));
                            innerSvg.setAttributeNS(null, 'x', left);
                            innerSvg.setAttributeNS(null, 'y', top);


                            svgText.setAttributeNS(null, 'width', parseInt($('#box' + vm.left_design[k].z_index + "left svg").css('width')));
                            svgText.setAttributeNS(null, 'height', parseInt($('#box' + vm.left_design[k].z_index + "left svg").css('height')));
                            svgText.setAttributeNS(null, 'y', 0);

                            if (!obj_.transform)
                                obj_.transform = 'translate(0, 0) scale(1,1)';

                            var flipG = document.createElementNS("http://www.w3.org/2000/svg", "g");
                            flipG.setAttributeNS('http://www.w3.org/2000/svg', 'transform', obj_.transform);


                            g.appendChild(innerSvg);
                            innerSvg.appendChild(flipG);
                            flipG.appendChild(svgText);
                            svgParent2.appendChild(g);

                            //svgText.setAttributeNS(null, 'x', left);
                            //svgText.setAttributeNS(null, 'y', top);



                            //g.appendChild(svgText);
                            //svgParent2.appendChild(g);

                            var _obj = _.findWhere(vm.graphics, { id: obj_.id });
                            var n = obj_.src.lastIndexOf("/")+1;
                            var fileName = obj_.src.substring(n,obj_.src.length);
                            //   debugger;
                            var element = $('#box' + vm.left_design[k].z_index + "left");
                            var svg = element.find('svg');
                            var view = svg[0].getAttributeNS(null, 'viewBox');
                            var arr = view.split(' ');

                            var svgObj = {
                                "urlParams": {
                                    "filename": ""
                                },
                                name: "",
                                format: "",
                                "original_key": "",
                                sourceFilename: "",
                                svg_key: "",
                                png_key: "",
                                category: [],

                                uploadId: null,
                                initialScale: 1,
                                transformations: [],
                                matrix: {},
                                beingEdited: false,
                                origin: "Native",
                                type: "Art",
                                bbox: {
                                    x: parseInt(arr[0]),
                                    y: parseInt(arr[1]),
                                    width: parseInt(arr[2]),
                                    height: parseInt(arr[3]),
                                },
                                filename: fileName,
                                "preserve-colors": false,
                                fillColor: {
                                    id: k,
                                    value: vm.left_design[k].color,
                                    origin: null,
                                    heather: false,
                                    texture: "",
                                },
                                outlineColor: {
                                    id: "default" + k,
                                    value: "#000000",
                                    origin: null,
                                    heather: false,
                                    texture: "",
                                },
                                newDesignData: {
                                    transform: {

                                    }
                                }

                            }

                            if (vm.left_design[k].type === "svg") {

                                svgObj.colors = _obj.colors
                            }

                            layers.push(svgObj);

                        }
                    }

                    console.log(svgParent2);

                    var $this = $(svgParent2);
                    //  console.log($this.get(0).html());
                    svgParent2 = $this.outerHTML();
                    // svgParent2 = svgParent2.replace(/\r?\n|\r/g, ' ');
                    // svgParent2 = svgParent2.replace(/\t/g, '');
                    console.log(svgParent2);


                    var left = {
                        removeLayerBinding: {},
                        name: "left",
                        layers: layers,
                        colors: vm.total_left_colors,

                        beingViewed: false,
                        initialFreeTransformAttrs: null,
                        initialPrintableArea: null,
                        referencePoint: {},
                        ppi: 18,
                        editable: null,
                        sequence: 2,
                        // priorPrintableBox: parseInt(arr[0]) + "," + $("#box1left").parent().parent().parent().css('top').substr(0, $("#box1left").parent().parent().parent().css('top').length - 2) + "," + parseInt(arr[2]) + ",240",
                        scaleAndMove: null,
                        rasterImageInfo: [],
                        svg: svgParent2,


                    }

                    if (vm.left_design.length) {
                        left.bbox = {
                            x: parseInt(arr[0]),
                            y: parseInt(arr[1]),
                            width: parseInt(arr[2]),
                            height: parseInt(arr[3]),
                        },
                        left.absoluteBBox = {
                            x: parseInt(arr[0]),
                            y: parseInt(arr[1]),
                            width: parseInt(arr[2]),
                            height: parseInt(arr[3]),
                        }

                    }

                    sides.push(left);
                }

                if (i == 3) {

                    var printableAreaWidthWithoutPX = $('.printable-area').css('width').substr(0, $('.printable-area').css('width').length - 2);
                    var printableAreaHeightWithoutPX = $('.printable-area').css('height').substr(0, $('.printable-area').css('height').length - 2);
                    var svgParent3 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    // svgParent3.setAttribute('style', 'border: 1px solid black');
                    svgParent3.setAttribute('width', vm.selectedShirt.printable_right_width);
                    svgParent3.setAttribute('height', vm.selectedShirt.printable_right_height);
                    svgParent3.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
                    svgParent3.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
                    svgParent3.setAttributeNS(null, 'viewBox', '0 0 ' + vm.selectedShirt.printable_right_width + ' ' + vm.selectedShirt.printable_right_height);

                    var layers = [];
                    for (var j = 0; j < vm.right_design.length; j++) {
                        var element = $('#box' + vm.right_design[j].z_index + "right");
                        var pipe = j == 0 ? "||" : "";
                        // svgText += _.escape(element.prop('outerHTML')) + pipe;

                        //      element.find('svg')[0].removeAttribute("style");
                        //    svgText = element.find('svg')[0].outerHTML;
                        //    svgText = svgText.replace(/\r?\n|\r/g,' ');
                        //    svgText = svgText.replace(/\t/g,'');
                    }

                    for (var k = 0; k < vm.right_design.length; k++) {
                        if (vm.right_design[k].type === 'text') {



                            var obj_ = vm.right_design[k];
                            // var _obj = _.findWhere(vm.graphics, {id:obj_.id});
                            var element = $('#box' + vm.right_design[k].z_index + "right");
                            var svg = element.children('svg')[0];
                            var view = svg.getAttributeNS(null, 'viewBox');
                            var arr = view.split(' ');


                            var element1 = $('#box' + vm.right_design[k].z_index + "right svg");
                            var svg1 = element.children('svg')[0];
                            var view1 = svg.getAttributeNS(null, 'viewBox');
                            var arr1 = view.split(' ');

                            var left = parseFloat(element.css('left')) || 0;
                            var top = parseFloat(element.css('top')) || 0;


                            var innerSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                            innerSvg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
                            innerSvg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
                            innerSvg.setAttributeNS(null, 'preserveAspectRatio', "none");
                            innerSvg.setAttributeNS(null, 'width', parseFloat(element.css('width')));
                            innerSvg.setAttributeNS(null, 'height', parseFloat(element.css('height')));
                            innerSvg.setAttributeNS(null, 'x', left);
                            innerSvg.setAttributeNS(null, 'y', top);
                            innerSvg.setAttributeNS(null, 'viewBox', '0 0 ' + arr1[2] + ' ' + arr1[3]);

                            // console.log(innerSvg);
                            var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                            // g.setAttributeNS('http://www.w3.org/2000/svg','transform',$('#box' + vm.front_design[k].z_index + "front").css('transform'));


                            if (vm.right_design.length) {

                                var tranformText = element.prop('outerHTML');
                                tranformText = tranformText.substr(tranformText.indexOf('rotate('), 85);
                                if (tranformText !== ">") {
                                    tranformText = tranformText.substr(tranformText.indexOf('('), tranformText.indexOf(');'));
                                    var regExp = /\(([^)]+)\)/;
                                    var matches = regExp.exec(tranformText);
                                    tranformText = matches[1];
                                    tranformText = tranformText.substr(0, tranformText.length - 3);

                                    var deg = (parseFloat(tranformText) * (180 / Math.PI));
                                    var cx = parseFloat($('#box' + vm.right_design[k].z_index + "right svg").css('width')) / 2;
                                    var cy = parseFloat($('#box' + vm.right_design[k].z_index + "right svg").css('height')) / 2;

                                    cx = cx + parseFloat(element.css('left'));
                                    cy = cy + parseFloat(element.css('top'));

                                    var rotation = "rotate(" + deg + "," + cx + "," + cy + ")";


                                    console.log(rotation);

                                    g.setAttributeNS('http://www.w3.org/2000/svg', 'transform', rotation);
                                }
                            }


                            var svgText;

                            svgText = $('#box' + vm.right_design[k].z_index + "right text").clone()[0];


                            if (!obj_.transform)
                                obj_.transform = 'translate(0, 0) scale(1,1)';

                            g.appendChild(innerSvg);
                            var flipG = document.createElementNS("http://www.w3.org/2000/svg", "g");
                            flipG.setAttributeNS('http://www.w3.org/2000/svg', 'transform', obj_.transform);

                            innerSvg.appendChild(flipG);
                            flipG.appendChild(svgText)
                            svgParent3.appendChild(g);




                            // console.log(svgText);
                            // var left = parseInt(element.css('left')) || 0;
                            //    var top = parseInt(element.css('top')) || 0;


                            // svgText.children[0].setAttributeNS(null, 'x', left);
                            // svgText.children[0].setAttributeNS(null, 'y', top);
                            // svgText.children[0].setAttributeNS(null, 'width', parseInt(element.css('width')));
                            // svgText.children[0].setAttributeNS(null, 'height', parseInt(element.css('height')));
                            // g.appendChild(svgText);
                            //g.appendChild(innerSvg);
                            //innerSvg.appendChild(svgText);


                            //svgParent3.appendChild(g);

                            var textObj = {
                                "string": vm.right_design[k].text,
                                font: {
                                    id: k,
                                    family: vm.right_design[k].font,
                                    filename: vm.right_design[k].font,
                                    tags: [],
                                    priority: 1,
                                    url: null
                                },
                                fontSize: 24,
                                tag: "Popular",
                                lineHeight: 1.2,
                                alignment: "center",
                                colors: obj_.color,
                                outlineThickness: 0,
                                transformations: [],
                                matrix: {},
                                beingEdited: false,
                                origin: "Native",
                                type: "Text",
                                bbox: {
                                    x: parseInt(arr[0]),
                                    y: parseInt(arr[1]),
                                    width: parseInt(arr[2]),
                                    height: parseInt(arr[3]),
                                },
                                filename: "",
                                "preserve-colors": false,
                                fillColor: {
                                    id: k,
                                    value: vm.right_design[k].color,
                                    origin: null,
                                    heather: false,
                                    texture: "",
                                },
                                outlineColor: {
                                    id: "default" + k,
                                    value: "#000000",
                                    origin: null,
                                    heather: false,
                                    texture: "",
                                },
                                newDesignData: {
                                    transform: {

                                    }
                                }

                            }

                            layers.push(textObj);
                        }

                        if (vm.right_design[k].type === "svg" || vm.right_design[k].type === "img") {
                            var element = $('#box' + vm.right_design[k].z_index + "right");
                            var svgText;
                            var obj_ = vm.right_design[k];

                            svgText = element.find('image').clone()[0];
                            var g = document.createElementNS("http://www.w3.org/2000/svg", "g");

                            if (vm.right_design.length) {


                                var tranformText = element.prop('outerHTML');
                                tranformText = tranformText.substr(tranformText.indexOf('rotate('), 85);
                                if (tranformText !== ">") {
                                    tranformText = tranformText.substr(tranformText.indexOf('('), tranformText.indexOf(');'));
                                    var regExp = /\(([^)]+)\)/;
                                    var matches = regExp.exec(tranformText);
                                    tranformText = matches[1];
                                    tranformText = tranformText.substr(0, tranformText.length - 3);

                                    var deg = (parseFloat(tranformText) * (180 / Math.PI));
                                    var cx = parseFloat($('#box' + vm.right_design[k].z_index + "right svg").css('width')) / 2;
                                    var cy = parseFloat($('#box' + vm.right_design[k].z_index + "right svg").css('height')) / 2;

                                    cx = cx + parseFloat(element.css('left'));
                                    cy = cy + parseFloat(element.css('top'));

                                    var rotation = "rotate(" + deg + "," + cx + "," + cy + ")";


                                    console.log(rotation);

                                    g.setAttributeNS('http://www.w3.org/2000/svg', 'transform', rotation);
                                }

                            }

                            var left = parseInt(element.css('left')) || 0;
                            var top = parseInt(element.css('top')) || 0;


                            var innerSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                            innerSvg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
                            innerSvg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
                            innerSvg.setAttributeNS(null, 'width', parseFloat(element.css('width')));
                            innerSvg.setAttributeNS(null, 'height', parseFloat(element.css('height')));
                            innerSvg.setAttributeNS(null, 'x', left);
                            innerSvg.setAttributeNS(null, 'y', top);


                            svgText.setAttributeNS(null, 'width', parseInt($('#box' + vm.right_design[k].z_index + "left svg").css('width')));
                            svgText.setAttributeNS(null, 'height', parseInt($('#box' + vm.right_design[k].z_index + "left svg").css('height')));
                            svgText.setAttributeNS(null, 'y', 0);

                            if (!obj_.transform)
                                obj_.transform = 'translate(0, 0) scale(1,1)';

                            var flipG = document.createElementNS("http://www.w3.org/2000/svg", "g");
                            flipG.setAttributeNS('http://www.w3.org/2000/svg', 'transform', obj_.transform);


                            g.appendChild(innerSvg);
                            innerSvg.appendChild(flipG);
                            flipG.appendChild(svgText);
                            svgParent3.appendChild(g);


                            //svgText.setAttributeNS(null, 'x', left);
                            //svgText.setAttributeNS(null, 'y', top);
                            //svgText.setAttributeNS(null, 'width', parseInt($('#box' + vm.right_design[k].z_index + "right svg").css('width')));
                            //svgText.setAttributeNS(null, 'height', parseInt($('#box' + vm.right_design[k].z_index + "right svg").css('height')));
                            //g.appendChild(svgText);
                            //svgParent3.appendChild(g);

                            var obj_ = vm.right_design[k];
                            var _obj = _.findWhere(vm.graphics, { id: obj_.id });
                            var n = obj_.src.lastIndexOf("/")+1;
                            var fileName = obj_.src.substring(n,obj_.src.length);
                            //   debugger;
                            var element = $('#box' + vm.right_design[k].z_index + "right");
                            var svg = element.find('svg');
                            var view = svg[0].getAttributeNS(null, 'viewBox');
                            var arr = view.split(' ');

                            var svgObj = {
                                "urlParams": {
                                    "filename": ""
                                },
                                name: "",
                                format: "",
                                "original_key": "",
                                sourceFilename: "",
                                svg_key: "",
                                png_key: "",
                                category: [],

                                uploadId: null,
                                initialScale: 1,
                                transformations: [],
                                matrix: {},
                                beingEdited: false,
                                origin: "Native",
                                type: "Art",
                                bbox: {
                                    x: parseInt(arr[0]),
                                    y: parseInt(arr[1]),
                                    width: parseInt(arr[2]),
                                    height: parseInt(arr[3]),
                                },
                                filename: fileName,
                                "preserve-colors": false,
                                fillColor: {
                                    id: k,
                                    value: vm.right_design[k].color,
                                    origin: null,
                                    heather: false,
                                    texture: "",
                                },
                                outlineColor: {
                                    id: "default" + k,
                                    value: "#000000",
                                    origin: null,
                                    heather: false,
                                    texture: "",
                                },
                                newDesignData: {
                                    transform: {

                                    }
                                }

                            }

                            if (vm.right_design[k].type === "svg") {
                                svgObj.colors = _obj.colors
                            }

                            layers.push(svgObj);

                        }
                    }

                    console.log(svgParent3);

                    var $this = $(svgParent3);
                    //  console.log($this.get(0).html());
                    svgParent3 = $this.outerHTML();
                    // svgParent3 = svgParent3.replace(/\r?\n|\r/g, ' ');
                    // svgParent3 = svgParent3.replace(/\t/g, '');
                    console.log(svgParent3);

                    var right = {
                        removeLayerBinding: {},
                        name: "right",
                        layers: layers,
                        colors: vm.total_right_colors,

                        beingViewed: false,
                        initialFreeTransformAttrs: null,
                        initialPrintableArea: null,
                        referencePoint: {},
                        ppi: 18,
                        editable: null,
                        sequence: 2,
                        // priorPrintableBox: parseInt(arr[0]) + "," + $("#box1right").parent().parent().parent().css('top').substr(0, $("#box1right").parent().parent().parent().css('top').length - 2) + "," + parseInt(arr[2]) + ",240",
                        scaleAndMove: null,
                        rasterImageInfo: [],
                        svg: svgParent3


                    }

                    if (vm.right_design.length) {
                        right.bbox = {
                            x: parseInt(arr[0]),
                            y: parseInt(arr[1]),
                            width: parseInt(arr[2]),
                            height: parseInt(arr[3]),
                        };
                        right.absoluteBBox = {
                            x: parseInt(arr[0]),
                            y: parseInt(arr[1]),
                            width: parseInt(arr[2]),
                            height: parseInt(arr[3]),
                        };

                    }

                    sides.push(right);
                }
            }

        }




        var design = {
            lookupId: "f2345",
            sides: sides,
            activeSide: activeSide,
            high_quality_artwork: true,
            crap_quality_artwork: false,
            product_type_id: parseInt(vm.selectedShirt.id),
            frontColors: vm.total_front_colors.length,
            flashFront: false,
            backColors: vm.total_back_colors.length,
            flashBack: false,
            leftColors: vm.total_left_colors.length,
            flashLeft: false,
            rightColors: vm.total_right_colors.length,
            flashRight: false

        }



        // console.log(JSON.stringify(obj,null,4));

        // for (o in obj) {
        //     console.log(o, obj[o]);
        // }

        console.log(sides);
        compaign_json.design = JSON.stringify(design);
        compaign_json.priorPrintableArea = JSON.stringify({ "front": "152,100,220,330", "back": "155,60,215,330", "left": "155,60,215,330", "right": "155,60,215,330" });
        //console.log(JSON.stringify(compaign_json,null,4));

        //  var fd = objectToFormData(compaign_json);

        //console.log(fd);
        // var formData = new FormData();
        // formData.append('compaign_json', JSON.stringify(compaign_json));
        DashboardService.LaunchCompaign(compaign_json).then(function (data) {
            //console.clear();
            //     console.log(data);

            if (data.code == 210) {
                //  loginModal.$promise.then(loginModal.show);
                $scope.show_login_form();
                return;
            }
            else if (data.code == 200) {
                //  location = baseURL+data.data.campaign;
                //   location.reload(true);
                //  $http({method: 'GET', url: baseURL+data.data.campaign});
                window.location.href = serverURL + data.data.campaign;
            }
            else if (data.code == 211) {
                alert(data.message);
                // window.location.href = serverURL+data.data.campaign;
            }
            console.log(data)


        });

    }

    vm.flipX = false;
    vm.flipx = function () {

        if (vm.default_tab === 1) {
            var e = $("#box" + vm.frontObject.z_index + "front"),
                        svg = e.find('svg'),
                        transform = '';
            var viewBox = svg[0].getAttributeNS(null, 'viewBox');
            var size = viewBox.split(' ');
            var width = parseFloat(e.css('width'));
            var height = parseFloat(e.css('height'));

            console.log(width, height);



            if (!vm.flipX) {
                if (vm.flipY) {
                    if (vm.frontObject.type === "img" || vm.frontObject.type === "svg") {
                        vm.frontObject.transform = 'translate(' + width + ',' + height + ' ) scale(-1,-1)';
                    }
                    else vm.frontObject.transform = 'translate(' + size[2] + ',' + size[3] + ' ) scale(-1,-1)';
                    jQuery(svg[0]).css('transform', 'scale(-1,-1)');
                }
                else {
                    if (vm.frontObject.type === "img" || vm.frontObject.type === "svg") {
                        vm.frontObject.transform = 'translate(' + width + ', 0) scale(-1,1)';
                    }
                    else vm.frontObject.transform = 'translate(' + size[2] + ', 0) scale(-1,1)';
                    jQuery(svg[0]).css('transform', 'scale(-1,1)');
                }
                vm.flipX = true;
            }
            else {

                if (vm.flipY) {
                    if (vm.frontObject.type === "img" || vm.frontObject.type === "svg") {
                        vm.frontObject.transform = 'translate(0,' + height + ' ) scale(1,-1)';
                    }
                    else vm.frontObject.transform = 'translate(0, ' + size[3] + ') scale(1,-1)';
                    jQuery(svg[0]).css('transform', 'translate(0, 0) scale(1,-1)');
                }
                else {
                    if (vm.frontObject.type === "img" || vm.frontObject.type === "svg") {
                        vm.frontObject.transform = 'translate(0,0) scale(1,1)';
                    }
                    else vm.frontObject.transform = 'translate(0, 0) scale(1,1)';
                    jQuery(svg[0]).css('transform', 'translate(0, 0) scale(1,1)');
                }
                vm.flipX = false;
            }

            var g = jQuery(svg[0]).children('g');
        }

        if (vm.default_tab === 2) {
            var e = $("#box" + vm.backObject.z_index + "back"),
                        svg = e.find('svg'),
                        transform = '';
            var viewBox = svg[0].getAttributeNS(null, 'viewBox');
            var size = viewBox.split(' ');
            var width = parseFloat(e.css('width'));
            var height = parseFloat(e.css('height'));

            console.log(width, height);



            if (!vm.flipX) {
                if (vm.flipY) {
                    if (vm.backObject.type === "img" || vm.backObject.type === "svg") {
                        vm.backObject.transform = 'translate(' + width + ',' + height + ' ) scale(-1,-1)';
                    }
                    else vm.backObject.transform = 'translate(' + size[2] + ',' + size[3] + ' ) scale(-1,-1)';
                    jQuery(svg[0]).css('transform', 'scale(-1,-1)');
                }
                else {
                    if (vm.backObject.type === "img" || vm.backObject.type === "svg") {
                        vm.backObject.transform = 'translate(' + width + ', 0) scale(-1,1)';
                    }
                    else vm.backObject.transform = 'translate(' + size[2] + ', 0) scale(-1,1)';
                    jQuery(svg[0]).css('transform', 'scale(-1,1)');
                }
                vm.flipX = true;
            }
            else {

                if (vm.flipY) {
                    if (vm.backObject.type === "img" || vm.backObject.type === "svg") {
                        vm.backObject.transform = 'translate(0,' + height + ' ) scale(1,-1)';
                    }
                    else vm.backObject.transform = 'translate(0, ' + size[3] + ') scale(1,-1)';
                    jQuery(svg[0]).css('transform', 'translate(0, 0) scale(1,-1)');
                }
                else {
                    if (vm.backObject.type === "img" || vm.backObject.type === "svg") {
                        vm.backObject.transform = 'translate(0,0) scale(1,1)';
                    }
                    else vm.backObject.transform = 'translate(0, 0) scale(1,1)';
                    jQuery(svg[0]).css('transform', 'translate(0, 0) scale(1,1)');
                }
                vm.flipX = false;
            }

            var g = jQuery(svg[0]).children('g');
        }

        if (vm.default_tab === 3) {
            var e = $("#box" + vm.leftObject.z_index + "left"),
                        svg = e.find('svg'),
                        transform = '';
            var viewBox = svg[0].getAttributeNS(null, 'viewBox');
            var size = viewBox.split(' ');
            var width = parseFloat(e.css('width'));
            var height = parseFloat(e.css('height'));

            console.log(width, height);



            if (!vm.flipX) {
                if (vm.flipY) {
                    if (vm.leftObject.type === "img" || vm.leftObject.type === "svg") {
                        vm.leftObject.transform = 'translate(' + width + ',' + height + ' ) scale(-1,-1)';
                    }
                    else vm.leftObject.transform = 'translate(' + size[2] + ',' + size[3] + ' ) scale(-1,-1)';
                    jQuery(svg[0]).css('transform', 'scale(-1,-1)');
                }
                else {
                    if (vm.leftObject.type === "img" || vm.leftObject.type === "svg") {
                        vm.leftObject.transform = 'translate(' + width + ', 0) scale(-1,1)';
                    }
                    else vm.leftObject.transform = 'translate(' + size[2] + ', 0) scale(-1,1)';
                    jQuery(svg[0]).css('transform', 'scale(-1,1)');
                }
                vm.flipX = true;
            }
            else {

                if (vm.flipY) {
                    if (vm.leftObject.type === "img" || vm.leftObject.type === "svg") {
                        vm.leftObject.transform = 'translate(0,' + height + ' ) scale(1,-1)';
                    }
                    else vm.leftObject.transform = 'translate(0, ' + size[3] + ') scale(1,-1)';
                    jQuery(svg[0]).css('transform', 'translate(0, 0) scale(1,-1)');
                }
                else {
                    if (vm.leftObject.type === "img" || vm.leftObject.type === "svg") {
                        vm.leftObject.transform = 'translate(0,0) scale(1,1)';
                    }
                    else vm.leftObject.transform = 'translate(0, 0) scale(1,1)';
                    jQuery(svg[0]).css('transform', 'translate(0, 0) scale(1,1)');
                }
                vm.flipX = false;
            }

            var g = jQuery(svg[0]).children('g');
        }

        if (vm.default_tab === 4) {
            var e = $("#box" + vm.rightObject.z_index + "right"),
                        svg = e.find('svg'),
                        transform = '';
            var viewBox = svg[0].getAttributeNS(null, 'viewBox');
            var size = viewBox.split(' ');
            var width = parseFloat(e.css('width'));
            var height = parseFloat(e.css('height'));

            console.log(width, height);



            if (!vm.flipX) {
                if (vm.flipY) {
                    if (vm.rightObject.type === "img" || vm.rightObject.type === "svg") {
                        vm.rightObject.transform = 'translate(' + width + ',' + height + ' ) scale(-1,-1)';
                    }
                    else vm.rightObject.transform = 'translate(' + size[2] + ',' + size[3] + ' ) scale(-1,-1)';
                    jQuery(svg[0]).css('transform', 'scale(-1,-1)');
                }
                else {
                    if (vm.rightObject.type === "img" || vm.rightObject.type === "svg") {
                        vm.rightObject.transform = 'translate(' + width + ', 0) scale(-1,1)';
                    }
                    else vm.rightObject.transform = 'translate(' + size[2] + ', 0) scale(-1,1)';
                    jQuery(svg[0]).css('transform', 'scale(-1,1)');
                }
                vm.flipX = true;
            }
            else {

                if (vm.flipY) {
                    if (vm.rightObject.type === "img" || vm.rightObject.type === "svg") {
                        vm.rightObject.transform = 'translate(0,' + height + ' ) scale(1,-1)';
                    }
                    else vm.rightObject.transform = 'translate(0, ' + size[3] + ') scale(1,-1)';
                    jQuery(svg[0]).css('transform', 'translate(0, 0) scale(1,-1)');
                }
                else {
                    if (vm.rightObject.type === "img" || vm.rightObject.type === "svg") {
                        vm.rightObject.transform = 'translate(0,0) scale(1,1)';
                    }
                    else vm.rightObject.transform = 'translate(0, 0) scale(1,1)';
                    jQuery(svg[0]).css('transform', 'translate(0, 0) scale(1,1)');
                }
                vm.flipX = false;
            }

            var g = jQuery(svg[0]).children('g');
        }


    }


    vm.flipY = false;
    vm.flipYcounter = -1;

    vm.flipy = function () {

        if (vm.default_tab === 1) {
            var e = $("#box" + vm.frontObject.z_index + "front"),
                        svg = e.find('svg'),
                        transform = '';
            var viewBox = svg[0].getAttributeNS(null, 'viewBox');
            var size = viewBox.split(' ');
            var width = parseFloat(e.css('width'));
            var height = parseFloat(e.css('height'));

            console.log(width, height);



            if (!vm.flipY) {
                if (vm.flipX) {
                    if (vm.frontObject.type === "img" || vm.frontObject.type === "svg") {
                        vm.frontObject.transform = 'translate(' + width + ',' + height + ' ) scale(-1,-1)';
                    }
                    else vm.frontObject.transform = 'translate(' + size[2] + ',' + size[3] + ' ) scale(-1,-1)';
                    jQuery(svg[0]).css('transform', 'scale(-1,-1)');
                }
                else {
                    if (vm.frontObject.type === "img" || vm.frontObject.type === "svg") {
                        vm.frontObject.transform = 'translate(0,' + height + ') scale(1,-1)';
                    }
                    else vm.frontObject.transform = 'translate(0,' + size[3] + ') scale(1,-1)';
                    jQuery(svg[0]).css('transform', 'scale(1,-1)');
                }
                vm.flipY = true;
            }
            else {

                if (vm.flipX) {
                    if (vm.frontObject.type === "img" || vm.frontObject.type === "svg") {
                        vm.frontObject.transform = 'translate(' + width + ',0 ) scale(-1,1)';
                    }
                    else vm.frontObject.transform = 'translate(' + size[2] + ',0) scale(-1,1)';
                    jQuery(svg[0]).css('transform', 'translate(0, 0) scale(-1,1)');
                }
                else {
                    if (vm.frontObject.type === "img" || vm.frontObject.type === "svg") {
                        vm.frontObject.transform = 'translate(0,0) scale(1,1)';
                    }
                    else vm.frontObject.transform = 'translate(0, 0) scale(1,1)';
                    jQuery(svg[0]).css('transform', 'translate(0, 0) scale(1,1)');
                }
                vm.flipY = false;
            }

            var g = jQuery(svg[0]).children('g');
        }

        if (vm.default_tab === 2) {
            var e = $("#box" + vm.backObject.z_index + "back"),
                        svg = e.find('svg'),
                        transform = '';
            var viewBox = svg[0].getAttributeNS(null, 'viewBox');
            var size = viewBox.split(' ');
            var width = parseFloat(e.css('width'));
            var height = parseFloat(e.css('height'));

            console.log(width, height);



            if (!vm.flipY) {
                if (vm.flipX) {
                    if (vm.backObject.type === "img" || vm.backObject.type === "svg") {
                        vm.backObject.transform = 'translate(' + width + ',' + height + ' ) scale(-1,-1)';
                    }
                    else vm.backObject.transform = 'translate(' + size[2] + ',' + size[3] + ' ) scale(-1,-1)';
                    jQuery(svg[0]).css('transform', 'scale(-1,-1)');
                }
                else {
                    if (vm.backObject.type === "img" || vm.backObject.type === "svg") {
                        vm.backObject.transform = 'translate(0,' + height + ') scale(1,-1)';
                    }
                    else vm.backObject.transform = 'translate(0,' + size[3] + ') scale(1,-1)';
                    jQuery(svg[0]).css('transform', 'scale(1,-1)');
                }
                vm.flipY = true;
            }
            else {

                if (vm.flipX) {
                    if (vm.backObject.type === "img" || vm.backObject.type === "svg") {
                        vm.backObject.transform = 'translate(' + width + ',0 ) scale(-1,1)';
                    }
                    else vm.backObject.transform = 'translate(' + size[2] + ',0) scale(-1,1)';
                    jQuery(svg[0]).css('transform', 'translate(0, 0) scale(-1,1)');
                }
                else {
                    if (vm.backObject.type === "img" || vm.backObject.type === "svg") {
                        vm.backObject.transform = 'translate(0,0) scale(1,1)';
                    }
                    else vm.backObject.transform = 'translate(0, 0) scale(1,1)';
                    jQuery(svg[0]).css('transform', 'translate(0, 0) scale(1,1)');
                }
                vm.flipY = false;
            }

            var g = jQuery(svg[0]).children('g');
        }

        if (vm.default_tab === 3) {
            var e = $("#box" + vm.leftObject.z_index + "left"),
                        svg = e.find('svg'),
                        transform = '';
            var viewBox = svg[0].getAttributeNS(null, 'viewBox');
            var size = viewBox.split(' ');
            var width = parseFloat(e.css('width'));
            var height = parseFloat(e.css('height'));

            console.log(width, height);



            if (!vm.flipY) {
                if (vm.flipX) {
                    if (vm.leftObject.type === "img" || vm.leftObject.type === "svg") {
                        vm.leftObject.transform = 'translate(' + width + ',' + height + ' ) scale(-1,-1)';
                    }
                    else vm.leftObject.transform = 'translate(' + size[2] + ',' + size[3] + ' ) scale(-1,-1)';
                    jQuery(svg[0]).css('transform', 'scale(-1,-1)');
                }
                else {
                    if (vm.leftObject.type === "img" || vm.leftObject.type === "svg") {
                        vm.leftObject.transform = 'translate(0,' + height + ') scale(1,-1)';
                    }
                    else vm.leftObject.transform = 'translate(0,' + size[3] + ') scale(1,-1)';
                    jQuery(svg[0]).css('transform', 'scale(1,-1)');
                }
                vm.flipY = true;
            }
            else {

                if (vm.flipX) {
                    if (vm.leftObject.type === "img" || vm.leftObject.type === "svg") {
                        vm.leftObject.transform = 'translate(' + width + ',0 ) scale(-1,1)';
                    }
                    else vm.leftObject.transform = 'translate(' + size[2] + ',0) scale(-1,1)';
                    jQuery(svg[0]).css('transform', 'translate(0, 0) scale(-1,1)');
                }
                else {
                    if (vm.leftObject.type === "img" || vm.leftObject.type === "svg") {
                        vm.leftObject.transform = 'translate(0,0) scale(1,1)';
                    }
                    else vm.leftObject.transform = 'translate(0, 0) scale(1,1)';
                    jQuery(svg[0]).css('transform', 'translate(0, 0) scale(1,1)');
                }
                vm.flipY = false;
            }

            var g = jQuery(svg[0]).children('g');
        }

        if (vm.default_tab === 4) {
            var e = $("#box" + vm.rightObject.z_index + "right"),
                        svg = e.find('svg'),
                        transform = '';
            var viewBox = svg[0].getAttributeNS(null, 'viewBox');
            var size = viewBox.split(' ');
            var width = parseFloat(e.css('width'));
            var height = parseFloat(e.css('height'));

            console.log(width, height);



            if (!vm.flipY) {
                if (vm.flipX) {
                    if (vm.rightObject.type === "img" || vm.rightObject.type === "svg") {
                        vm.rightObject.transform = 'translate(' + width + ',' + height + ' ) scale(-1,-1)';
                    }
                    else vm.rightObject.transform = 'translate(' + size[2] + ',' + size[3] + ' ) scale(-1,-1)';
                    jQuery(svg[0]).css('transform', 'scale(-1,-1)');
                }
                else {
                    if (vm.rightObject.type === "img" || vm.rightObject.type === "svg") {
                        vm.rightObject.transform = 'translate(0,' + height + ') scale(1,-1)';
                    }
                    else vm.rightObject.transform = 'translate(0,' + size[3] + ') scale(1,-1)';
                    jQuery(svg[0]).css('transform', 'scale(1,-1)');
                }
                vm.flipY = true;
            }
            else {

                if (vm.flipX) {
                    if (vm.rightObject.type === "img" || vm.rightObject.type === "svg") {
                        vm.rightObject.transform = 'translate(' + width + ',0 ) scale(-1,1)';
                    }
                    else vm.rightObject.transform = 'translate(' + size[2] + ',0) scale(-1,1)';
                    jQuery(svg[0]).css('transform', 'translate(0, 0) scale(1,-1)');
                }
                else {
                    if (vm.rightObject.type === "img" || vm.rightObject.type === "svg") {
                        vm.rightObject.transform = 'translate(0,0) scale(1,1)';
                    }
                    else vm.rightObject.transform = 'translate(0, 0) scale(1,1)';
                    jQuery(svg[0]).css('transform', 'translate(0, 0) scale(1,1)');
                }
                vm.flipY = false;
            }

            var g = jQuery(svg[0]).children('g');
        }


    }



    vm.manage_colors = function(shirt){
        //    shirt.selected = false;
        vm.manage_colors_bool = true;
        vm.selectedModalShirt = shirt;
        angular.forEach(shirt.colors_available, function (color) {

            for (var i = 0; i < vm.colors.length; i++) {
                //   debugger;
                var globalColor = vm.colors[i];
                if (globalColor.id == color.color_id) {
                    color.color = "#" + globalColor.hex;
                }
            }

        });

        viewShirtColors.$promise.then(viewShirtColors.show);

    }

    vm.search_tees = function () {
        //    debugger;
        if (vm.tee_search_name) {
            //  window.location.href = ("www.google.com");
            window.location.assign(serverURL + "search?p=1&q=" + vm.tee_search_name);

        }


    }

    var objectToFormData = function (obj, form, namespace) {

        var fd = form || new FormData();
        var formKey;

        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {

                if (namespace) {
                    formKey = namespace + '[' + property + ']';
                } else {
                    formKey = property;
                }

                // if the property is an object, but not a File,
                // use recursivity.
                if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {

                    objectToFormData(obj[property], fd, property);

                } else {

                    // if it's a string or a File object
                    fd.append(formKey, obj[property]);
                }

            }
        }

        return fd;

    };



    $scope.startsWith = function(state, viewValue) {
        return state.substr(0, viewValue.length).toLowerCase() == viewValue.toLowerCase();
    }

    function build_url() {

        vm.url = vm.compaign_title.replace('/', '-');
        vm.url = vm.url.replace(/\s/g, '');
        vm.url = vm.url.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();

        //debugger;

        if (vm.url.charAt(vm.url.length - 1) == '-') {

            while(vm.url.charAt(vm.url.length - 1) == '-'){
                vm.url = vm.url.substring(0, vm.url.length - 1);
                //return;
            }
            return;
        }
        validate_url();
    }



    function validate_url() {

        if (!vm.url.length) {
            vm.url_available = false;
            return;
        }
        vm.url = vm.url.replace(/[^a-zA-Z0-9]/g, '-');
        if (vm.url.charAt(vm.url.length - 1) == '-') {
            vm.url = vm.url.substring(0, vm.url.length - 1);
            return;
        }
        vm.is_loading_url = true;
        setTimeout(function () {
            DashboardService.ValidateURL(vm.url).then(function (data) {
                //   debugger;
                vm.is_loading_url = false;
                if (data.data.available)
                    vm.url_available = true;
                else vm.url_available = false;
                // console.clear();
            });
        }, 500);



        // alert("URL is available and valid");

    }


    vm.register_user = function () {
        DashboardService.SignUp(vm.sign_up).then(function (data) {
            if (data.code != 200) {
                Alert(data.data.user.msg);
            }
            else {
                sign_up_modal.$promise.then(sign_up_modal.hide);
                DashboardService.GetConfig().then(function (data) {
                    // debugger;
                    vm.user = {};
                    vm.user.pages = {};
                    vm.config = data.data;

                    //  vm.footer_pages = vm.config.pages;
                    if (vm.config.login.status == 1) {
                        vm.user.id = vm.config.login.id;
                        vm.user.name = vm.config.login.name;
                        vm.user.pages = vm.config.login.pages;
                    }



                });
                //  loadConfig(arg);
                Alert(data.data.user.msg);

            }


        });


    }


    vm.show_shirts_modal = function(){
        if(vm.manage_colors_bool){
            vm.manage_colors_bool = false;

        }

        else  viewOptionsModal.$promise.then(viewOptionsModal.show);
        viewShirtColors.$promise.then(viewShirtColors.hide);
    }


    $scope.show_signUpForm = function () {
        loginModal.$promise.then(loginModal.hide);
        sign_up_modal.$promise.then(sign_up_modal.show);

    }

    $scope.show_login_form = function () {

        sign_up_modal.$promise.then(sign_up_modal.hide);
        loginModal.$promise.then(loginModal.show);


    }


    var loginModal = $modal({
        scope: $scope,
        animation: 'am-fade-and-scale',
        placement: 'center',
        template: 'NgApp/Home/VIews/login_modal.html',
        show: false,
        title: 'Login with teedesign'
    });

    var cheatSheetModal = $modal({
        scope: $scope,
        animation: 'am-fade-and-scale',
        placement: 'center',
        template: 'NgApp/Home/VIews/cheatsheetmodal.html',
        show: false,
        title: 'Login with teedesign'
    });


    var sign_up_modal = $modal({
        scope: $scope,
        animation: 'am-fade-and-scale',
        placement: 'center',
        template: 'NgApp/Home/VIews/sign_up_modal.html',
        show: false,
        title: 'Login with teedesign'
    });




    vm.login = function (is_social) {
        debugger;
        var obj={};
        if(!is_social){

            vm.loginCred.is_social = false;
            obj = vm.loginCred;

        }

        else{


            vm.socialCred.is_social = true;
            obj = vm.socialCred;

        }
        DashboardService.Login(obj).then(function (data) {

            // debugger;
            if (data.code != 200) {
                Alert(data.message, "Oops!");
                loginModal.$promise.then(loginModal.hide);
            }
            else {
                vm.config.login.status = 1;
                loginModal.$promise.then(loginModal.hide);
                DashboardService.GetConfig().then(function (data) {

                    vm.user = {};
                    vm.user.pages = {};
                    vm.config = data.data;


                    if (vm.config.login.status == 1) {
                        vm.user.id = vm.config.login.id;
                        vm.user.name = vm.config.login.name;
                        vm.user.pages = vm.config.login.pages;
                    }



                });
                launch_compaign();
                //  loadConfig(arg);
            }

        });
    }


    function remove_tag(index) {

        vm.tags.splice(index, 1);

    }


    function extract_tags(e) {
        //    debugger;
        if (!vm.raw_tags) return;


        if (vm.tags.length > 4) {
            Alert("Max 5 tags are allowed");
            return;
        }
        if (vm.raw_tags.slice(-1) == ',' && vm.raw_tags.length == 1) {
            vm.raw_tags = "";
            return;

        }
        if (vm.raw_tags.slice(-1) == ',') {
            vm.tags.push(vm.raw_tags.substr(0, vm.raw_tags.length - 1));

            vm.raw_tags = "";
        }

        if (e.keyCode == 13) {
            vm.tags.push(vm.raw_tags.substr(0, vm.raw_tags.length));

            vm.raw_tags = "";


        }

        vm.tags = _.uniq(vm.tags);

    }

    vm.extract_tag_on_blur = function () {

        if (!vm.raw_tags) return;


        if (vm.tags.length > 4) {
            Alert("Max 5 tags are allowed");
            return;
        }
        if (vm.raw_tags.slice(-1) == ',' && vm.raw_tags.length == 1) {
            vm.raw_tags = "";
            return;

        }

        if (vm.raw_tags.slice(-1) == ',') {
            vm.tags.push(vm.raw_tags.substr(0, vm.raw_tags.length - 1));

            vm.raw_tags = "";
            return;
        }

        vm.tags.push(vm.raw_tags);
        vm.raw_tags = "";

    }


    $scope.validateImage = function (node) {
        // debugger;
        // nude.init();

        // nude.load(document.getElementById('custom'));
        // // Scan it
        // nude.scan(function (result) {
        //     debugger;
        //     alert(result ? "Nudity found in " + node.id + "!" : "Not nude");
        // });
    }




    function select_extra_shirt_color(color, deselect_others) {
        if(color.selected){

            if(vm.selectedModalShirt.id == vm.selectedShirt.id){
                var selected_colors_num = _.where(vm.selectedModalShirt.colors_available, { selected: true }).length;
                if(selected_colors_num==1) return;
            }

        }
        if (color.selected) {

            if((color.color == vm.shirt_color) && (vm.selectedModalShirt.id==vm.selectedShirt.id))
                return;

            color.selected = false;
            vm.total_color_selected--;
            vm.limit_full = false;
            vm.calculate_total_shirt_cost(vm.selectedModalShirt);
        }
        else {
            if (vm.total_color_selected <= 14) {
                if (deselect_others) {
                    //  _.each();
                }
                vm.limit_full = false;
                color.selected = true;
                vm.total_color_selected++;
            }
            else {
                vm.limit_full = true;
            }
        }
        var sould_be_selected = _.where(vm.selectedModalShirt.colors_available, { selected: true }).length;
        if (!sould_be_selected) vm.selectedModalShirt.selected = false;
        else vm.selectedModalShirt.selected = true;

    }

    function select_extra_shirt_colors(shirt) {
        if (!shirt.selected && vm.total_color_selected == 15) return;

        if(shirt.id==vm.selectedShirt.id) {shirt.selected=true;shirt.colors_available[0].selected=true;return;}

        //  viewOptionsModal.$promise.then(viewOptionsModal.hide);
        //   debugger;
        // angular.forEach(shirt.colors_available, function (color) {

        //     for (var i = 0; i < vm.colors.length; i++) {
        //         //   debugger;
        //         var globalColor = vm.colors[i];
        //         if (globalColor.id == color.color_id) {
        //             color.color = "#" + globalColor.hex;
        //         }
        //     }

        // });


        vm.selectedModalShirt = shirt;
        shirt.selected = !shirt.selected;


        //  debugger;
        if (!shirt.selected) {

            var count = _.where(shirt.colors_available, { selected: true }).length;
            vm.total_color_selected -= (count);
            if (vm.total_color_selected < 0) vm.total_color_selected = 0;


            return;
        }
        //  select_extra_shirt_color(shirt.colors_available[0], true);

        var count = _.where(shirt.colors_available, { selected: true }).length;
        if (vm.total_color_selected + count > 15) {
            for (var i = 0; i < shirt.colors_available.length; i++) {
                var color = shirt.colors_available[i];

                color.selected = false;



            }
        }
        // setColor(shirt.colors_available[0]);
        shirt.colors_available[0].selected = true;
        count = _.where(shirt.colors_available, { selected: true }).length;
        vm.total_color_selected += count;
        var sould_be_selected = _.where(vm.selectedModalShirt.colors_available, { selected: true }).length;
        if (!sould_be_selected) vm.selectedModalShirt.selected = false;
        //  viewShirtColors.$promise.then(viewShirtColors.show);
    }

    function prepare_shirts() {




    }


    function is_available(shirt) {

        // if(vm.selectedShirt.id == shirt.id)
        // return false;
        return true;

    }



    vm.validate_goal_value = function(){

        // $("#goal_handler").rotatable({ handle: $('.handler') });

        if(!$scope.$$phase) $scope.$apply();
        if (vm.goal_target < vm.goal_range_min) {
            //    debugger;
            if (vm.goal_target < vm.goal_range_min)
                vm.goal_target = vm.goal_range_min;
            else vm.goal_target = vm.goal_range_max;
            if (!$scope.$$phase) $scope.$apply();
        }
        if (!vm.goal_target) { vm.goal_target = vm.goal_range_min; if (!$scope.$$phase) $scope.$apply(); }


        rotate_goal();


    }



    vm.quick_verify_goal = function(){
        //debugger;
        vm.invalid_goal = false;

        if (vm.goal_target < vm.goal_range_min || !vm.goal_target) {

            vm.invalid_goal = true;
        }

    }

    function rotate_goal(arg, degree) {



        $timeout(function () {
            //debugger;

            $scope.$apply(function () {
                //            	debugger;
                if(degree){
                    if(degree>360)
                        degree = degree-360;
                    //          		debugger;
                    //target = (360 / vm.goal_range_max ) * (degree);
                    target = (vm.goal_range_max * degree)/360;
                    vm.goal_target = parseInt(target);
                    return;

                }

                if (!arg)
                    vm.goal_target = Number($('#goal_number').val());
                if ( Number(vm.goal_target) < vm.goal_range_min) {
                    vm.invalid_goal = true;
                    vm.goal_target = vm.goal_range_min;
                    return;
                }
                if ( Number(vm.goal_target) > vm.goal_range_max)
                    three60 = true;
                else three60 = false;


                vm.invalid_goal = false;
                var degrees = Number($('#goal_number').val());
                if (arg)
                    degrees = (360 / vm.goal_range_max) * arg;
                else degrees = (360 / vm.goal_range_max) * degrees;
                //var element = $('#goal_handler');
                if(three60) degrees = 360;
                var element = $('#target4');
                //  element.css('transition', '-webkit-transform 800ms ease');
                current_position_rotation = degrees * (Math.PI/180);
                element.css('-webkit-transform', 'rotate(' + degrees * (Math.PI/180) + 'rad)');
                $('#target4').data('uiRotatable').angle(current_position_rotation);

            });

        }, 100);



    }


    vm.deselectLayer = function () {
        var arg = vm.default_tab;
        if (arg === 1 || arg === 2 || arg === 3 || arg === 4) {

            $('.user-list').css({ 'visibility': 'hidden' });
            $('.printable-holder').css({ 'overflow': 'hidden' });
            $('.user-box').removeClass('border');

        }
    }

    function setColor(color) {

        var code_obj = _.findWhere(vm.colors, { hex: color.substr(1, color.length) });

        var selected_shirt = _.findWhere(vm.shirts_in_styles, { id: vm.selectedShirt.id });
        _.each(selected_shirt.colors_available, function (color_extra) { color_extra.selected = false; });
        var modal_obj = _.findWhere(selected_shirt.colors_available, { color_id: code_obj.id });
        modal_obj.selected = true;

        vm.shirt_color = color;
    }


    var startTextAlign = function (i,side) {
        var e = $("#box" + i + side);

        var $height = e.height();
        var ph = e.parent().parent().height();
        var top = (ph - $height)/1.25;
        var $width = e.width();
        var pw = e.parent().parent().width();
        var left = (pw - $width) / 2;
        e.css('top', top + 'px');
        e.css('left', left + 'px');
    }


    $scope.$watch('files', function (newVal, oldVal) {

        $scope.upload($scope.files);
    });
    $scope.$watch('file', function (newVal, oldVal) {

        if ($scope.file != null) {
            $scope.files = [$scope.file];
        }
    });
    $scope.log = '';

    $scope.upload = function (files) {
        if (!vm.agreed) {

            vm.alert_invalid('custom-checkbox');
            return;

        }

        // var files  = this.files;
        var width = 0;
        var height = 0;
        var errors = "";
        var _URL = window.URL;
        if (!files) {
            errors += "File upload not supported by your browser.";
        }
        if (files && files[0]) {
            for(var i=0; i<files.length; i++) {
                var file = files[i];

                if ((element = files[0])) {
                    // 	debugger;
                    img = new Image();
                    img.onload = function () {
                        //	debugger;
                        console.log("Width:" + this.width + "   Height: " + this.height);
                        $scope.uWidth = this.width;
                        $scope.uHeight = this.height;
                        $scope.ratio = this.height/this.width;

                        if ( (/\.(png|jpeg|jpg|gif)$/i).test(file.name) ) {
                            //  readImage( file );
                        } else {
                            errors +="You can upload only JPG, GIF and PNG file types\n";
                            Alert(errors,"Incorrect File Type!");
                            return;
                        }

                        if(file.size>20971520 || file.size<15360){

                            errors+="File size should be between 15Kb and 20 MB\n";
                            Alert(errors, "Invalid File Size");
                            return;
                        }

                        if(file.size>15360 && file.size<204800){

                            //errors+=;
                            Alert("File size is very small, Print quality is not guaranteed.\nYou have uploaded a very small file, resizing will affect the print quality!", "Warning");
                        }

                        if((this.width>6000 || this.height>6000)|| (this.width<200 || this.height<200)){

                            errors+="Dimensions should be between 200x200 and 6000x6000\n";
                            Alert(errors, "Wrong Image dimensions!");
                            return;
                        }
                        // else if(this.width<500 || this.height<500){
                        //     Alert("The image you uploaded has low resolution, Please keep it in small size or upload an image of higher resolution.", "WARNING");
                        // }



                        if (errors) {
                            //Alert(errors);
                            return;
                        }
                        else send_to_server(files);


                    };
                    img.src = _URL.createObjectURL(element);


                }



                //  width =  files[0].width;
            }
        }
        //debugger;
        //	width;



        // debugger;

    };

    vm.test = function(){

        console.log("asdfg");

    }

    function send_to_server(files){

        if (files && files.length) {
            vm.is_uploading_file = true;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (!file.$error) {
                    var promise = Upload.upload({
                        url: baseURL + '/upload',
                        data: {
                            //  username: $scope.username,
                            image: file
                        }
                    }).then(function (resp) {

                        //  debugger;
                        vm.is_uploading_file = false;

                        if (resp.data.code != 200) {

                            Alert(resp.data.data);

                            return;

                        }

                        vm.customImageObj = resp.data.data;
                        vm.customImage = resp.data.data.path;


                        if (vm.default_tab === 1) {

                            var z_index = 1;
                            if (!vm.front_design.length) {
                                z_index = 1;
                            }
                            else {

                                // z_index = vm.front_design[vm.front_design.length - 1].z_index + 1;
                                //z_index = vm.front_design.length + 1;
                                z_index = _.max(vm.front_design,function(front){return front.z_index}).z_index + 1;
                            }





                            var obj = {
                                "type": "img",
                                "z_index": z_index,
                                "zIndex":z_index,
                                "src": vm.customImage,
                                "colors": resp.data.data.colors,
                                "svgwidth": 100 + "px",
                                "svgheight":100*$scope.ratio + "px",
                                "width": $scope.uWidth + "px",
                                "height":$scope.uHeight + "px",
                                "uuid": uuid()
                            }

                            console.log($scope.uWidth ,$scope.uHeight ,$scope.uHeight /$scope.uWidth );

                            vm.front_design.push(obj);


                            setTimeout(function(){

                                var e = $('#box' + z_index + "front");
                                var $width = e.width();
                                var $height = e.height();
                                e.css('width', $width);
                                e.css('height', $height);
                                var pw = e.parent().parent().width();
                                var left = (pw - $width) / 2;
                                var top = ((vm.selectedShirt.printable_front_height / 2) - parseFloat($scope.uHeight));
                                e.css('left', left + 'px');



                                var currentSvg = document.querySelectorAll('#box' + z_index + "front" + ' svg');


                                currentSvg[0].setAttributeNS(null, 'viewBox', '0 0 ' + $scope.uWidth + ' ' + $scope.uHeight);









                                vm.select_text(z_index);

                            },200)





                        }

                        if (vm.default_tab === 2) {

                            var z_index = 1;
                            if (!vm.back_design.length) {
                                z_index = 1;
                            }
                            else {

                                //z_index = vm.back_design[vm.back_design.length - 1].z_index + 1;
                                // z_index = vm.back_design.length + 1;
                                z_index = _.max(vm.back_design,function(back){return back.z_index}).z_index + 1;
                            }



                            var obj = {
                                "type": "img",
                                "z_index": z_index,
                                "zIndex":z_index,
                                "src": vm.customImage,
                                "colors": resp.data.data.colors,
                                "svgwidth": 100 + "px",
                                "svgheight":100*$scope.ratio + "px",
                                "width": $scope.uWidth + "px",
                                "height":$scope.uHeight + "px",
                                "uuid": uuid()
                            }

                            vm.back_design.push(obj);

                            setTimeout(function(){


                                var e = $('#box' + z_index + "back");
                                var $width = e.width();
                                var $height = e.height();
                                e.css('widht', $width);
                                e.css('height', $height);
                                var pw = e.parent().parent().width();
                                var left = (pw - $width) / 2;
                                var top = ((vm.selectedShirt.printable_front_height / 2) - parseFloat($scope.uHeight));
                                e.css('left', left + 'px');

                                var currentSvg = document.querySelectorAll('#box' + z_index + "back" + ' svg');


                                currentSvg[0].setAttributeNS(null, 'viewBox', '0 0 ' + $scope.uWidth + ' ' + $scope.uHeight);









                                vm.select_text(z_index);

                            },200)



                        }

                        if (vm.default_tab === 3) {
                            if(!vm.total_left_colors){
                                if(resp.data.data.colors.length>3)
                                    if(_.uniq(resp.data.data.colors).length>3){
                                        Alert("On each sleeve, you can add images/text with maximum 3 colors.", "Oops");
                                        return;
                                    }
                            }
                            else if(vm.total_left_colors.length+resp.data.data.colors.length>3){
                                    var temp = angular.copy(vm.total_left_colors);
                                    temp = temp.concat(resp.data.data.colors);
                                    temp = _.uniq(temp);
                                        if(temp.length>3){
                                        Alert("On each sleeve, you can add images/text with maximum 3 colors.", "Oops");
                                        return;
                                        }
                            }
                            var z_index = 1;
                            if (!vm.left_design.length) {
                                z_index = 1;
                            }
                            else {

                                //z_index = vm.left_design[vm.left_design.length - 1].z_index + 1;
                                // z_index = vm.left_design.length + 1;
                                z_index = _.max(vm.left_design,function(left){return left.z_index}).z_index + 1;
                            }



                            var obj = {
                                "type": "img",
                                "z_index": z_index,
                                "zIndex":z_index,
                                "src": vm.customImage,
                                "colors": resp.data.data.colors,
                                "svgwidth": 100 + "px",
                                "svgheight":100*$scope.ratio + "px",
                                "width": $scope.uWidth + "px",
                                "height":$scope.uHeight + "px",
                                "uuid": uuid()
                            }

                            vm.left_design.push(obj);
                            setTimeout(function(){

                                var e = $('#box' + z_index + "left");
                                var $width = e.width();
                                var $height = e.height();
                                e.css('widht', $width);
                                e.css('height', $height);
                                var pw = e.parent().parent().width();
                                var left = (pw - $width) / 2;
                                var top = ((vm.selectedShirt.printable_front_height / 2) - parseFloat($scope.uHeight));
                                e.css('left', left + 'px');

                                var currentSvg = document.querySelectorAll('#box' + z_index + "left" + ' svg');
                                currentSvg[0].setAttributeNS(null, 'viewBox', '0 0 ' + $scope.uWidth + ' ' + $scope.uHeight);









                                vm.select_text(z_index);

                            },200)



                        }

                        else if (vm.default_tab === 4) {
                            if(!vm.total_right_colors){
                                if(resp.data.data.colors.length>3)
                                    if(_.uniq(resp.data.data.colors).length>3){
                                        Alert("On each sleeve, you can add images/text with maximum 3 colors.", "Oops");
                                        return;
                                    }
                            }
                            else if(vm.total_right_colors.length+resp.data.data.colors.length>3){
                                    var temp = angular.copy(vm.total_right_colors);
                                    temp = temp.concat(resp.data.data.colors);
                                    temp = _.uniq(temp);
                                        if(temp.length>3){
                                        Alert("On each sleeve, you can add images/text with maximum 3 colors.", "Oops");
                                        return;
                                        }
                            }

                            var z_index = 1;
                            if (!vm.right_design.length) {
                                z_index = 1;
                            }
                            else {

                                // z_index = vm.right_design[vm.right_design.length - 1].z_index + 1;
                                //z_index = vm.right_design.length + 1;
                                z_index = _.max(vm.right_design,function(right){return right.z_index}).z_index + 1;
                            }



                            var obj = {
                                "type": "img",
                                "z_index": z_index,
                                "zIndex":z_index,
                                "src": vm.customImage,
                                "colors": resp.data.data.colors,
                                "svgwidth": 100 + "px",
                                "svgheight":100*$scope.ratio + "px",
                                "width": $scope.uWidth + "px",
                                "height":$scope.uHeight + "px",
                                "uuid": uuid()
                            }

                            vm.right_design.push(obj);

                            setTimeout(function(){

                                var e = $('#box' + z_index + "right");
                                var $width = e.width();
                                var pw = e.parent().parent().width();
                                var left = (pw - $width) / 2;
                                var top = ((vm.selectedShirt.printable_front_height / 2) - parseFloat($scope.uHeight));
                                e.css('left', left + 'px');


                                var currentSvg = document.querySelectorAll('#box' + z_index + "right" + ' svg');


                                currentSvg[0].setAttributeNS(null, 'viewBox', '0 0 ' + $scope.uWidth + ' ' + $scope.uHeight);









                                vm.select_text(z_index);

                            },500)



                        }


                        // if(vm.front_design)
                        // var z_index = vm.front_design[vm.front_design.length - 1].z_index + 1;
                        // vm.front_design.push(
                        //     {
                        //         "type": "img",
                        //         "z_index": z_index,
                        //         "src": vm.customImage,
                        //         "width": vm.customImageObj.image_width + "px",
                        //         "height": vm.customImageObj.image_height + "px"
                        //     });



                    }, null, function (evt) {
                        // return;
                        // var progressPercentage = parseInt(100.0 *
                        //     evt.loaded / evt.total);
                        // $scope.log = 'progress: ' + progressPercentage +
                        //     '% ' + evt.config.data.file.name + '\n' +
                        //     $scope.log;
                    });
                }

            }
        }


    }



    function add_style() {
        viewOptionsModal.$promise.then(viewOptionsModal.show);
    }




    /*
        MODALS

    */

    var viewOptionsModal = $modal({
        scope: $scope,
        animation: 'am-fade-and-scale',
        placement: 'center',
        template: 'NgApp/Home/VIews/viewOptions.html',
        show: false,
        title: 'Select Product'
    });

    var viewShirtColors = $modal({
        scope: $scope,
        animation: 'am-fade-and-scale',
        placement: 'center',
        template: 'NgApp/Home/VIews/setShirtColors.html',
        show: false,
        title: 'Select Colors'
    });



    /* END MODALS */









    $scope.class = function () {
        return "animated fadeInDown";


    };

    function getRandomInAnimations() {

        return 'animated ' + AnimationService.GetRandomInAnimation();

    }

    function show_toolbar() {
        $('.ta-toolbar').css('display', 'inline-block');
        $('.ta-toolbar').addClass('animated fadeInDown');

    }

    function hide_toolbar() {

        $('.ta-toolbar').css('display', 'none');


    }

    function alert_invalid(arg) {

        var animation = AnimationService.GetRandomInAnimation();
        $('.' + arg).addClass("animated " + animation).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('animated ' + animation);
        });
    }


    function loadCategories() {

        DashboardService.GetCategories().then(function (data) {

            vm.categories = data.data;

        });

    }


    function init() {

        $scope.serverURL = serverURL;
        vm.default_tab = 1;
        vm.default_design_tab = 1;
        vm.designSelected = false;



        loadCategories();
        vm.tags = [];

        vm.time_array = [];
        for (var i = 1; i <= 15; i++) {
            vm.time_array.push(addDays(i + 6));
        }

        vm.imageURL = imageURL;
        vm.graphicsURL = graphicsURL;
        loadShirtStyle();
        loadGraphics();
        // loadFonts();
        googleFonts();
        init_shirt_drawings();
        is_zoomed = false;
        vm.shirt_color = {};
        getColors();
        vm.filtered_colors = [];
        vm.graphics = [];
        loadConfig();
        vm.base_cost = {};
        vm.total_front_colors = [];
        vm.total_back_colors = [];
        vm.total_left_colors = [];
        vm.total_right_colors = [];
        vm.total_shirt_colors = 0;

        vm.is_searching = false;
        vm.search_results = [];
        vm.search_page = 1;
        init_predefined_categories();
        vm.selected_text = {};
        vm.selected_text.color = '#000000';
        vm.is_loading_graphics = false;
        search_query = '';

        $rootScope.target_state = 'home.create';
        $state.go('home.create');
        get_browser();
    }

    init();

    function get_browser(){

        if (!!window.chrome && !!window.chrome.webstore) {
            vm.browser = "chrome";
            //document.write('<'+'link rel="stylesheet" href="../component/chromeCSSStyles.css" />');
        } else if (typeof InstallTrigger !== 'undefined') {
            vm.browser = "firefox";
            // document.write('<'+'link rel="stylesheet" href="../component/mozillaStyles.css" />');
        } else if ( /*@cc_on!@*/false || !!document.documentMode) {
            //document.write('<'+'link rel="stylesheet" href="../component/explorerStyles.css" />');
            vm.browser = "ie";
        }

        else vm.browser = "general";


    }

    vm.add_rotate_goal = function(){
        //debugger;
        $('#target4').rotatable({
            rotationCenterX: 50.0,
            rotationCenterY: 50.0,
            handle: $("#shirt_rotater"),

            rotate: function(event, ui) {

                //console.log(	((radToDegree (ui.angle.current )) ));

                var ending	= radToDegree(ui.angle.current);
                if((ending <1)){

                    ending = 360+ending;
                    //debugger;
                    //vm.goal_target;


                }

                rotate_goal(1, ending);

                // mark the ticks
                // $('.tick').removeClass('activetick');
                // $('.tick').slice(0,(ang / 10 ) + 1 ).addClass('activetick');
                // // make knob stop at 270 deg ??
                // if( ang > 270 ){
                // 	// this one makes me lost?
                // 	knob.rotatable('disable');
                // }
                // display the value
                //	var pc = Math.round((ang/270)*100);
                //	$('.current-value').text(pc+'%, angle: ' + ang);

            },
            // start: function(event, ui){

            // 	ui.angle.start;

            // },
            stop: function(event, ui){
                vm.validate_goal_value();

            }
        });

        function radToDegree(angle){

            return angle * (180 / Math.PI);
            //return rad * 57.2958;

        }

        //$('#target3').resizable().rotatable(); $('#draggable3').draggable();

        // $('#goal_handler').rotatable();

        //	$("#goal").rotatable();
        //   $('#target4').rotatable({
        // rotationCenterX: 11.0,
        //       rotationCenterY: 48.0,
        //       handle: $("#shirt_rotater")
        //   });

    }

    $rootScope.$on('event:social-sign-in-success', function(event, userDetails){

        vm.socialCred = userDetails;
        vm.login(1);


    })

    // SHORTCUT FUNCTIONS

    // hotkeys.add({del: delete_layer, 'ctrl+shift+1':select_product_panel, 'ctrl+shift+2':select_graphics_panel, 'ctrl+shift+3':select_text_panel, 'ctrl+shift+4':select_file_panel});

    $rootScope.short_keys = [

    {
        "combination": "Del",
        "description": "Delete Selected Layer (Design page)"
    },
    {
        "combination": "ctrl+shift+1",
        "description": "Go to 'Select Product' portion (Design page)"
    },
    {
        "combination": "ctrl+shift+2",
        "description": "Go to 'Arts' portion (Design page)"
    },
    {
        "combination": "ctrl+shift+3",
        "description": "Go to 'Text' portion (Design page)"
    },
    {
        "combination": "ctrl+shift+4",
        "description": "Go to 'Upload' portion (Design page)"
    },
    {
        "combination": "shift+1",
        "description": "Go to Create page"
    },
    {
        "combination": "shift+2",
        "description": "Go to Set Goal page"
    },
    {
        "combination": "shift+3",
        "description": "Go to Campaign Details page"
    }
   //  },
   //  {
   //  	"combination": "shift+p",
   //  	"description": "Select additional products (set goal page)"
   //  }
    ];

    // ROUTE SHORTCUTS

    $scope.go_goal = function(){

        $state.go('home.goal');

    }
    $scope.go_create = function(){

        $state.go('home.create');

    }

    $scope.go_desc = function(){

        $state.go('home.description');

    }

    $scope.toggleCheats = function(){
        //swbugger;
        //$rootScope.showCheats = !$rootScope.showCheats;

        //   	if($rootScope.showCheats){

        cheatSheetModal.$promise.then(cheatSheetModal.show);

        // 	}



    }


    // END ROUTE SHORTCUTS


    //CREATE SHORTCUTS
    //select_product

    $scope.transform = function(){

        //    	debugger;

        vm.select_text(vm.selected_text.z_index);

    }

    $scope.delete_layer = function(){
        //debugger;
        if($rootScope.target_state=='home.create'){

            if(vm.selected_text){

                vm.deleteLayer(vm.selected_text.z_index);

            }


        }


    }

    $scope.select_product_panel = function(){

        if($rootScope.target_state=='home.create'){

            vm.set_design_tab(1);


        }


    }

    $scope.select_graphics_panel = function(){

        if($rootScope.target_state=='home.create'){

            vm.set_design_tab(2);


        }


    }


    $scope.select_text_panel = function(){

        if($rootScope.target_state=='home.create'){

            vm.set_design_tab(3);


        }


    }

    $scope.select_file_panel = function(){

        if($rootScope.target_state=='home.create'){

            vm.set_design_tab(4);


        }


    }


    //CREATE SHORTCUTS END


    // GOAL SHORTCUTS

    $scope.select_products = function(){

        if($rootScope.target_state=='home.goal'){

            //vm.set_design_tab(4);
            vm.select_products();

        }

    }


    // END GOAL SHORTCUTS


    // SHORTCUTS END



    // $scope.$watch('vm.selectedShirt', function(oldVal, newVal){

    //     vm.base_cost.shirt_cost = vm.shirt_color;


    // });



    function init_predefined_categories() {
        vm.predefined_categories =  vm.predefined_categories = [
             "Bones-stoke",
             "Adventure-and-travel-color",
             "Airplanes",
             "Airports-icons",
             "American-football",
             "Animal-compilation",
             "Arrow",
             "Autumn",
             "Babe-icon-set",
             "Baby",
             "Back-to-school",
             "Beauty",
             "Beauty-spa",
             "Beliefs-symbols",
             "Birds-species",
             "Birthday-party",
             "Brazil",
             "Browsers",
             "Business",
             "Business-and-office",
             "Business-seo",
             "Camping",
             "Carootns",
             "Cars",
             "Castles",
             "Cat-set",
             "Character",
             "Charity",
             "Chemistry",
             "China",
             "Christmas",
             "Cinema",
             "Circle-medicine",
             "Circles-hospital-color",
             "Circus",
             "City-element",
             "Clothes-and-footwear",
             "Clothes-stroke",
             "Cloud-",
             "Color-seo",
             "Communication",
             "Computer-security",
             "Construction",
             "Country-flags",
             "Currencies",
             "Cute-animal",
             "Design-tools",
             "Devices",
             "Dialogue-assets",
             "Dinosaur",
             "Disco-music",
             "Ecommerce",
             "Education",
             "Electronics",
             "Emoticons",
             "Essential",
             "Expressions",
             "Fairy-tale-set",
             "Farm-element",
             "File-type-and-content",
             "File-types",
             "Filled-feathers",
             "Filled-management",
             "Finance",
             "Flags",
             "Flamenco-dance",
             "Flowers",
             "Food",
             "Food-and-restaurant",
             "Forest-animals",
             "Fruit-and-vegetable-juice",
             "Fruits-pack",
             "Furniture-and-decoration",
             "Furniture-and-household",
             "Game-assets",
             "Gardening",
             "Gastronomy-set",
             "Glypho",
             "Hairdressing",
             "Hand-and-gesture-",
             "Hand-drawn-toys",
             "Hawcons-emoji-stroke",
             "Healthy-lifestyle",
             "Heartbeat",
             "High-school",
             "Horses-",
             "Hospital",
             "Human-body",
             "Interaction-assets",
             "Interface",
             "Ios7-set-lined-",
             "Keyholes",
             "Kids",
             "Kids-avatars",
             "Landmarks",
             "Landscapes",
             "Logogram",
             "Logotypes",
             "Marketing",
             "Medals",
             "Medical",
             "Medicine-color",
             "Miscellaneous",
             "Moon-phase",
             "Multimedia-",
             "Music-",
             "Musical-genres",
             "My-town-public-buildings",
             "Nature-flat-color",
             "New-business",
             "News",
             "Office",
             "Peace",
             "People-culture",
             "Photo-",
             "Picnic-and-bbq-icons",
             "Pokemon-go",
             "Pregnancy",
             "Printing",
             "Productivity-",
             "Professions-avatars",
             "Rating-and-vadilation-set",
             "Real-estate",
             "Religion",
             "Sacred-geometry",
             "School",
             "Science",
             "Science-icons",
             "Scientifics-study",
             "Sea-life",
             "Secret-service",
             "Security",
             "Seo-and-online-marketing",
             "Settings-and-display-set",
             "Shopping",
             "Sleep-time",
             "Snowflakes-set",
             "Social-icons-rounded",
             "Social-media",
             "Space",
             "Sports",
             "Sports-flat-color",
             "Star-set",
             "Startups-and-new-business",
             "Summer-fruits",
             "Summer-holiday",
             "Summertime-",
             "Summertime-vacations",
             "Sun-icon-",
             "Symbol",
             "Tatoo",
             "Technology",
             "The-ultimate",
             "Toys",
             "Transportation",
             "Travel",
             "Travel-and-tourism",
             "Travel-and-transportation",
             "Trohies",
             "Ui",
             "Universe",
             "User-interface",
             "Valentines",
             "Water",
             "Weather",
             "Web-buttons",
             "Web-design",
             "Web-interface",
             "Web-navigation-line-craft",
             "Wedding",
             "Yoga-poses",
             "Young-avatar",
             "Zodiac",
             "Abstract",
             "Air",
             "Airplane",
             "Angels",
             "Animal",
             "Anniversary",
             "Archery",
             "Army",
             "Arrows",
             "Arts",
             "Autumn",
             "Aztec",
             "Baby",
             "Basketball",
             "Beer",
             "Bees",
             "Bike",
             "Birds",
             "Birthday",
             "Boat",
             "Body",
             "Bomb",
             "Boy",
             "Burgers",
             "Bus",
             "Camping",
             "Cancer",
             "Car",
             "Cartoons",
             "Cat",
             "Characters",
             "Chevron",
             "Child",
             "Christmas",
             "Church",
             "Circus",
             "Clouds",
             "Cocktail",
             "Coffee",
             "Colors",
             "Comedy",
             "Computers",
             "Cream",
             "Cricket",
             "Cross",
             "Crown",
             "Culture",
             "Cycle",
             "Cycling",
             "David",
             "Day",
             "Deer",
             "Designs",
             "Diwali",
             "Dog",
             "Dolphin",
             "Drink",
             "Eagle",
             "Earth",
             "Easter",
             "Eid",
             "Elements",
             "Emoji",
             "English",
             "Entertainments",
             "Family",
             "Father's",
             "Festival",
             "Fire",
             "Fish",
             "Fishing",
             "Flags",
             "Floral",
             "Flowers",
             "Food",
             "Football",
             "Freedom",
             "Friendship",
             "Fundraise",
             "Funny",
             "Games",
             "Girl",
             "Golf",
             "Grass",
             "Gun",
             "Halloween",
             "Health",
             "Helicopter",
             "Hiking",
             "Hindu",
             "Hockey",
             "Horse",
             "Human",
             "Hunger",
             "Hunting",
             "Ice",
             "Illustrations",
             "Independence",
             "International",
             "Islam",
             "Jesus",
             "Juice",
             "King",
             "Labor",
             "Language",
             "Leaf",
             "Lion",
             "Love",
             "Man",
             "Mask",
             "Medals",
             "Media",
             "Military",
             "Milk",
             "Mobile",
             "Monkey",
             "Monuments",
             "Mother's",
             "Movies",
             "Music",
             "Nature",
             "Navy",
             "New",
             "Ocean",
             "Olympic",
             "Organic",
             "Owl",
             "Parrots",
             "Party",
             "Pasta",
             "Patterns",
             "Peace",
             "People",
             "Phones",
             "Pizza",
             "Place",
             "Plants",
             "Poetry",
             "Queen",
             "Ramadan",
             "Religion",
             "Rescue",
             "Rice",
             "Rights",
             "Salad",
             "Sandwich",
             "Scooter",
             "Ships",
             "Skateboarding",
             "Snowboarding",
             "Soccer",
             "Social",
             "Soda",
             "Soldiers",
             "Spaceship",
             "Speech",
             "Sports",
             "Spring",
             "Star",
             "Steres",
             "Summer",
             "Surfing",
             "Tanks",
             "Taxi",
             "Tea",
             "Technology",
             "Telephones",
             "Televisions",
             "Temple",
             "Textures",
             "Tigers",
             "Tile",
             "Torah",
             "Tourism",
             "Train",
             "Transportation",
             "Tree",
             "Tribal",
             "Truck",
             "Typography",
             "Valentine",
             "Water",
             "Wedding",
             "Wheat",
             "Whiskey",
             "Wine",
             "Winter",
             "Woman",
             "World",
             "Youth",
             "Bones-filled",
             "Force",
             "Year",
             "Events",
             "Computer",
             "Fighter",
             "Checkmark",
             "Swan",
             "Motorcycle",
             "Happy",
             "Candy",
             "House",
             "Baseball",
             "Statue",
             "Chat",
             "Chinese",
             "Cars",
             "Thermometer",
             "Two",
             "Antelope",
             "Bricklaying",
             "Killer",
             "Monster",
             "Informal",
             "Diamonds",
             "Female",
             "Robot",
             "Guy",
             "Headphones",
             "Tray",
             "Rebel",
             "Bulldog",
             "Teapot",
             "Texas",
             "Exercising",
             "Life",
             "CD",
             "Airspray",
             "Rifle",
             "Bird",
             "Panther",
             "Concert",
             "Gas",
             "Hamburg",
             "Left",
             "Up",
             "Trophy",
             "Musical",
             "Bat",
             "BBQ",
             "Ostrich",
             "Lemon",
             "Surfer",
             "Decorative",
             "Bonnet",
             "Trailer",
             "Frenetic",
             "San",
             "Pattern",
             "Grad",
             "Great",
             "Sax",
             "Alarm",
             "Stingray",
             "Wrench",
             "Paper",
             "Grunge",
             "Windmill",
             "Blues",
             "Tuxedo",
             "Beaver",
             "Frog",
             "Electric",
             "Sled",
             "No",
             "Sunglasses",
             "Flame",
             "Mustang",
             "Hot",
             "Dragon",
             "American",
             "Chef",
             "Crab",
             "Desserts",
             "Figure",
             "Pirate",
             "Scissors",
             "Leopard",
             "Bulgaria",
             "Hand",
             "Ship",
             "Boombox",
             "Big",
             "Turtle",
             "Presants",
             "Sun",
             "School",
             "Kisses",
             "Alien",
             "Key",
             "Steyr",
             "Scuba",
             "Hannukah",
             "Religious",
             "Luger",
             "Silverware",
             "Mongolia",
             "Check",
             "Merry",
             "Shark",
             "Barber",
             "Sweden",
             "Turkey",
             "Gift",
             "Leaning",
             "Camera",
             "Trash",
             "Senegal",
             "Cube",
             "Skateboarder",
             "Slug",
             "IPad",
             "Elephant",
             "Clam",
             "Yacht",
             "Throwing",
             "Germany",
             "Roaring",
             "Uruguay",
             "Violin",
             "Clown",
             "Wings",
             "Beetle",
             "Violinist",
             "Earrings",
             "Blower",
             "Snowflake8",
             "Paintball",
             "Large",
             "Bicycle",
             "Pepper",
             "Handcuff",
             "Rhino",
             "Mime",
             "Cactus",
             "Oil",
             "Pinata",
             "Healthy",
             "Sassy",
             "Anchor",
             "Cupids",
             "Saxophone",
             "Light",
             "Wake",
             "Cougar",
             "Utencils",
             "Bee",
             "Pyramid",
             "Libya",
             "Magnet",
             "Drummer",
             "Viking",
             "Corner",
             "Raccoon",
             "Dress",
             "Pumpkin",
             "USA",
             "Parachute",
             "Stopwatch",
             "Kid",
             "Stars",
             "Railroad",
             "Kangaroo",
             "Diving",
             "Chess",
             "Howling",
             "Ping",
             "Stag",
             "Guitar",
             "Bass",
             "Strawberry",
             "Zebra",
             "Tan",
             "Graduate",
             "Space",
             "Mouse",
             "Eye",
             "Male",
             "Skull",
             "Beachball",
             "Shaking",
             "Fleur",
             "Butterfly",
             "Package",
             "Oven",
             "Fork",
             "Wreath",
             "Golfer",
             "Lights",
             "Fireworks",
             "Scorpion",
             "Farm",
             "Drum",
             "Longhorn",
             "Tongs",
             "Witch",
             "Okapi",
             "AmericanFlag2",
             "RPG",
             "MP40",
             "Flask",
             "Person",
             "Revolver",
             "Curling",
             "Submarine",
             "Triple",
             "Cell",
             "Pistol",
             "Cheerleading",
             "Free",
             "Dradle",
             "Cyprus",
             "Ornament8",
             "AmericanFlag",
             "Briefcase",
             "Television",
             "Carabiner",
             "Oboe",
             "Hard",
             "Original",
             "Men",
             "UFO",
             "Martini",
             "Binky",
             "Ornament",
             "Cheerleader",
             "Symbol",
             "Madrid"
        ];


    }



    vm.search_arts = function () {
        vm.arts_not_found = false;
        vm.search_page = 1;
        if (!vm.search_graphics || (vm.search_graphics).trim().length == 0) {
            vm.is_searching = false;
            vm.search_page = 1;
            vm.search_results = [];

            return;


        }
        else {
            if (search_query != vm.search_graphics) {
                vm.search_page = 1;
                vm.search_results = [];
            }
            vm.is_searching = true;
            vm.is_loading_graphics = true;
            DashboardService.SearchArts(vm.search_graphics, vm.search_page).then(function (data) {
                if (!data.data.length) {
                    vm.arts_not_found = true;
                    vm.is_loading_graphics = false;
                    return;
                }
                search_query = angular.copy(vm.search_graphics);
                vm.search_results = data.data;
                vm.search_page++;
                vm.arts_not_found = false;
                vm.is_loading_graphics = false;

            });

        }

    }

    vm.search_more = function () {
        vm.arts_not_found = false;

        vm.is_searching = true;
        if (search_query.toLowerCase() != vm.search_graphics.toLowerCase()) {
            vm.search_page = 1;
            vm.search_results = [];
        }
        vm.is_loading_graphics = true;
        DashboardService.SearchArts(vm.search_graphics, vm.search_page).then(function (data) {
            vm.is_loading_graphics = false;
            if (!data.data.length) {
                vm.arts_not_found = true;
                return;
            }
            vm.search_results = vm.search_results.concat(data.data);
            vm.search_page++;
            vm.arts_not_found = false;

        });



    }

    vm.validate_profit = function (profit, shirt) {
        //debugger;
        $timeout(function () {
            // debugger;

            if (profit && profit < 1) {
                shirt.profit = 1;



            }

            if (profit && profit > 10000) {
                shirt.profit = 10000;



            }
            if (!shirt.profit) shirt.profit = 1;

            vm.calculate_total_shirt_cost(shirt);

            if(!$scope.$$phase) $scope.$apply();

        }, 100);


    }

    vm.validate_search = function (e) {
        // debugger;
        e.preventDefault();
        if (!vm.search_graphics || (vm.search_graphics).trim().length == 0) {
            vm.is_searching = false;
            vm.search_page = 1;
            return;

        }
        else if (e.keyCode == '13') {
            vm.search_arts();
        }

    }

    $scope.$watch('vm.shirt_color', function (newVal, oldVal) {
        if (newVal == oldVal) return;
        //  debugger;
        var color_val = vm.shirt_color.substr(1, vm.shirt_color.length - 1);

        var _color_id = _.findWhere(vm.colors, { hex: color_val }).id;
        vm.base_cost.blank_cost = parseFloat(_.findWhere(vm.selectedShirt.colors_available, { color_id: _color_id }).blank_cost);
        //calculate_total_color_cost();
        //calculate_unit_cost();
        vm.calculate_total_shirt_cost();

    });

    $scope.$watch('vm.selectedShirt', function (newVal, oldVal) {
        if (newVal == oldVal) return;
        setTimeout(function () {

            var color_val = vm.shirt_color.substr(1, vm.shirt_color.length - 1);
            var _color_id = _.findWhere(vm.colors, { hex: color_val }).id;
            vm.base_cost.blank_cost = parseFloat(_.findWhere(vm.selectedShirt.colors_available, { color_id: _color_id }).blank_cost);
            //calculate_total_color_cost();
            vm.calculate_total_shirt_cost();

        }, 500);


    });

    function calculate_front() {
        //   debugger;
        vm.total_front_colors = [];
        var front_colors = 0;
        if (!vm.front_design.length) { vm.total_front_colors = []; return; }
        angular.forEach(vm.front_design, function (obj, count) {

            if (obj.type == 'svg') {

                var original = _.where(vm.graphics, { id: obj.id })[0];
                if (original.colors) {

                    var colors_array = original.colors.split(",");
                    add_to_colors(1, colors_array);

                }

            }
            else if (obj.type == "img") {

                add_to_colors(1, obj.colors);
            }
            else if (obj.type == "text") {
                var arr = [];
                arr[0] = obj.color;
                add_to_colors(1, arr);
            }

        });
    }

    function calculate_back() {
        vm.total_back_colors = [];
        var back_colors = 0;
        if (!vm.back_design.length) { vm.total_back_colors = []; return; }
        angular.forEach(vm.back_design, function (obj, count) {

            if (obj.type == 'svg') {

                var original = _.where(vm.graphics, { id: obj.id })[0];
                if (original.colors) {

                    var colors_array = original.colors.split(",");
                    add_to_colors(2, colors_array);

                }

            }
            else if (obj.type == "img") {

                add_to_colors(2, obj.colors);
            }
            else if (obj.type == "text") {
                var arr = [];
                arr[0] = obj.color;
                add_to_colors(2, arr);
            }

        });
    }

    function calculate_left() {
        vm.total_left_colors = [];
        var left_colors = 0;
        if (!vm.left_design.length) { vm.total_left_colors = []; return; }
        angular.forEach(vm.left_design, function (obj, count) {

            if (obj.type == 'svg') {

                var original = _.where(vm.graphics, { id: obj.id })[0];
                if (original.colors) {

                    var colors_array = original.colors.split(",");
                    add_to_colors(3, colors_array);

                }

            }
            else if (obj.type == "img") {

                add_to_colors(3, obj.colors);
            }
            else if (obj.type == "text") {
                var arr = [];
                arr[0] = obj.color;
                add_to_colors(3, arr);
            }

        });
    }

    function calculate_right() {
        vm.total_right_colors = [];
        var right_colors = 0;
        if (!vm.right_design.length) { vm.total_right_colors = []; return; }
        angular.forEach(vm.right_design, function (obj, count) {

            if (obj.type == 'svg') {

                var original = _.where(vm.graphics, { id: obj.id })[0];
                if (original.colors) {

                    var colors_array = original.colors.split(",");
                    add_to_colors(4, colors_array);

                }

            }
            else if (obj.type == "img") {

                add_to_colors(4, obj.colors);
            }
            else if (obj.type == "text") {
                var arr = [];
                arr[0] = obj.color;
                add_to_colors(4, arr);
            }

        });
    }

    $scope.$watchCollection('vm.front_design', function (newVal, oldVal) {
        if (newVal == oldVal) return;

        calculate_total_front_colors();

    }, true);

    function calculate_total_front_colors() {

        //  var front_colors = 0;
        vm.total_front_colors = [];
        angular.forEach(vm.front_design, function (obj, count) {
            //   debugger;
            if (obj.type == 'svg') {

                var original = _.where(vm.graphics, { id: obj.id })[0];
                if (original.colors) {

                    var colors_array = original.colors.split(",");
                    add_to_colors(1, colors_array);

                }

            }
            else if (obj.type == "img") {

                add_to_colors(1, obj.colors);
            }
            else if (obj.type == "text") {
                var arr = [];
                arr[0] = obj.color;
                add_to_colors(1, arr);
            }

        });
    }

    $scope.$watch('vm.back_design', function (newVal, oldVal) {
        if (newVal == oldVal) return;
        // debugger;

        calculate_total_back_colors();



    }, true);


    function calculate_total_back_colors() {
        vm.total_back_colors = [];
        angular.forEach(vm.back_design, function (obj, count) {

            if (obj.type == 'svg') {

                var original = _.where(vm.graphics, { id: obj.id })[0];
                if (original.colors) {

                    var colors_array = original.colors.split(",");
                    add_to_colors(2, colors_array);

                }

            }
            else if (obj.type == "img") {

                add_to_colors(2, obj.colors);
            }
            else if (obj.type == "text") {
                var arr = [];
                arr[0] = obj.color;
                add_to_colors(2, arr);
            }
        });

    }


    $scope.$watch('vm.left_design', function (newVal, oldVal) {
        if (newVal == oldVal) return;
        // debugger;
        //  var front_colors = 0;
        calculate_total_left_colors();

    }, true);

    function calculate_total_left_colors() {
        vm.total_left_colors = [];
        angular.forEach(vm.left_design, function (obj, count) {

            if (obj.type == 'svg') {

                var original = _.where(vm.graphics, { id: obj.id })[0];
                if (original.colors) {

                    var colors_array = original.colors.split(",");
                    add_to_colors(3, colors_array);

                }

            }
            else if (obj.type == "img") {

                add_to_colors(3, obj.colors);
            }
            else if (obj.type == "text") {
                var arr = [];
                arr[0] = obj.color;
                add_to_colors(3, arr);
            }

        });


    }

    $scope.$watch('vm.right_design', function (newVal, oldVal) {
        if (newVal == oldVal) return;
        // debugger;
        //  var front_colors = 0;
        calculate_total_right_colors();

    }, true);

    function calculate_total_right_colors() {
        vm.total_right_colors = [];
        angular.forEach(vm.right_design, function (obj, count) {

            if (obj.type == 'svg') {

                var original = _.where(vm.graphics, { id: obj.id })[0];
                if (original.colors) {

                    var colors_array = original.colors.split(",");
                    add_to_colors(4, colors_array);

                }

            }
            else if (obj.type == "img") {

                add_to_colors(4, obj.colors);
            }
            else if (obj.type == "text") {
                var arr = [];
                arr[0] = obj.color;
                add_to_colors(4, arr);
            }

        });


    }




    $scope.$watch('vm.total_front_colors', function (newVal, oldVal) {

        if (newVal == oldVal) return;
        vm.total_shirt_colors = vm.total_front_colors.length + vm.total_back_colors.length + vm.total_left_colors.length + vm.total_right_colors.length;

        vm.calculate_total_shirt_cost();

    });

    $scope.$watch('vm.total_back_colors', function (newVal, oldVal) {
        if (newVal == oldVal) return;
        vm.total_shirt_colors = vm.total_front_colors.length + vm.total_back_colors.length + vm.total_left_colors.length + vm.total_right_colors.length;


        vm.calculate_total_shirt_cost();
    });

    $scope.$watch('vm.total_left_colors', function (newVal, oldVal) {
        if (newVal == oldVal) return;
        vm.total_shirt_colors = vm.total_front_colors.length + vm.total_back_colors.length + vm.total_left_colors.length + vm.total_right_colors.length;


        vm.calculate_total_shirt_cost();

    });
    $scope.$watch('vm.total_right_colors', function (newVal, oldVal) {
        if (newVal == oldVal) return;
        vm.total_shirt_colors = vm.total_front_colors.length + vm.total_back_colors.length + vm.total_left_colors.length + vm.total_right_colors.length;

        vm.calculate_total_shirt_cost();


    });

    $scope.$watch('vm.total_shirt_colors', function (newVal, oldVal) {
        if (newVal == oldVal) return;
        //  vm.total_shirt_colors = vm.total_front_colors.length + vm.total_back_colors.length + vm.total_left_colors.length + vm.total_right_colors.length;
        vm.calculate_total_shirt_cost();


    });
    $scope.$watch('vm.goal_target', function (newVal, oldVal) {
        if (newVal == oldVal) return;
        //  vm.total_shirt_colors = vm.total_front_colors.length + vm.total_back_colors.length + vm.total_left_colors.length + vm.total_right_colors.length;
        setTimeout(function () {
            vm.calculate_total_shirt_cost();
        }, 500);



    });
    //shirt.profit

    $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams, options) {

          //  event.preventDefault();
          //debugger;


          if (get_total_design_count() <= 0) {
              Alert("Please design at least one side before going to next screen.");
              //$state.go('home.create');
              //$location.path("/home/create");

              event.preventDefault();
              $rootScope.target_state = 'home.create';
              //$state.transitionTo('home.create');
              return;

          }
          if(toState.name=='home.goal'){
              $rootScope.met_goal = true;
              // $rootScope.met_goal = true;

              var shirt = _.findWhere(vm.shirts_in_styles, {id:vm.selectedShirt.id});

              //shirt.is_default = true;

              var hex = vm.shirt_color.substring(1,vm.shirt_color.length);

              _.each(vm.shirts_in_styles, function(_shirt){
                  //debugger;

                  if(shirt == _shirt)
                      shirt.is_default = true;
                  else shirt.is_default = false;

              });

              var color_id = 	_.findWhere(vm.colors, {hex:hex});

              var _color = _.findWhere(shirt.colors_available, {color_id:color_id.id});

              _.each(shirt.colors_available, function(color){
                  //debugger;

                  if(color == _color)
                      color.is_default = true;
                  else color.is_default = false;

              });

              shirt.colors_available.splice(shirt.colors_available.indexOf(_color), 1);

              shirt.colors_available.unshift(_color);

              vm.shirts_in_styles.splice(vm.shirts_in_styles.indexOf(shirt), 1);
              vm.shirts_in_styles.unshift(shirt);

                vm.setStyle();
          }

          if (fromState.name == 'home.create') {

              if (toState.name == 'home.description' && !$rootScope.met_goal) {

                  event.preventDefault();
                  $rootScope.target_state = 'home.goal';
                  $state.go('home.goal');
                  //alert("You need to set the goal before you add description.");
                  Alert("You need to set the goal before you add description.");

              }


          }
      });

    function get_total_design_count(){

        var front_count = vm.front_design.length;
        var back_count = vm.back_design.length;
        var left_count = vm.left_design.length;
        var right_count = vm.right_design.length;



        var total = front_count+back_count+left_count+right_count;

        if(vm.selectedShirt.left==0){
            total = total-left_count;
        }

        if(vm.selectedShirt.right==0){
            total = total-right_count;
        }

        if(vm.selectedShirt.back==0){
            total = total-back_count;
        }

        return total;

    }


    $rootScope.$on('$stateChangeSuccess',
      function (event, toState, toParams, fromState, fromParams, options) {


          window.scrollTo(0, 0);

      });




    function calculate_total_color_cost(arg) {
        // debugger;

        var front = (vm.total_front_colors.length > 8) ? 8 : vm.total_front_colors.length;
        var back = (vm.total_back_colors.length > 8) ? 8 : vm.total_back_colors.length;
        var left = (vm.total_left_colors.length > 3) ? 3 : vm.total_left_colors.length;
        var right = (vm.total_right_colors.length > 3) ? 3 : vm.total_right_colors.length;

        if (arg && arg.left != 1) {
            left = 0;
            right = 0;
        }
        if (vm.selectedShirt)
            if (!arg && vm.selectedShirt.left != 1) {
                left = 0;
                right = 0;
                if (vm.selectedShirt.back != 1) back = 0;
            }

        if (front == 0) var front_price = 0;
        else var front_price = ((front - 1) * 0.5 + 1.5);
        if (back == 0) var back_price = 0;
        else var back_price = ((back - 1) * 0.5 + 1.5);
        var left_price = ((left - 1) * 0.5 + 0.5);
        var right_price = ((right - 1) * 0.5 + 0.5);
        if (arg)
            arg.total_color_cost = front_price + back_price + left_price + right_price;
        else vm.total_color_cost = front_price + back_price + left_price + right_price;

    }

    function calculate_unit_cost(arg) {
        if (arg) {
            //debugger;
            var is_color = false;
            var index = 0;
            for (var i = 0; i < arg.colors_available.length; i++) {
                var color = arg.colors_available[i];
                if (color.selected)
                    if (Number(color.color_id) > 1) {
                        is_color = true;
                        index = i;
                        break;

                    }
            }

            return parseFloat(arg.colors_available[index].blank_cost);

        }
        else {


            var is_color = false;
            if (vm.shirt_color != '#FFFFFF')
                is_color = true;

            if(!vm.selectedShirt)  return;

            if (is_color) {
                return parseFloat(vm.selectedShirt.colors_available[1].blank_cost);
                //return 5.5;
            }
            return parseFloat(vm.selectedShirt.colors_available[0].blank_cost);


        }

    }



    vm.calculate_profit = function () {

        if (vm.shirts_in_styles && vm.shirts_in_styles.length) {
            angular.forEach(vm.shirts_in_styles, function (shirt, index) {
                //  debugger;
                if (!shirt.selected) return;
                var selected_length = _.where(vm.shirts_in_styles, { selected: true }).length;
                var total_unit_cost = shirt.total_shirt_base_cost / vm.goal_target;
                var profit = shirt.profit;
                //shirt.total_profit = ((total_unit_cost + profit) * vm.goal_target);
                shirt.total_profit = profit * vm.goal_target;
                // debugger;

                var values = _.where(vm.shirts_in_styles, { selected: true });
                values = _.sortBy(values, function (num) { return num.total_profit; });
                vm.profits = {};
                //   debugger;
                vm.profits.min = Number(values[0].total_profit);
                vm.profits.max = Number(values[values.length - 1].total_profit);
                if(isNaN(vm.profits.min)) vm.profits.min = 0;
                if(isNaN(vm.profits.max)) vm.profits.max = 0;
                if (!$scope.$$phase)
                    $scope.$apply();
                //   debugger;
                //  if(index == vm.shirts_in_styles.length)debugger;

                //vm.profits = [];
                // for(var i=0;i<vm.shirts_in_styles.length;i++){

                //     if(shirt.selected)
                //         vm.profits.push(shirt.total_profit);

                // }

                // vm.profits = _.sortBy(vm.profits, function(n){return n;});





                // if (index == selected_length) {
                //     debugger;



                //     vm.shirts_in_styles = _.sortBy(vm.shirts_in_styles, 'total_profit');



                //     vm.profit = {};
                //     var profits = [];


                //     angular.forEach(vm.shirts_in_styles, function(_shirt, _index){
                //         if(shirt.selected)
                //         profits.push(shirt.total_profit);


                //     if (_index == selected_length) {
                //         debugger;
                //         profits = _.sortBy(profits, function (num) { return num; });
                //         vm.profit.max = profits[0];
                //         vm.profit.min = profits[vm.profit.length - 1];

                //     }

                //     });


                // }
            });



        }
        if (!$scope.$$phase)
            $scope.$apply();

    }

    vm.calculate_total_shirt_cost = function (arg) {


        if (arg) {
            // debugger;
            var unit_cost = calculate_unit_cost(arg);
            calculate_total_color_cost(arg);

            var total_colors_with_goal = arg.total_color_cost * vm.goal_target;

            var print_percent = calculate_print_discount();

            var garment_discount = calculate_garment_discount();

            var color_price_with_discount = total_colors_with_goal - ((print_percent / 100) * total_colors_with_goal);

            var total_garment_price = unit_cost * vm.goal_target;

            var garment_price_with_discount = total_garment_price - ((garment_discount / 100) * total_garment_price);

            arg.total_shirt_base_cost = garment_price_with_discount + color_price_with_discount;

            arg.total_unit_cost = arg.total_shirt_base_cost / vm.goal_target;


        }
        else {
            var unit_cost = calculate_unit_cost();
            calculate_total_color_cost();
            //vm.total_color_cost
            var total_colors_with_goal = vm.total_color_cost * vm.goal_target;

            var print_percent = calculate_print_discount();

            var garment_discount = calculate_garment_discount();

            var color_price_with_discount = total_colors_with_goal - ((print_percent / 100) * total_colors_with_goal);

            var total_garment_price = unit_cost * vm.goal_target;

            var garment_price_with_discount = total_garment_price - ((garment_discount / 100) * total_garment_price);

            vm.total_shirt_base_cost = garment_price_with_discount + color_price_with_discount;

            vm.total_unit_cost = vm.total_shirt_base_cost / vm.goal_target;

            if (vm.shirts_in_styles && vm.shirts_in_styles.length) {

                angular.forEach(vm.shirts_in_styles, function (shirt) {

                    vm.calculate_total_shirt_cost(shirt);

                });

            }

        }

        if (!$scope.$$phase)
            $scope.$apply();

        vm.calculate_profit();

    }

    function calculate_garment_discount() {
        if (vm.goal_target >= 50 && vm.goal_target <= 99) return 5;
        if (vm.goal_target >= 100 && vm.goal_target <= 199) return 6;
        if (vm.goal_target >= 200 && vm.goal_target <= 499) return 7;
        if (vm.goal_target >= 500 && vm.goal_target <= 999) return 8;
        if (vm.goal_target >= 1000) return 10;
        else return 0;
    }

    function calculate_print_discount() {

        if (vm.goal_target >= 100 && vm.goal_target <= 199) return 12;
        if (vm.goal_target >= 200 && vm.goal_target <= 499) return 14;
        if (vm.goal_target >= 500 && vm.goal_target <= 999) return 16;
        if (vm.goal_target >= 1000) return 20;

        else return 0;

    }

    $scope.$watch('vm.selected_text.color', function (newVal, oldVal) {

        if (vm.default_tab == 1) {
            calculate_total_front_colors();


        }

        else if (vm.default_tab == 2) {
            calculate_total_back_colors();

        }

        else if (vm.default_tab == 3) {
            var is_added = true;
            if(vm.total_left_colors.length){
                var temp = angular.copy(vm.total_left_colors);
                temp = temp.concat([newVal]);
                temp = _.uniq(temp);
                temp = _.reject(temp, function(clr){return !clr;});
                if(temp.length>3){
                    Alert("On each sleeve, you can add images/text with maximum 3 colors.","Oops");
                    vm.selected_text.color = oldVal;
                    is_added = false;
                }


            }
            if(is_added)
            calculate_total_left_colors();

        }
        else if (vm.default_tab == 4) {
            var is_added = true;
            if(vm.total_right_colors.length){
                var temp = angular.copy(vm.total_right_colors);
                temp = temp.concat([newVal]);
                temp = _.uniq(temp);
                temp = _.reject(temp, function(clr){return !clr;});
                if(temp.length>3){
                    Alert("On each sleeve, you can add images/text with maximum 3 colors.","Oops");
                    vm.selected_text.color = oldVal;
                    is_added = false;
                }


            }
            if(is_added)
            calculate_total_right_colors();
        }
    });

    $scope.change = function () {

        if (vm.default_tab == 1) {
            var texts = _.where(vm.front_design, { "type": "text" });
            var colors = [];
            for (var i = 0; i < texts.length; i++) {
                colors.push(texts[i].color);
            }
            //var arr = [];
            //arr[0] = vm.selected_text.color;
            debugger;
            add_to_colors(1, colors);


        }

        else if (vm.default_tab == 2) {


            var arr = [];
            arr[0] = vm.selected_text.color;
            add_to_colors(2, arr);


        }
        else if (vm.default_tab == 3) {


            var arr = [];
            arr[0] = vm.selected_text.color;
            add_to_colors(3, arr);


        }
        else if (vm.default_tab == 4) {


            var arr = [];
            arr[0] = vm.selected_text.color;
            add_to_colors(4, arr);


        }



    }


    function add_to_colors(side, colors) {
        //  debugger;
        if (side == 1) {
            vm.total_front_colors = vm.total_front_colors.concat(colors);

            vm.total_front_colors = _.uniq(vm.total_front_colors);

        }

        if (side == 2) {
            vm.total_back_colors = vm.total_back_colors.concat(colors);
            vm.total_back_colors = _.uniq(vm.total_back_colors);

        }
        if (side == 3) {
            vm.total_left_colors = vm.total_left_colors.concat(colors);
            vm.total_left_colors = _.uniq(vm.total_left_colors);

        }
        if (side == 4) {
            vm.total_right_colors = vm.total_right_colors.concat(colors);
            vm.total_right_colors = _.uniq(vm.total_right_colors);

        }

    }

    $scope.$watch('vm.base_cost', function (newVal, oldVal) {
        if (newVal == oldVal) return;

        vm.base_cost.total = vm.base_cost.blank_cost;



    }, true);

    // $scope.$watch('vm.shirt_color', function(newVal, oldVal){

    //     debugger;
    //     var color_val = newVal.substr(1,newVal.length-1);

    //     vm.base_cost.shirt_cost = _.findWhere(vm.colors, {hex:color_val});


    // });

    function getColors() {
        DashboardService.GetColors().then(function (data) {

            // debugger;
            vm.colors = data.data;
            // vm.shirt_color = "#"+vm.colors[0].hex;

        });
    }

    function zoom() {

        vm.is_zoomed = !vm.is_zoomed;

        var elem = $('.shirt-view');
        var detailLIst = $(".detail-list");
        var changeZoomIn = $('.icon-zoom-01');
        var changeZoomOut = $('.glyphicon-zoom-out');

        if (vm.is_zoomed) {


            elem.addClass("animated zoomPrint").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $(this).removeClass('animated zoomPrint');
            });
            detailLIst.addClass('detailListZoom');
            changeZoomIn.removeClass('icon-zoom-01').addClass('glyphicon glyphicon-zoom-out');
            // elem.css('zoom', '1.5');

        }
        else {


            elem.removeClass('zoomPrint animated');
            detailLIst.removeClass('detailListZoom');
            $(changeZoomOut).removeClass('glyphicon glyphicon-zoom-out').addClass('icon-zoom-01');

        }
    }
    $scope.get_style = function () {
        if (!vm.selectedShirt) {
            return;
        }


        if (vm.default_tab == 1) {

            $scope.temp_parent = "top:" + vm.selectedShirt.printable_front_top + "px" + ";" + "left:" + vm.selectedShirt.printable_front_left + "px";
            $scope.temp_child = 'width:' + vm.selectedShirt.printable_front_width + "px" + ";" + 'height:' + vm.selectedShirt.printable_front_height + "px";

            $scope.top_position = vm.selectedShirt.printable_front_top;
            $scope.left_position = vm.selectedShirt.printable_front_left;
            $scope.width_position = vm.selectedShirt.printable_front_width;
            $scope.height_position = vm.selectedShirt.printable_front_height;

        }
        else if (vm.default_tab == 2) {

            $scope.temp_parent = "top:" + vm.selectedShirt.printable_back_top + "px" + ";" + "left:" + vm.selectedShirt.printable_back_left + "px";
            $scope.temp_child = 'width:' + vm.selectedShirt.printable_back_width + "px" + ";" + 'height:' + vm.selectedShirt.printable_back_height + "px";

            $scope.top_position = vm.selectedShirt.printable_back_top;
            $scope.left_position = vm.selectedShirt.printable_back_left;
            $scope.width_position = vm.selectedShirt.printable_back_width;
            $scope.height_position = vm.selectedShirt.printable_back_height;

        }

        else if (vm.default_tab == 3) {

            $scope.temp_parent = "top:" + vm.selectedShirt.printable_left_top + "px" + ";" + "left:" + vm.selectedShirt.printable_left_left + "px";
            $scope.temp_child = 'width:' + vm.selectedShirt.printable_left_width + "px" + ";" + 'height:' + vm.selectedShirt.printable_left_height + "px";

            $scope.top_position = vm.selectedShirt.printable_left_top;
            $scope.left_position = vm.selectedShirt.printable_left_left;
            $scope.width_position = vm.selectedShirt.printable_left_width;
            $scope.height_position = vm.selectedShirt.printable_left_height;

        }

        else if (vm.default_tab == 4) {

            $scope.temp_parent = "top:" + vm.selectedShirt.printable_right_top + "px" + ";" + "left:" + vm.selectedShirt.printable_right_left + "px";
            $scope.temp_child = 'width:' + vm.selectedShirt.printable_right_width + "px" + ";" + 'height:' + vm.selectedShirt.printable_right_height + "px";

            $scope.top_position = vm.selectedShirt.printable_right_top;
            $scope.left_position = vm.selectedShirt.printable_right_left;
            $scope.width_position = vm.selectedShirt.printable_right_width;
            $scope.height_position = vm.selectedShirt.printable_right_height;
        }


        //  return obj;
    }
    function googleFonts() {
        vm.fonts = DashboardService.GetGoogleFonts();
        // console.log(vm.fonts);
        angular.forEach(vm.fonts, function (font) {
            vm.fontsTag.push(font.category);
        })

        vm.uniqFontTags = _.uniq(vm.fontsTag);
    }
    function loadShirtStyle() {
        DashboardService.GetShirtStyle().then(function (result) {
            if (result && result.data) {
                vm.shirts = result.data;
                _.each(vm.shirts, function (shirt) {

                    var reg = /(.*)\.[^.]+$/
                    var front_thumb = reg.exec(shirt.image_front_url);
                    shirt.front_small = front_thumb[1] + "_small.png";

                });
                vm.shirts_in_styles = angular.copy(vm.shirts);
                _.each(vm.shirts_in_styles, function (style) {
                    style.selected = false;
                    _.each(style.colors_available, function (color) {
                        color.selected = false;
                        _.each(vm.colors, function (_color) {
                            if (_color.id == color.color_id) {
                                color.color = "#" + _color.hex;
                            }

                        });
                    });
                });
                //vm.selectedShirt = vm.shirts[0];
                selectShirt(vm.shirts[0]);
                $scope.get_style();
                //  vm.filtered_colors = [];
                // setTimeout(function () {
                //     for (var i = 0; i < vm.colors.length; i++) {
                //         var color = vm.colors[i];
                //         var id = vm.selectedShirt.colors_available.filter(function (_color) { return _color.color_id == color.id });
                //         if (id) {
                //             vm.filtered_colors.push("#" + color.hex);
                //         }
                //         vm.shirt_color = vm.filtered_colors[0];


                //     }
                // }, 500);

                // angular.forEach(vm.colors, function (color) {

                //     var id = vm.selectedShirt.colors_available.filter(function (_color) { return _color.color_id == color.id });
                //     if (id) {
                //         vm.filtered_colors.push("#" + color.hex);
                //     }
                //     vm.shirt_color = vm.filtered_colors[0];
                // });
            }

        })
    }

    function loadGraphics() {

        var elem = $(".jcf-scrollable")[0];
        if(elem)
        if((elem.scrollTop+500 <= elem.scrollHeight) || vm.is_loading_graphics || $state.current.name!='home.create'){
            return;
        }

        if(vm.is_searching){
            vm.search_more();
            return;
        }

        vm.search_graphics = '';

        vm.is_loading_graphics = true;
        DashboardService.GetGraphics().then(function (result) {
            if (result && result.data) {

                vm.graphics = vm.graphics.concat(result.data);
                vm.is_loading_graphics = false;
            }

        })
    }


    vm.select_products = function(){

        viewOptionsModal.$promise.then(viewOptionsModal.show);


    }



    function loadConfig(exclude_goals) {
        //   debugger;
        DashboardService.GetConfig().then(function (data) {
            //   debugger;
            vm.user = {};
            vm.user.pages = {};
            vm.config = data.data;
            if (!exclude_goals) {
                vm.goal_range_max = Number(vm.config.config.goal_range_max);
                vm.goal_range_min = Number(vm.config.config.goal_range_min);
                vm.goal_target = Number(vm.goal_range_min);
                rotate_goal(vm.goal_range_min);
            }

            vm.footer_pages = vm.config.pages;
            if (vm.config.login.status == 1) {
                vm.user.id = vm.config.login.id;
                vm.user.name = vm.config.login.name;
                vm.user.pages = vm.config.login.pages;




            }



        });
    }


    vm.hold_display = function () {
        vm.is_printable_area_visible = false;

        {

            setTimeout(function () {

                vm.is_printable_area_visible = true;
                if (!$scope.$$phase)
                    $scope.$apply();

            }, 3000);


        }
    }



    vm.confirm_profit_calculated = function(){

        _.each(vm.shirts_in_styles, function (shirt) {
            if (shirt.id == vm.selectedShirt.id)
                shirt.selected = true;
            else shirt.selected = false;
            if(!vm.shirt_color)
                setColor(vm.filtered_colors[0]);
        });

    }



    function loadFonts() {
        DashboardService.GetFonts().then(function (result) {
            if (result && result.data) {
                vm.fonts = result.data;
                angular.forEach(result.data, function (font) {
                    if (font && font.tags) {
                        var tags = JSON.parse(font.tags);
                        for (var i = 0; i < tags.length; i++) {

                            vm.fontsTag.push(tags[i]);
                        }

                    }
                })

                vm.uniqFontTags = _.uniq(vm.fontsTag);

            }


        })
    }

    vm.fontChanged = function (val) {
        if (!val) {
            vm.category = '';
        }
    }




    vm.fontSelection = function (font, event) {
        //  $scope.$on('webfontLoader.loaded', function() {
        //    alert('font loaded!');
        // });



        vm.fontSelected.family = font.family;

        //...................................//

        if (vm.default_tab === 1) {



            var selected = _.findWhere(vm.front_design, { 'selected': true });

            //console.log(selected);
            var e = $('#box' + selected.z_index + 'front');


            vm.frontAngle = e[0].style.transform;
            //  console.log(e[0].style.transform);
            if (vm.frontAngle == 'undefined') vm.frontAngle = 'rotate(0rad)';
            // rotate = rotate * Math.PI / 180;
            e.css('visibility','hidden');
            e.css('transform', 'rotate(0rad)');


            var txt = e.find('text');
            var size1 = txt[0].getBoundingClientRect();
            var size2 = e[0].getBoundingClientRect();
            var $w = parseFloat(size1.width);
            var $h = parseFloat(size1.height)

            //  console.log(e);
            // 			console.log(txt);
            // 			console.log(size1);
            // 			console.log(size2);
            // 			console.log($w);
            // 			console.log($h);




            updateSize($w, $h, selected.z_index, 1);

            var svg = e.find('svg'),
                view = svg[0].getAttributeNS(null, 'viewBox');
            var arr = view.split(' ');
            var y = txt[0].getAttributeNS(null, 'y');
            y = Math.round(y) + Math.round(size2.top) - Math.round(size1.top) - ((Math.round(size2.top) - Math.round(size1.top)) * (($w - arr[2]) / $w));
            txt[0].setAttributeNS(null, 'y', y);
            selected.font = font.family;
            setTimeout(function(){
                e.css('transform', vm.frontAngle);
                // e.rotSize(e.css('width'),e.css('height'),45);

                console.log(e.css('width'),e.css('height'));


                e.css('visibility','visible');
            },0)


            // console.log(selected.font);
        }

        else if (vm.default_tab === 2) {
            var selected = _.findWhere(vm.back_design, { 'selected': true });
            var e = $('#box' + selected.z_index + 'back');
            vm.backAngle = e[0].style.transform;
            if (vm.backAngle == 'undefined') vm.backAngle = 'rotate(0rad)';
            e.css('visibility','hidden');
            e.css('transform', 'rotate(0rad)');



            var txt = e.find('text');
            var size1 = txt[0].getBoundingClientRect();
            var size2 = e[0].getBoundingClientRect();
            var $w = parseFloat(size1.width);
            var $h = parseFloat(size1.height)


            updateSize($w, $h, selected.z_index, 2);

            var svg = e.find('svg'),
                view = svg[0].getAttributeNS(null, 'viewBox');
            var arr = view.split(' ');
            var y = txt[0].getAttributeNS(null, 'y');
            y = Math.round(y) + Math.round(size2.top) - Math.round(size1.top) - ((Math.round(size2.top) - Math.round(size1.top)) * (($w - arr[2]) / $w));
            txt[0].setAttributeNS(null, 'y', y);
            selected.font = font.family;
            // console.log(selected.font);

            setTimeout(function(){
                e.css('transform', vm.backAngle);
                // e.rotSize(e.css('width'),e.css('height'),45);

                console.log(e.css('width'),e.css('height'));


                e.css('visibility','visible');
            },0)
        }

        else if (vm.default_tab === 3) {
            var selected = _.findWhere(vm.left_design, { 'selected': true });
            //console.log(selected);
            var e = $('#box' + selected.z_index + 'left');

            vm.leftAngle = e[0].style.transform;
            //  console.log(e[0].style.transform);
            if (vm.leftAngle == 'undefined') vm.leftAngle = 'rotate(0rad)';
            // rotate = rotate * Math.PI / 180;
            e.css('visibility','hidden');
            e.css('transform', 'rotate(0rad)');



            var txt = e.find('text');
            var size1 = txt[0].getBoundingClientRect();
            var size2 = e[0].getBoundingClientRect();
            var $w = parseFloat(size1.width);
            var $h = parseFloat(size1.height)


            updateSize($w, $h, selected.z_index, 3);

            var svg = e.find('svg'),
                view = svg[0].getAttributeNS(null, 'viewBox');
            var arr = view.split(' ');
            var y = txt[0].getAttributeNS(null, 'y');
            y = Math.round(y) + Math.round(size2.top) - Math.round(size1.top) - ((Math.round(size2.top) - Math.round(size1.top)) * (($w - arr[2]) / $w));
            txt[0].setAttributeNS(null, 'y', y);
            selected.font = font.family;
            // console.log(selected.font);
            setTimeout(function(){
                e.css('transform', vm.leftAngle);
                // e.rotSize(e.css('width'),e.css('height'),45);

                console.log(e.css('width'),e.css('height'));


                e.css('visibility','visible');
            },0)
        }

        else if (vm.default_tab === 4) {
            var selected = _.findWhere(vm.right_design, { 'selected': true });
            //console.log(selected);
            var e = $('#box' + selected.z_index + 'right');

            vm.rightAngle = e[0].style.transform;
            //  console.log(e[0].style.transform);
            if (vm.rightAngle == 'undefined') vm.rightAngle = 'rotate(0rad)';
            // rotate = rotate * Math.PI / 180;
            e.css('visibility','hidden');
            e.css('transform', 'rotate(0rad)');



            var txt = e.find('text');
            var size1 = txt[0].getBoundingClientRect();
            var size2 = e[0].getBoundingClientRect();
            var $w = parseFloat(size1.width);
            var $h = parseFloat(size1.height)


            updateSize($w, $h, selected.z_index, 4);

            var svg = e.find('svg'),
                view = svg[0].getAttributeNS(null, 'viewBox');
            var arr = view.split(' ');
            var y = txt[0].getAttributeNS(null, 'y');
            y = Math.round(y) + Math.round(size2.top) - Math.round(size1.top) - ((Math.round(size2.top) - Math.round(size1.top)) * (($w - arr[2]) / $w));
            txt[0].setAttributeNS(null, 'y', y);
            selected.font = font.family;
            // console.log(selected.font);
            setTimeout(function(){
                e.css('transform', vm.rightAngle);
                // e.rotSize(e.css('width'),e.css('height'),45);

                console.log(e.css('width'),e.css('height'));


                e.css('visibility','visible');
            },0)
        }

    }



    function addDays(number_of_days) {
        var d = new Date();
        var d2 = d.setDate(d.getDate() + number_of_days);
        return new Date(d2);
    }

    /*
        Junaid
     */
    function reset_style_shirts() {
        for (var i = 0; i < vm.shirts_in_styles.length; i++) {
            for (var j = 0; j < vm.shirts_in_styles[i].colors_available.length; j++) {
                vm.shirts_in_styles[i].colors_available[j].selected = false;


            }
            vm.shirts_in_styles[i].selected - false;


        }
        vm.total_color_selected = 1;
    }
    /*
        Junaid
     */
    function selectShirt(shirt) {
        reset_style_shirts();
        vm.default_tab = 1;
        vm.selectedShirt = shirt;
        vm.filtered_colors = [];

        var reg = /(.*)\.[^.]+$/
        var front_thumb = reg.exec(shirt.image_front_url);
        var back_thumb = reg.exec(shirt.image_back_url);
        var left_thumb = reg.exec(shirt.image_left_url);
        var right_thumb = reg.exec(shirt.image_right_url);


        vm.selectedShirSide = {

            front: front_thumb[1] + "_small.png",
            back: back_thumb[1] + "_small.png",


        }

        if (shirt.id == 1 || shirt.id == 2 || shirt.id == 7 || shirt.id == 8) {
            vm.isSleeve = true;
            vm.selectedShirSide.left = left_thumb[1] + "_small.png";
            vm.selectedShirSide.right = right_thumb[1] + "_small.png";

        }

        else {
            vm.isSleeve = false;
        }
        // var selected_shirt = _.where(vm.shirts_in_styles, {id:shirt.id});
        //selected_shirt.selected = true;



        console.log(vm.selectedShirSide);

        setTimeout(function() {

            angular.forEach(vm.colors, function (color, count) {
                //debugger;
                var id = vm.selectedShirt.colors_available.filter(function (_color) { return _color.color_id == color.id });
                if (id[0]) {
                    vm.filtered_colors.push("#" + color.hex);
                }

                vm.shirt_color = vm.filtered_colors[0];
                if (count == 0) {

                    _.each(vm.shirts_in_styles, function (shirt) {
                        if (shirt.id == vm.selectedShirt.id)
                            shirt.selected = true;
                        else shirt.selected = false;
                        setColor(
                            vm.filtered_colors[0]);
                    });

                }

            });



        }, 500);

        $scope.get_style();

    }

    function updateSize($w, $h, index, side) {
        var currentSide = "";
        if (side === 1) {
            currentSide = "front";
        }
        else if (side === 2) {
            currentSide = "back";
        }
        else if (side === 3) {
            currentSide = "left";
        }
        else if (side === 4) {
            currentSide = "right";
        }

        setTimeout(function(){
            var e = $('#box' + index + currentSide);
            text = e.find('text'),
            $w = text[0].getBoundingClientRect().width,
            $h = text[0].getBoundingClientRect().height,
            svg = e.find('svg'),
                view = svg[0].getAttributeNS(null, 'viewBox'),
                width = svg[0].getAttributeNS(null, 'width'),
                height = svg[0].getAttributeNS(null, 'height');
            view = view.split(' ');
            svg[0].setAttributeNS(null, 'width', $w);
            svg[0].setAttributeNS(null, 'height', $h);
            svg[0].setAttributeNS(null, 'viewBox', '0 0 ' + (($w * view[2]) / width) + ' ' + (($h * view[3]) / height));
            $(e).css({ 'width': $w + 'px', 'height': $h + 'px' });

            // console.log(e);
            // 	console.log(svg);
            // 	console.log(view);
            // 	console.log(width);
            // 	console.log(height);
            // 	console.log(($w * view[2])/width);
            // 	console.log((($h * view[3])/height));





        },0)



    }

    function getValueWithoutPx(val) {
        console.log("Removing the px");
        var val = val;
        if (val.indexOf('p') !== -1) {
            console.log("Found px with width");
            val = val.substr(val.indexOf('p'));
            console.log('val without px ' + val);
            return val;
        } else {
            return val
        }
    }

    function selectGraphic(graphic, is_searched) {
        if (vm.default_tab === 3 || vm.default_tab === 4){

            var _colors = graphic.colors.split(',');

            if(vm.default_tab === 3){
                if (vm.total_left_colors.length) {

                    var temp = angular.copy(vm.total_left_colors);
                    temp = temp.concat(_colors);
                    temp = _.uniq(temp);
                    if(temp.length>3){
                        Alert("On each sleeve, you can add images/text with maximum 3 colors.","Oops");
                        return;
                    }

                }

                else {

                    _colors = _.uniq(_colors);
                    if(_colors.length>3){
                        Alert("On each sleeve, you can add images/text with maximum 3 colors.","Oops");
                        return;
                    }

                }
            }
            else if(vm.default_tab === 4){
                if (vm.total_right_colors.length) {

                    var temp = angular.copy(vm.total_right_colors);
                    temp = temp.concat(_colors);
                    temp = _.uniq(temp);
                    if(temp.length>3){
                        Alert("On each sleeve, you can add images/text with maximum 3 colors.","Oops");
                        return;
                    }

                }

                else {

                    _colors = _.uniq(_colors);
                    if(_colors.length>3){
                        Alert("On each sleeve, you can add images/text with maximum 3 colors.","Oops");
                        return;
                    }

                }
            }

        }
        vm.flipX = false;
        vm.flipY = false;
        if (is_searched) {
            vm.graphics.push(graphic);
            vm.graphic = _.uniq(vm.graphic);
        }

        if (vm.default_tab === 1) {

            var z_index = 1;
            if (!vm.front_design.length) {
                z_index = 1;
            }
            else {

                // z_index = vm.front_design[vm.front_design.length - 1].z_index + 1;
                z_index = _.max(vm.front_design,function(front){return front.z_index}).z_index + 1;
            }

            // DashboardService.GetSvg(vm.graphicsURL + graphic.filename).then(function(data){
            //    console.log(data.data);
            // })



            var obj = {

                "type": "svg",
                "src": vm.graphicsURL + graphic.filename,
                "z_index": z_index,
                "zIndex": z_index,
                "width": graphic.width + "px",
                "height": graphic.height + "px",
                "id": graphic.id,
                "viewBox": "0 20 " + graphic.width + " " + graphic.height,
                "width_no_px": getValueWithoutPx(graphic.width),
                "height_no_px": getValueWithoutPx(graphic.height),
                "uuid": uuid()

            }

            vm.front_design.push(obj);

            _.each(vm.front_design, function (front) {



                if (front.z_index != z_index) {
                    $('#tools' + front.z_index + "front").css({ 'visibility': 'hidden' });
                    $('#box' + front.z_index + "front").removeClass('border');
                    front.selected = false;
                }


            });



            setTimeout(function () {
                var e = $('#box' + z_index + "front");
                var $width = e.width();
                var pw = e.parent().parent().width();
                var left = (pw - $width) / 2;
                var top = ((vm.selectedShirt.printable_front_height / 2) - parseFloat(graphic.height));
                e.css('left', left + 'px');
                //e.css('top', top + 'px');
                var currentSvg = document.querySelectorAll('#box' + z_index + "front" + ' svg');


                currentSvg[0].setAttributeNS(null, 'viewBox', '0 20 ' + graphic.width + ' ' + graphic.height);
                $('#tools' + z_index + "front").css({ 'visibility': 'visible' });
                $('#box' + z_index + "front").addClass('border');
                vm.select_text(z_index);

                console.log(z_index);

                //    _.each(vm.front_design.length,function(front){


                //         console.log(front.z_index,z_index);

                //         //      if(front.z_index !== z_index){
                //         //        $('.printable-area').removeClass('crossing_border');

                //         //      }
                //         //      else{

                //         //               window.setInterval(function (first,second) {
                //         // //console.log(currentSvg[0]);
                //         //                 if (!collision($("#box"+z_index+"front"), $('.printable-area'))) {
                //         //                     $('.printable-area').addClass('crossing_border');
                //         //                 }
                //         //                 else {

                //         //                     $('.printable-area').removeClass('crossing_border');



                //         //                 }
                //         //             }, 200);

                //         //      }

                //             })





            }, 500)



            vm.selectedGraphic = graphic;
            vm.designSelected = true;
        }
        else if (vm.default_tab === 2) {

            var z_index = 1;
            if (!vm.back_design.length) {
                z_index = 1;
            }
            else {

                // z_index = vm.back_design[vm.back_design.length - 1].z_index + 1;
                z_index = _.max(vm.back_design,function(back){return back.z_index}).z_index + 1;
            }



            var obj = {

                "type": "svg",
                "src": vm.graphicsURL + graphic.filename,
                "z_index": z_index,
                "zIndex": z_index,
                "width": graphic.width + "px",
                "height": graphic.height + "px",
                "id": graphic.id,
                "viewBox": "0 20 " + graphic.width + " " + graphic.height,
                "width_no_px": getValueWithoutPx(graphic.width),
                "height_no_px": getValueWithoutPx(graphic.height),
                "uuid": uuid()

            }

            vm.back_design.push(obj);

            _.each(vm.back_design, function (back) {



                if (back.z_index != z_index) {
                    $('#tools' + back.z_index + "back").css({ 'visibility': 'hidden' });
                    $('#box' + back.z_index + "back").removeClass('border');
                    back.selected = false;
                }


            });



            setTimeout(function () {
                var e = $('#box' + z_index + "back");
                var $width = e.width();
                var $height = e.height();
                e.css('widht', $width);
                e.css('height', $height);
                var pw = e.parent().parent().width();
                var left = (pw - $width) / 2;
                var top = ((vm.selectedShirt.printable_back_height / 2) - parseFloat(graphic.height));
                e.css('left', left + 'px');
                //e.css('top', top + 'px');
                var currentSvg = document.querySelectorAll('#box' + z_index + "back" + ' svg');

                console.log(currentSvg[0]);
                currentSvg[0].setAttributeNS(null, 'viewBox', '0 20 ' + graphic.width + ' ' + graphic.height);
                $('#tools' + z_index + "back").css({ 'visibility': 'visible' });
                $('#box' + z_index + "back").addClass('border');

                vm.select_text(z_index);


            }, 500)



            vm.selectedGraphic = graphic;
            vm.designSelected = true;

        }
        else if (vm.default_tab === 3) {

            var z_index = 1;
            if (!vm.left_design.length) {
                z_index = 1;
            }
            else {

                // z_index = vm.left_design[vm.left_design.length - 1].z_index + 1;
                z_index = _.max(vm.left_design,function(left){return left.z_index}).z_index + 1;
            }



            var obj = {

                "type": "svg",
                "src": vm.graphicsURL + graphic.filename,
                "z_index": z_index,
                "zIndex": z_index,
                "width": graphic.width + "px",
                "height": graphic.height + "px",
                "id": graphic.id,
                "viewBox": "0 20 " + graphic.width + " " + graphic.height,
                "width_no_px": getValueWithoutPx(graphic.width),
                "height_no_px": getValueWithoutPx(graphic.height),
                "uuid": uuid()

            }

            vm.left_design.push(obj);

            _.each(vm.left_design, function (back) {



                if (back.z_index != z_index) {
                    $('#tools' + back.z_index + "left").css({ 'visibility': 'hidden' });
                    $('#box' + back.z_index + "left").removeClass('border');
                    back.selected = false;
                }


            });



            setTimeout(function () {
                var e = $('#box' + z_index + "left");
                var $width = e.width();
                var $height = e.height();
                e.css('widht', $width);
                e.css('height', $height);
                var pw = e.parent().parent().width();
                var left = (pw - $width) / 2;
                var top = ((vm.selectedShirt.printable_left_height / 2) - parseFloat(graphic.height));
                e.css('left', left + 'px');
                // e.css('top', top + 'px');
                var currentSvg = document.querySelectorAll('#box' + z_index + "left" + ' svg');

                console.log(currentSvg[0]);
                currentSvg[0].setAttributeNS(null, 'viewBox', '0 20 ' + graphic.width + ' ' + graphic.height);
                $('#tools' + z_index + "left").css({ 'visibility': 'visible' });
                $('#box' + z_index + "left").addClass('border');


                vm.select_text(z_index);

            }, 500)



            vm.selectedGraphic = graphic;
            vm.designSelected = true;

        }
        else if (vm.default_tab === 4) {

            var z_index = 1;
            if (!vm.right_design.length) {
                z_index = 1;
            }
            else {

                // z_index = vm.right_design[vm.right_design.length - 1].z_index + 1;
                z_index = _.max(vm.right_design,function(right){return right.z_index}).z_index + 1;
            }



            var obj = {

                "type": "svg",
                "src": vm.graphicsURL + graphic.filename,
                "z_index": z_index,
                "zIndex": z_index,
                "width": graphic.width + "px",
                "height": graphic.height + "px",
                "id": graphic.id,
                "viewBox": "0 20 " + graphic.width + " " + graphic.height,
                "width_no_px": getValueWithoutPx(graphic.width),
                "height_no_px": getValueWithoutPx(graphic.height),
                "uuid": uuid()

            }

            vm.right_design.push(obj);

            _.each(vm.right_design, function (right) {



                if (right.z_index != z_index) {
                    $('#tools' + right.z_index + "right").css({ 'visibility': 'hidden' });
                    $('#box' + right.z_index + "right").removeClass('border');
                    right.selected = false;
                }


            });



            setTimeout(function () {
                var e = $('#box' + z_index + "right");
                var $width = e.width();
                var $height = e.height();
                e.css('widht', $width);
                e.css('height', $height);
                var pw = e.parent().parent().width();
                var left = (pw - $width) / 2;
                var top = ((vm.selectedShirt.printable_right_height / 2) - parseFloat(graphic.height));
                e.css('left', left + 'px');
                // e.css('top', top + 'px');
                var currentSvg = document.querySelectorAll('#box' + z_index + "right" + ' svg');

                console.log(currentSvg[0]);
                currentSvg[0].setAttributeNS(null, 'viewBox', '0 20 ' + graphic.width + ' ' + graphic.height);
                $('#tools' + z_index + "right").css({ 'visibility': 'visible' });
                $('#box' + z_index + "right").addClass('border');

                vm.select_text(z_index);


            }, 500)



            vm.selectedGraphic = graphic;
            vm.designSelected = true;

        }

    }

    $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    }

    function set_design_tab(arg) {
        vm.default_design_tab = arg;
        if(vm.default_design_tab == 3){
            //vm.deselect_text();
            //  $scope.focus = false;


        }

        if(vm.default_design_tab === 3 || vm.default_design_tab === 4){
            angular.forEach(intervals, function(interval) {
                $interval.cancel(interval);
            });
            intervals.length = 0;
        }
    }

    function activate_tab(arg) {
        vm.selected_text = {};
        vm.default_tab = arg;
        if (arg === 2){
            vm.hide = true;
        }

        if(arg===1){
            angular.forEach(intervals, function(interval) {
                $interval.cancel(interval);
            });
            intervals.length = 0;
            $('.printable-area').removeClass('crossing_border');

        }

        if (arg === 2 || arg === 3 || arg === 4) {

            $('.user-list').css({ 'visibility': 'hidden' });
            $('.user-box').removeClass('border');

            angular.forEach(intervals, function(interval) {
                $interval.cancel(interval);
            });
            intervals.length = 0;
            $('.printable-area').removeClass('crossing_border');

        }
    }
    function loadDefault() {

        //$state.transitionTo('home.create');

    }

    vm.deleteLayer = function (zindex) {


        vm.selected_text= {};

        if((!vm.front_design.length) || (!vm.back_design.length) || (!vm.left_design.length) || (!vm.right_design.length)){

            angular.forEach(intervals, function(interval) {
                $interval.cancel(interval);
            });
            intervals.length = 0;

        }

        if($(".printable-area").hasClass('crossing_border')){
            $(".printable-area").removeClass('crossing_border');
        }

        if (vm.default_tab === 1) {
            vm.front_design = _.reject(vm.front_design, function (layer) { return layer.z_index === zindex; });
            calculate_front();

        }

        else if (vm.default_tab === 2) {
            vm.back_design = _.reject(vm.back_design, function (layer) { return layer.z_index === zindex; });
            calculate_back();
        }
        else if (vm.default_tab === 3) {
            vm.left_design = _.reject(vm.left_design, function (layer) { return layer.z_index === zindex; });
            calculate_left();
        }
        else if (vm.default_tab === 4) {
            vm.right_design = _.reject(vm.right_design, function (layer) { return layer.z_index === zindex; });
            calculate_right();
        }
    }


    var intervals = []
    //  intervals.push($interval(function() { /*doStuff*/ }, /*timeout*/));
    // intervals.push($interval(function() { /*doDifferentStuff*/ }, /*timeout*/));


    function init_shirt_drawings() {

        vm.front_design = [
            // {
            //     "type": "text",
            //     "font": 'arial',
            //     "color": "rgb(255,0,0)",
            //     "text": "Abdul",
            //     "z_index": 1,
            //     "selected":false,
            //     "slider" : {
            //     "value": 0,
            //     "options": {
            //         "floor": -360,
            //         "ceil": 360,
            //         "step": 1,
            //       },
            //     }
            // },

            // {
            //     "type": "svg",
            //     "z_index": 4,
            //     "src": "",
            //     "selected":false,
            //     "slider" : {
            //     "value": 0,
            //     "options": {
            //         "floor": -360,
            //         "ceil": 360,
            //         "step": 1,
            //       },
            //     }
            // },
            // {
            //     "type": "img",
            //     "z_index": 5,
            //     "src": "http://demo.tshirtecommerce.com/media/assets/uploaded/2016/09/Smile_thumb.png",
            //     "selected": false,
            //     "slider": {
            //         "value": 0,
            //         "options": {
            //             "floor": -360,
            //             "ceil": 360,
            //             "step": 1,
            //         },
            //     }
            // }


        ];


        vm.back_design = [

            // {
            //     "type": "text",
            //     "font": 'arial',
            //     "color": "rgb(0,0,255)",
            //     "text": "This is back text 2",
            //     "z_index": 1
            // },

            // {
            //     "type": "svg",
            //     "z_index": 4,
            //     "src": ""
            // },
            // {
            //     "type": "img",
            //     "z_index": 5,
            //     "src": ""
            // }


        ];

        vm.left_design = [
            // {
            //     "type": "text",
            //     "font": 'arial',
            //     "color": "rgb(255,0,0)",
            //     "text": "This is left text 1",
            //     "z_index": 2
            // },
            // {
            //     "type": "text",
            //     "font": 'arial',
            //     "color": "rgb(0,0,255)",
            //     "text": "This is left text 2",
            //     "z_index": 1
            // },

            // {
            //     "type": "svg",
            //     "z_index": 4,
            //     "src": ""
            // },
            // {
            //     "type": "img",
            //     "z_index": 5,
            //     "src": ""
            // }


        ];

        vm.right_design = [
            // {
            //     "type": "text",
            //     "font": 'arial',
            //     "color": "rgb(255,0,0)",
            //     "text": "This is right text 1",
            //     "z_index": 2
            // },
            // {
            //     "type": "text",
            //     "font": 'arial',
            //     "color": "rgb(0,0,255)",
            //     "text": "This is right text 2",
            //     "z_index": 1
            // },

            // {
            //     "type": "svg",
            //     "z_index": 4,
            //     "src": ""
            // },
            // {
            //     "type": "img",
            //     "z_index": 5,
            //     "src": ""
            // }
            // {
            //     "type": "img",
            //     "z_index": 5,
            //     "src": "http://demo.tshirtecommerce.com/media/assets/uploaded/2016/09/Smile_thumb.png",
            //     "selected": false,
            //     "slider": {
            //         "value": 0,
            //         "options": {
            //             "floor": -360,
            //             "ceil": 360,
            //             "step": 1,
            //         },
            //     }
            // }

        ];


    }

    // vm.front_interve_ids = [];

    vm.insideTextarea = function () {

        if(vm.default_tab === 1)
            vm.select_text(vm.frontObject.z_index);
        else if (vm.default_tab === 2)
            vm.select_text(vm.backObject.z_index);
        else if (vm.default_tab === 3)
            vm.select_text(vm.leftObject.z_index);
        else if (vm.default_tab === 4)
            vm.select_text(vm.rightObject.z_index);
    }

    vm.hAlign = function(){


        if(vm.default_tab === 1){
            var e = $("#box"+vm.frontObject.z_index+"front");
            vm.select_text(vm.frontObject.z_index);
        }
        if(vm.default_tab === 2){
            var e = $("#box"+vm.backObject.z_index+"back");
            vm.select_text(vm.backObject.z_index);
        }
        if(vm.default_tab === 3){
            var e = $("#box"+vm.leftObject.z_index+"left");
            vm.select_text(vm.leftObject.z_index);
        }
        if(vm.default_tab === 4){
            var e = $("#box"+vm.rightObject.z_index+"right");
            vm.select_text(vm.rightObject.z_index);
        }
        var $width = e.width();
        var pw = e.parent().parent().width();
        var left = (pw - $width)/2;
        e.css('left', left+'px');




    }

    vm.vAlign = function(){
        if(vm.default_tab === 1){
            var e = $("#box"+vm.frontObject.z_index+"front");
            vm.select_text(vm.frontObject.z_index);
        }
        if(vm.default_tab === 2){
            var e = $("#box"+vm.backObject.z_index+"back");
            vm.select_text(vm.backObject.z_index);
        }
        if(vm.default_tab === 3){
            var e = $("#box"+vm.leftObject.z_index+"left");
            vm.select_text(vm.leftObject.z_index);
        }
        if(vm.default_tab === 4){
            var e = $("#box"+vm.rightObject.z_index+"right");
            vm.select_text(vm.rightObject.z_index);
        }
        var $height = e.height();
        var ph = e.parent().parent().height();
        var top = (ph - $height)/2;
        e.css('top', top+'px');


    }

    vm.pushBehind = function(){
        if(vm.default_tab == 1){
            $("#box"+vm.frontObject.z_index+"front").css('z-index',0);
            _.each(vm.front_design,function(front){

                if(front.z_index!==vm.frontObject.z_index){
                    front.zIndex += 1;
                }

            })
            vm.frontObject.zIndex = 0;
            vm.front_design = _.sortBy(vm.front_design,'zIndex');
        }

        if(vm.default_tab == 2){
            $("#box"+vm.backObject.z_index+"back").css('z-index',0);
            _.each(vm.back_design,function(back){

                if(back.z_index!==vm.backObject.z_index){
                    back.zIndex += 1;
                }

            })
            vm.backObject.zIndex = 0;
            vm.back_design = _.sortBy(vm.back_design,'zIndex');
        }

        if(vm.default_tab == 3){
            $("#box"+vm.leftObject.z_index+"left").css('z-index',0);
            _.each(vm.left_design,function(left){

                if(left.z_index!==vm.leftObject.z_index){
                    left.zIndex += 1;
                }

            })
            vm.leftObject.zIndex = 0;
            vm.left_design = _.sortBy(vm.left_design,'zIndex');
        }

        if(vm.default_tab == 4){
            $("#box"+vm.rightObject.z_index+"right").css('z-index',0);
            _.each(vm.right_design,function(right){

                if(right.z_index!==vm.rightObject.z_index){
                    right.zIndex += 1;
                }

            })
            vm.rightObject.zIndex = 0;
            vm.right_design = _.sortBy(vm.right_design,'zIndex');
        }

    }

    vm.maxZIndex = 500;
    vm.minZindex = 0;

    vm.init_obj_rotation = function(){

        if(!vm.selected_text.angle_value)
            vm.selected_text.angle_value=0;

    }

    vm.sliderAngleRotate = function(){
        // debugger;
        var rad = degToRad(vm.selected_text.angle_value);

        if(vm.default_tab==1)
        var elem = $("#box"+vm.selected_text.z_index+"front").data('uiRotatable');

        if(vm.default_tab==2)
        var elem = $("#box"+vm.selected_text.z_index+"back").data('uiRotatable');

        if(vm.default_tab==3)
        var elem = $("#box"+vm.selected_text.z_index+"left").data('uiRotatable');

        if(vm.default_tab==4)
        var elem = $("#box"+vm.selected_text.z_index+"right").data('uiRotatable');

        if(elem)
        elem.angle(rad);

        //console.log(rad);
    }

    function degToRad(val){
        return val * Math.PI/180;
    }

    vm.select_text = function (index, e) {


        $('.printable-holder').css({ 'overflow': 'visible' });
        if (vm.default_tab == 1) {

            _index = _.findIndex(vm.front_design, function (x) { return x.z_index == index });
            vm.selected_text = vm.front_design[_index];
            vm.frontObject = vm.front_design[_index];



            vm.default_design_tab = vm.selected_text.type === 'svg' ? 2 : 3;
            if (vm.selected_text.type === 'img')
                vm.default_design_tab = 4;

            $("#box"+vm.selected_text.z_index+"front").css('z-index',vm.maxZIndex++);
            vm.selected_text.zIndex = vm.maxZIndex++;

            if(vm.front_design.length>1){
                _.each(vm.front_design,function(front){


                    var zIndex = $("#box"+front.z_index+"front").css('z-index');
                    if(front.z_index === vm.selected_text.z_index){


                        $("#box"+front.z_index+"front").css('z-index',parseInt(zIndex)+1);
                        vm.selected_text.zIndex = parseInt(zIndex)+1;

                        vm.front_design = _.sortBy(vm.front_design,'zIndex');

                        console.log(vm.front_design);

                    }
                    else{

                        if(parseInt(zIndex)!==0){
                            $("#box"+front.z_index+"front").css('z-index',parseInt(zIndex)-1);
                            vm.selected_text.zIndex = parseInt(zIndex)-1;
                        }
                    }

                })
            }



            var tspan = document.querySelector('#box' + vm.selected_text.z_index + "front" + ' tspan')

            // vm.Bbox = tspan.getBBox();
            // vm.Bbox.height += 30;
            // vm.Bbox.width += 50;
            // var rotationInfo = $('#box'+vm.selected_text.z_index).rotationInfo();
            // console.log(rotationInfo.deg);
            // var updateVisibility = "-webkit-user-select: none; visibility: visible; transform: rotateZ(0deg);";
            // angular.element('#box'+vm.selected_text.z_index)[0].attributes[6].nodeValue = updateVisibility;

            var params = {
                // Callback fired on rotation start.
                start: function (event, ui) {

                    var e = ui.element;
                    // e.css('transform-origin','50% 50%');
                    //   var width = e.css('width').substr(0,e.css('width').length-2);
                    //         var height = e.css('height').substr(0,e.css('height').length-2);
                    //         width = parseFloat(width);
                    //         height = parseFloat(height);
                    //         console.log(width,height);
                    // console.log(e.css('width'));
                    // e.css('transform-origin','50% 50% 0px');
                    //    $('.border').rotationInfo(vm.selected_text.slider.value);
                    //    console.log($('.border').rotationInfo().deg,vm.selected_text.slider.value);

                    // $('.border').css({
                    //     '-webkit-transform' : 'rotate(' + vm.selected_text.slider.value + 'deg)',
                    //     '-moz-transform'    : 'rotate(' + vm.selected_text.slider.value + 'deg)',
                    //     '-ms-transform'     : 'rotate(' + vm.selected_text.slider.value + 'deg)',
                    //     '-o-transform'      : 'rotate(' + vm.selected_text.slider.value + 'deg)',
                    //     'transform'         : 'rotate(' + vm.selected_text.slider.value + 'deg)'
                    // });

                },
                // Callback fired during rotation.
                rotate: function (event, ui) {

                    $('.printable-area').removeClass('crossing_border');

                    if(vm.selected_text.type=='text'){

                    var updateDegree = ui.angle.current * (180 / Math.PI);

                    if(updateDegree<0) updateDegree += 360;
                    //console.log(updateDegree);
                    vm.selected_text.angle_value = updateDegree;
                    $scope.$apply();
                }
                    //console.log("Rotating",updateDegree);
                    //console.log("Rotatating",updateDegree);
                    //var $scope = angular.element('#box').scope();
                    //vm.selected_text.rotate.value = updateDegree;
                    //$scope.$apply();


                },

                // Callback fired on rotation end.
                stop: function (event, ui) {


                    //  var e = ui.element;

                    //           var width = e.css('width').substr(0,e.css('width').length-2);
                    //         var height = e.css('height').substr(0,e.css('height').length-2);
                    //         width = parseFloat(width);
                    //         height = parseFloat(height);
                    //         console.log(width,height);
                    //         // alert("Calleeed");

                    //         e.css('transform-origin', width/2 + 'px ' + height/2 + 'px ' + '0px');

                    $('.printable-area').removeClass('crossing_border');

                },

                // Set the rotation center at (25%, 75%).
                //  rotationCenterX: 0.0,
                //  rotationCenterY: 0.0
            };

            var oldwidth = 0, oldsize = 0;

            _.each(vm.front_design, function (front) {


                if (front.z_index == vm.selected_text.z_index) {
                    $('#tools' + vm.selected_text.z_index + "front").css({ 'visibility': 'visible' });
                    $('#box' + vm.selected_text.z_index + "front").addClass('border');


                    // if(front.type==="text"){


                    //       setTimeout(function(){
                    //           $scope.focus = true;
                    //       },0)

                    //     //console.log($scope.focus)
                    // }

                    intervals.push($interval(function(){
                        if(!outsideCollision($("#box"+vm.selected_text.z_index+"front svg"),$('.printable-area'),vm.selected_text.z_index,"front")){
                            vm.deleteLayer(front.z_index);
                        }
                    },200))
                    intervals.push( $interval(function() {
                        if (!collision($("#box"+vm.selected_text.z_index+"front svg"), $('.printable-area'),vm.selected_text.z_index,"front")) {
                            $('.printable-area').addClass('crossing_border');
                        }
                        else {

                            $('.printable-area').removeClass('crossing_border');

                        }
                    }, 200))


                    console.log(vm.interval_id);


                    $('#box' + vm.selected_text.z_index + "front").resizable({
                        handles: { 'nw': $('#resize' + vm.selected_text.z_index + "front") }, aspectRatio: true, minHeight: 15, minWidth: 15,

                        start: function (event, ui) {
                            vm.oldWidth = ui.size.width;
                            vm.oldHeight = ui.size.hieght;
                        },
                        resize: function (event, ui) {
                            $('.printable-area').css({ 'overflow': 'hidden' });
                            var e = ui.element;
                            //console.log(ui.element);
                            var o = e.parent().parent();
                            var left = o.css('left');

                            $(this).css({
                                'top': parseInt(ui.position.top, 10) + ((ui.originalSize.height - ui.size.height)) / 2,
                                'left': parseInt(ui.position.left, 10) + ((ui.originalSize.width - ui.size.width)) / 2
                            });
                            left = parseInt(left.replace('px', ''));

                            var top = o.css('top');
                            top = parseInt(top.replace('px', ''));
                            var width = o.css('width');
                            width = parseInt(width.replace('px', ''));

                            var height = o.css('height');
                            height = parseInt(height.replace('px', ''));


                            var $left = parseInt(ui.position.left),
                                $top = parseInt(ui.position.top),
                                $width = parseInt(ui.size.width),
                                $height = parseInt(ui.size.height);
                            if (($left + $width) > width || ($top + $height) > height) {
                                //e.data('block', true);
                                //  e.css('border', '1px solid #FF0000');
                                if (parseInt(left + $left + $width) > 490 || parseInt(top + $top + $height) > 490) {
                                    //$jd(this).resizable('widget').trigger('mouseup');
                                }
                            } else {
                                // e.data('block', false);
                                // e.css('border', '1px dashed #444444');
                            }
                            var svg = e.find('svg');

                            svg[0].setAttributeNS(null, 'width', $width);
                            svg[0].setAttributeNS(null, 'height', $height);
                            svg[0].setAttributeNS(null, 'preserveAspectRatio', 'none');




                            var svg = e.find('svg');



                            // if(e.data('type') == 'clipart')
                            // {
                            //     var file = e.data('file');
                            //     if(file.type == 'image')
                            //     {
                            //         var img = e.find('image');
                            //         img[0].setAttributeNS(null, 'width', $width);
                            //         img[0].setAttributeNS(null, 'height', $height);
                            //     }
                            // }

                            // if(e.data('type') == 'text')
                            // {
                            //     //var text = e.find('text');
                            //     //text[0].setAttributeNS(null, 'y', 20);
                            // }

                            jQuery('#' + e.data('type') + '-width').val(parseInt($width));
                            jQuery('#' + e.data('type') + '-height').val(parseInt($height));
                        },
                        stop: function (e, ui) {

                            var e = ui.element;
                            vm.newWidth = ui.size.width;
                            vm.newHeight = ui.size.hieght;

                            //   var width = e.css('width').substr(0,e.css('width').length-2);
                            // var height = e.css('height').substr(0,e.css('height').length-2);
                            // width = parseFloat(width);
                            // height = parseFloat(height);
                            // console.log(width,height);
                            // // alert("Calleeed");

                            // e.css('transform-origin', width/2 + 'px ' + height/2 + 'px ' + '0px');

                            $('.printable-area').css({ 'overflow': 'visible' });
                            //vm.unitWidth += 25;
                            // var text = document.querySelectorAll("#box1front" + ' tspan');
                            // var $w = parseInt(text[0].getBoundingClientRect().width);
                            // var $h = parseInt(text[0].getBoundingClientRect().height);
                            // vm.unitWidth = $w/5;
                        }
                    })
                        .rotatable(params, { handle: $('#box' + vm.selected_text.z_index + "front" + ' .icon-rotate-free') },{wheelRotate: false});

                    $('#box' + vm.selected_text.z_index + "front" + ' .rotate a').append($('#box' + vm.selected_text.z_index + "front" + ' .icon-rotate-free'));
                    var recoupLeft, recoupTop;
                    $('#box' + vm.selected_text.z_index + "front").draggable({
                        start: function (event, ui) {
                            var left = parseInt($(this).css('left'),10);
                            left = isNaN(left) ? 0 : left;
                            var top = parseInt($(this).css('top'),10);
                            top = isNaN(top) ? 0 : top;
                            recoupLeft = left - ui.position.left;
                            recoupTop = top - ui.position.top;

                        },
                        cancel: '.delete,.drag',
                        drag: function (e, ui) {
                            $('.printable-area').css({ 'overflow': 'hidden' });
                            y2 = ui.position.top;
                            x2 = ui.position.left;
                            ui.position.left += recoupLeft;
                            ui.position.top += recoupTop;
                            var printableWidth = $('.printable-area').width()+20;
                            //  console.log(printableWidth, x2);
                            if (x2 > printableWidth) {
                                // alert("Crossing Boundries");
                                // $('.printable-holder').addClass('crossing_border');
                            }

                            // else if(x2 > -printableWidth){
                            //     console.log("Yeeeedddd");

                            // }
                            // else{

                            //     $('.printable-holder').removeClass('crossing_border');

                            // }
                            //     if(x2<-100){alert("Lesser than -100px");
                            // }

                        },
                        stop: function (e, ui) {
                            $('.printable-area').css({ 'overflow': 'visible' });
                        }
                    });

                    // vm.selected_tex.slider.value = rotationInfo.deg;
                    front.selected = true;
                }
                else {
                    $('#tools' + front.z_index + "front").css({ 'visibility': 'hidden' });
                    $('#box' + front.z_index + "front").removeClass('border');
                    front.selected = false;
                }
            })





            // console.log(angular.element('#box'+vm.selected_text.z_index));
            $scope.focus = true;


        }

        else if (vm.default_tab === 2) {
            // _index = vm.back_design.findIndex(x => x.z_index == index);
            _index = _.findIndex(vm.back_design, function (x) { return x.z_index == index });
            vm.selected_text = vm.back_design[_index];
            vm.backObject = vm.back_design[_index];


            vm.default_design_tab = vm.selected_text.type === 'svg' ? 2 : 3;
            if (vm.selected_text.type === 'img')
                vm.default_design_tab = 4;

            $("#box"+vm.selected_text.z_index+"back").css('z-index',vm.maxZIndex++);
            vm.selected_text.zIndex = vm.maxZIndex++;

            if(vm.back_design.length>1){
                _.each(vm.back_design,function(back){

                    var zIndex = $("#box"+back.z_index+"back").css('z-index');
                    if(back.z_index === vm.selected_text.z_index){


                        $("#box"+back.z_index+"back").css('z-index',parseInt(zIndex)+1);
                        vm.selected_text.zIndex = parseInt(zIndex)+1;

                        vm.back_design = _.sortBy(vm.back_design,'zIndex');

                        //console.log(vm.front_design);

                    }
                    else{

                        if(parseInt(zIndex)!==0){
                            $("#box"+back.z_index+"back").css('z-index',parseInt(zIndex)-1);
                            vm.selected_text.zIndex = parseInt(zIndex)-1;
                        }
                    }

                })
            }


            var tspan = document.querySelector('#box' + vm.selected_text.z_index + "back" + ' tspan')

            // vm.Bbox = tspan.getBBox();
            // vm.Bbox.height += 30;
            // vm.Bbox.width += 50;
            // var rotationInfo = $('#box'+vm.selected_text.z_index).rotationInfo();
            // console.log(rotationInfo.deg);
            // var updateVisibility = "-webkit-user-select: none; visibility: visible; transform: rotateZ(0deg);";
            // angular.element('#box'+vm.selected_text.z_index)[0].attributes[6].nodeValue = updateVisibility;
            var params = {
                // Callback fired on rotation start.
                start: function (event, ui) {

                    //    $('.border').rotationInfo(vm.selected_text.slider.value);
                    //    console.log($('.border').rotationInfo().deg,vm.selected_text.slider.value);

                    // $('.border').css({
                    //     '-webkit-transform' : 'rotate(' + vm.selected_text.slider.value + 'deg)',
                    //     '-moz-transform'    : 'rotate(' + vm.selected_text.slider.value + 'deg)',
                    //     '-ms-transform'     : 'rotate(' + vm.selected_text.slider.value + 'deg)',
                    //     '-o-transform'      : 'rotate(' + vm.selected_text.slider.value + 'deg)',
                    //     'transform'         : 'rotate(' + vm.selected_text.slider.value + 'deg)'
                    // });

                },
                // Callback fired during rotation.
                rotate: function (event, ui) {

                    //  var updateDegree = ui.angle.current * (180/Math.PI);
                    //  vm.selected_text.slider.value = updateDegree;
                    //  $scope.$apply();
                    // console.log("Rotating",updateDegree);
                    // console.log("Rotatating",updateDegree);
                    // var $scope = angular.element('#box').scope();
                    // $scope.slider.value = updateDegree;
                    // $scope.$apply();

                },
                // Callback fired on rotation end.
                stop: function (event, ui) {

                },

                // Set the rotation center at (25%, 75%).
                // rotationCenterX: 25.0,
                // rotationCenterY: 75.0
            };





            var oldwidth = 0, oldsize = 0;

            _.each(vm.back_design, function (front) {


                if (front.z_index == vm.selected_text.z_index) {
                    $('#tools' + vm.selected_text.z_index + "back").css({ 'visibility': 'visible' });
                    $('#box' + vm.selected_text.z_index + "back").addClass('border');



                    intervals.push($interval(function(){
                        if(!outsideCollision($("#box"+vm.selected_text.z_index+"back svg"),$('.printable-area'),vm.selected_text.z_index,"back")){
                            vm.deleteLayer(front.z_index);
                        }
                    },200))

                    // intervals.push($interval(function(){
                    //     if(!outsideCollision($("#box"+vm.selected_text.z_index+"back svg"),$('.printable-area'))){
                    //        vm.deleteLayer(front.z_index);
                    //     }
                    // },200))

                    intervals.push( $interval(function() {
                        if (!collision($("#box"+vm.selected_text.z_index+"back svg"), $('.printable-area'),vm.selected_text.z_index,"back")) {
                            $('.printable-area').addClass('crossing_border');
                        }
                        else {

                            $('.printable-area').removeClass('crossing_border');

                        }
                    }, 200))

                    $('#box' + vm.selected_text.z_index + "back").resizable({
                        handles: { 'nw': $('#resize' + vm.selected_text.z_index + "back") }, aspectRatio: true, minHeight: 15, minWidth: 15,

                        start: function (event, ui) {
                            oldwidth = ui.size.width;
                        },
                        resize: function (event, ui) {
                            $('.printable-area').css({ 'overflow': 'hidden' });
                            var e = ui.element;
                            var o = e.parent().parent();
                            var left = o.css('left');
                            left = parseInt(left.replace('px', ''));

                            var top = o.css('top');
                            top = parseInt(top.replace('px', ''));
                            var width = o.css('width');
                            width = parseInt(width.replace('px', ''));

                            $(this).css({
                                'top': parseInt(ui.position.top, 10) + ((ui.originalSize.height - ui.size.height)) / 2,
                                'left': parseInt(ui.position.left, 10) + ((ui.originalSize.width - ui.size.width)) / 2
                            });

                            var height = o.css('height');
                            height = parseInt(height.replace('px', ''));

                            var $left = parseInt(ui.position.left),
                                $top = parseInt(ui.position.top),
                                $width = parseInt(ui.size.width),
                                $height = parseInt(ui.size.height);
                            if (($left + $width) > width || ($top + $height) > height) {
                                //e.data('block', true);
                                //  e.css('border', '1px solid #FF0000');
                                if (parseInt(left + $left + $width) > 490 || parseInt(top + $top + $height) > 490) {
                                    //$jd(this).resizable('widget').trigger('mouseup');
                                }
                            } else {
                                // e.data('block', false);
                                // e.css('border', '1px dashed #444444');
                            }

                            console.log(e);
                            var svg = e.find('svg');

                            console.log(svg);

                            svg[0].setAttributeNS(null, 'width', $width);
                            svg[0].setAttributeNS(null, 'height', $height);
                            svg[0].setAttributeNS(null, 'preserveAspectRatio', 'none');

                            // if(e.data('type') == 'clipart')
                            // {
                            //     var file = e.data('file');
                            //     if(file.type == 'image')
                            //     {
                            //         var img = e.find('image');
                            //         img[0].setAttributeNS(null, 'width', $width);
                            //         img[0].setAttributeNS(null, 'height', $height);
                            //     }
                            // }

                            // if(e.data('type') == 'text')
                            // {
                            //     //var text = e.find('text');
                            //     //text[0].setAttributeNS(null, 'y', 20);
                            // }

                            jQuery('#' + e.data('type') + '-width').val(parseInt($width));
                            jQuery('#' + e.data('type') + '-height').val(parseInt($height));
                        },
                        stop: function (e, ui) {
                            $('.printable-area').css({ 'overflow': 'visible' });
                        }
                    })
                        .rotatable(params, { handle: $('#box' + vm.selected_text.z_index + "back" + ' .icon-rotate-free') },{wheelRotate: false});
                    $('#box' + vm.selected_text.z_index + "back" + ' .rotate a').append($('#box' + vm.selected_text.z_index + "back" + ' .icon-rotate-free'));
                    var recoupLeft, recoupTop;
                    $('#box' + vm.selected_text.z_index + "back").draggable({
                        start: function (event, ui) {
                            var left = parseInt($(this).css('left'),10);
                            left = isNaN(left) ? 0 : left;
                            var top = parseInt($(this).css('top'),10);
                            top = isNaN(top) ? 0 : top;
                            recoupLeft = left - ui.position.left;
                            recoupTop = top - ui.position.top;
                        },
                        cancel: '.delete,.drag',
                        drag: function (e, ui) {
                            $('.printable-area').css({ 'overflow': 'hidden' });
                            y2 = ui.position.top;
                            x2 = ui.position.left;
                            ui.position.left += recoupLeft;
                            ui.position.top += recoupTop;
                            var printableWidth = $('.printable-area').width() + 20;
                            if (x2 > printableWidth) {
                                // alert("Crossing Boundries");
                                console.log(printableWidth, x2);
                            }
                            //     if(x2<-100){alert("Lesser than -100px");
                            // }

                        },
                        stop: function (e, ui) {
                            $('.printable-area').css({ 'overflow': 'visible' });
                        }
                    });

                    // vm.selected_tex.slider.value = rotationInfo.deg;
                    front.selected = true;
                }
                else {
                    $('#tools' + front.z_index + "back").css({ 'visibility': 'hidden' });
                    $('#box' + front.z_index + "back").removeClass('border');
                    front.selected = false;
                }
            })





            // console.log(angular.element('#box'+vm.selected_text.z_index));
            $scope.focus = true;


        }

        else if (vm.default_tab === 3) {
            // _index = vm.left_design.findIndex(x => x.z_index == index);
            _index = _.findIndex(vm.left_design, function (x) { return x.z_index == index });

            vm.selected_text = vm.left_design[_index];
            vm.leftObject = vm.left_design[_index];


            vm.default_design_tab = vm.selected_text.type === 'svg' ? 2 : 3;
            if (vm.selected_text.type === 'img')
                vm.default_design_tab = 4;

            $("#box"+vm.selected_text.z_index+"left").css('z-index',vm.maxZIndex++);
            vm.selected_text.zIndex = vm.maxZIndex++;

            if(vm.left_design.length>1){
                _.each(vm.left_design,function(left){

                    var zIndex = $("#box"+left.z_index+"left").css('z-index');
                    if(left.z_index === vm.selected_text.z_index){


                        $("#box"+left.z_index+"left").css('z-index',parseInt(zIndex)+1);
                        vm.selected_text.zIndex = parseInt(zIndex)+1;

                        vm.left_design = _.sortBy(vm.left_design,'zIndex');

                        //console.log(vm.front_design);

                    }
                    else{

                        if(parseInt(zIndex)!==0){
                            $("#box"+left.z_index+"back").css('z-index',parseInt(zIndex)-1);
                            vm.selected_text.zIndex = parseInt(zIndex)-1;
                        }
                    }

                })
            }


            var tspan = document.querySelector('#box' + vm.selected_text.z_index + "left" + ' tspan')

            // vm.Bbox = tspan.getBBox();
            // vm.Bbox.height += 30;
            // vm.Bbox.width += 50;
            // var rotationInfo = $('#box'+vm.selected_text.z_index).rotationInfo();
            // console.log(rotationInfo.deg);
            // var updateVisibility = "-webkit-user-select: none; visibility: visible; transform: rotateZ(0deg);";
            // angular.element('#box'+vm.selected_text.z_index)[0].attributes[6].nodeValue = updateVisibility;

            var params = {
                // Callback fired on rotation start.
                start: function (event, ui) {

                    //    $('.border').rotationInfo(vm.selected_text.slider.value);
                    //    console.log($('.border').rotationInfo().deg,vm.selected_text.slider.value);

                    // $('.border').css({
                    //     '-webkit-transform' : 'rotate(' + vm.selected_text.slider.value + 'deg)',
                    //     '-moz-transform'    : 'rotate(' + vm.selected_text.slider.value + 'deg)',
                    //     '-ms-transform'     : 'rotate(' + vm.selected_text.slider.value + 'deg)',
                    //     '-o-transform'      : 'rotate(' + vm.selected_text.slider.value + 'deg)',
                    //     'transform'         : 'rotate(' + vm.selected_text.slider.value + 'deg)'
                    // });

                },
                // Callback fired during rotation.
                rotate: function (event, ui) {

                    //  var updateDegree = ui.angle.current * (180/Math.PI);
                    //  vm.selected_text.slider.value = updateDegree;
                    //  $scope.$apply();
                    // console.log("Rotating",updateDegree);
                    // console.log("Rotatating",updateDegree);
                    // var $scope = angular.element('#box').scope();
                    // $scope.slider.value = updateDegree;
                    // $scope.$apply();

                },
                // Callback fired on rotation end.
                stop: function (event, ui) {

                },

                // Set the rotation center at (25%, 75%).
                // rotationCenterX: 25.0,
                // rotationCenterY: 75.0
            };

            var oldwidth = 0, oldsize = 0;

            _.each(vm.left_design, function (front) {


                if (front.z_index == vm.selected_text.z_index) {
                    $('#tools' + vm.selected_text.z_index + "left").css({ 'visibility': 'visible' });
                    $('#box' + vm.selected_text.z_index + "left").addClass('border');

                    intervals.push($interval(function(){
                        if(!outsideCollision($("#box"+vm.selected_text.z_index+"left svg"),$('.printable-area'),vm.selected_text.z_index,"left")){
                            vm.deleteLayer(front.z_index);
                        }
                    },200))

                    intervals.push( $interval(function() {
                        if (!collision($("#box"+vm.selected_text.z_index+"left svg"), $('.printable-area'),vm.selected_text.z_index,"left")) {
                            $('.printable-area').addClass('crossing_border');
                        }
                        else {

                            $('.printable-area').removeClass('crossing_border');

                        }
                    }, 200))

                    $('#box' + vm.selected_text.z_index + "left").resizable({
                        handles: { 'nw': $('#resize' + vm.selected_text.z_index + "left") }, aspectRatio: true, minHeight: 15, minWidth: 15,

                        start: function (event, ui) {
                            oldwidth = ui.size.width;
                        },
                        resize: function (event, ui) {
                            $('.printable-area').css({ 'overflow': 'hidden' });
                            var e = ui.element;
                            var o = e.parent().parent();
                            var left = o.css('left');
                            left = parseInt(left.replace('px', ''));

                            var top = o.css('top');
                            top = parseInt(top.replace('px', ''));
                            var width = o.css('width');
                            width = parseInt(width.replace('px', ''));

                            var height = o.css('height');
                            height = parseInt(height.replace('px', ''));

                            $(this).css({
                                'top': parseInt(ui.position.top, 10) + ((ui.originalSize.height - ui.size.height)) / 2,
                                'left': parseInt(ui.position.left, 10) + ((ui.originalSize.width - ui.size.width)) / 2
                            });

                            var $left = parseInt(ui.position.left),
                                $top = parseInt(ui.position.top),
                                $width = parseInt(ui.size.width),
                                $height = parseInt(ui.size.height);
                            if (($left + $width) > width || ($top + $height) > height) {
                                //e.data('block', true);
                                //  e.css('border', '1px solid #FF0000');
                                if (parseInt(left + $left + $width) > 490 || parseInt(top + $top + $height) > 490) {
                                    //$jd(this).resizable('widget').trigger('mouseup');
                                }
                            } else {
                                // e.data('block', false);
                                // e.css('border', '1px dashed #444444');
                            }
                            var svg = e.find('svg');

                            svg[0].setAttributeNS(null, 'width', $width);
                            svg[0].setAttributeNS(null, 'height', $height);
                            svg[0].setAttributeNS(null, 'preserveAspectRatio', 'none');

                            // if(e.data('type') == 'clipart')
                            // {
                            //     var file = e.data('file');
                            //     if(file.type == 'image')
                            //     {
                            //         var img = e.find('image');
                            //         img[0].setAttributeNS(null, 'width', $width);
                            //         img[0].setAttributeNS(null, 'height', $height);
                            //     }
                            // }

                            // if(e.data('type') == 'text')
                            // {
                            //     //var text = e.find('text');
                            //     //text[0].setAttributeNS(null, 'y', 20);
                            // }

                            jQuery('#' + e.data('type') + '-width').val(parseInt($width));
                            jQuery('#' + e.data('type') + '-height').val(parseInt($height));
                        },
                        stop: function (e, ui) {
                            $('.printable-area').css({ 'overflow': 'visible' });
                        }
                    })
                        .rotatable(params, { handle: $('#box' + vm.selected_text.z_index + "left" + ' .icon-rotate-free') },{wheelRotate: false});
                    $('#box' + vm.selected_text.z_index + "left" + ' .rotate a').append($('#box' + vm.selected_text.z_index + "left" + ' .icon-rotate-free'));
                    var recoupLeft, recoupTop;
                    $('#box' + vm.selected_text.z_index + "left").draggable({
                        start: function (event, ui) {
                            var left = parseInt($(this).css('left'),10);
                            left = isNaN(left) ? 0 : left;
                            var top = parseInt($(this).css('top'),10);
                            top = isNaN(top) ? 0 : top;
                            recoupLeft = left - ui.position.left;
                            recoupTop = top - ui.position.top;
                        },
                        cancel: '.delete,.drag',
                        drag: function (e, ui) {
                            $('.printable-area').css({ 'overflow': 'hidden' });
                            y2 = ui.position.top;
                            x2 = ui.position.left;
                            ui.position.left += recoupLeft;
                            ui.position.top += recoupTop;
                            var printableWidth = $('.printable-area').width() + 20;
                            if (x2 > printableWidth) {
                                //alert("Crossing Boundries");
                                console.log(printableWidth, x2);
                            }
                            //     if(x2<-100){alert("Lesser than -100px");
                            // }

                        },
                        stop: function (e, ui) {
                            $('.printable-area').css({ 'overflow': 'visible' });
                        }
                    });

                    // vm.selected_tex.slider.value = rotationInfo.deg;
                    front.selected = true;
                }
                else {
                    $('#tools' + front.z_index + "left").css({ 'visibility': 'hidden' });
                    $('#box' + front.z_index + "left").removeClass('border');
                    front.selected = false;
                }
            })





            // console.log(angular.element('#box'+vm.selected_text.z_index));
            $scope.focus = true;


        }

        else if (vm.default_tab === 4) {
            // _index = vm.right_design.findIndex(x => x.z_index == index);
            _index = _.findIndex(vm.right_design, function (x) { return x.z_index == index });
            vm.selected_text = vm.right_design[_index];
            vm.rightObject = vm.right_design[_index];


            vm.default_design_tab = vm.selected_text.type === 'svg' ? 2 : 3;
            if (vm.selected_text.type === 'img')
                vm.default_design_tab = 4;

            $("#box"+vm.selected_text.z_index+"right").css('z-index',vm.maxZIndex++);
            vm.selected_text.zIndex = vm.maxZIndex++;

            if(vm.right_design.length>1){
                _.each(vm.right_design,function(right){

                    var zIndex = $("#box"+right.z_index+"right").css('z-index');
                    if(right.z_index === vm.selected_text.z_index){


                        $("#box"+right.z_index+"back").css('z-index',parseInt(zIndex)+1);
                        vm.selected_text.zIndex = parseInt(zIndex)+1;

                        vm.right_design = _.sortBy(vm.right_design,'zIndex');

                        //console.log(vm.front_design);

                    }
                    else{

                        if(parseInt(zIndex)!==0){
                            $("#box"+right.z_index+"back").css('z-index',parseInt(zIndex)-1);
                            vm.selected_text.zIndex = parseInt(zIndex)-1;
                        }
                    }

                })
            }


            var tspan = document.querySelector('#box' + vm.selected_text.z_index + "right" + ' tspan')

            // vm.Bbox = tspan.getBBox();
            // vm.Bbox.height += 30;
            // vm.Bbox.width += 50;
            // var rotationInfo = $('#box'+vm.selected_text.z_index).rotationInfo();
            // console.log(rotationInfo.deg);
            // var updateVisibility = "-webkit-user-select: none; visibility: visible; transform: rotateZ(0deg);";
            // angular.element('#box'+vm.selected_text.z_index)[0].attributes[6].nodeValue = updateVisibility;

            var params = {
                // Callback fired on rotation start.
                start: function (event, ui) {

                    //    $('.border').rotationInfo(vm.selected_text.slider.value);
                    //    console.log($('.border').rotationInfo().deg,vm.selected_text.slider.value);

                    // $('.border').css({
                    //     '-webkit-transform' : 'rotate(' + vm.selected_text.slider.value + 'deg)',
                    //     '-moz-transform'    : 'rotate(' + vm.selected_text.slider.value + 'deg)',
                    //     '-ms-transform'     : 'rotate(' + vm.selected_text.slider.value + 'deg)',
                    //     '-o-transform'      : 'rotate(' + vm.selected_text.slider.value + 'deg)',
                    //     'transform'         : 'rotate(' + vm.selected_text.slider.value + 'deg)'
                    // });

                },
                // Callback fired during rotation.
                rotate: function (event, ui) {

                    //  var updateDegree = ui.angle.current * (180/Math.PI);
                    //  vm.selected_text.slider.value = updateDegree;
                    //  $scope.$apply();
                    // console.log("Rotating",updateDegree);
                    // console.log("Rotatating",updateDegree);
                    // var $scope = angular.element('#box').scope();
                    // $scope.slider.value = updateDegree;
                    // $scope.$apply();

                },
                // Callback fired on rotation end.
                stop: function (event, ui) {

                },

                // Set the rotation center at (25%, 75%).
                // rotationCenterX: 25.0,
                // rotationCenterY: 75.0
            };

            var oldwidth = 0, oldsize = 0;

            _.each(vm.right_design, function (front) {


                if (front.z_index == vm.selected_text.z_index) {
                    $('#tools' + vm.selected_text.z_index + "right").css({ 'visibility': 'visible' });
                    $('#box' + vm.selected_text.z_index + "right").addClass('border');

                    intervals.push($interval(function(){
                        if(!outsideCollision($("#box"+vm.selected_text.z_index+"right svg"),$('.printable-area'),vm.selected_text.z_index,"right")){
                            vm.deleteLayer(front.z_index);
                        }
                    },200))
                    intervals.push( $interval(function() {
                        if (!collision($("#box"+vm.selected_text.z_index+"right svg"), $('.printable-area'),vm.selected_text.z_index,"right")) {
                            $('.printable-area').addClass('crossing_border');
                        }
                        else {

                            $('.printable-area').removeClass('crossing_border');

                        }
                    }, 200))

                    $('#box' + vm.selected_text.z_index + "right").resizable({
                        handles: { 'nw': $('#resize' + vm.selected_text.z_index + "right") }, aspectRatio: true, minHeight: 15, minWidth: 15,

                        start: function (event, ui) {
                            oldwidth = ui.size.width;
                        },
                        resize: function (event, ui) {
                            $('.printable-area').css({ 'overflow': 'hidden' });
                            var e = ui.element;
                            var o = e.parent().parent();
                            var left = o.css('left');
                            left = parseInt(left.replace('px', ''));

                            var top = o.css('top');
                            top = parseInt(top.replace('px', ''));
                            var width = o.css('width');
                            width = parseInt(width.replace('px', ''));

                            var height = o.css('height');
                            height = parseInt(height.replace('px', ''));

                            $(this).css({
                                'top': parseInt(ui.position.top, 10) + ((ui.originalSize.height - ui.size.height)) / 2,
                                'left': parseInt(ui.position.left, 10) + ((ui.originalSize.width - ui.size.width)) / 2
                            });

                            var $left = parseInt(ui.position.left),
                                $top = parseInt(ui.position.top),
                                $width = parseInt(ui.size.width),
                                $height = parseInt(ui.size.height);
                            if (($left + $width) > width || ($top + $height) > height) {
                                //e.data('block', true);
                                //  e.css('border', '1px solid #FF0000');
                                if (parseInt(left + $left + $width) > 490 || parseInt(top + $top + $height) > 490) {
                                    //$jd(this).resizable('widget').trigger('mouseup');
                                }
                            } else {
                                // e.data('block', false);
                                // e.css('border', '1px dashed #444444');
                            }
                            var svg = e.find('svg');

                            svg[0].setAttributeNS(null, 'width', $width);
                            svg[0].setAttributeNS(null, 'height', $height);
                            svg[0].setAttributeNS(null, 'preserveAspectRatio', 'none');

                            // if(e.data('type') == 'clipart')
                            // {
                            //     var file = e.data('file');
                            //     if(file.type == 'image')
                            //     {
                            //         var img = e.find('image');
                            //         img[0].setAttributeNS(null, 'width', $width);
                            //         img[0].setAttributeNS(null, 'height', $height);
                            //     }
                            // }

                            // if(e.data('type') == 'text')
                            // {
                            //     //var text = e.find('text');
                            //     //text[0].setAttributeNS(null, 'y', 20);
                            // }

                            jQuery('#' + e.data('type') + '-width').val(parseInt($width));
                            jQuery('#' + e.data('type') + '-height').val(parseInt($height));
                        },
                        stop: function (e, ui) {
                            $('.printable-area').css({ 'overflow': 'visible' });
                        }
                    })
                        .rotatable(params, { handle: $('#box' + vm.selected_text.z_index + "right" + ' .icon-rotate-free') });
                    $('#box' + vm.selected_text.z_index + "right" + ' .rotate a').append($('#box' + vm.selected_text.z_index + "right" + ' .icon-rotate-free'));
                    var recoupLeft, recoupTop;
                    $('#box' + vm.selected_text.z_index + "right").draggable({
                        start: function (event, ui) {
                            var left = parseInt($(this).css('left'),10);
                            left = isNaN(left) ? 0 : left;
                            var top = parseInt($(this).css('top'),10);
                            top = isNaN(top) ? 0 : top;
                            recoupLeft = left - ui.position.left;
                            recoupTop = top - ui.position.top;
                        },
                        cancel: '.delete,.drag',
                        drag: function (e, ui) {
                            $('.printable-area').css({ 'overflow': 'hidden' });
                            y2 = ui.position.top;
                            x2 = ui.position.left;
                            ui.position.left += recoupLeft;
                            ui.position.top += recoupTop;
                            var printableWidth = $('.printable-area').width() + 20;
                            if (x2 > printableWidth) {
                                console.log(printableWidth, x2);
                            }
                            //     if(x2<-100){alert("Lesser than -100px");
                            // }

                        },
                        stop: function (e, ui) {
                            $('.printable-area').css({ 'overflow': 'visible' });
                        }
                    });

                    // vm.selected_tex.slider.value = rotationInfo.deg;
                    front.selected = true;
                }
                else {
                    $('#tools' + front.z_index + "right").css({ 'visibility': 'hidden' });
                    $('#box' + front.z_index + "right").removeClass('border');
                    front.selected = false;
                }
            })





            // console.log(angular.element('#box'+vm.selected_text.z_index));
            $scope.focus = true;


        }



    }

    vm.deselect_text = function (e) {

        //if (vm.selected_text.outline) {
        //    console.log(e);
        //    vm.selected_text.outline.value = 4;

        //}

            vm.selected_text = {};
            $scope.focus = false;
            angular.forEach(intervals, function(interval) {
                $interval.cancel(interval);
            });
            intervals.length = 0;
        }

    vm.insideTextSelection = function (e) {
        console.log($(e.traget));
        vm.select_text(vm.frontObject.z_index);
    }

        function updateSVGText(textObj) {

            if (textObj && textObj.z_index) {

                var text = document.querySelectorAll('#box' + textObj.z_index + ' tspan');
                var $w = parseInt(text[0].getBoundingClientRect().width);
                var $h = parseInt(text[0].getBoundingClientRect().height);
                //  vm.Bbox = text.getBBox();
                $('#box' + textObj.z_index).css('width', $w + 'px');
                $('#box' + textObj.z_index).css('height', $h + 'px');

                var svg = document.querySelectorAll('svg'),
                    width = svg[0].getAttribute('width'),
                    height = svg[0].getAttribute('height'),
                    view = svg[0].getAttribute('viewBox').split(' '),
                    vw = (view[2] * $w) / width,
                    vh = (view[3] * $h) / height;
                svg[0].setAttributeNS(null, 'width', $w + 5);
                svg[0].setAttributeNS(null, 'height', $h);
                svg[0].setAttributeNS(null, 'viewBox', '0 0 ' + vw + ' ' + vh);
                return true;
            }
        }

        //Text Selection

        // vm.updateText = function(event){
        //  var tspan = document.querySelector('tspan');
        //    // console.log(document.querySelector('tspan').getComputedTextLength());
        // // var rotationangle = $('.user-box').css('styles');
        //   var rotationInfo = $('.user-box').rotationInfo();
        // //  var deg = 90;
        //   $scope.slider.value = rotationInfo.deg;
        //   console.log(vm.currentRotation);
        //     if(vm.addText.length > 0){
        //         vm.designSelected = true;
        //         vm.Bbox = tspan.getBBox();
        //         vm.Bbox.height += 30;
        //         vm.Bbox.width += 50;
        //     }
        //     else{
        //         vm.designSelected = false;
        //     }

        // }

        var setSize = function () {
            var e = $('#box' + vm.selected_text.z_index + 'front');
            var txt = e.find('text');
            var $w = parseInt(txt[0].getBoundingClientRect().width);
            var $h = parseInt(txt[0].getBoundingClientRect().height);
            e.css('width', $w + 'px');
            e.css('height', $h + 'px');
            var svg = e.find('svg'),
                width = svg[0].getAttribute('width'),
                height = svg[0].getAttribute('height'),
                view = svg[0].getAttribute('viewBox').split(' '),
                vw = (view[2] * $w) / width,
                vh = (view[3] * $h) / height;
            svg[0].setAttributeNS(null, 'width', $w);
            svg[0].setAttributeNS(null, 'height', $h);
            svg[0].setAttributeNS(null, 'viewBox', '0 0 ' + vw + ' ' + vh);
        };

        vm.showAdvanceTool = function () {
            vm.select_text(vm.frontObject.z_index);
            vm.showTool = !vm.showTool;
        }

        var startTextAlign = function (i,side) {
            var e = $("#box" + i + side);

            var $height = e.height();
            var ph = e.parent().parent().height();
            var top = (ph - $height)/1.25;
            var $width = e.width();
            var pw = e.parent().parent().width();
            var left = (pw - $width) / 2;
            e.css('top', top + 'px');
            e.css('left', left + 'px');
        }

        vm.aa = function () {
            $scope.focus1 = true;
            vm.select_text(vm.frontObject.z_index);
        }

        vm.textBlur = function () {
            if(vm.frontObject)
            vm.select_text(vm.frontObject.z_index);
        }

        vm.addNewText = function () {
            vm.deselect_text();

        }
        vm.widths = [];

        vm.updateText = function () {
            if (vm.default_tab === 3 || vm.default_tab === 4){


            var _colors = ["rgb(0,0,0)"];

            if(vm.default_tab === 3){
                if (vm.total_left_colors.length) {

                    var temp = angular.copy(vm.total_left_colors);
                    temp = temp.concat(_colors);
                    temp = _.uniq(temp);
                    if(temp.length>3){
                        Alert("On each sleeve, you can add images/text with maximum 3 colors.","Oops");
                        vm.selected_text.text = "";
                        return;
                    }

                }

                else {

                    _colors = _.uniq(_colors);
                    if(_colors.length>3){
                        Alert("On each sleeve, you can add images/text with maximum 3 colors.","Oops");
                        vm.selected_text.text = "";
                        return;
                    }

                }
            }
            else if(vm.default_tab === 4){
                if (vm.total_right_colors.length) {

                    var temp = angular.copy(vm.total_right_colors);
                    temp = temp.concat(_colors);
                    temp = _.uniq(temp);
                    if(temp.length>3){
                        Alert("On each sleeve, you can add images/text with maximum 3 colors.","Oops");
                        vm.selected_text.text = "";
                        return;
                    }

                }

                else {

                    _colors = _.uniq(_colors);
                    if(_colors.length>3){
                        Alert("On each sleeve, you can add images/text with maximum 3 colors.","Oops");
                        vm.selected_text.text = "";
                        return;
                    }

                }
            }

            }
            var unitWidth = 0;
            var unitHeight = 0;
            vm.counter = 0;
           // vm.showTool = false;


            // vm.Bbox = document.querySelector('tspan').getBBox();




            //  $('#box'+vm.selected_text.z_index+' svg').css('width', $w + 'px');
            // $('#box'+vm.selected_text.z_index).css('height', $h + 'px');

            //  debugger;



            if (vm.default_tab == 1) {


                if(!vm.selected_text.text.length){
                    vm.deleteLayer(vm.selected_text.z_index);
                    vm.newFrontText = true;
                    return;

                }



                if (vm.selected_text.z_index && vm.selected_text.type == 'text' && !vm.newFrontText) {

                    vm.counter++;





                    if(vm.front_design.length){
                        var e = $('#box'+vm.selected_text.z_index+'front');
                        vm.ofWidth = e.css('width').substr(0,e.css('width').length-2);



                        //   //  vm.oHeight = e.css('height').substr(0,e.css('height').length-2);
                        //   //  vm.oWidth = parseFloat(vm.oWidth);
                        //    // vm.oHeight = parseFloat(vm.oHeight);
                        //     console.log("Old",vm.oWidth);

                        // console.log("Old WIdth",$("#box1front").css('width'));


                        var e = $('#box' + vm.selected_text.z_index + 'front');
                        var text = document.querySelectorAll('#box' + vm.selected_text.z_index + "front" + ' text');
                        var texts = vm.selected_text.text.split('\n');
                        var txt = e.find('text');

                        //if (vm.isFirefox) {
                        //    txt[0].setAttributeNS(null, 'textLength', (vm.selected_text.spacing.value));
                        //}

                        console.log(texts);
                        if (texts.length) {
                            var svgNS = "http://www.w3.org/2000/svg";
                            txt[0].textContent = '';
                            var fontSize = txt[0].getAttribute('font-size').split('px');
                            for (var i = 0; i < texts.length; i++) {
                                var tspan = document.createElementNS(svgNS, 'tspan');
                                var dy = 0;

                                console.log(texts.length);

                                tspan.setAttributeNS(null, 'x', '0');
                                tspan.setAttributeNS(null, 'textLength', (vm.selected_text.spacing.value * 3 * texts[i].length));
                                tspan.setAttributeNS(null, 'lengthAdjust', "spacingAndGlyphs");
                                if (i == 0) {
                                    dy = 22;
                                    tspan.setAttributeNS(null, 'y', '0');
                                }
                                else {
                                    dy = 22 + vm.selected_text.lineHeight.value;
                                }
                                tspan.setAttributeNS(null, 'dy', dy);
                                tspan.setAttributeNS(null,'class', 'text_tspans');
                                var content = document.createTextNode(texts[i]);
                                tspan.appendChild(content);
                                txt[0].appendChild(tspan);
                            }

                        }



                        vm.angle1 = e[0].style.transform;

                        if (vm.angle1 == 'undefined') vm.angle1 = 'rotate(0rad)';
                        e.css('transform', 'rotate(0rad)');
                        // rotate = rotate * Math.PI / 180;
                        // e.css('visibility','hidden');



                        var $w = parseFloat(text[0].getBoundingClientRect().width);
                        var $h = parseFloat(text[0].getBoundingClientRect().height);
                        // vm.selected_text.text = text[0];





                        //var test = $w+vm.unitWidth;

                        //console.log("second time",$w,$w+vm.unitWidth);

                        //  vm.Bbox = text.getBBox();

                        // vm.widths.push($w);
                        // console.log(vm.widths);
                        $('#box' + vm.selected_text.z_index + "front").css('width', $w + 'px');
                        $('#box' + vm.selected_text.z_index + "front").css('height', $h + 'px');


                        var svg = document.querySelectorAll('#box' + vm.selected_text.z_index + "front" + ' svg'),
                            width = svg[0].getAttribute('width'),
                            height = svg[0].getAttribute('height'),
                            view = svg[0].getAttribute('viewBox').split(' '),
                            vw = (view[2] * $w) / width,
                            vh = (view[3] * $h) / height;

                        // console.log(vw);
                        // vw =
                        svg[0].setAttributeNS(null, 'width', $w);
                        svg[0].setAttributeNS(null, 'height', $h);
                        svg[0].setAttributeNS(null, 'viewBox', '0 0 ' + vw + ' ' + vh);

                        var ang = vm.angle1.substr(vm.angle1.indexOf('(')+1,vm.angle1.length);
                        var angle = ang.substr(0,ang.length-4);

                        console.log(angle);



                        //  var init_w = $w;
                        //  var init_h = $h;
                        console.log("new",$w);
                        // console.log($w-vm.oldWidth);

                        if(angle && angle!=="" && angle!=="0"){
                            var delta_w = -(parseFloat($w)-parseFloat(vm.ofWidth))/2;
                            e.css('transform',vm.angle1);
                            var left = e.css('left');
                            left = left.substr(0,left.length-2);
                            left = parseFloat(left)+parseFloat(delta_w);
                            //   console.log("left",left);

                            e.css({left: left});
                        }




                    }



                }


                if (!(vm.selected_text.z_index) || (vm.selected_text.text && (vm.selected_text.type == 'svg' || vm.selected_text.type == 'img')) || vm.newFrontText) {

                    vm.newFrontText = false;

                    // var z_index = vm.front_design[vm.front_design.length - 1].z_index+1;
                    var z_index = 0;

                    var obj = {

                        "type": "text",
                        "font":  vm.fontSelected.family,
                        "color": "rgb(0,0,0)",
                        "outlineColor": "rgb(255,0,0)",
                        "shadowColor":"rgb(255,0,0)",
                        "text": vm.selected_text.text,
                        "z_index": z_index,
                        "zIndex": z_index,
                        "uuid": uuid(),
                        "selected": false,
                        "outline": {
                            "value": 0,
                            "options": {
                                "floor": 0,
                                "ceil": 100,
                                "step": 1,
                                "showSelectionBar": true
                            },
                        },
                        "space": {
                            "value": 0,

                            "options": {
                                "floor": 0,
                                "ceil": 100,
                                "step": 1,
                                "showSelectionBar": true,
                                "onChange": function () {
                                    vm.updateText();
                                }
                            },
                        },

                        "size": {
                            "value": 0,
                            "options": {
                                "floor": 0,
                                "ceil": 100,
                                "step": 1,
                                "showSelectionBar": true,
                                "onChange": function () {
                                    $('#box'+vm.selected_text.z_index+'front').resizable("resizeTo", {
                                        height: vm.selected_text.size.value * 3,
                                        width: vm.selected_text.size.value * 3
                                    });
                                }
                            },
                        },
                        "rotate": {
                            "value": 0,
                            "options": {
                                "floor": -360,
                                "ceil": 360,
                                "step": 1,
                                "showSelectionBar": true,
                                "onChange": function () {
                                    console.log("angle", vm.selected_text.rotate.value);
                                }
                            },
                        },
                        "spacing": {
                            "value": 0,
                            "options": {
                                "floor": 0,
                                "ceil": 10,
                                "step": 1,
                                "showSelectionBar": true,
                                "onChange": function () {
                                    $('#box' + vm.selected_text.z_index + "front" + ' tspan').each(function (index) {
                                        var current = $(this);
                                        current[0].setAttributeNS(null, 'textLength', (vm.selected_text.spacing.value * 3 * current[0].textContent.length));
                                        current[0].setAttributeNS(null, 'lengthAdjust', "spacingAndGlyphs");
                                        vm.updateText();
                                    })


                                }
                            },
                        },
                        "lineHeight": {
                            "value": 0,
                            "options": {
                                "floor": 0,
                                "ceil": 50,
                                "step": 1,
                                "showSelectionBar": true,
                                "onChange": function () {
                                    $('#box' + vm.selected_text.z_index + "front" + ' tspan').each(function (index) {
                                        var dy = 22+vm.selected_text.lineHeight.value;
                                        var current = $(this);
                                        if(index!==0)
                                            current[0].setAttributeNS(null, 'dy', dy);
                                        vm.updateText();
                                    })


                                }
                            }
                        }

                    };

                    if (!vm.front_design.length) {
                        obj.z_index = 1;

                    }
                    else {
                        // obj.z_index = vm.front_design[vm.front_design.length - 1].z_index + 1;
                        obj.z_index = _.max(vm.front_design,function(front){return front.z_index}).z_index + 1;
                    }
                    vm.front_design.push(obj);
                    vm.showTool = false;

                    _.each(vm.front_design, function (front) {



                        if (front.z_index != obj.z_index) {
                            $('#tools' + front.z_index + "front").css({ 'visibility': 'hidden' });
                            $('#box' + front.z_index + "front").removeClass('border');
                            front.selected = false;
                        }
                        else {

                            setTimeout(function () {

                                startTextAlign(obj.z_index, "front");

                                var text = document.querySelectorAll('#box' + obj.z_index + "front" + ' tspan');
                                var $w = parseInt(text[0].getBoundingClientRect().width);
                                var $h = parseInt(text[0].getBoundingClientRect().height);
                                console.log($w);

                                vm.unitWidth = $w;
                                // vm.unitWidth += 4;
                                vm.unitHeight = $h;

                                console.log("Calleeddd");


                                //  vm.Bbox = text.getBBox();
                                $('#box' + obj.z_index + "front").css('width', $w + 'px');
                                $('#box' + obj.z_index + "front").css('height', $h + 'px');

                                var svg = document.querySelectorAll('#box' + obj.z_index + "front" + ' svg'),
                                    width = svg[0].getAttribute('width'),
                                    height = svg[0].getAttribute('height');

                                //    var  view = svg[0].getAttribute('viewBox').split(' '),
                                //     vw = (view[2] * $w)/width,
                                //     vh = (view[3] * $h)/height;




                                svg[0].setAttributeNS(null, 'width', $w);
                                svg[0].setAttributeNS(null, 'height', $h);
                                svg[0].setAttributeNS(null, 'viewBox', '0 0 ' + $w + ' ' + $h);


                                $('#tools' + obj.z_index + "front").css({ 'visibility': 'visible' });
                                $('#box' + obj.z_index + "front").addClass('border');
                                front.selected = true;
                                vm.select_text(obj.z_index);
                            }, 0)


                        }


                    });

                    $scope.focus = true;
                    vm.selected_text = obj;


                    //       _.each(vm.front_design,function(front){
                    //   if(front.type==='text'){
                    //     console.log(front);
                    //   }
                    //     if(front.z_index == vm.selected_text.z_index){

                    //     }
                    //     else {
                    //         //   $('#tools'+front.z_index).css({'visibility':'hidden'});
                    //         //   $('#box'+front.z_index).removeClass('border');
                    //         }
                    //    })

                }
                else {



                }

            }

            else if (vm.default_tab == 2) {


                if(!vm.selected_text.text.length){
                    vm.deleteLayer(vm.selected_text.z_index);
                    vm.newBackText = true;
                    return;

                }


                if (vm.selected_text.z_index && vm.selected_text.type == 'text' && !vm.newBackText) {
                    //alert("Calleeeed");


                    if(vm.back_design.length){
                        var e = $('#box'+vm.selected_text.z_index+'back');
                        vm.obWidth = e.css('width').substr(0,e.css('width').length-2);





                        var e = $('#box' + vm.selected_text.z_index + 'back');
                        var text = document.querySelectorAll('#box' + vm.selected_text.z_index + "back" + ' text');
                        var texts = vm.selected_text.text.split('\n');
                        var txt = e.find('text');

                        //if (vm.isFirefox) {
                        //    txt[0].setAttributeNS(null, 'textLength', (vm.selected_text.spacing.value));
                        //}

                        console.log(texts);
                        if (texts.length) {
                            var svgNS = "http://www.w3.org/2000/svg";
                            txt[0].textContent = '';
                            var fontSize = txt[0].getAttribute('font-size').split('px');
                            for (var i = 0; i < texts.length; i++) {
                                var tspan = document.createElementNS(svgNS, 'tspan');
                                var dy = 0;

                                console.log(texts.length);

                                tspan.setAttributeNS(null, 'x', '0');
                                tspan.setAttributeNS(null, 'textLength', (vm.selected_text.spacing.value * 3 * texts[i].length));
                                if (i == 0) {
                                    dy = 22;
                                    tspan.setAttributeNS(null, 'y', '0');
                                }
                                else {
                                    dy = 22 + vm.selected_text.lineHeight.value;
                                }
                                tspan.setAttributeNS(null, 'dy', dy);
                                tspan.setAttributeNS(null,'class', 'text_tspans');
                                var content = document.createTextNode(texts[i]);
                                tspan.appendChild(content);
                                txt[0].appendChild(tspan);
                            }

                        }

                        vm.angle2 = e[0].style.transform;

                        if (vm.angle2 == 'undefined') vm.angle2 = 'rotate(0rad)';
                        // rotate = rotate * Math.PI / 180;
                        // e.css('visibility','hidden');
                        e.css('transform', 'rotate(0rad)');


                        //var text = document.querySelectorAll('#box' + vm.selected_text.z_index + "back" + ' tspan');
                        var $w = parseInt(text[0].getBoundingClientRect().width);
                        var $h = parseInt(text[0].getBoundingClientRect().height);

                        //  vm.Bbox = text.getBBox();
                        $('#box' + vm.selected_text.z_index + "back").css('width', $w + 'px');
                        $('#box' + vm.selected_text.z_index + "back").css('height', $h + 'px');

                        var svg = document.querySelectorAll('#box' + vm.selected_text.z_index + "back" + ' svg'),
                            width = svg[0].getAttribute('width'),
                            height = svg[0].getAttribute('height'),
                            view = svg[0].getAttribute('viewBox').split(' '),
                            vw = (view[2] * $w) / width,
                            vh = (view[3] * $h) / height;
                        svg[0].setAttributeNS(null, 'width', $w);
                        svg[0].setAttributeNS(null, 'height', $h);
                        svg[0].setAttributeNS(null, 'viewBox', '0 0 ' + vw + ' ' + vh);

                        var ang = vm.angle2.substr(vm.angle2.indexOf('(')+1,vm.angle2.length);
                        var angle = ang.substr(0,ang.length-4);

                        console.log(angle);


                        if(angle && angle!=="" && angle!=="0"){
                            var delta_w = -(parseFloat($w)-parseFloat(vm.obWidth))/2;
                            e.css('transform',vm.angle2);
                            var left = e.css('left');
                            left = left.substr(0,left.length-2);
                            left = parseFloat(left)+parseFloat(delta_w);
                            e.css({left: left});
                        }



                    }
                }

                if (!(vm.selected_text.z_index) || (vm.selected_text.text && (vm.selected_text.type=='svg' || vm.selected_text.type == 'img')) || vm.newBackText) {

                    // var z_index = vm.front_design[vm.front_design.length - 1].z_index+1;
                    vm.newBackText = false;
                    var z_index = 0;
                    console.log(vm.fontSelected.family);
                    var obj = {

                        "type": "text",
                        "font": vm.fontSelected.family,
                        "color": "rgb(0,0,0)",
                        "outlineColor": "rgb(255,0,0)",
                        "text": vm.selected_text.text,
                        "z_index": z_index,
                        "zIndex": z_index,
                        "selected": false,
                        "uuid": uuid(),
                        "outline": {
                            "value": 0,
                            "options": {
                                "floor": 0,
                                "ceil": 100,
                                "step": 1,
                                "showSelectionBar": true,
                            },
                        },
                        "space": {
                            "value": 0,
                            "options": {
                                "floor": 0,
                                "ceil": 100,
                                "step": 1,
                                "showSelectionBar": true,
                                "onChange": function () {
                                    vm.updateText();
                                }
                            },
                        },
                        "size": {
                            "value": 0,
                            "options": {
                                "floor": 0,
                                "ceil": 100,
                                "step": 1,
                                "showSelectionBar": true,
                                "onChange": function () {
                                    $('#box' + vm.selected_text.z_index + 'back').resizable("resizeTo", {
                                        height: vm.selected_text.size.value * 3,
                                        width: vm.selected_text.size.value * 3
                                    });
                                }
                            },
                        },
                        "rotate": {
                            "value": 0,
                            "options": {
                                "floor": -360,
                                "ceil": 360,
                                "step": 1,
                                "showSelectionBar": true,
                                "onChange": function () {
                                    console.log("angle", vm.selected_text.rotate.value);
                                }
                            },
                        },
                        "spacing": {
                            "value": 0,
                            "options": {
                                "floor": 0,
                                "ceil": 10,
                                "step": 1,
                                "showSelectionBar": true,
                                "onChange": function () {
                                    $('#box' + vm.selected_text.z_index + "back" + ' tspan').each(function (index) {
                                        var current = $(this);
                                        current[0].setAttributeNS(null, 'textLength', (vm.selected_text.spacing.value * 3 * current[0].textContent.length));
                                        vm.updateText();
                                    })


                                }
                            },
                        },
                        "lineHeight": {
                            "value": 0,
                            "options": {
                                "floor": 0,
                                "ceil": 50,
                                "step": 1,
                                "showSelectionBar": true,
                                "onChange": function () {
                                    $('#box' + vm.selected_text.z_index + "back" + ' tspan').each(function (index) {
                                        console.log(index);
                                        var dy = 22 + vm.selected_text.lineHeight.value;
                                        var current = $(this);
                                        if (index !== 0)
                                            current[0].setAttributeNS(null, 'dy', dy);
                                        vm.updateText();
                                    })


                                }
                            }
                        }

                    };

                    if (!vm.back_design.length) {
                        obj.z_index = 1;

                    }
                    else {
                        // obj.z_index = vm.back_design[vm.back_design.length - 1].z_index + 1;
                        obj.z_index = _.max(vm.back_design,function(back){return back.z_index}).z_index + 1;
                    }
                    vm.back_design.push(obj);

                    _.each(vm.back_design, function (front) {



                        if (front.z_index != obj.z_index) {
                            $('#tools' + front.z_index + "back").css({ 'visibility': 'hidden' });
                            $('#box' + front.z_index + "back").removeClass('border');
                            front.selected = false;
                        }
                        else {

                            setTimeout(function () {

                                startTextAlign(obj.z_index, "back");

                                var text = document.querySelectorAll('#box' + obj.z_index + "back" + ' tspan');
                                var $w = parseInt(text[0].getBoundingClientRect().width);
                                var $h = parseInt(text[0].getBoundingClientRect().height);
                                unitWidth = $w;
                                unitHeight = $h;


                                //  vm.Bbox = text.getBBox();
                                $('#box' + obj.z_index + "back").css('width', $w + 'px');
                                $('#box' + obj.z_index + "back").css('height', $h + 'px');

                                var svg = document.querySelectorAll('#box' + obj.z_index + "back" + ' svg'),
                                    width = svg[0].getAttribute('width'),
                                    height = svg[0].getAttribute('height');

                                //    var  view = svg[0].getAttribute('viewBox').split(' '),
                                //     vw = (view[2] * $w)/width,
                                //     vh = (view[3] * $h)/height;




                                svg[0].setAttributeNS(null, 'width', $w);
                                svg[0].setAttributeNS(null, 'height', $h);
                                svg[0].setAttributeNS(null, 'viewBox', '0 0 ' + $w + ' ' + $h);


                                $('#tools' + obj.z_index + "back").css({ 'visibility': 'visible' });
                                $('#box' + obj.z_index + "back").addClass('border');
                                front.selected = true;
                                vm.select_text(obj.z_index);
                            }, 0)


                        }


                    });

                    $scope.focus = true;
                    vm.selected_text = obj;


                    //       _.each(vm.front_design,function(front){
                    //   if(front.type==='text'){
                    //     console.log(front);
                    //   }
                    //     if(front.z_index == vm.selected_text.z_index){

                    //     }
                    //     else {
                    //         //   $('#tools'+front.z_index).css({'visibility':'hidden'});
                    //         //   $('#box'+front.z_index).removeClass('border');
                    //         }
                    //    })

                }
                else {



                }


            }

            else if (vm.default_tab == 3) {



                if(!vm.selected_text.text.length){
                    vm.deleteLayer(vm.selected_text.z_index);
                    vm.newLeftText = true;
                    return;

                }

                if (vm.selected_text.z_index && vm.selected_text.type == 'text' && !vm.newLeftText) {

                    if(vm.left_design.length){
                        var e = $('#box'+vm.selected_text.z_index+'left');
                        vm.olWidth = e.css('width').substr(0,e.css('width').length-2);



                        //var text = document.querySelectorAll('#box' + vm.selected_text.z_index + "front" + ' tspan');

                        var e = $('#box' + vm.selected_text.z_index + 'left');
                        var text = document.querySelectorAll('#box' + vm.selected_text.z_index + "left" + ' text');
                        var texts = vm.selected_text.text.split('\n');
                        var txt = e.find('text');

                        //if (vm.isFirefox) {
                        //    txt[0].setAttributeNS(null, 'textLength', (vm.selected_text.spacing.value));
                        //}

                        console.log(texts);
                        if (texts.length) {
                            var svgNS = "http://www.w3.org/2000/svg";
                            txt[0].textContent = '';
                            var fontSize = txt[0].getAttribute('font-size').split('px');
                            for (var i = 0; i < texts.length; i++) {
                                var tspan = document.createElementNS(svgNS, 'tspan');
                                var dy = 0;

                                console.log(texts.length);

                                tspan.setAttributeNS(null, 'x', '0');
                                tspan.setAttributeNS(null, 'textLength', (vm.selected_text.spacing.value * 3 * texts[i].length));
                                if (i == 0) {
                                    dy = 22;
                                    tspan.setAttributeNS(null, 'y', '0');
                                }
                                else {
                                    dy = 22 + vm.selected_text.lineHeight.value;
                                }
                                tspan.setAttributeNS(null, 'dy', dy);
                                tspan.setAttributeNS(null, 'class', 'text_tspans');
                                var content = document.createTextNode(texts[i]);
                                tspan.appendChild(content);
                                txt[0].appendChild(tspan);
                            }

                        }

                        vm.angle3 = e[0].style.transform;

                        if (vm.angle3 == 'undefined') vm.angle3 = 'rotate(0rad)';
                        // rotate = rotate * Math.PI / 180;
                        // e.css('visibility','hidden');
                        e.css('transform', 'rotate(0rad)');

                       // var text = document.querySelectorAll('#box' + vm.selected_text.z_index + "left" + ' tspan');
                        var $w = parseInt(text[0].getBoundingClientRect().width);
                        var $h = parseInt(text[0].getBoundingClientRect().height);

                        //  vm.Bbox = text.getBBox();
                        $('#box' + vm.selected_text.z_index + "left").css('width', $w + 'px');
                        $('#box' + vm.selected_text.z_index + "left").css('height', $h + 'px');

                        var svg = document.querySelectorAll('#box' + vm.selected_text.z_index + "left" + ' svg'),
                            width = svg[0].getAttribute('width'),
                            height = svg[0].getAttribute('height'),
                            view = svg[0].getAttribute('viewBox').split(' '),
                            vw = (view[2] * $w) / width,
                            vh = (view[3] * $h) / height;
                        svg[0].setAttributeNS(null, 'width', $w);
                        svg[0].setAttributeNS(null, 'height', $h);
                        svg[0].setAttributeNS(null, 'viewBox', '0 0 ' + vw + ' ' + vh);


                        var ang = vm.angle3.substr(vm.angle3.indexOf('(')+1,vm.angle3.length);
                        var angle = ang.substr(0,ang.length-4);

                        console.log(angle);


                        if(angle && angle!=="" && angle!=="0"){
                            var delta_w = -(parseFloat($w) - parseFloat(vm.olWidth)) / 2;
                            e.css('transform', vm.angle3);
                            var left = e.css('left');
                            left = left.substr(0,left.length-2);
                            left = parseFloat(left)+parseFloat(delta_w);
                            e.css({left: left});
                        }



                    }
                }

                if (!(vm.selected_text.z_index) || (vm.selected_text.text && (vm.selected_text.type == 'svg' || vm.selected_text.type == 'img')) || vm.newLeftText) {

                    vm.newLeftText = false;

                    // var z_index = vm.front_design[vm.front_design.length - 1].z_index+1;
                    var z_index = 0;
                    var obj = {

                        "type": "text",
                        "font": vm.fontSelected.family,
                        "color": "rgb(0,0,0)",
                        "outlineColor": "rgb(255,0,0)",
                        "text": vm.selected_text.text,
                        "z_index": z_index,
                        "zIndex": z_index,
                        "uuid": uuid(),
                        "selected": false,

                        "outline": {
                            "value": 0,
                            "options": {
                                "floor": 0,
                                "ceil": 100,
                                "step": 1,
                                "showSelectionBar": true,
                            },
                        },
                        "space": {
                            "value": 0,
                            "options": {
                                "floor": 0,
                                "ceil": 100,
                                "step": 1,
                                "showSelectionBar": true,
                                "onChange": function () {
                                    vm.updateText();
                                }
                            },
                        },
                        "size": {
                            "value": 0,
                            "options": {
                                "floor": 0,
                                "ceil": 100,
                                "step": 1,
                                "showSelectionBar": true,
                                "onChange": function () {
                                    $('#box' + vm.selected_text.z_index + 'left').resizable("resizeTo", {
                                        height: vm.selected_text.size.value * 3,
                                        width: vm.selected_text.size.value * 3
                                    });
                                }
                            },
                        },
                        "rotate": {
                            "value": 0,
                            "options": {
                                "floor": -360,
                                "ceil": 360,
                                "step": 1,
                                "showSelectionBar": true,
                                "onChange": function () {
                                    console.log("angle", vm.selected_text.rotate.value);
                                }
                            },
                        },
                        "spacing": {
                            "value": 0,
                            "options": {
                                "floor": 0,
                                "ceil": 10,
                                "step": 1,
                                "showSelectionBar": true,
                                "onChange": function () {
                                    $('#box' + vm.selected_text.z_index + "left" + ' tspan').each(function (index) {
                                        var current = $(this);
                                        current[0].setAttributeNS(null, 'textLength', (vm.selected_text.spacing.value * 3 * current[0].textContent.length));
                                        vm.updateText();
                                    })


                                }
                            },
                        },
                        "lineHeight": {
                            "value": 0,
                            "options": {
                                "floor": 0,
                                "ceil": 50,
                                "step": 1,
                                "showSelectionBar": true,
                                "onChange": function () {
                                    $('#box' + vm.selected_text.z_index + "left" + ' tspan').each(function (index) {
                                        console.log(index);
                                        var dy = 22 + vm.selected_text.lineHeight.value;
                                        var current = $(this);
                                        if (index !== 0)
                                            current[0].setAttributeNS(null, 'dy', dy);
                                        vm.updateText();
                                    })


                                }
                            }
                        }

                    };

                    if (!vm.left_design.length) {
                        obj.z_index = 1;

                    }
                    else {
                        // obj.z_index = vm.left_design[vm.left_design.length - 1].z_index + 1;
                        obj.z_index = _.max(vm.left_design,function(left){return left.z_index}).z_index + 1;
                    }
                    vm.left_design.push(obj);

                    _.each(vm.left_design, function (front) {



                        if (front.z_index != obj.z_index) {
                            $('#tools' + front.z_index + "left").css({ 'visibility': 'hidden' });
                            $('#box' + front.z_index + "left").removeClass('border');
                            front.selected = false;
                        }
                        else {

                            setTimeout(function () {

                                startTextAlign(obj.z_index, "left");

                                var text = document.querySelectorAll('#box' + obj.z_index + "left" + ' tspan');
                                var $w = parseInt(text[0].getBoundingClientRect().width);
                                var $h = parseInt(text[0].getBoundingClientRect().height);
                                unitWidth = $w;
                                unitHeight = $h;


                                //  vm.Bbox = text.getBBox();
                                $('#box' + obj.z_index + "left").css('width', $w + 'px');
                                $('#box' + obj.z_index + "left").css('height', $h + 'px');

                                var svg = document.querySelectorAll('#box' + obj.z_index + "left" + ' svg'),
                                    width = svg[0].getAttribute('width'),
                                    height = svg[0].getAttribute('height');

                                //    var  view = svg[0].getAttribute('viewBox').split(' '),
                                //     vw = (view[2] * $w)/width,
                                //     vh = (view[3] * $h)/height;




                                svg[0].setAttributeNS(null, 'width', $w);
                                svg[0].setAttributeNS(null, 'height', $h);
                                svg[0].setAttributeNS(null, 'viewBox', '0 0 ' + $w + ' ' + $h);


                                $('#tools' + obj.z_index + "left").css({ 'visibility': 'visible' });
                                $('#box' + obj.z_index + "left").addClass('border');
                                front.selected = true;
                                vm.select_text(obj.z_index);
                            }, 0)


                        }


                    });

                    $scope.focus = true;
                    vm.selected_text = obj;


                    //       _.each(vm.front_design,function(front){
                    //   if(front.type==='text'){
                    //     console.log(front);
                    //   }
                    //     if(front.z_index == vm.selected_text.z_index){

                    //     }
                    //     else {
                    //         //   $('#tools'+front.z_index).css({'visibility':'hidden'});
                    //         //   $('#box'+front.z_index).removeClass('border');
                    //         }
                    //    })

                }
                else {



                }


            }

            else if (vm.default_tab == 4) {

                if(!vm.selected_text.text.length){
                    vm.deleteLayer(vm.selected_text.z_index);
                    vm.newRightText = true;
                    return;

                }

                if (vm.selected_text.z_index && vm.selected_text.type == 'text' && !vm.newRightText) {

                    if(vm.right_design.length){
                        var e = $('#box'+vm.selected_text.z_index+'right');
                        vm.orWidth = e.css('width').substr(0,e.css('width').length-2);



                        // var text = document.querySelectorAll('#box' + vm.selected_text.z_index + "front" + ' tspan');

                        var e = $('#box' + vm.selected_text.z_index + 'right');
                        var text = document.querySelectorAll('#box' + vm.selected_text.z_index + "right" + ' text');
                        var texts = vm.selected_text.text.split('\n');
                        var txt = e.find('text');

                        //if (vm.isFirefox) {
                        //    txt[0].setAttributeNS(null, 'textLength', (vm.selected_text.spacing.value));
                        //}

                        console.log(texts);
                        if (texts.length) {
                            var svgNS = "http://www.w3.org/2000/svg";
                            txt[0].textContent = '';
                            var fontSize = txt[0].getAttribute('font-size').split('px');
                            for (var i = 0; i < texts.length; i++) {
                                var tspan = document.createElementNS(svgNS, 'tspan');
                                var dy = 0;

                                console.log(texts.length);

                                tspan.setAttributeNS(null, 'x', '0');
                                tspan.setAttributeNS(null, 'textLength', (vm.selected_text.spacing.value * 3 * texts[i].length));
                                if (i == 0) {
                                    dy = 22;
                                    tspan.setAttributeNS(null, 'y', '0');
                                }
                                else {
                                    dy = 22 + vm.selected_text.lineHeight.value;
                                }
                                tspan.setAttributeNS(null, 'dy', dy);
                                tspan.setAttributeNS(null, 'class', 'text_tspans');
                                var content = document.createTextNode(texts[i]);
                                tspan.appendChild(content);
                                txt[0].appendChild(tspan);
                            }

                        }

                        vm.angle4 = e[0].style.transform;

                        if (vm.angle4 == 'undefined') vm.angle4 = 'rotate(0rad)';
                        // rotate = rotate * Math.PI / 180;
                        // e.css('visibility','hidden');
                        e.css('transform', 'rotate(0rad)');

                        var text = document.querySelectorAll('#box' + vm.selected_text.z_index + "right" + ' tspan');
                        var $w = parseInt(text[0].getBoundingClientRect().width);
                        var $h = parseInt(text[0].getBoundingClientRect().height);

                        //  vm.Bbox = text.getBBox();
                        $('#box' + vm.selected_text.z_index + "right").css('width', $w + 'px');
                        $('#box' + vm.selected_text.z_index + "right").css('height', $h + 'px');

                        var svg = document.querySelectorAll('#box' + vm.selected_text.z_index + "right" + ' svg'),
                            width = svg[0].getAttribute('width'),
                            height = svg[0].getAttribute('height'),
                            view = svg[0].getAttribute('viewBox').split(' '),
                            vw = (view[2] * $w) / width,
                            vh = (view[3] * $h) / height;
                        svg[0].setAttributeNS(null, 'width', $w);
                        svg[0].setAttributeNS(null, 'height', $h);
                        svg[0].setAttributeNS(null, 'viewBox', '0 0 ' + vw + ' ' + vh);


                        var ang = vm.angle4.substr(vm.angle4.indexOf('(')+1,vm.angle4.length);
                        var angle = ang.substr(0,ang.length-4);

                        console.log(angle);


                        if(angle && angle!=="" && angle!=="0"){
                            var delta_w = -(parseFloat($w) - parseFloat(vm.orWidth)) / 2;
                            e.css('transform', vm.angle4);
                            var left = e.css('left');
                            left = left.substr(0,left.length-2);
                            left = parseFloat(left)+parseFloat(delta_w);
                            e.css({left: left});
                        }



                    }
                }

                if (!(vm.selected_text.z_index) || (vm.selected_text.text && (vm.selected_text.type == 'svg' || vm.selected_text.type == 'img')) || vm.newRightText) {

                    vm.newRightText = false;

                    // var z_index = vm.front_design[vm.front_design.length - 1].z_index+1;
                    var z_index = 0;
                    var obj = {

                        "type": "text",
                        "font": vm.fontSelected.family,
                        "color": "rgb(0,0,0)",
                        "outlineColor": "rgb(255,0,0)",
                        "text": vm.selected_text.text,
                        "z_index": z_index,
                        "zIndex": z_index,
                        "uuid": uuid(),
                        "selected": false,
                        "outline": {
                            "value": 0,
                            "options": {
                                "floor": 0,
                                "ceil": 100,
                                "step": 1,
                                "showSelectionBar": true,
                            },
                        },
                        "space": {
                            "value": 0,
                            "options": {
                                "floor": 0,
                                "ceil": 100,
                                "step": 1,
                                "showSelectionBar": true,
                                "onChange": function () {
                                    vm.updateText();
                                }
                            },
                        },
                        "size": {
                            "value": 0,
                            "options": {
                                "floor": 0,
                                "ceil": 100,
                                "step": 1,
                                "showSelectionBar": true,
                                "onChange": function () {
                                    $('#box' + vm.selected_text.z_index + 'right').resizable("resizeTo", {
                                        height: vm.selected_text.size.value * 3,
                                        width: vm.selected_text.size.value * 3
                                    });
                                }
                            },
                        },
                        "rotate": {
                            "value": 0,
                            "options": {
                                "floor": -360,
                                "ceil": 360,
                                "step": 1,
                                "showSelectionBar": true,
                                "onChange": function () {
                                    console.log("angle", vm.selected_text.rotate.value);
                                }
                            },
                        },
                        "spacing": {
                            "value": 0,
                            "options": {
                                "floor": 0,
                                "ceil": 10,
                                "step": 1,
                                "showSelectionBar": true,
                                "onChange": function () {
                                    $('#box' + vm.selected_text.z_index + "right" + ' tspan').each(function (index) {
                                        var current = $(this);
                                        current[0].setAttributeNS(null, 'textLength', (vm.selected_text.spacing.value * 3 * current[0].textContent.length));
                                        vm.updateText();
                                    })


                                }
                            },
                        },
                        "lineHeight": {
                            "value": 0,
                            "options": {
                                "floor": 0,
                                "ceil": 50,
                                "step": 1,
                                "showSelectionBar": true,
                                "onChange": function () {
                                    $('#box' + vm.selected_text.z_index + "right" + ' tspan').each(function (index) {
                                        console.log(index);
                                        var dy = 22 + vm.selected_text.lineHeight.value;
                                        var current = $(this);
                                        if (index !== 0)
                                            current[0].setAttributeNS(null, 'dy', dy);
                                        vm.updateText();
                                    })


                                }
                            }
                        }

                    };

                    if (!vm.right_design.length) {
                        obj.z_index = 1;

                    }
                    else {
                        // obj.z_index = vm.right_design[vm.right_design.length - 1].z_index + 1;
                        obj.z_index = _.max(vm.right_design,function(right){return right.z_index}).z_index + 1;
                    }
                    vm.right_design.push(obj);

                    _.each(vm.right_design, function (front) {



                        if (front.z_index != obj.z_index) {
                            $('#tools' + front.z_index + "right").css({ 'visibility': 'hidden' });
                            $('#box' + front.z_index + "right").removeClass('border');
                            front.selected = false;
                        }
                        else {

                            setTimeout(function () {

                                startTextAlign(obj.z_index, "right");

                                var text = document.querySelectorAll('#box' + obj.z_index + "right" + ' tspan');
                                var $w = parseInt(text[0].getBoundingClientRect().width);
                                var $h = parseInt(text[0].getBoundingClientRect().height);
                                unitWidth = $w;
                                unitHeight = $h;


                                //  vm.Bbox = text.getBBox();
                                $('#box' + obj.z_index + "right").css('width', $w + 'px');
                                $('#box' + obj.z_index + "right").css('height', $h + 'px');

                                var svg = document.querySelectorAll('#box' + obj.z_index + "right" + ' svg'),
                                    width = svg[0].getAttribute('width'),
                                    height = svg[0].getAttribute('height');

                                //    var  view = svg[0].getAttribute('viewBox').split(' '),
                                //     vw = (view[2] * $w)/width,
                                //     vh = (view[3] * $h)/height;




                                svg[0].setAttributeNS(null, 'width', $w);
                                svg[0].setAttributeNS(null, 'height', $h);
                                svg[0].setAttributeNS(null, 'viewBox', '0 0 ' + $w + ' ' + $h);


                                $('#tools' + obj.z_index + "right").css({ 'visibility': 'visible' });
                                $('#box' + obj.z_index + "right").addClass('border');
                                front.selected = true;
                                vm.select_text(obj.z_index);
                            }, 0)


                        }


                    });

                    $scope.focus = true;
                    vm.selected_text = obj;


                    //       _.each(vm.front_design,function(front){
                    //   if(front.type==='text'){
                    //     console.log(front);
                    //   }
                    //     if(front.z_index == vm.selected_text.z_index){

                    //     }
                    //     else {
                    //         //   $('#tools'+front.z_index).css({'visibility':'hidden'});
                    //         //   $('#box'+front.z_index).removeClass('border');
                    //         }
                    //    })

                }
                else {



                }
            }
        }



        vm.blockEnter = function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                return false;
            }
        }

        $scope.slider = {
            value: 0,
            options: {
                floor: -360,
                ceil: 360,
                step: 1,
            }
        };

        vm.onDrag = function (value) {
            vm.currentRotation = value;
        }


        vm.onDragEnd = function (value) {

            vm.currentRotation = value;
            console.log("DRAG_END", value)
        }


        vm.mousedown = function () {
            vm.rotation = true;
        }

        vm.mouseup = function () {
            vm.rotation = false;
            console.log("Fireeeddd");
        }

        vm.mousemove = function (e) {
            console.log(vm.rotation);
            var target = $("#box");
            if (vm.rotation) {
                //     var mouse_x = e.pageX;
                //     var mouse_y = e.pageY;
                //     var radians = Math.atan2(mouse_x - 10, mouse_y - 10);
                //     var degree = (radians * (180 / Math.PI) * -1) + 90;

                //    target.css('-moz-transform', 'rotate(' + degree + 'deg)');
                //    target.css('-moz-transform-origin', '0% 40%');
                //    target.css('-webkit-transform', 'rotate(' + degree + 'deg)');
                //    target.css('-webkit-transform-origin', '0% 40%');
                //    target.css('-o-transform', 'rotate(' + degree + 'deg)');
                //    target.css('-o-transform-origin', '0% 40%');
                //    target.css('-ms-transform', 'rotate(' + degree + 'deg)');
                //    target.css('-ms-transform-origin', '0% 40%');

            }
        }

        function setStyle() {
            console.log("State Name " + $state.current.name);
            if ($state.current.name === 'home.create') {
                console.log("Going to save the svg positions there...");
                if (vm.front_design && vm.front_design.length > 0) {
                    $('.parent.front').each(function (index) {
                        var front_div_style = $(this).find('.user-box').attr('style');
                        var _id = $(this).find('.user-box').attr('id');
                        //These properties are for the SVG image...
                        var svg_resized_height = $(this).find('.user-box').find('.svg_vector_image').attr('height');
                        var svg_resized_width = $(this).find('.user-box').find('.svg_vector_image').attr('width');
                        var uuid = $(this).find('.user-box').find('.svg_vector_image').find('g').find('image').attr('uuid');
                        //If uuid is null then it means that it has uuid in text.
                        if (!uuid) {
                            uuid = $(this).find('.user-box').find('.svg_text').find('g').find('text').attr('uuid');
                        }

                        //If uuid is still null then it will check that if custom image have the uuid.
                        if (!uuid) {
                            uuid = $(this).find('.user-box').find('.svgimg').find('g').find('image').attr('uuid');
                            console.log("Found the UUID for Image " + uuid);
                        }
                        if (uuid) {
                            var obj = _.findWhere(vm.front_design, { uuid: uuid });
                            if (obj) {
                                if (obj.type === 'svg') {
                                    var svg_style = $(this).find('.user-box').find('.svg_vector_image').attr('style');
                                    if (!svg_style) {
                                      svg_style = 'transform: scale(1, 1);'
                                    };
                                    obj.style = front_div_style;
                                    obj.svg_resized_height = svg_resized_height;
                                    obj.svg_resized_width = svg_resized_width;
                                    obj.svg_style = svg_style;

                                    // obj.svg_resized_height = getValueWithoutPx(svg_resized_height);
                                    // obj.svg_resized_width = getValueWithoutPx(svg_resized_width);
                                } else if (obj.type === 'text') {
                                    var svg_style = $(this).find('.user-box').find('.svg_text').attr('style');
                                    if (!svg_style) {
                                      svg_style = 'transform: scale(1, 1);'
                                    };
                                    console.log("Found the text... Now going to perform magic.");
                                    var ub = $(this).find('.user-box');
                                    var svg_text_height = $(this).find('.user-box').find('.svg_text').attr('height');
                                    var svg_text_width = $(this).find('.user-box').find('.svg_text').attr('width');
                                    var viewBox = $(this).find('.user-box').find('.svg_text').attr('viewBox');
                                    //so far $(this).find('.user-box').find('.svg_text').attr('viewBox'); is returning undefined. So we grab a tag and the traverse through all of it's attrbutes
                                    //if viewBox is found we set it.
                                    $(ub.find('.svg_text')).each(function () {
                                        $.each(this.attributes, function () {
                                            // this.attributes is not a plain object, but an array
                                            // of attribute nodes, which contain both the name and value
                                            if (this.specified) {
                                                if (this.name === 'viewBox') {
                                                    if (!viewBox) {
                                                        viewBox = this.value;
                                                    }
                                                }
                                            }
                                        });
                                    });
                                    var text_y = $(this).find('.user-box').find('.svg_text').find('text').attr('y');
                                    var text_fill = $(this).find('.user-box').find('.svg_text').find('text').attr('fill');
                                    var text_font_size = $(this).find('.user-box').find('.svg_text').find('text').attr('font-size');
                                    var text_style = $(this).find('.user-box').find('.svg_text').find('text').attr('style');

                                    var stroke_linecap = $(this).find('.user-box').find('.svg_text').find('text').attr('stroke-linecap');
                                    var stroke_linejoin = $(this).find('.user-box').find('.svg_text').find('text').attr('stroke-linejoin');
                                    var stroke_width = $(this).find('.user-box').find('.svg_text').find('text').attr('stroke-width');
                                    var stroke = $(this).find('.user-box').find('.svg_text').find('text').attr('stroke');

                                    var tspans = [];
                                    $('#'+_id).find('.text_tspans').each(function (index) {
                                        var tspanObj = {};
                                        tspanObj.tspan_dy = $(this).attr('dy');
                                        tspanObj.tspan_x = $(this).attr('x');
                                        tspanObj.tspan_y = $(this).attr('y');
                                        tspanObj.text = $(this).text();
                                        tspans.push(tspanObj);
                                    });
                                    // console.log(tspans);

                                    obj.svg_text_height = svg_text_height;
                                    obj.svg_text_width = svg_text_width;
                                    obj.style = front_div_style;
                                    obj.text_y = text_y;
                                    obj.text_fill = text_fill;
                                    obj.text_font_size = text_font_size;
                                    obj.text_style = text_style;
                                    obj.viewBox = viewBox;
                                    obj.tspans = tspans;
                                    obj.stroke_linecap = stroke_linecap;
                                    obj.stroke_linejoin = stroke_linejoin;
                                    obj.stroke_width = stroke_width;
                                    obj.stroke = stroke;
                                    obj.svg_style = svg_style;

                                    console.log(JSON.stringify(obj, null, 4));
                                } else if (obj.type === 'img') {

                                  var svg_style = $(this).find('.user-box').find('.svgimg').attr('style');
                                  if (!svg_style) {
                                    svg_style = 'transform: scale(1, 1);'
                                  };

                                  console.log("SVG Style " + svg_style);

                                  var img_height = $(this).find('.user-box').find('.svgimg').attr('height');
                                  var img_width = $(this).find('.user-box').find('.svgimg').attr('width');
                                  var viewBox = $(this).find('.user-box').find('.svgimg').attr('viewBox');

                                  var ub = $(this).find('.user-box');
                                  $(ub.find('.svgimg')).each(function () {
                                      $.each(this.attributes, function () {
                                          // this.attributes is not a plain object, but an array
                                          // of attribute nodes, which contain both the name and value
                                          if (this.specified) {
                                              if (this.name === 'viewBox') {
                                                  if (!viewBox) {
                                                      viewBox = this.value;
                                                  }
                                              }
                                          }
                                      });
                                  });
                                  obj.style = front_div_style;
                                  obj.img_height = img_height;
                                  obj.img_width = img_width;
                                  obj.viewBox = viewBox;
                                  obj.svg_style = svg_style;
                                  console.log(JSON.stringify(obj, null, 4));
                                }
                            }
                        }
                    });
                }

                if (vm.back_design && vm.back_design.length > 0) {
                    $('.parent.back').each(function (index) {
                        var front_div_style = $(this).find('.user-box').attr('style');
                        var _id = $(this).find('.user-box').attr('id');

                        var svg_resized_height = $(this).find('.user-box').find('.svg_vector_image').attr('height');
                        var svg_resized_width = $(this).find('.user-box').find('.svg_vector_image').attr('width');
                        var uuid = $(this).find('.user-box').find('.svg_vector_image').find('g').find('image').attr('uuid');

                        //If uuid is null then it means that it has uuid in text.
                        if (!uuid) {
                            uuid = $(this).find('.user-box').find('.svg_text').find('g').find('text').attr('uuid');
                        }

                        //If uuid is still null then it will check that if custom image have the uuid.
                        if (!uuid) {
                            uuid = $(this).find('.user-box').find('.svgimg').find('g').find('image').attr('uuid');
                            console.log("Found the UUID for Image " + uuid);
                        }
                        if (uuid) {
                            var obj = _.findWhere(vm.back_design, { uuid: uuid });
                            if (obj) {
                                if (obj.type === 'svg') {
                                    var svg_style = $(this).find('.user-box').find('.svg_vector_image').attr('style');
                                    if (!svg_style) {
                                      svg_style = 'transform: scale(1, 1);'
                                    };

                                    console.log("SVG Style " + svg_style);
                                    obj.style = front_div_style;
                                    obj.svg_resized_height = svg_resized_height;
                                    obj.svg_resized_width = svg_resized_width;
                                    obj.svg_style = svg_style;
                                    console.log(JSON.stringify(obj, null, 4));
                                } else if (obj.type === 'text') {

                                  var svg_style = $(this).find('.user-box').find('.svg_text').attr('style');
                                  if (!svg_style) {
                                    svg_style = 'transform: scale(1, 1);'
                                  };

                                  console.log("SVG Style " + svg_style);

                                    var ub = $(this).find('.user-box');
                                    var svg_text_height = $(this).find('.user-box').find('.svg_text').attr('height');
                                    var svg_text_width = $(this).find('.user-box').find('.svg_text').attr('width');
                                    var viewBox = $(this).find('.user-box').find('.svg_text').attr('viewBox');
                                    //so far $(this).find('.user-box').find('.svg_text').attr('viewBox'); is returning undefined. So we grab a tag and the traverse through all of it's attrbutes
                                    //if viewBox is found we set it.
                                    $(ub.find('.svg_text')).each(function () {
                                        $.each(this.attributes, function () {
                                            // this.attributes is not a plain object, but an array
                                            // of attribute nodes, which contain both the name and value
                                            if (this.specified) {
                                                if (this.name === 'viewBox') {
                                                    if (!viewBox) {
                                                        viewBox = this.value;
                                                    }
                                                }
                                            }
                                        });
                                    });
                                    var text_y = $(this).find('.user-box').find('.svg_text').find('text').attr('y');
                                    var text_fill = $(this).find('.user-box').find('.svg_text').find('text').attr('fill');
                                    var text_font_size = $(this).find('.user-box').find('.svg_text').find('text').attr('font-size');
                                    var text_style = $(this).find('.user-box').find('.svg_text').find('text').attr('style');

                                    var stroke_linecap = $(this).find('.user-box').find('.svg_text').find('text').attr('stroke-linecap');
                                    var stroke_linejoin = $(this).find('.user-box').find('.svg_text').find('text').attr('stroke-linejoin');
                                    var stroke_width = $(this).find('.user-box').find('.svg_text').find('text').attr('stroke-width');
                                    var stroke = $(this).find('.user-box').find('.svg_text').find('text').attr('stroke');

                                    var tspans = [];
                                    $('#'+_id).find('.text_tspans').each(function (index) {
                                        var tspanObj = {};
                                        tspanObj.tspan_dy = $(this).attr('dy');
                                        tspanObj.tspan_x = $(this).attr('x');
                                        tspanObj.tspan_y = $(this).attr('y');
                                        tspanObj.text = $(this).text();
                                        tspans.push(tspanObj);
                                    });

                                    obj.svg_text_height = svg_text_height;
                                    obj.svg_text_width = svg_text_width;
                                    obj.style = front_div_style;
                                    obj.text_y = text_y;
                                    obj.text_fill = text_fill;
                                    obj.text_font_size = text_font_size;
                                    obj.text_style = text_style;
                                    obj.viewBox = viewBox;
                                    obj.tspans = tspans;
                                    obj.stroke_linecap = stroke_linecap;
                                    obj.stroke_linejoin = stroke_linejoin;
                                    obj.stroke_width = stroke_width;
                                    obj.stroke = stroke;
                                    obj.svg_style = svg_style;
                                    console.log("Back Design " + JSON.stringify(obj, null, 4));
                                } else if (obj.type === 'img') {

                                  var svg_style = $(this).find('.user-box').find('.svgimg').attr('style');
                                  if (!svg_style) {
                                    svg_style = 'transform: scale(1, 1);'
                                  };

                                  console.log("SVG Style " + svg_style);

                                  var img_height = $(this).find('.user-box').find('.svgimg').attr('height');
                                  var img_width = $(this).find('.user-box').find('.svgimg').attr('width');
                                  var viewBox = $(this).find('.user-box').find('.svgimg').attr('viewBox');

                                  var ub = $(this).find('.user-box');
                                  $(ub.find('.svgimg')).each(function () {
                                      $.each(this.attributes, function () {
                                          // this.attributes is not a plain object, but an array
                                          // of attribute nodes, which contain both the name and value
                                          if (this.specified) {
                                              if (this.name === 'viewBox') {
                                                  if (!viewBox) {
                                                      viewBox = this.value;
                                                  }
                                              }
                                          }
                                      });
                                  });
                                  obj.style = front_div_style;
                                  obj.img_height = img_height;
                                  obj.img_width = img_width;
                                  obj.viewBox = viewBox;
                                  obj.svg_style = svg_style;
                                  console.log(JSON.stringify(obj, null, 4));
                                }
                            }
                        }
                    });
                }

                if (vm.left_design && vm.left_design.length > 0) {
                    console.log("Setting design at left " + vm.left_design.length);
                    $('.parent.left').each(function (index) {
                        var front_div_style = $(this).find('.user-box').attr('style');
                        var _id = $(this).find('.user-box').attr('id');
                        var svg_resized_height = $(this).find('.user-box').find('.svg_vector_image').attr('height');
                        var svg_resized_width = $(this).find('.user-box').find('.svg_vector_image').attr('width');
                        var uuid = $(this).find('.user-box').find('.svg_vector_image').find('g').find('image').attr('uuid');

                        //If uuid is null then it means that it has uuid in text.
                        if (!uuid) {
                            uuid = $(this).find('.user-box').find('.svg_text').find('g').find('text').attr('uuid');
                        }

                        //If uuid is still null then it will check that if custom image have the uuid.
                        if (!uuid) {
                            uuid = $(this).find('.user-box').find('.svgimg').find('g').find('image').attr('uuid');
                            console.log("Found the UUID for Image " + uuid);
                        }
                        if (uuid) {
                            var obj = _.findWhere(vm.left_design, { uuid: uuid });
                            if (obj) {
                                if (obj.type === 'svg') {
                                  var svg_style = $(this).find('.user-box').find('.svg_vector_image').attr('style');
                                  if (!svg_style) {
                                    svg_style = 'transform: scale(1, 1);'
                                  };

                                  console.log("SVG Style " + svg_style);
                                    obj.style = front_div_style;
                                    obj.svg_resized_height = svg_resized_height;
                                    obj.svg_resized_width = svg_resized_width;
                                    obj.svg_style = svg_style;
                                    console.log(JSON.stringify(obj, null, 4));
                                } else if (obj.type === 'text') {
                                  var svg_style = $(this).find('.user-box').find('.svg_text').attr('style');
                                  if (!svg_style) {
                                    svg_style = 'transform: scale(1, 1);'
                                  };
                                    var ub = $(this).find('.user-box');
                                    var svg_text_height = $(this).find('.user-box').find('.svg_text').attr('height');
                                    var svg_text_width = $(this).find('.user-box').find('.svg_text').attr('width');
                                    var viewBox = $(this).find('.user-box').find('.svg_text').attr('viewBox');
                                    //so far $(this).find('.user-box').find('.svg_text').attr('viewBox'); is returning undefined. So we grab a tag and the traverse through all of it's attrbutes
                                    //if viewBox is found we set it.
                                    $(ub.find('.svg_text')).each(function () {
                                        $.each(this.attributes, function () {
                                            // this.attributes is not a plain object, but an array
                                            // of attribute nodes, which contain both the name and value
                                            if (this.specified) {
                                                if (this.name === 'viewBox') {
                                                    if (!viewBox) {
                                                        viewBox = this.value;
                                                    }
                                                }
                                            }
                                        });
                                    });
                                    var text_y = $(this).find('.user-box').find('.svg_text').find('text').attr('y');
                                    var text_fill = $(this).find('.user-box').find('.svg_text').find('text').attr('fill');
                                    var text_font_size = $(this).find('.user-box').find('.svg_text').find('text').attr('font-size');
                                    var text_style = $(this).find('.user-box').find('.svg_text').find('text').attr('style');

                                    var stroke_linecap = $(this).find('.user-box').find('.svg_text').find('text').attr('stroke-linecap');
                                    var stroke_linejoin = $(this).find('.user-box').find('.svg_text').find('text').attr('stroke-linejoin');
                                    var stroke_width = $(this).find('.user-box').find('.svg_text').find('text').attr('stroke-width');
                                    var stroke = $(this).find('.user-box').find('.svg_text').find('text').attr('stroke');

                                    var tspans = [];
                                    $('#'+_id).find('.text_tspans').each(function (index) {
                                        var tspanObj = {};
                                        tspanObj.tspan_dy = $(this).attr('dy');
                                        tspanObj.tspan_x = $(this).attr('x');
                                        tspanObj.tspan_y = $(this).attr('y');
                                        tspanObj.text = $(this).text();
                                        tspans.push(tspanObj);
                                    });

                                    obj.svg_text_height = svg_text_height;
                                    obj.svg_text_width = svg_text_width;
                                    obj.style = front_div_style;
                                    obj.text_y = text_y;
                                    obj.text_fill = text_fill;
                                    obj.text_font_size = text_font_size;
                                    obj.text_style = text_style;
                                    obj.viewBox = viewBox;
                                    obj.tspans = tspans;
                                    obj.stroke_linecap = stroke_linecap;
                                    obj.stroke_linejoin = stroke_linejoin;
                                    obj.stroke_width = stroke_width;
                                    obj.stroke = stroke;
                                    obj.svg_style = svg_style;
                                } else if (obj.type === 'img') {

                                  var svg_style = $(this).find('.user-box').find('.svgimg').attr('style');
                                  if (!svg_style) {
                                    svg_style = 'transform: scale(1, 1);'
                                  };
                                  var img_height = $(this).find('.user-box').find('.svgimg').attr('height');
                                  var img_width = $(this).find('.user-box').find('.svgimg').attr('width');
                                  var viewBox = $(this).find('.user-box').find('.svgimg').attr('viewBox');

                                  var ub = $(this).find('.user-box');
                                  $(ub.find('.svgimg')).each(function () {
                                      $.each(this.attributes, function () {
                                          // this.attributes is not a plain object, but an array
                                          // of attribute nodes, which contain both the name and value
                                          if (this.specified) {
                                              if (this.name === 'viewBox') {
                                                  if (!viewBox) {
                                                      viewBox = this.value;
                                                  }
                                              }
                                          }
                                      });
                                  });
                                  obj.style = front_div_style;
                                  obj.img_height = img_height;
                                  obj.img_width = img_width;
                                  obj.viewBox = viewBox;
                                  obj.svg_style = svg_style;
                                  console.log(JSON.stringify(obj, null, 4));
                                }
                            }
                        }

                        // var obj = _.findWhere(vm.left_design, {uuid:uuid});
                        // if (obj) {
                        //     obj.style = front_div_style;
                        //     obj.svg_resized_height = getValueWithoutPx(svg_resized_height);
                        //     obj.svg_resized_width = getValueWithoutPx(svg_resized_width);
                        // }
                    });
                }


                if (vm.right_design && vm.right_design.length > 0) {
                    $('.parent.right').each(function (index) {
                        var front_div_style = $(this).find('.user-box').attr('style');
                        var _id = $(this).find('.user-box').attr('id');
                        var svg_resized_height = $(this).find('.user-box').find('.svg_vector_image').attr('height');
                        var svg_resized_width = $(this).find('.user-box').find('.svg_vector_image').attr('width');
                        var uuid = $(this).find('.user-box').find('.svg_vector_image').find('g').find('image').attr('uuid');

                        //If uuid is null then it means that it has uuid in text.
                        if (!uuid) {
                            uuid = $(this).find('.user-box').find('.svg_text').find('g').find('text').attr('uuid');
                        }

                        //If uuid is still null then it will check that if custom image have the uuid.
                        if (!uuid) {
                            uuid = $(this).find('.user-box').find('.svgimg').find('g').find('image').attr('uuid');
                            console.log("Found the UUID for Image " + uuid);
                        }
                        if (uuid) {
                            var obj = _.findWhere(vm.right_design, { uuid: uuid });
                            if (obj) {
                                if (obj.type === 'svg') {
                                  var svg_style = $(this).find('.user-box').find('.svg_vector_image').attr('style');
                                  if (!svg_style) {
                                    svg_style = 'transform: scale(1, 1);'
                                  };
                                    obj.style = front_div_style;
                                    obj.svg_resized_height = svg_resized_height;
                                    obj.svg_resized_width = svg_resized_width;
                                    obj.svg_style = svg_style;
                                    console.log(JSON.stringify(obj, null, 4));
                                } else if (obj.type === 'text') {
                                  var svg_style = $(this).find('.user-box').find('.svg_text').attr('style');
                                  if (!svg_style) {
                                    svg_style = 'transform: scale(1, 1);'
                                  };

                                    var ub = $(this).find('.user-box');
                                    var svg_text_height = $(this).find('.user-box').find('.svg_text').attr('height');
                                    var svg_text_width = $(this).find('.user-box').find('.svg_text').attr('width');
                                    var viewBox = $(this).find('.user-box').find('.svg_text').attr('viewBox');
                                    //so far $(this).find('.user-box').find('.svg_text').attr('viewBox'); is returning undefined. So we grab a tag and the traverse through all of it's attrbutes
                                    //if viewBox is found we set it.
                                    $(ub.find('.svg_text')).each(function () {
                                        $.each(this.attributes, function () {
                                            // this.attributes is not a plain object, but an array
                                            // of attribute nodes, which contain both the name and value
                                            if (this.specified) {
                                                if (this.name === 'viewBox') {
                                                    if (!viewBox) {
                                                        viewBox = this.value;
                                                    }
                                                }
                                            }
                                        });
                                    });
                                    var text_y = $(this).find('.user-box').find('.svg_text').find('text').attr('y');
                                    var text_fill = $(this).find('.user-box').find('.svg_text').find('text').attr('fill');
                                    var text_font_size = $(this).find('.user-box').find('.svg_text').find('text').attr('font-size');
                                    var text_style = $(this).find('.user-box').find('.svg_text').find('text').attr('style');

                                    var stroke_linecap = $(this).find('.user-box').find('.svg_text').find('text').attr('stroke-linecap');
                                    var stroke_linejoin = $(this).find('.user-box').find('.svg_text').find('text').attr('stroke-linejoin');
                                    var stroke_width = $(this).find('.user-box').find('.svg_text').find('text').attr('stroke-width');
                                    var stroke = $(this).find('.user-box').find('.svg_text').find('text').attr('stroke');

                                    var tspans = [];
                                    $('#'+_id).find('.text_tspans').each(function (index) {
                                        var tspanObj = {};
                                        tspanObj.tspan_dy = $(this).attr('dy');
                                        tspanObj.tspan_x = $(this).attr('x');
                                        tspanObj.tspan_y = $(this).attr('y');
                                        tspanObj.text = $(this).text();
                                        tspans.push(tspanObj);
                                    });

                                    obj.svg_text_height = svg_text_height;
                                    obj.svg_text_width = svg_text_width;
                                    obj.style = front_div_style;
                                    obj.text_y = text_y;
                                    obj.text_fill = text_fill;
                                    obj.text_font_size = text_font_size;
                                    obj.text_style = text_style;
                                    obj.viewBox = viewBox;
                                    obj.tspans = tspans;
                                    obj.stroke_linecap = stroke_linecap;
                                    obj.stroke_linejoin = stroke_linejoin;
                                    obj.stroke_width = stroke_width;
                                    obj.stroke = stroke;
                                    obj.svg_style = svg_style;
                                } else if (obj.type === 'img') {

                                  var svg_style = $(this).find('.user-box').find('.svgimg').attr('style');
                                  if (!svg_style) {
                                    svg_style = 'transform: scale(1, 1);'
                                  };


                                  var img_height = $(this).find('.user-box').find('.svgimg').attr('height');
                                  var img_width = $(this).find('.user-box').find('.svgimg').attr('width');
                                  var viewBox = $(this).find('.user-box').find('.svgimg').attr('viewBox');

                                  var ub = $(this).find('.user-box');
                                  $(ub.find('.svgimg')).each(function () {
                                      $.each(this.attributes, function () {
                                          // this.attributes is not a plain object, but an array
                                          // of attribute nodes, which contain both the name and value
                                          if (this.specified) {
                                              if (this.name === 'viewBox') {
                                                  if (!viewBox) {
                                                      viewBox = this.value;
                                                  }
                                              }
                                          }
                                      });
                                  });
                                  obj.style = front_div_style;
                                  obj.img_height = img_height;
                                  obj.img_width = img_width;
                                  obj.viewBox = viewBox;
                                  obj.svg_style = svg_style;
                                  console.log(JSON.stringify(obj, null, 4));
                                }
                            }
                        }
                    });
                }
            }
            //Show front of the shirt to user.
            vm.default_tab = 1;
        }
    }


    var AnimationServiceModule = angular.module('AnimationModule', []);
        AnimationServiceModule.service('AnimationService', AnimationService);



    function AnimationService() {

        var animations = [
            "bounce",
            "flash",
            "pulse",
            "rubberBand",
            "shake",
            "headShake",
            "swing",
            "tada",
            "wobble",
            "jello",
            "bounceIn",
            "bounceInDown",
            "bounceInLeft",
            "bounceInRight",
            "bounceInUp",
            "bounceOut",
            "bounceOutDown",
            "bounceOutLeft",
            "bounceOutRight",
            "bounceOutUp",
            "fadeIn",
            "fadeInDown",
            "fadeInDownBig",
            "fadeInLeft",
            "fadeInLeftBig",
            "fadeInRight",
            "fadeInRightBig",
            "fadeInUp",
            "fadeInUpBig",
            "fadeOut",
            "fadeOutDown",
            "fadeOutDownBig",
            "fadeOutLeft",
            "fadeOutLeftBig",
            "fadeOutRight",
            "fadeOutRightBig",
            "fadeOutUp",
            "fadeOutUpBig",
            "flipInX",
            "flipInY",
            "flipOutX",
            "flipOutY",
            "lightSpeedIn",
            "lightSpeedOut",
            "rotateIn",
            "rotateInDownLeft",
            "rotateInDownRight",
            "rotateInUpLeft",
            "rotateInUpRight",
            "rotateOut",
            "rotateOutDownLeft",
            "rotateOutDownRight",
            "rotateOutUpLeft",
            "rotateOutUpRight",
            "hinge",
            "rollIn",
            "rollOut",
            "zoomIn",
            "zoomInDown",
            "zoomInLeft",
            "zoomInRight",
            "zoomInUp",
            "zoomOut",
            "zoomOutDown",
            "zoomOutLeft",
            "zoomOutRight",
            "zoomOutUp",
            "slideInDown",
            "slideInLeft",
            "slideInRight",
            "slideInUp",
            "slideOutDown",
            "slideOutLeft",
            "slideOutRight",
            "slideOutUp"
        ];


        var  getRandonAnimation = function(arg) {
            arg = arg || 1;
            var valid = false;
            if (arg == 1) { //NO OUT ANIMATIONS
                do {
                    var num = getRandomInt(1, animations.length);
                    var animation = animations[num];
                    if(animation.indexOf('Out') != -1)
                        valid = true;

                }
                while(!valid);

        }
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        var service = {
            GetRandomInAnimation: function() {
                
                var animation = "";
            var valid = false;
         
                do {
                    var num = getRandomInt(1, animations.length);
                     animation = animations[num];
                     if(!animation) return;
                    if(animation.indexOf('Out') == -1)
                        valid = true;

                }
                while(!valid);
                return animation;

        
        },
        GetRandomOutAnimation: function() {
                
                var animation = "";
            var valid = false;
         
                do {
                    var num = getRandomInt(1, animations.length);
                     animation = animations[num];
                    if(animation.indexOf('In') == -1)
                        valid = true;

                }
                while(!valid);
                return animation;

        
        },
        GetRandomAnimation: function() {
                var animation = "";
            
                    var num = getRandomInt(1, animations.length);
                     animation = animations[num];
                        valid = true;

                
                return animation;

        
        }
            

        };

        return service;

    }





    var HttpServiceModule = angular.module('HttpServiceModule',[])
        HttpServiceModule.service('HttpService', HttpService);

    HttpService.$inject = ['$q', '$http'];

    function HttpService($q, $http) {

   

        var _Get = function (url, reqData) {
            return _SendRequest('GET', url, reqData);

        }

        // var _Post = function (url, reqData) {

        //     return _SendRequest('POST', url, reqData);

        // };
       
        var _Post = function (url, reqData) {
            
            return _SendRequest('POST', url, reqData);

        };

        var _Put = function (url, reqData) {

            return _SendRequest('PUT', url, reqData);

        };

        var _Delete = function (url, reqData) {
           
            return _SendRequest('Delete', url, reqData);

        }

        //var _Delete = function (url, reqData,header) {
        //    //console.log("reqData " + reqData);
        //    return _SendRequest('Delete', url, reqData,header);

        //}

     //Removed Header from parameter.

        var _SendRequest = function (method, url, reqData) {

            var req = "";
          
            req = {
                'method': method,

                'url': baseURL + url,

                'data': reqData,
            

                'headers': {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
               },
            };


            var deferred = $q.defer();

          //  var headers = {};

            // if (header) {
            //     headers['Content-Type'] = undefined;
            // }
            // else {
            //     headers['Content-Type'] = 'application/json';
            // }


           // req['headers'] = {'Content-Type': 'application/x-www-form-urlencoded'};

            var _successCallback = function (data) {
                deferred.resolve(data);
            };

            var _errorCallback = function (data) {

            };



            console.log("API URl " + req.url);
            console.log("Req " + JSON.stringify(req.data));

            $http(req)
                .success(_successCallback)
                .error(_errorCallback);

            return deferred.promise;
        };

        var service = {
            Get: _Get,
            Post: _Post,
            Put: _Put,
            Delete: _Delete
        }

        return service;

    }





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
                            {
                                "family": "ABeeZee",
                                "category": "sans-serif",
                                "variants": [
                                    "regular",
                                    "italic"
                                ],
                                "version": "v4",
                                "lastModified": "2015-04-06"
                            },
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
                            {
                                "family": "Bokor",
                                "category": "display",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v8",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Bonbon",
                                "category": "handwriting",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v6",
                                "lastModified": "2015-04-03"
                            },
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
                            {
                                "family": "Cantarell",
                                "category": "sans-serif",
                                "variants": [
                                    "regular",
                                    "italic",
                                    "700",
                                    "700italic"
                                ],
                                "version": "v6",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Cantata One",
                                "category": "serif",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v5",
                                "lastModified": "2015-04-06"
                            },
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
                            {
                                "family": "Delius Unicase",
                                "category": "handwriting",
                                "variants": [
                                    "regular",
                                    "700"
                                ],
                                "version": "v9",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Della Respira",
                                "category": "serif",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v4",
                                "lastModified": "2015-04-06"
                            },
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
                            {
                                "family": "Engagement",
                                "category": "handwriting",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v5",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Englebert",
                                "category": "sans-serif",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v4",
                                "lastModified": "2015-04-06"
                            },
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
                            {
                                "family": "Fjalla One",
                                "category": "sans-serif",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v4",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Fjord One",
                                "category": "serif",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v5",
                                "lastModified": "2015-04-06"
                            },
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
                            {
                                "family": "Germania One",
                                "category": "display",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v4",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Gidugu",
                                "category": "sans-serif",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v3",
                                "lastModified": "2015-04-07"
                            },
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
                            {
                                "family": "Holtwood One SC",
                                "category": "serif",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v7",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Homemade Apple",
                                "category": "handwriting",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v6",
                                "lastModified": "2015-04-06"
                            },
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
                            {
                                "family": "Imprima",
                                "category": "sans-serif",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v4",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Inconsolata",
                                "category": "monospace",
                                "variants": [
                                    "regular",
                                    "700"
                                ],
                                "version": "v11",
                                "lastModified": "2015-05-14"
                            },
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
                            {
                                "family": "Judson",
                                "category": "serif",
                                "variants": [
                                    "regular",
                                    "italic",
                                    "700"
                                ],
                                "version": "v7",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Julee",
                                "category": "handwriting",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v6",
                                "lastModified": "2015-04-06"
                            },
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
                            {
                                "family": "Ledger",
                                "category": "serif",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v4",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Lekton",
                                "category": "sans-serif",
                                "variants": [
                                    "regular",
                                    "italic",
                                    "700"
                                ],
                                "version": "v7",
                                "lastModified": "2015-04-06"
                            },
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
                            {
                                "family": "Magra",
                                "category": "sans-serif",
                                "variants": [
                                    "regular",
                                    "700"
                                ],
                                "version": "v4",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Maiden Orange",
                                "category": "display",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v6",
                                "lastModified": "2015-04-06"
                            },
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
                            {
                                "family": "Norican",
                                "category": "handwriting",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v4",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Nosifer",
                                "category": "display",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v5",
                                "lastModified": "2015-04-06"
                            },
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
                            {
                                "family": "Oleo Script",
                                "category": "display",
                                "variants": [
                                    "regular",
                                    "700"
                                ],
                                "version": "v5",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Oleo Script Swash Caps",
                                "category": "display",
                                "variants": [
                                    "regular",
                                    "700"
                                ],
                                "version": "v4",
                                "lastModified": "2015-04-06"
                            },
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
                            {
                                "family": "Pacifico",
                                "category": "handwriting",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v7",
                                "lastModified": "2015-04-06"
                            },
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
                            {
                                "family": "Quattrocento Sans",
                                "category": "sans-serif",
                                "variants": [
                                    "regular",
                                    "italic",
                                    "700",
                                    "700italic"
                                ],
                                "version": "v8",
                                "lastModified": "2015-04-06"
                            },
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
                            {
                                "family": "Ranchers",
                                "category": "display",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v4",
                                "lastModified": "2015-04-06"
                            },
                            {
                                "family": "Rancho",
                                "category": "handwriting",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v6",
                                "lastModified": "2015-04-06"
                            },
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
                            {
                                "family": "Sancreek",
                                "category": "display",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v7",
                                "lastModified": "2015-04-06"
                            },
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
                            {
                                "family": "Sonsie One",
                                "category": "display",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v5",
                                "lastModified": "2015-04-06"
                            },
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
                            {
                                "family": "Taprom",
                                "category": "display",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v8",
                                "lastModified": "2015-04-03"
                            },
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
                            {
                                "family": "UnifrakturCook",
                                "category": "display",
                                "variants": [
                                    "700"
                                ],
                                "version": "v8",
                                "lastModified": "2015-04-06"
                            },
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
                            {
                                "family": "Vollkorn",
                                "category": "serif",
                                "variants": [
                                    "regular",
                                    "italic",
                                    "700",
                                    "700italic"
                                ],
                                "version": "v6",
                                "lastModified": "2015-04-06"
                            },
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
                            {
                                "family": "Yellowtail",
                                "category": "handwriting",
                                "variants": [
                                    "regular"
                                ],
                                "version": "v6",
                                "lastModified": "2015-04-06"
                            },
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
            HttpService.Post("/save", obj,{'key':key})
                .then(function (data) {
                  
                    deferred.resolve(data);
                    return deferred.promise;
                }, function (err) {
                deferred.reject(err);
               
        });
         return deferred.promise;
    };

    
    var _signUp = function (obj) {

            var deferred = $q.defer();
            obj.key = key;
            HttpService.Post("/signup", obj,{'key':key})
                .then(function (data) {
                  
                    deferred.resolve(data);
                    return deferred.promise;
                }, function (err) {
                deferred.reject(err);
               
        });
         return deferred.promise;
    }
    var _login = function (obj) {

            var deferred = $q.defer();
            obj.key = key;
            HttpService.Post("/login",obj)
                .then(function (data) {
                  
                    deferred.resolve(data);
                    return deferred.promise;
                }, function (err) {
                deferred.reject(err);
               
        });
         return deferred.promise;
    };
 
    var _validateUrl = function (url) {

            var deferred = $q.defer();

            HttpService.Post("/available", {'key':key, 'url':url})
                .then(function (data) {
                  
                    deferred.resolve(data);
                    return deferred.promise;
                }, function (err) {
                deferred.reject(err);
               
        });
         return deferred.promise;
    };
 
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
            LaunchCompaign :_LaunchCompaign,
            SignUp: _signUp,
            Login: _login,
            ValidateURL: _validateUrl
            
   

        };
        return services;


    }





twClickOutside.$inject = ['$window', '$parse']
function twClickOutside($window, $parse) {
    return {
        link: function (scope, el, attr) {
            if (!attr.twClickOutside) {
                return;
            }

            var ignore;
            if (attr.ignoreIf) {
                ignore = $parse(attr.ignoreIf);
            }

            var nakedEl = el[0];
            var fn = $parse(attr.twClickOutside);

            var handler = function (e) {
                if (nakedEl === e.target || nakedEl.contains(e.target) || (ignore && ignore(scope))) {

                    return;
                }
                if (e.target.parentNode.id == "col")
                {
                    return;
                }
                scope.$apply(fn);
            };

            $window.addEventListener('click', handler, true);

            scope.$on('$destroy', function (e) {
                $window.removeEventListener('click', handler);
            });
        }
    };
}

function uuid() {
    function randomDigit() {
        if (crypto && crypto.getRandomValues) {
            var rands = new Uint8Array(1);
            crypto.getRandomValues(rands);
            return (rands[0] % 16).toString(16);
        } else {
            return ((Math.random() * 16) | 0).toString(16);
        }
    }
    var crypto = window.crypto || window.msCrypto;
    return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, randomDigit);
}
var app = angular.module('teedesign', [
     'ngAnimate',
    //'ui.bootstrap',
    // 'ngColorThief',
     'HttpServiceModule',
     'mgcrea.ngStrap',
     'DashboardModule',
    //  'angular-sanitize',
    // 'jkuri.gallery',
    // 'textAngular',
    // 'angularUtils.directives.dirPagination',
    // "angular-ladda",
    // 'ng-breadcrumbs',
     'ngFileUpload',
    // 'mgo-angular-wizard',
     'colorpicker.module',
     'rzModule',
    // 'jdFontselect',
    'webfont-loader',
    'AnimationModule',
    // 'ngSanitize',
    //'ngCsv',
    //'ngScrollable',
    //'angular-loading-bar',
     'ui.router',
     'ct.ui.router.extras',
     'imageSpinner',
     'oitozero.ngSweetAlert',
     'cfp.hotkeys',
     'socialLogin',
     'infinite-scroll'


])
app.config(function ($urlRouterProvider, $stateProvider, $httpProvider,socialProvider) {


        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};

        socialProvider.setGoogleKey("284402208273-l38bcdijg7brbi2dalf6dvvr742kmd1a.apps.googleusercontent.com"); //DUb2gnstn8m8YIrAT6Q_7vFV
    //socialProvider.setLinkedInKey("YOUR LINKEDIN CLIENT ID");
        socialProvider.setFbKey({ appId: "1676078709375099", apiVersion: "v2.8" });

        $urlRouterProvider.otherwise('/home/create');
        $stateProvider

            .state('home', {
                url: '/home',
                templateUrl: 'NgApp/Home/VIews/home.html',
                controller: 'DashboardController',
                controllerAs: 'vm',


            })
            .state('home.create', {
                url: '/create',
                sticky: true,
                dsr: true,
                views:{
                    'create': {
                        templateUrl: 'NgApp/Home/VIews/create.html',
                    }
                }

            })

            .state('home.goal', {
                url: '/set_goal',
                sticky: true,
                dsr: true,
                views:{
                    'goal': {
                        templateUrl: 'NgApp/Home/VIews/set_goal.html',
                    }
                }

            })
            .state('home.description', {
                url: '/descriptionn',
                sticky: true,
                dsr: true,
                views:{
                    'description': {
                        templateUrl: 'NgApp/Home/VIews/description.html',
                    }
                }

            })


    })
    app.run(function ($rootScope, $state, $location) {
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
             $rootScope.target_state = toState.name;




        })
    })
    app.directive('unSvg', ['$http', function ($http) {
        return {
            restrict: 'EA',
            scope: {
                source: '@svgSrc',
                removeCss: '@svgNoInlineCss',
                zIndex:'@zIndex',
                tes:'&'
            },
            link: function (scope, element, attr) {
                return $http.get(scope.source).success(function (data) {
                    var classes, svg, _ref, _ref1;
                    svg = angular.element(data);
                    svg.attr('id','basit');
                    console.log(svg);
                    if (!svg) {
                        return;
                    }
                    if (scope.removeCss) {
                        svg.find('path').removeAttr('style');
                    }
                    classes = (_ref = svg.attr('class')) != null ? _ref : [];
                    classes = classes.concat((_ref1 = attr["class"]) != null ? _ref1 : []);
                    if (classes.length !== 0) {
                        svg.attr('class', classes);
                    }
                    return element.replaceWith(svg);
                });
            }
        };
    }]);

    app.directive('maxNumber', ['$window',function ($window) {
        return {
            restrict: 'A',
            require:'ngModel',
            link: function (scope, elem, attrs,ngModel) {
                var val = parseInt(attrs.maxNumber);
                var modelName = attrs.ngModel;

                elem.on('keypress', function (e) {
                    $window.setTimeout(function () {
                        if (ngModel.$modelValue > val) {

                            e.preventDefault();
                            return false;
                        }

                    }, 1)
                })
                //angular.element(elem).on("keydown", function (e) {
                //    if (ngModel.$modelValue > val) {

                //        console.log(ngModel.$modelValue);

                //    }
                //});


            }

        }
    }]);

    app.directive('vbox', function() {
        return {
            link: function(scope, element, attrs) {
                attrs.$observe('vbox', function(value) {
                    // element.attr('viewBox', value); //This was setting attribute to 'viewbox'
                    if (value) {
                        element.get(0).setAttribute("viewBox", value); //Used this to set attribute 'viewBox' instead of 'viewbox'
                    }

                })
            }
        };
    });

    // app.directive('ngSvgHeight', function() {
    //     return {
    //         link: function(scope, element, attrs) {
    //             attrs.$observe('ngSvgHeight', function(value) {
    //                  element.attr('height', value); //This was setting attribute to 'viewbox'
    //                 //element.get(0).setAttribute("height", value); //Used this to set attribute 'viewBox' instead of 'viewbox'
    //             })
    //         }
    //     };
    // });
    //
    //
    // app.directive('ngSvgWidth', function() {
    //     return {
    //         link: function(scope, element, attrs) {
    //             attrs.$observe('ngSvgWidth', function(value) {
    //                 element.attr('width', value); //This was setting attribute to 'viewbox'
    //                 //element.get(0).setAttribute("width", value); //Used this to set attribute 'viewBox' instead of 'viewbox'
    //             })
    //         }
    //     };
    // });

    app.directive('ngSvgWidth', function() {
        return function(scope, element, attrs) {
            scope.$watch(attrs.ngSvgWidth, function(value) {
                element.attr('width', value);
            });
        };
    });

    app.directive('ngSvgHeight', function() {
        return function(scope, element, attrs) {
            scope.$watch(attrs.ngSvgHeight, function(value) {
                element.attr('height', value);
            });
        };
    });


    app.directive('ngX', function() {
        return function(scope, element, attrs) {
            scope.$watch(attrs.ngX, function(value) {
                if(value && Number(value)){
                    element.attr('x', value);
                }else{
                    element.attr('x', 0);
                }

            });
        };
    });

    app.directive('ngY', function() {
        return function(scope, element, attrs) {
            scope.$watch(attrs.ngY, function(value) {
                if (value && Number(value)) {
                    element.attr('y', Number(value));
                } else {
                    // element.attr('y', 0);
                }

            });
        };
    });

    app.directive('ngDy', function() {
        return function(scope, element, attrs) {
            scope.$watch(attrs.ngDy, function(value) {
                if(value && Number(value)){
                    element.attr('dy', value);
                }else{
                    element.attr('dy', 0);
                }

            });
        };
    });

    app.directive('thumbnail', [

        function () {
            return {
                restrict: 'AC',
                link: function (scope, elem, attrs) {
                    elem.bind('click', function () {
                        var src = elem.find('img').attr('src');

                        // call your SmoothZoom here
                        angular.element(attrs.options).css({
                            'background-image': 'url(' + src + ')'
                        });
                    });
                }
            };
        }
    ]);

   app.directive( 'emHeightSource', [ '$window', function(  $window ) {
    return {
        link: function( scope, elem, attrs ){

           var win = angular.element($window);
           win.bind("resize",function(e){

              console.log("WIdttthhh",elem.css('width'));
              console.log("height",elem.css('height'));
              // Your relevant code here...

           })
        }
    }
   } ] );
   app.directive("limitTo", [function() {
     return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            var limit = parseInt(attrs.limitTo);
            angular.element(elem).on("keypress", function(e) {
                if (this.value.length == limit) e.preventDefault();
            });
        }
      }
     }]);
    app.directive('twClickOutside', twClickOutside);
    app.directive("rotatez", function () {

        return {
            restrict: "A",
            scope: {
                onDragEnd: "&",
                onDrag: "&"
            },

            link: function (scope, element) {


                Draggable.create(element, {

                    type: "rotation",

                    throwProps: false,

                    onDrag: function () {

                        scope.rotation = this.rotation;

                        scope.$apply(function () {
                            scope.onDrag({ rotation: scope.rotation })
                        });

                    },

                    onDragEnd: function () {

                        scope.rotation = this.rotation;

                        scope.$apply(function () {
                            scope.onDragEnd({ rotation: scope.rotation })
                        });
                    }

                });




            }

        }

    });
    app.directive('draggable', function ($document) {
        return function (scope, element, attr) {
            var startX = 0,
                startY = 0,
                x = 0,
                y = 0;
            element.css({
                position: 'relative',
                cursor: 'pointer',
                display: 'block',
                color: 'white',
                width: '65px'
            });
            element.on('mousedown', function (event) {
                // Prevent default dragging of selected content
                event.preventDefault();
                startX = event.screenX - x;
                startY = event.screenY - y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(event) {
                y = event.screenY - startY;
                x = event.screenX - startX;
                element.css({
                    top: y + 'px',
                    left: x + 'px'
                });
            }

            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
            }
        };
    })
    app.directive('optionsClass', function ($parse) {
        return {
            require: 'select',
            link: function (scope, elem, attrs, ngSelect) {
                // get the source for the items array that populates the select.
                var optionsSourceStr = attrs.ngOptions.split(' ').pop(),
                    // use $parse to get a function from the options-class attribute
                    // that you can use to evaluate later.
                    getOptionsClass = $parse(attrs.optionsClass);

                scope.$watch(optionsSourceStr, function (items) {
                    // when the options source changes loop through its items.
                    angular.forEach(items, function (item, index) {
                        // evaluate against the item to get a mapping object for
                        // for your classes.
                        var classes = getOptionsClass(item),
                            // also get the option you're going to need. This can be found
                            // by looking for the option with the appropriate index in the
                            // value attribute.
                            option = elem.find('option[value=' + index + ']');

                        // now loop through the key/value pairs in the mapping object
                        // and apply the classes that evaluated to be truthy.
                        angular.forEach(classes, function (add, className) {
                            if (add) {
                                angular.element(option).addClass(className);
                            }
                        });
                    });
                });
            }
        }
    })
    app.directive('zoom2', ['$compile',
        function ($compile) {
            return {
                restrict: 'AC',
                scope: {
                    tiny: "=",
                    small: "=",
                    big: "=",
                    title: "="
                },
                //Template doesn't seem work correctly, leaves a loading message.
                //template: '<a href="{{big}}" class="cloud-zoom" rel="adjustX: 10, adjustY:-4"><img src="{{small}}"/></a>',
                //replace: true,
                controller: ["$scope", "$attrs", "$element", "$compile",
                    function ($scope, $attrs, $element, $compile) {

                        $scope.init = function () {



                            //Create a watch to know when to open the PopOver Text
                            $scope.$watch('tiny + small + big + title', function (newValue, oldValue) {

                                var str = $scope.small + ' <a href="' + $scope.big + '" class="cloud-zoom" rel="adjustX: 10, adjustY:-4">' + '<img style="width:40%;" src="' + $scope.small + '"/></a>';
                                var e = $compile(str)($scope);
                                $element.html(e);

                                $(".cloud-zoom, .cloud-zoom-gallery").CloudZoom();

                            }, true);

                        }; // end init

                        //set the popover properties
                        $scope.init();

                    }
                ]

            };
        }
    ])
    app.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                        console.log(element[0].files[0]);
                    })
                })
            }
        }
    }])
    app.directive('focusMe', ['$timeout', '$parse', function ($timeout, $parse) {
        return {
            //scope: true,   // optionally create a child scope
            link: function (scope, element, attrs) {
                var model = $parse(attrs.focusMe);
                scope.$watch(model, function (value) {
                    console.log('value=', value);
                    if (value === true) {
                        $timeout(function () {
                            element[0].focus();

                        });
                    }
                });
                // to address @blesh's comment, set attribute value to 'false'
                // on blur event:
                element.bind('blur', function () {
                    console.log('blur');
                    scope.$apply(model.assign(scope, false));
                });
            }
        };
    }])
    app.directive('showIt', function () {
        return {
            link: function (scope, element, attributes) {
                element.css({ 'visibility': 'visible' });
            }
        }
    })

    app.directive('ngWidth', function () {
        return function (scope, elem, attrs) {
            attrs.$observe('ngWidth', function (width) {
                elem.attr('width', width);
            });
        };
    })
    app.directive('ngHeight', function () {
        return function (scope, elem, attrs) {
            attrs.$observe('ngHeight', function (height) {
                elem.attr('height', height);
            })
        }
    })
    app.directive('fileDropzone', function () {
        return {
            restrict: 'A',
            scope: {
                file: '=',
                fileName: '='
            },
            link: function (scope, element, attrs) {
                var checkSize, isTypeValid, processDragOverOrEnter, validMimeTypes;
                processDragOverOrEnter = function (event) {
                    if (event != null) {
                        event.preventDefault();
                    }
                    event.dataTransfer.effectAllowed = 'copy';
                    return false;
                };
                validMimeTypes = attrs.fileDropzone;
                checkSize = function (size) {
                    var _ref;
                    if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
                        return true;
                    } else {
                        alert("File must be smaller than " + attrs.maxFileSize + " MB");
                        return false;
                    }
                };
                isTypeValid = function (type) {
                    if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
                        return true;
                    } else {
                        alert("Invalid file type.  File must be one of following types " + validMimeTypes);
                        return false;
                    }
                };
                element.bind('dragover', processDragOverOrEnter);
                element.bind('dragenter', processDragOverOrEnter);
                return element.bind('drop', function (event) {
                    var file, name, reader, size, type;
                    if (event != null) {
                        event.preventDefault();
                    }
                    reader = new FileReader();
                    reader.onload = function (evt) {
                        if (checkSize(size) && isTypeValid(type)) {
                            return scope.$apply(function () {
                                scope.file = evt.target.result;
                                if (angular.isString(scope.fileName)) {
                                    return scope.fileName = name;
                                }
                            });
                        }
                    };
                    file = event.dataTransfer.files[0];
                    name = file.name;
                    type = file.type;
                    size = file.size;
                    reader.readAsDataURL(file);
                    return false;
                });
            }
        };
    })
    app.controller('NavController', NavController);

NavController.$inject = ['$scope', '$rootScope'];

 function NavController($scope, $rootScope) {


}

var utils = angular.module('teedesign');

//utils.constant("OidcTokenManager", OidcTokenManager);

//utils.constant('_', window._);

utils.factory('_', function () {
    return window._; // assumes underscore has already been loaded on the page
});