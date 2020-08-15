var maskHeight = $(document).height();  
var maskWidth = $(window).width();  
var sum = 0;
var manufacturer = "Manufacturer"
var truckdriver = "ShippingCompany"
var retailer = "Retailer"

//customizing variables. 
var username = " " // insert your user name 
var OrderEndpoint = "http://[your ELB endpoint]" // insert your ELB endpoint



var main = function () {
    // 3 초마다 화면 갱신
    setInterval(function () {
        sum += 1;
        //order 테이블에서 정보 가져오기 
        $.ajax({
            url: OrderEndpoint + "/orders/ORDER0",
            type: 'GET',
            dataType: 'json',
            headers: {
                'accept': '*/*',
                'X-username': username,
                'X-orgName': 'org1'
            },
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                data = data[0]
                if (data["State"] === "0" || data["State"] === "1") {
                    //패널(div)의 내용 초기화 및 추가 
                    $('#devicetext').empty();
                    $('#mantext').empty();
                    $('#trucktext').empty();
                    $('#retailertext').empty();
                    var text = "\n\n" + "waiting for new order..."
                    $('#devicetext').append(text);
                    $('#mantext').append(text);
                    $('#trucktext').append(text);
                    $('#retailertext').append(text);

                    //textarea에 테이블 초기화 
                    $('#devicetb').empty();
                    $('#mantb').empty();
                    $('#trucktb').empty();
                    $('#retailertb').empty();

                    //사진 동작 
                    $('#manimg').empty(); //패널(div)의 내용 초기화
                    $('#truckimg').empty(); //패널(div)의 내용 초기화
                    $('#retailerimg').empty(); //패널(div)의 내용 초기화


                    //mask 생성 (+ 애니메이션)
                    $('#manmask').css({'width':maskWidth,'height':maskHeight});  
                    $('#manmask').fadeTo("slow",0.8); 
                    $('#truckmask').css({'width':maskWidth,'height':maskHeight});  
                    $('#truckmask').fadeTo("slow",0.8); 
                    $('#retailermask').css({'width':maskWidth,'height':maskHeight});  
                    $('#retailermask').fadeTo("slow",0.8);   

                    //주문 완료 결과 공지
                    $('#wellcompleted').empty();
                    $('#outofcompliance').empty();


                    //버튼 동작
                    if (document.getElementById("btnMAT") !== null) {
                        document.getElementById("btnMAT").disabled = true;
                        $("#btnMAT").removeClass('btn-primary')
                        $("#btnMAT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnMRT") !== null) {
                        document.getElementById("btnMRT").disabled = true;
                        $("#btnMRT").removeClass('btn-primary')
                        $("#btnMRT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnTAT") !== null) {
                        document.getElementById("btnTAT").disabled = true;
                        $("#btnTAT").removeClass('btn-primary')
                        $("#btnTAT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnTRT") !== null) {
                        document.getElementById("btnTRT").disabled = true;
                        $("#btnTRT").removeClass('btn-primary')
                        $("#btnTRT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnRAT") !== null) {
                        document.getElementById("btnRAT").disabled = true;
                        $("#btnRAT").removeClass('btn-primary')
                        $("#btnRAT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnRC") !== null) {
                        document.getElementById("btnRC").disabled = true;
                        $("#btnRC").removeClass('btn-primary')
                        $("#btnRC").addClass("btn-secondary");
                    }

                } else if (data["owner"] === manufacturer && data["State"] === "2") {

                    //패널(div)의 내용 초기화 및 추가 
                    $('#devicetext').empty();
                    $('#mantext').empty();
                    $('#trucktext').empty();
                    $('#retailertext').empty();

                    var text = "Order Details : " + "\n\n\n";
                    $('#devicetext').append(text);
                    $('#mantext').append(text);

                    var text = "\n\n" + "waiting for new order..."
                    $('#retailertext').append(text);
                    $('#trucktext').append(text);

                    //textarea에 테이블 겹치기 
                    $('#devicetb').empty();
                    $('#mantb').empty();
                    $('#trucktb').empty();
                    $('#retailertb').empty();

                    var table ="<table>";
                    table += "<tbody>";
                    table += '<tr>';
                    table += '<th>' + "Order Created on" + '</th>';
                    table += '<td>' + data["ctime"] + '</td>';
                    table += '</tr>';
                    table += '<tr>';
                    table += '<th>' + "Last action on" + '</th>';
                    table += '<td>' + data["utime"] + '</td>';
                    table += '</tr>';
                    table += '<tr>';
                    table += '<th>' + "Order Amount" + '</th>';
                    table += '<td>' + data["count"] + ' beers' + '</td>';
                    table += '</tr>';
                    table += '<tr>';
                    table += '<th>' + "Currnet Owner" + '</th>';
                    table += '<td>' + data["owner"] + '</td>';
                    table += '</tr>';
                    table += "</tbody>";
                    table += "</table>";

                    $('#devicetb').append(table);
                    $('#mantb').append(table);

                    //사진 동작
                    $('#manimg').empty(); //패널(div)의 내용 초기화
                    $('#truckimg').empty(); //패널(div)의 내용 초기화
                    $('#retailerimg').empty(); //패널(div)의 내용 초기화
                    var imgcon = "<img class=\"img\" src=\"assets/img/beer.png\" width=\"200px\" height=\"200px\"></img>"
                    $('#manimg').append(imgcon); //패널에 추가하기

                    //mask 생성 (+ 애니메이션) 
                    $("#manmask").hide();
                    $('#truckmask').css({'width':maskWidth,'height':maskHeight});  
                    $('#truckmask').fadeTo("slow",0.8); 
                    $('#retailermask').css({'width':maskWidth,'height':maskHeight});  
                    $('#retailermask').fadeTo("slow",0.8);   


                    //주문 완료 결과 공지
                    $('#wellcompleted').empty();
                    $('#outofcompliance').empty();



                    //버튼 동작 

                    $("#btnMAT").prop('disabled', false);
                    $("#btnMAT").removeClass('btn-secondary')
                    $("#btnMAT").addClass("btn-primary");

                    if (document.getElementById("btnMRT") !== null) {
                        document.getElementById("btnMRT").disabled = true;
                        $("#btnMRT").removeClass('btn-primary')
                        $("#btnMRT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnTAT") !== null) {
                        document.getElementById("btnTAT").disabled = true;
                        $("#btnTAT").removeClass('btn-primary')
                        $("#btnTAT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnTRT") !== null) {
                        document.getElementById("btnTRT").disabled = true;
                        $("#btnTRT").removeClass('btn-primary')
                        $("#btnTRT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnRAT") !== null) {
                        document.getElementById("btnRAT").disabled = true;
                        $("#btnRAT").removeClass('btn-primary')
                        $("#btnRAT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnRC") !== null) {
                        document.getElementById("btnRC").disabled = true;
                        $("#btnRC").removeClass('btn-primary')
                        $("#btnRC").addClass("btn-secondary");
                    }

                } else if (data["owner"] === manufacturer && data["State"] === "3") {

                    //패널(div)의 내용 초기화 및 추가 
                    $('#devicetext').empty();
                    $('#mantext').empty();
                    $('#trucktext').empty();
                    $('#retailertext').empty();

                    var text = "Order Details : " + "\n\n\n";
                    $('#devicetext').append(text);
                    $('#mantext').append(text);

                    var text = "\n\n" + "waiting for new order..."
                    $('#retailertext').append(text);
                    $('#trucktext').append(text);


                    //textarea에 테이블 겹치기 
                    $('#devicetb').empty();
                    $('#mantb').empty();
                    $('#trucktb').empty();
                    $('#retailertb').empty();

                    var table ="<table>";
                    table += "<tbody>";
                    table += '<tr>';
                    table += '<th>' + "Order Created on" + '</th>';
                    table += '<td>' + data["ctime"] + '</td>';
                    table += '</tr>';
                    table += '<tr>';
                    table += '<th>' + "Last action on" + '</th>';
                    table += '<td>' + data["utime"] + '</td>';
                    table += '</tr>';
                    table += '<tr>';
                    table += '<th>' + "Order Amount" + '</th>';
                    table += '<td>' + data["count"] + ' beers' + '</td>';
                    table += '</tr>';
                    table += '<tr>';
                    table += '<th>' + "Currnet Owner" + '</th>';
                    table += '<td>' + data["owner"] + '</td>';
                    table += '</tr>';
                    table += "</tbody>";
                    table += "</table>";

                    $('#devicetb').append(table);
                    $('#mantb').append(table);

                    //사진 동작
                    $('#manimg').empty(); //패널(div)의 내용 초기화
                    $('#truckimg').empty(); //패널(div)의 내용 초기화
                    $('#retailerimg').empty(); //패널(div)의 내용 초기화
                    var imgcon = "<img class=\"img\" src=\"assets/img/beer.png\" width=\"200px\" height=\"200px\"></img>"
                    $('#manimg').append(imgcon); //패널에 추가하기

                    //mask 생성 (+ 애니메이션)
                    $('#manmask').hide();
                    $('#truckmask').css({'width':maskWidth,'height':maskHeight});  
                    $('#truckmask').fadeTo("slow",0.8); 
                    $('#retailermask').css({'width':maskWidth,'height':maskHeight});  
                    $('#retailermask').fadeTo("slow",0.8);   


                    //주문 완료 결과 공지
                    $('#wellcompleted').empty();
                    $('#outofcompliance').empty();


                    //버튼 동작 
                    if (document.getElementById("btnMAT") !== null) {
                        document.getElementById("btnMAT").disabled = true;
                        $("#btnMAT").removeClass('btn-primary')
                        $("#btnMAT").addClass("btn-secondary");
                    }

                    $("#btnMRT").prop('disabled', false);
                    $("#btnMRT").removeClass('btn-secondary')
                    $("#btnMRT").addClass("btn-primary");

                    if (document.getElementById("btnTAT") !== null) {
                        document.getElementById("btnTAT").disabled = false;
                        $("#btnTAT").removeClass('btn-primary')
                        $("#btnTAT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnTRT") !== null) {
                        document.getElementById("btnTRT").disabled = true;
                        $("#btnTRT").removeClass('btn-primary')
                        $("#btnTRT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnRAT") !== null) {
                        document.getElementById("btnRAT").disabled = true;
                        $("#btnRAT").removeClass('btn-primary')
                        $("#btnRAT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnRC") !== null) {
                        document.getElementById("btnRC").disabled = true;
                        $("#btnRC").removeClass('btn-primary')
                        $("#btnRC").addClass("btn-secondary");
                    }

                } else if (data["owner"] === truckdriver && data["State"] === "2") {

                    //패널(div)의 내용 초기화 및 추가 
                    $('#devicetext').empty();
                    $('#mantext').empty();
                    $('#trucktext').empty();
                    $('#retailertext').empty();

                    var text = "Order Details : " + "\n\n\n";
                    $('#devicetext').append(text);
                    $('#mantext').append(text);
                    $('#trucktext').append(text);


                    var text = "\n\n" + "waiting for new order..."
                    $('#retailertext').append(text);

                    //textarea에 테이블 겹치기 
                    $('#devicetb').empty();
                    $('#mantb').empty();
                    $('#trucktb').empty();
                    $('#retailertb').empty();

                    var table ="<table>";
                    table += "<tbody>";
                    table += '<tr>';
                    table += '<th>' + "Order Created on" + '</th>';
                    table += '<td>' + data["ctime"] + '</td>';
                    table += '</tr>';
                    table += '<tr>';
                    table += '<th>' + "Last action on" + '</th>';
                    table += '<td>' + data["utime"] + '</td>';
                    table += '</tr>';
                    table += '<tr>';
                    table += '<th>' + "Order Amount" + '</th>';
                    table += '<td>' + data["count"] + ' beers' + '</td>';
                    table += '</tr>';
                    table += '<tr>';
                    table += '<th>' + "Currnet Owner" + '</th>';
                    table += '<td>' + data["owner"] + '</td>';
                    table += '</tr>';
                    table += "</tbody>";
                    table += "</table>";

                    $('#devicetb').append(table);
                    $('#mantb').append(table);
                    $('#trucktb').append(table);

                    //사진 동작
                    $('#manimg').empty(); //패널(div)의 내용 초기화
                    $('#truckimg').empty(); //패널(div)의 내용 초기화
                    $('#retailerimg').empty(); //패널(div)의 내용 초기화
                    var imgcon = "<img class=\"img\" src=\"assets/img/beer.png\" width=\"200px\" height=\"200px\"></img>"
                    $('#truckimg').append(imgcon); //패널에 추가하기


                    //mask 생성 (+ 애니메이션)
                    $('#manmask').css({'width':maskWidth,'height':maskHeight});  
                    $('#manmask').fadeTo("slow",0.8); 
                    $('#truckmask').hide();
                    $('#retailermask').css({'width':maskWidth,'height':maskHeight});  
                    $('#retailermask').fadeTo("slow",0.8);   


                    //주문 완료 결과 공지
                    $('#wellcompleted').empty();
                    $('#outofcompliance').empty();


                    //버튼 동작 
                    if (document.getElementById("btnMAT") !== null) {
                        document.getElementById("btnMAT").disabled = true;
                        $("#btnMAT").removeClass('btn-primary')
                        $("#btnMAT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnMRT") !== null) {
                        document.getElementById("btnMRT").disabled = true;
                        $("#btnMRT").removeClass('btn-primary')
                        $("#btnMRT").addClass("btn-secondary");
                    }

                    $("#btnTAT").prop('disabled', false);
                    $("#btnTAT").removeClass('btn-secondary')
                    $("#btnTAT").addClass("btn-primary");

                    if (document.getElementById("btnTRT") !== null) {
                        document.getElementById("btnTRT").disabled = true;
                        $("#btnTRT").removeClass('btn-primary')
                        $("#btnTRT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnRAT") !== null) {
                        document.getElementById("btnRAT").disabled = true;
                        $("#btnRAT").removeClass('btn-primary')
                        $("#btnRAT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnRC") !== null) {
                        document.getElementById("btnRC").disabled = true;
                        $("#btnRC").removeClass('btn-primary')
                        $("#btnRC").addClass("btn-secondary");
                    }



                } else if (data["owner"] === truckdriver && data["State"] === "3") {

                    //패널(div)의 내용 초기화 및 추가 
                    $('#devicetext').empty();
                    $('#mantext').empty();
                    $('#trucktext').empty();
                    $('#retailertext').empty();

                    var text = "Order Details : " + "\n\n\n";
                    $('#devicetext').append(text);
                    $('#mantext').append(text);
                    $('#trucktext').append(text);

                    var text = "\n\n" + "waiting for new order..."
                    $('#retailertext').append(text);

                    //textarea에 테이블 겹치기 
                    $('#devicetb').empty();
                    $('#mantb').empty();
                    $('#trucktb').empty();
                    $('#retailertb').empty();

                    var table ="<table>";
                    table += "<tbody>";
                    table += '<tr>';
                    table += '<th>' + "Order Created on" + '</th>';
                    table += '<td>' + data["ctime"] + '</td>';
                    table += '</tr>';
                    table += '<tr>';
                    table += '<th>' + "Last action on" + '</th>';
                    table += '<td>' + data["utime"] + '</td>';
                    table += '</tr>';
                    table += '<tr>';
                    table += '<th>' + "Order Amount" + '</th>';
                    table += '<td>' + data["count"] + ' beers' + '</td>';
                    table += '</tr>';
                    table += '<tr>';
                    table += '<th>' + "Currnet Owner" + '</th>';
                    table += '<td>' + data["owner"] + '</td>';
                    table += '</tr>';
                    table += "</tbody>";
                    table += "</table>";

                    $('#devicetb').append(table);
                    $('#trucktb').append(table);
                    $('#mantb').append(table);


                    //사진 동작
                    $('#manimg').empty(); //패널(div)의 내용 초기화
                    $('#truckimg').empty(); //패널(div)의 내용 초기화
                    $('#retailerimg').empty(); //패널(div)의 내용 초기화
                    var imgcon = "<img class=\"img\" src=\"assets/img/beer.png\" width=\"200px\" height=\"200px\"></img>"
                    $('#truckimg').append(imgcon); //패널에 추가하기


                    //mask 생성 (+ 애니메이션)
                    $('#manmask').css({'width':maskWidth,'height':maskHeight});  
                    $('#manmask').fadeTo("slow",0.8); 
                    $('#truckmask').hide();
                    $('#retailermask').css({'width':maskWidth,'height':maskHeight});  
                    $('#retailermask').fadeTo("slow",0.8);   

                    //주문 완료 결과 공지
                    $('#wellcompleted').empty();
                    $('#outofcompliance').empty();


                    //버튼 동작 
                    if (document.getElementById("btnMAT") !== null) {
                        document.getElementById("btnMAT").disabled = true;
                        $("#btnMAT").removeClass('btn-primary')
                        $("#btnMAT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnMRT") !== null) {
                        document.getElementById("btnMRT").disabled = true;
                        $("#btnMRT").removeClass('btn-primary')
                        $("#btnMRT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnTAT") !== null) {
                        document.getElementById("btnTAT").disabled = true;
                        $("#btnTAT").removeClass('btn-primary')
                        $("#btnTAT").addClass("btn-secondary");
                    }

                    $("#btnTRT").prop('disabled', false);
                    $("#btnTRT").removeClass('btn-secondary')
                    $("#btnTRT").addClass("btn-primary");

                    if (document.getElementById("btnRAT") !== null) {
                        document.getElementById("btnRAT").disabled = true;
                        $("#btnRAT").removeClass('btn-primary')
                        $("#btnRAT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnRC") !== null) {
                        document.getElementById("btnRC").disabled = true;
                        $("#btnRC").removeClass('btn-primary')
                        $("#btnRC").addClass("btn-secondary");
                    }



                } else if (data["owner"] === retailer && data["State"] === "2") {

                    //패널(div)의 내용 초기화 및 추가 
                    $('#devicetext').empty();
                    $('#mantext').empty();
                    $('#trucktext').empty();
                    $('#retailertext').empty();

                    var text = "Order Details : " + "\n\n\n";
                    $('#devicetext').append(text);
                    $('#mantext').append(text);
                    $('#trucktext').append(text);
                    $('#retailertext').append(text);

                    //textarea에 테이블 겹치기 
                    $('#devicetb').empty();
                    $('#mantb').empty();
                    $('#trucktb').empty();
                    $('#retailertb').empty();

                    var table ="<table>";
                    table += "<tbody>";
                    table += '<tr>';
                    table += '<th>' + "Order Created on" + '</th>';
                    table += '<td>' + data["ctime"] + '</td>';
                    table += '</tr>';
                    table += '<tr>';
                    table += '<th>' + "Last action on" + '</th>';
                    table += '<td>' + data["utime"] + '</td>';
                    table += '</tr>';
                    table += '<tr>';
                    table += '<th>' + "Order Amount" + '</th>';
                    table += '<td>' + data["count"] + ' beers' + '</td>';
                    table += '</tr>';
                    table += '<tr>';
                    table += '<th>' + "Currnet Owner" + '</th>';
                    table += '<td>' + data["owner"] + '</td>';
                    table += '</tr>';
                    table += "</tbody>";
                    table += "</table>";

                    $('#devicetb').append(table);
                    $('#mantb').append(table);
                    $('#trucktb').append(table);
                    $('#retailertb').append(table);

                    //사진 동작
                    $('#manimg').empty(); //패널(div)의 내용 초기화
                    $('#truckimg').empty(); //패널(div)의 내용 초기화
                    $('#retailerimg').empty(); //패널(div)의 내용 초기화
                    var imgcon = "<img class=\"img\" src=\"assets/img/beer.png\" width=\"200px\" height=\"200px\"></img>"
                    $('#retailerimg').append(imgcon); //패널에 추가하기


                    //mask 생성 (+ 애니메이션)
                    $('#manmask').css({'width':maskWidth,'height':maskHeight});  
                    $('#manmask').fadeTo("slow",0.8); 
                    $('#truckmask').css({'width':maskWidth,'height':maskHeight});  
                    $('#truckmask').fadeTo("slow",0.8); 
                    $('#retailermask').hide();


                    //주문 완료 결과 공지
                    $('#wellcompleted').empty();
                    $('#outofcompliance').empty();


                    //버튼 동작 
                    if (document.getElementById("btnMAT") !== null) {
                        document.getElementById("btnMAT").disabled = true;
                        $("#btnMAT").removeClass('btn-primary')
                        $("#btnMAT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnMRT") !== null) {
                        document.getElementById("btnMRT").disabled = true;
                        $("#btnMRT").removeClass('btn-primary')
                        $("#btnMRT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnTAT") !== null) {
                        document.getElementById("btnTAT").disabled = true;
                        $("#btnTAT").removeClass('btn-primary')
                        $("#btnTAT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnTRT") !== null) {
                        document.getElementById("btnTRT").disabled = true;
                        $("#btnTRT").removeClass('btn-primary')
                        $("#btnTRT").addClass("btn-secondary");
                    }

                    $("#btnRAT").prop('disabled', false);
                    $("#btnRAT").removeClass('btn-secondary')
                    $("#btnRAT").addClass("btn-primary");

                    if (document.getElementById("btnRC") !== null) {
                        document.getElementById("btnRC").disabled = true;
                        $("#btnRC").removeClass('btn-primary')
                        $("#btnRC").addClass("btn-secondary");
                    }



                } else if (data["owner"] === retailer && data["State"] === "3") {

                    //패널(div)의 내용 초기화 및 추가 
                    $('#devicetext').empty();
                    $('#mantext').empty();
                    $('#trucktext').empty();
                    $('#retailertext').empty();

                    var text = "Order Details : " + "\n\n\n";
                    $('#devicetext').append(text);
                    $('#mantext').append(text);
                    $('#trucktext').append(text);
                    $('#retailertext').append(text);

                    //textarea에 테이블 겹치기 
                    $('#devicetb').empty();
                    $('#mantb').empty();
                    $('#trucktb').empty();
                    $('#retailertb').empty();

                    var table ="<table>";
                    table += "<tbody>";
                    table += '<tr>';
                    table += '<th>' + "Order Created on" + '</th>';
                    table += '<td>' + data["ctime"] + '</td>';
                    table += '</tr>';
                    table += '<tr>';
                    table += '<th>' + "Last action on" + '</th>';
                    table += '<td>' + data["utime"] + '</td>';
                    table += '</tr>';
                    table += '<tr>';
                    table += '<th>' + "Order Amount" + '</th>';
                    table += '<td>' + data["count"] + ' beers' + '</td>';
                    table += '</tr>';
                    table += '<tr>';
                    table += '<th>' + "Currnet Owner" + '</th>';
                    table += '<td>' + data["owner"] + '</td>';
                    table += '</tr>';
                    table += "</tbody>";
                    table += "</table>";

                    $('#devicetb').append(table);
                    $('#mantb').append(table);
                    $('#trucktb').append(table);
                    $('#retailertb').append(table);

                    //사진 동작
                    $('#manimg').empty(); //패널(div)의 내용 초기화
                    $('#truckimg').empty(); //패널(div)의 내용 초기화
                    $('#retailerimg').empty(); //패널(div)의 내용 초기화
                    var imgcon = "<img class=\"img\" src=\"assets/img/beer.png\" width=\"200px\" height=\"200px\"></img>"
                    $('#retailerimg').append(imgcon); //패널에 추가하기


                    //mask 생성 (+ 애니메이션)
                    $('#manmask').css({'width':maskWidth,'height':maskHeight});  
                    $('#manmask').fadeTo("slow",0.8); 
                    $('#truckmask').css({'width':maskWidth,'height':maskHeight});  
                    $('#truckmask').fadeTo("slow",0.8); 
                    $('#retailermask').hide();

                    //주문 완료 결과 공지
                    $('#wellcompleted').empty();
                    $('#outofcompliance').empty();


                    //버튼 동작 
                    if (document.getElementById("btnMAT") !== null) {
                        document.getElementById("btnMAT").disabled = true;
                        $("#btnMAT").removeClass('btn-primary')
                        $("#btnMAT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnMRT") !== null) {
                        document.getElementById("btnMRT").disabled = true;
                        $("#btnMRT").removeClass('btn-primary')
                        $("#btnMRT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnTAT") !== null) {
                        document.getElementById("btnTAT").disabled = true;
                        $("#btnTAT").removeClass('btn-primary')
                        $("#btnTAT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnTRT") !== null) {
                        document.getElementById("btnTRT").disabled = true;
                        $("#btnTRT").removeClass('btn-primary')
                        $("#btnTRT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnRAT") !== null) {
                        document.getElementById("btnRAT").disabled = true;
                        $("#btnRAT").removeClass('btn-primary')
                        $("#btnRAT").addClass("btn-secondary");
                    }

                    $("#btnRC").prop('disabled', false);
                    $("#btnRC").removeClass('btn-secondary')
                    $("#btnRC").addClass("btn-primary");



                } else if (data["owner"] === retailer && data["State"] === "4") {

                    //패널(div)의 내용 초기화 및 추가 
                    $('#devicetext').empty();
                    $('#mantext').empty();
                    $('#trucktext').empty();
                    $('#retailertext').empty();
                    var text = "\n\n" + "waiting for new order..."
                    $('#devicetext').append(text);
                    $('#mantext').append(text);
                    $('#trucktext').append(text);
                    $('#retailertext').append(text);

                    //textarea에 테이블 초기화 
                    $('#devicetb').empty();
                    $('#mantb').empty();
                    $('#trucktb').empty();
                    $('#retailertb').empty();

                    //사진 동작
                    $('#manimg').empty(); //패널(div)의 내용 초기화
                    $('#truckimg').empty(); //패널(div)의 내용 초기화
                    $('#retailerimg').empty(); //패널(div)의 내용 초기화
                    var imgcon = "<img class=\"img\" src=\"assets/img/beer.png\" width=\"200px\" height=\"200px\"></img>"
                    $('#retailerimg').append(imgcon); //패널에 추가하기

                    //mask 생성 (+ 애니메이션)
                    $('#manmask').css({'width':maskWidth,'height':maskHeight});  
                    $('#manmask').fadeTo("slow",0.8); 
                    $('#truckmask').css({'width':maskWidth,'height':maskHeight});  
                    $('#truckmask').fadeTo("slow",0.8); 
                    $('#retailermask').css({'width':maskWidth,'height':maskHeight});  
                    $('#retailermask').fadeTo("slow",0.8);

                    //주문 완료 결과 공지
                    $('#wellcompleted').empty();
                    $('#outofcompliance').empty();

                    var wellfinal = "<img class=\"imgfinal\" src=\"assets/img/wellcompleted.png\">"
                    $('#wellcompleted').append(wellfinal); 


                    //버튼 동작 
                    if (document.getElementById("btnMAT") !== null) {
                        document.getElementById("btnMAT").disabled = true;
                        $("#btnMAT").removeClass('btn-primary')
                        $("#btnMAT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnMRT") !== null) {
                        document.getElementById("btnMRT").disabled = true;
                        $("#btnMRT").removeClass('btn-primary')
                        $("#btnMRT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnTAT") !== null) {
                        document.getElementById("btnTAT").disabled = true;
                        $("#btnTAT").removeClass('btn-primary')
                        $("#btnTAT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnTRT") !== null) {
                        document.getElementById("btnTRT").disabled = true;
                        $("#btnTRT").removeClass('btn-primary')
                        $("#btnTRT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnRAT") !== null) {
                        document.getElementById("btnRAT").disabled = true;
                        $("#btnRAT").removeClass('btn-primary')
                        $("#btnRAT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnRC") !== null) {
                        document.getElementById("btnRC").disabled = true;
                        $("#btnRC").removeClass('btn-primary')
                        $("#btnRC").addClass("btn-secondary");
                    }


                } else if (data["owner"] === retailer && data["State"] === "5") {


                    //패널(div)의 내용 초기화 및 추가 
                    $('#devicetext').empty();
                    $('#mantext').empty();
                    $('#trucktext').empty();
                    $('#retailertext').empty();
                    var text = "\n\n" + "waiting for new order..."
                    $('#devicetext').append(text);
                    $('#mantext').append(text);
                    $('#trucktext').append(text);
                    $('#retailertext').append(text);

                    //textarea에 테이블 초기화 
                    $('#devicetb').empty();
                    $('#mantb').empty();
                    $('#trucktb').empty();
                    $('#retailertb').empty();

                    //사진 동작
                    $('#manimg').empty(); //패널(div)의 내용 초기화
                    $('#truckimg').empty(); //패널(div)의 내용 초기화
                    $('#retailerimg').empty(); //패널(div)의 내용 초기화
                    var imgcon = "<img class=\"img\" src=\"assets/img/beer.png\" width=\"200px\" height=\"200px\"></img>"
                    $('#retailerimg').append(imgcon); //패널에 추가하기


                    //mask 생성 (+ 애니메이션)
                    $('#manmask').css({'width':maskWidth,'height':maskHeight});  
                    $('#manmask').fadeTo("slow",0.8); 
                    $('#truckmask').css({'width':maskWidth,'height':maskHeight});  
                    $('#truckmask').fadeTo("slow",0.8); 
                    $('#retailermask').css({'width':maskWidth,'height':maskHeight});  
                    $('#retailermask').fadeTo("slow",0.8);

                    //주문 완료 결과 공지
                    $('#wellcompleted').empty();
                    $('#outofcompliance').empty();

                    var outfinal = "<img class=\"imgfinal\" src=\"assets/img/outofcompliance.png\">"
                    $('#wellcompleted').append(outfinal); 

                    
                    //버튼 동작 
                    if (document.getElementById("btnMAT") !== null) {
                        document.getElementById("btnMAT").disabled = true;
                        $("#btnMAT").removeClass('btn-primary')
                        $("#btnMAT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnMRT") !== null) {
                        document.getElementById("btnMRT").disabled = true;
                        $("#btnMRT").removeClass('btn-primary')
                        $("#btnMRT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnTAT") !== null) {
                        document.getElementById("btnTAT").disabled = true;
                        $("#btnTAT").removeClass('btn-primary')
                        $("#btnTAT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnTRT") !== null) {
                        document.getElementById("btnTRT").disabled = true;
                        $("#btnTRT").removeClass('btn-primary')
                        $("#btnTRT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnRAT") !== null) {
                        document.getElementById("btnRAT").disabled = true;
                        $("#btnRAT").removeClass('btn-primary')
                        $("#btnRAT").addClass("btn-secondary");
                    }
                    if (document.getElementById("btnRC") !== null) {
                        document.getElementById("btnRC").disabled = true;
                        $("#btnRC").removeClass('btn-primary')
                        $("#btnRC").addClass("btn-secondary");
                    }

                } else {

                }
            },
            error: function (error) {
                alert("ORDER0 정보를 받아오는데 에러가 발생했습니다.")
                console.log(error)
            }
        });
    }, 3000);
}



