<!DOCTYPE html>
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


    <!-- BEGIN CONTAINER -->
    <div class="page-container">

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
                        Sales Orders <small>sales orders </small>
                    </h3>
                    <ul class="page-breadcrumb breadcrumb">
                        <!--                        <li class="btn-group">
                                                    <button type="button" class="btn blue dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="1000" data-close-others="true">
                                                        <span>Actions</span> <i class="fa fa-angle-down"></i>
                                                    </button>
                                                    <ul class="dropdown-menu pull-right" role="menu">
                                                        <li><a href="#">Action</a></li>
                                                        <li><a href="#">Another action</a></li>
                                                        <li><a href="#">Something else here</a></li>
                                                        <li class="divider"></li>
                                                        <li><a href="#">Separated link</a></li>
                                                    </ul>
                                                </li>-->
                        <li>
                            <i class="fa fa-home"></i>
                            <a href="index.php">Home</a> 
                            <i class="fa fa-angle-right"></i>
                        </li>
                        <li><a href="#">Sales Orders</a>
                    </ul>
                    <!-- END PAGE TITLE & BREADCRUMB-->
                </div>
            </div>
            <!-- END PAGE HEADER-->

            <!-- BEGIN PAGE CONTENT-->
            <div class="row">
                <div class="col-md-12">
                    <!-- BEGIN UPDATE\TERMS TABLE PORTLET-->

                    <div class="portlet box light-grey">
                        <div class="portlet-title">
                            <div class="caption"><i class="fa fa-globe"></i>Sales Orders</div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse"></a>
                                <a href="#portlet-config" data-toggle="modal" class="config"></a>
                                <a href="javascript:;" class="reload"></a>
                                <a href="javascript:;" class="remove"></a>
                            </div>
                        </div>
                        <br>
                        <div class="portlet-body">
                            <div class="table-scrollable">
                                <table class="table table-striped table-bordered table-hover" id="update_table">
                                    <thead >
                                        <tr>
                                            <th class="table-checkbox"><input type="checkbox" class="group-checkable" data-set="#sample_1 .checkboxes" /></th>
                                            <th>Order #</th>
                                            <th>Company Name</th>
                                            <th>Status</th>
                                            <th>Invoiced</th>
                                            <th>Packed</th>
                                            <th>Fulfilled</th>
                                            <th>Paid</th>
                                            <th>Total</th>
                                            <th>Created</th>
                                            <th>Last Updated</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        <tr class="odd gradeX">
                                            <td><input type="checkbox" class="checkboxes" value="1" /></td>
                                            <td>SO0006</td>
                                            <td >Acme Ltd</td>
                                            <td>active</td>
                                            <td>
                                                <i class="fa fa-ban"></i>
                                            </td>
                                            <td>
                                                <i class="fa fa-ban"></i>
                                            </td>
                                            <td>
                                                <i class="fa fa-ban"></i>
                                            </td>
                                            <td>
                                                <i class="fa fa-ban"></i>
                                            </td>
                                            <td>Rs. 74.25</td>
                                            <td >12-12-2014</td>
                                            <td>15-12-2014</td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div><br>
                        </div>
<!--                        <div class="input-icon ">
                            <button type="button" class="btn blue btn-lg fa fa-save">&nbsp;Add\Update</button>
                            <button type="button" class="btn default btn-lg fa fa-eraser">&nbsp;Clear</button>
                        </div>-->
                    </div>

                    <!-- END UPDATE\TERMS TABLE PORTLET-->
                </div>
            </div>
            <!-- END PAGE-->
        </div>
    </div>

    <script>
            
    </script>
</body>
<!-- END BODY -->
</html>