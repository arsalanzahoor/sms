<!DOCTYPE html>
<html>
    <body onLoad="defaultBody()">
        <!--<body>-->
        <!-- 
        Template Name: Metronic - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.0.2
        Version: 1.5.4
        Author: KeenThemes
        Website: http://www.keenthemes.com/
        Purchase: http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes
        -->
        <!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
        <!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
        <!--[if !IE]><!--> <html lang="en" class="no-js"> <!--<![endif]-->


        <!-- BEGIN PAGE -->

        <div class="page-content">
            <!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM--> 

            <?php include 'configuration-model.php'; ?>

            <!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->
            <!-- BEGIN STYLE CUSTOMIZER -->

            <?php include 'style-customizer.php'; ?>

            <!-- END STYLE CUSTOMIZER -->

            <!-- BEGIN PAGE HEADER-->
            <div class="row">
                <div class="col-md-12">
                    <!-- BEGIN PAGE TITLE & BREADCRUMB-->
                    <h3 class="page-title">
                        Dashboard <small>statistics and more</small>
                    </h3>
                    <ul class="page-breadcrumb breadcrumb">
                        <li>
                            <i class="fa fa-home"></i>
                            <a href="index.html">Home</a> 
                            <i class="fa fa-angle-right"></i>
                        </li>
                        <li><a href="#">Dashboard</a></li>
                        <li class="pull-right">
                            <div id="dashboard-report-range" class="dashboard-date-range tooltips" data-placement="top" data-original-title="Change dashboard date range">
                                <i class="fa fa-calendar"></i>
                                <span></span>
                                <i class="fa fa-angle-down"></i>
                            </div>
                        </li>
                    </ul>
                    <!-- END PAGE TITLE & BREADCRUMB-->
                </div>
            </div>
            <!-- END PAGE HEADER-->
            <!-- BEGIN Popular Products -->
            <div class="row">
                <div class="col-md-12">
                    <div class="portlet box light-grey">
                        <div class="portlet-title">
                            <div class="caption"><i class="fa fa-globe"></i>Popular Products</div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse"></a>
                                <a href="#portlet-config" data-toggle="modal" class="config"></a>
                                <a href="javascript:;" class="reload"></a>
                                <a href="javascript:;" class="remove"></a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="table-scrollable">
                                <table class="table table-striped table-bordered table-hover" id="update_table">
                                    <tr>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="solditem1"><br>
                                            <label id="sold_name1"></label><br>
                                            <label id="sold_price1"></label><br>
                                            <label id="sold_purchase1"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="solditem2"><br>
                                            <label id="sold_name2"></label><br>
                                            <label id="sold_price2"></label><br>
                                            <label id="sold_purchase2"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="solditem3"><br>
                                            <label id="sold_name3"></label><br>
                                            <label id="sold_price3"></label><br>
                                            <label id="sold_purchase3"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="solditem4"><br>
                                            <label id="sold_name4"></label><br>
                                            <label id="sold_price4"></label><br>
                                            <label id="sold_purchase4"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="solditem5"><br>
                                            <label id="sold_name5"></label><br>
                                            <label id="sold_price5"></label><br>
                                            <label id="sold_purchase5"></label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="solditem6"><br>
                                            <label id="sold_name6"></label><br>
                                            <label id="sold_price6"></label><br>
                                            <label id="sold_purchase6"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="solditem7"><br>
                                            <label id="sold_name7"></label><br>
                                            <label id="sold_price7"></label><br>
                                            <label id="sold_purchase7"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="solditem8"><br>
                                            <label id="sold_name8"></label><br>
                                            <label id="sold_price8"></label><br>
                                            <label id="sold_purchase8"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="solditem9"><br>
                                            <label id="sold_name9"></label><br>
                                            <label id="sold_price9"></label><br>
                                            <label id="sold_purchase9"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="solditem10"><br>
                                            <label id="sold_name10"></label><br>
                                            <label id="sold_price10"></label><br>
                                            <label id="sold_purchase10"></label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="solditem11"><br>
                                            <label id="sold_name11"></label><br>
                                            <label id="sold_price11"></label><br>
                                            <label id="sold_purchase11"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="solditem12"><br>
                                            <label id="sold_name12"></label><br>
                                            <label id="sold_price12"></label><br>
                                            <label id="sold_purchase12"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="solditem13"><br>
                                            <label id="sold_name13"></label><br>
                                            <label id="sold_price13"></label><br>
                                            <label id="sold_purchase13"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="solditem14"><br>
                                            <label id="sold_name14"></label><br>
                                            <label id="sold_price14"></label><br>
                                            <label id="sold_purchase14"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="solditem15"><br>
                                            <label id="sold_name15"></label><br>
                                            <label id="sold_price15"></label><br>
                                            <label id="sold_purchase15"></label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="solditem16"><br>
                                            <label id="sold_name16"></label><br>
                                            <label id="sold_price16"></label><br>
                                            <label id="sold_purchase16"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="solditem17"><br>
                                            <label id="sold_name17"></label><br>
                                            <label id="sold_price17"></label><br>
                                            <label id="sold_purchase17"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="solditem18"><br>
                                            <label id="sold_name18"></label><br>
                                            <label id="sold_price18"></label><br>
                                            <label id="sold_purchase18"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="solditem19"><br>
                                            <label id="sold_name19"></label><br>
                                            <label id="sold_price19"></label><br>
                                            <label id="sold_purchase19"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="solditem20"><br>
                                            <label id="sold_name20"></label><br>
                                            <label id="sold_price20"></label><br>
                                            <label id="sold_purchase20"></label>
                                        </td>
                                    </tr>


                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END POPULAR PRODUCTS -->

            <!-- BEGIN LATEST PRODUCTS -->

            <div class="row">
                <div class="col-md-12">
                    <div class="portlet box light-grey">
                        <div class="portlet-title">
                            <div class="caption"><i class="fa fa-globe"></i>Latest Products</div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse"></a>
                                <a href="#portlet-config" data-toggle="modal" class="config"></a>
                                <a href="javascript:;" class="reload"></a>
                                <a href="javascript:;" class="remove"></a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="table-scrollable">
                                <table class="table table-striped table-bordered table-hover" id="update_table">
                                    <tr>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="newitem1"><br>
                                            <label id="new_name1"></label><br>
                                            <label id="new_price1"></label><br>
                                            <label id="new_purchase1"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="newitem2"><br>
                                            <label id="new_name2"></label><br>
                                            <label id="new_price2"></label><br>
                                            <label id="new_purchase2"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="newitem3"><br>
                                            <label id="new_name3"></label><br>
                                            <label id="new_price3"></label><br>
                                            <label id="new_purchase3"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="newitem4"><br>
                                            <label id="new_name4"></label><br>
                                            <label id="new_price4"></label><br>
                                            <label id="new_purchase4"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="newitem5"><br>
                                            <label id="new_name5"></label><br>
                                            <label id="new_price5"></label><br>
                                            <label id="new_purchase5"></label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="newitem6"><br>
                                            <label id="new_name6"></label><br>
                                            <label id="new_price6"></label><br>
                                            <label id="new_purchase6"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="newitem7"><br>
                                            <label id="new_name7"></label><br>
                                            <label id="new_price7"></label><br>
                                            <label id="new_purchase7"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="newitem8"><br>
                                            <label id="new_name8"></label><br>
                                            <label id="new_price8"></label><br>
                                            <label id="new_purchase8"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="newitem9"><br>
                                            <label id="new_name9"></label><br>
                                            <label id="new_price9"></label><br>
                                            <label id="new_purchase9"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="newitem10"><br>
                                            <label id="new_name10"></label><br>
                                            <label id="new_price10"></label><br>
                                            <label id="new_purchase10"></label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="newitem11"><br>
                                            <label id="new_name11"></label><br>
                                            <label id="new_price11"></label><br>
                                            <label id="new_purchase11"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="newitem12"><br>
                                            <label id="new_name12"></label><br>
                                            <label id="new_price12"></label><br>
                                            <label id="new_purchase12"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="newitem13"><br>
                                            <label id="new_name13"></label><br>
                                            <label id="new_price13"></label><br>
                                            <label id="new_purchase13"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="newitem14"><br>
                                            <label id="new_name14"></label><br>
                                            <label id="new_price14"></label><br>
                                            <label id="new_purchase14"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="newitem15"><br>
                                            <label id="new_name15"></label><br>
                                            <label id="new_price15"></label><br>
                                            <label id="new_purchase15"></label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="newitem16"><br>
                                            <label id="new_name16"></label><br>
                                            <label id="new_price16"></label><br>
                                            <label id="new_purchase16"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="newitem17"><br>
                                            <label id="new_name17"></label><br>
                                            <label id="new_price17"></label><br>
                                            <label id="new_purchase17"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="newitem18"><br>
                                            <label id="new_name18"></label><br>
                                            <label id="new_price18"></label><br>
                                            <label id="new_purchase18"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="newitem19"><br>
                                            <label id="new_name19"></label><br>
                                            <label id="new_price19"></label><br>
                                            <label id="new_purchase19"></label>
                                        </td>
                                        <td>
                                            <img src="" alt="Popular Product" height="125" width="140" id="newitem20"><br>
                                            <label id="new_name20"></label><br>
                                            <label id="new_price20"></label><br>
                                            <label id="new_purchase20"></label>
                                        </td>
                                    </tr>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- END LATEST PRODUCTS -->
            <!-- BEGIN PAGE LEVEL PLUGINS -->
            <script src="../assets/plugins/jqvmap/jqvmap/jquery.vmap.js" type="text/javascript"></script>   
            <script src="../assets/plugins/jqvmap/jqvmap/maps/jquery.vmap.russia.js" type="text/javascript"></script>
            <script src="../assets/plugins/jqvmap/jqvmap/maps/jquery.vmap.world.js" type="text/javascript"></script>
            <script src="../assets/plugins/jqvmap/jqvmap/maps/jquery.vmap.europe.js" type="text/javascript"></script>
            <script src="../assets/plugins/jqvmap/jqvmap/maps/jquery.vmap.germany.js" type="text/javascript"></script>
            <script src="../assets/plugins/jqvmap/jqvmap/maps/jquery.vmap.usa.js" type="text/javascript"></script>
            <script src="../assets/plugins/jqvmap/jqvmap/data/jquery.vmap.sampledata.js" type="text/javascript"></script>  
            <script src="../assets/plugins/flot/jquery.flot.js" type="text/javascript"></script>
            <script src="../assets/plugins/flot/jquery.flot.resize.js" type="text/javascript"></script>
            <script src="../assets/plugins/jquery.pulsate.min.js" type="text/javascript"></script>
            <script src="../assets/plugins/bootstrap-daterangepicker/moment.min.js" type="text/javascript"></script>
            <script src="../assets/plugins/bootstrap-daterangepicker/daterangepicker.js" type="text/javascript"></script>     
            <script src="../assets/plugins/gritter/js/jquery.gritter.js" type="text/javascript"></script>
            <!-- IMPORTANT! fullcalendar depends on jquery-ui-1.10.3.custom.min.js for drag & drop support -->
            <script src="../assets/plugins/fullcalendar/fullcalendar/fullcalendar.min.js" type="text/javascript"></script>
            <script src="../assets/plugins/jquery-easy-pie-chart/jquery.easy-pie-chart.js" type="text/javascript"></script>
            <script src="../assets/plugins/jquery.sparkline.min.js" type="text/javascript"></script>  
            <!-- END PAGE LEVEL PLUGINS -->
            <!-- BEGIN PAGE LEVEL SCRIPTS -->
            <script src="../assets/scripts/app.js" type="text/javascript"></script>
            <script src="../assets/scripts/index.js" type="text/javascript"></script>
            <script src="../assets/scripts/tasks.js" type="text/javascript"></script>        
            <!-- END PAGE LEVEL SCRIPTS -->  
            <script>
                jQuery(document).ready(function() {    
                    App.init(); // initlayout and core plugins
                    Index.init();
                    Index.initJQVMAP(); // init index page's custom scripts
                    Index.initCalendar(); // init index page's custom scripts
                    Index.initCharts(); // init index page's custom scripts
                    Index.initChat();
                    Index.initMiniCharts();
                    Index.initDashboardDaterange();
                    Index.initIntro();
                    Tasks.initDashboardWidget();
                });
                function defaultBody(){
                    var xmlhttp4=new XMLHttpRequest();
                    xmlhttp4.open("GET","http://192.168.1.40:8080/api/solditems?apiVersion=1&stock=1",true);
                    xmlhttp4.send();
                    xmlhttp4.onreadystatechange=function()
                    {
                        if (xmlhttp4.readyState==4 && xmlhttp4.status==200)
                        {
                            console.log('test',xmlhttp4.responseText);
                            var solditems = JSON.parse(xmlhttp4.responseText);
                            console.log('solditems',solditems.data[0],solditems.data[0].name);  
                            for(var i=0; i<20; i++){
                                var id = i+1;
                                //                            console.log('testing loop',i,"solditem"+id,solditems.data[i].name);
                                document.getElementById("sold_name"+id).innerHTML = solditems.data[i].name;
                                document.getElementById("sold_price"+id).innerHTML = "Rs:"+solditems.data[i].price;
                                document.getElementById("sold_purchase"+id).innerHTML = "Last Purchased:"+solditems.data[i].lastpurchased;
                                document.getElementById("solditem"+id).src = solditems.data[i].image;
                            }
                        }
                    }
                    
                    var xmlhttp5=new XMLHttpRequest();
                    xmlhttp5.open("GET","http://192.168.1.40:8080/api/newitems?apiVersion=1&stock=1",true);
                    xmlhttp5.send();
                    xmlhttp5.onreadystatechange=function()
                    {
                        if (xmlhttp5.readyState==4 && xmlhttp5.status==200)
                        {
                            //                        console.log('test',xmlhttp5.responseText);
                            var newitems = JSON.parse(xmlhttp5.responseText);
                            //                        console.log('newitems',newitems.data[0],newitems.data[0].name);  
                            for(var i=0; i<20; i++){
                                var id = i+1;
                                //                            console.log('testing loop',i,"newitem"+id,newitems.data[i].name);
                                //                            document.getElementById("solditem"+id).src = "http://www.esajeecom.esajee.com/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/0/2/020310090758_untitled-1_20copy.jpg";
                                document.getElementById("new_name"+id).innerHTML = newitems.data[i].name;
                                document.getElementById("new_price"+id).innerHTML = "Rs:"+newitems.data[i].price;
                                document.getElementById("new_purchase"+id).innerHTML = "Last Purchased:"+newitems.data[i].lastpurchased;
                                document.getElementById("newitem"+id).src = newitems.data[i].image;
                            }
                        }
                    }
                }
            </script>
            <!-- END JAVASCRIPTS -->

        </body>
</html>