//ready 화면 구성 함수 
$(document).ready(main);



headers = {};
headers["accept"] = "*/*"
headers["X-username"] = username
headers["X-orgName"] = "org1"


//1. Man - Accept transfer 버튼 동작 
if (document.getElementById("btnMAT") !== null) {
    document.getElementById("btnMAT").onclick = function () {
        document.getElementById("btnMAT").disabled = true
        $("#btnMAT").removeClass('btn-primary')
        $("#btnMAT").addClass("btn-secondary");

        $.ajax({
            url: OrderEndpoint + "/transfer/accept",
            headers: headers,
            type: 'POST',
            success: function (response) {
                alert("전송 완료")
                console.log("success respence :" + response)
            },
            error: function () {
                alert("에러가 발생했습니다. 확인해 주세요.");
                document.getElementById("btnMAT").disabled = false
                $("#btnMAT").removeClass('btn-secondary')
                $("#btnMAT").addClass("btn-primary");
            }
        });
    }
}


//2. Man - Reqeust transfer 버튼 동작 
if (document.getElementById("btnMRT") !== null) {
    document.getElementById("btnMRT").onclick = function () {
        var info_manmodal = document.getElementById('infomanmodal')
        //modal 띄우기
        info_manmodal.style.display = 'block';
        //modal 에 데이터 입력 및 전송 
        document.getElementById("sendmandata").onclick = function () {
            document.getElementById("btnMRT").disabled = true
            $("#btnMRT").removeClass('btn-primary')
            $("#btnMRT").addClass("btn-secondary");

            var bottle_num = document.getElementById("bottlenumman").value
            var action_owner = document.getElementById("actionownerman").value

            if (action_owner === truckdriver) {
                var sendDATA = "{\"Owner\":\"" + action_owner + "\",\"Count\":\"" + bottle_num + "\"}"
                console.log(sendDATA)

                $.ajax({
                    url: OrderEndpoint + "/transfer/request",
                    headers: headers,
                    type: 'POST',
                    data: sendDATA,
                    contentType: 'application/json',
                    success: function (response) {
                        info_manmodal.style.display = 'none'
                        alert("전송 완료")
                        console.log("success respence :" + response)
                    },
                    error: function () {
                        alert("에러가 발생했습니다. 확인해 주세요.");
                        document.getElementById("btnMRT").disabled = false
                        $("#btnMRT").removeClass('btn-secondary')
                        $("#btnMRT").addClass("btn-primary");
                    }
                });
            } else {
                alert("Owner를 확인해주세요")
            }
        };
        // close 버튼으로 modal 내리기 
        document.getElementById("closemanmodal").onclick = function () {
            info_manmodal.style.display = 'none'
        }
    }
}


//3. Truck - Accept transfer 버튼 동작 
if (document.getElementById("btnTAT") !== null) {
    document.getElementById("btnTAT").onclick = function () {
        document.getElementById("btnTAT").disabled = true
        $("#btnTAT").removeClass('btn-primary')
        $("#btnTAT").addClass("btn-secondary");

        $.ajax({
            url: OrderEndpoint + "/transfer/accept",
            headers: headers,
            type: 'POST',
            success: function (response) {
                alert("전송 완료")
                console.log("success respence :" + response)
            },
            error: function () {
                alert("에러가 발생했습니다. 확인해 주세요.");
                document.getElementById("btnTAT").disabled = false
                $("#btnTAT").removeClass('btn-secondary')
                $("#btnTAT").addClass("btn-primary");
            }
        });
    }
}

//4. Truck - Request transfer 버튼 동작 
if (document.getElementById("btnTRT") !== null) {
    document.getElementById("btnTRT").onclick = function () {
        var info_truckmodal = document.getElementById('infotruckmodal')
        //modal 띄우기
        info_truckmodal.style.display = 'block';
        //modal 에 데이터 입력 및 전송 
        document.getElementById("sendtruckdata").onclick = function () {
            document.getElementById("btnTRT").disabled = true
            $("#btnTRT").removeClass('btn-primary')
            $("#btnTRT").addClass("btn-secondary");

            var bottle_num = document.getElementById("bottlenumtruck").value
            var action_owner = document.getElementById("actionownertruck").value

            if (action_owner === retailer) {
                var sendDATA = "{\"Owner\":\"" + action_owner + "\",\"Count\":\"" + bottle_num + "\"}"
                console.log(sendDATA)

                $.ajax({
                    url: OrderEndpoint + "/transfer/request",
                    headers: headers,
                    type: 'POST',
                    data: sendDATA,
                    contentType: 'application/json',
                    success: function (response) {
                        info_truckmodal.style.display = 'none'
                        alert("전송 완료")
                        console.log("success respence :" + response)
                    },
                    error: function () {
                        alert("에러가 발생했습니다. 확인해 주세요.");
                        document.getElementById("btnTRT").disabled = false
                        $("#btnTRT").removeClass('btn-secondary')
                        $("#btnTRT").addClass("btn-primary");
                    }
                });
            } else {
                alert("Owner 를 확인해주세요")
            }
        };
        // close 버튼으로 modal 내리기 
        document.getElementById("closetruckmodal").onclick = function () {
            info_truckmodal.style.display = 'none'
        }
    }
}


//5. Retailer - Accept transfer 버튼 동작 
if (document.getElementById("btnRAT") !== null) {
    document.getElementById("btnRAT").onclick = function () {
        document.getElementById("btnRAT").disabled = true
        $("#btnRAT").removeClass('btn-primary')
        $("#btnRAT").addClass("btn-secondary");

        $.ajax({
            url: OrderEndpoint + "/transfer/accept",
            headers: headers,
            type: 'POST',
            success: function (response) {
                alert("전송 완료")
                console.log("success respence :" + response)
            },
            error: function () {
                alert("에러가 발생했습니다. 확인해 주세요.");
                document.getElementById("btnRAT").disabled = false
                $("#btnRAT").removeClass('btn-secondary')
                $("#btnRAT").addClass("btn-primary");
            }
        });
    }
}

//6. Retailer - Complete 버튼 동작 

if (document.getElementById("btnRC") !== null) {
    document.getElementById("btnRC").onclick = function () {
        document.getElementById("btnRC").disabled = true
        $("#btnRC").removeClass('btn-primary')
        $("#btnRC").addClass("btn-secondary");

        $.ajax({
            url: OrderEndpoint + "/transfer/complete",
            headers: headers,
            type: 'POST',
            success: function (response) {
                $.ajax({
                    url: OrderEndpoint + "/orders/ORDER0",
                    type: 'GET',
                    dataType: 'json',
                    headers: {
                        'accept': '*/*',
                        'X-username': username,
                        'X-orgName': 'org1'
                    },
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        console.log(data)
                        if (data["State"] === "4") {
                            alert("STATE : 4 (Complete)")
                        } else if (data["State"] === "5") {
                            alert("STATE : 5 (Out of Compliance)")
                        }

                    },
                    error: function (error) {
                        alert("ORDER0 을 받아오는데 에러가 발생했습니다. 확인해주세요")
                        console.log(error)
                    }
                });
                console.log("success respence :" + response)
            },
            error: function () {
                alert("에러가 발생했습니다. 확인해 주세요.");
                document.getElementById("btnRC").disabled = false
                $("#btnRC").removeClass('btn-secondary')
                $("#btnRC").addClass("btn-primary");
            }
        });

    }
}




