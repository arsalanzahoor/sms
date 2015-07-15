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
                        Generate Packing List <small>generate packing list</small>
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
                        <li>
                            <a href="#">Sales Orders</a>
                            <i class="fa fa-angle-right"></i>
                        </li>
                        <li><a href="#">Generate Packing List</a></li>
                    </ul>
                    <!-- END PAGE TITLE & BREADCRUMB-->
                </div>
            </div>
            <!-- END PAGE HEADER-->

            <!-- BEGIN PAGE CONTENT-->
            <div class="row">
                <div class="col-md-12">
                    <!-- BEGIN TABLE PORTLET-->
                    <div class="portlet box light-grey">
                        <div class="portlet-title">
                            <div class="caption"><i class="fa fa-globe"></i>Packing List</div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse"></a>
                                <a href="#portlet-config" data-toggle="modal" class="config"></a>
                                <a href="javascript:;" class="reload"></a>
                                <a href="javascript:;" class="remove"></a>
                            </div>
                        </div>
                        <div class="portlet-body">

                            <div >
                                <div class="table-scrollable">
                                    <table class="table table-striped table-bordered table-hover">
                                        <tr>
                                            <td>
                                                <label for="supplier" ><b>Ship to:</b></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <a href="#" class="input-icon blue"><u>Shipping Address</u></a>
                                            </td>
                                            <td>
                                                <!--<label for="billing" ><b>Packed</b></label>&nbsp;-->
                                                <input style="width: 100%" class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="Packed Date" name="date"/>
                                            </td>
                                            <td>
                                                <label for="billing" ><b>Delivery</b></label>&nbsp;&nbsp;&nbsp;
                                                <select class="btn blue btn-xlg" style="width: 80%">
                                                    <option>Delivery Type</option>
                                                    <option >Normal</option>
                                                    <option >Urgent</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="billing" ><b>Bill to:</b></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <a href="#" class="input-icon blue"><u>Billing Address</u></a>
                                            </td>
                                            <td>
                                            </td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="shipping" ><b>Ship from:</b></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <a href="#" class="input-icon blue"><u>Primary Location</u></a>
                                            </td>
                                            <td>
                                            </td>
                                            <td>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <br><br>
                                <div class="table-scrollable">
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th >Product</th>
                                                <th>Qty To Pack</th>
                                                <th>Not Packed</th>
                                                <th >Total Qty</th>
                                                <th >Total (Rs)</th>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            <tr class="odd gradeX">
                                                <td><input type="checkbox" class="checkboxes" value="1" /></td>
                                                <td>sku-variant-check-composite<br>add a note</td>
                                                <td>12</td>
                                                <td>0</td>
                                                <td >12</td>
                                                <td >171.00</td>
                                            </tr>
                                            <tr class="odd gradeX">
                                                <td><input type="checkbox" class="checkboxes" value="1" /></td>
                                                <td>Shipping and Handling charges and let see what it does when this...</td>
                                                <td>1</td>
                                                <td>0</td>
                                                <td >1</td>
                                                <td >15.00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="portlet box blue pull-right">
                                    <div class="table-scrollable">
                                        <table class="table table-striped table-bordered table-hover">
                                            <tr>
                                                <td><b>Total Units</b></td>
                                                <td><b>12</b></td>
                                            </tr>
                                            <tr>
                                                <td><b>Sub Total</b></td>
                                                <td><b>186.00</b></td>
                                            </tr>
                                            <tr>
                                                <td><b>Including Tax(15%)</b></td>
                                                <td><b>24.26</b></td>
                                            </tr>
                                            <tr>
                                                <td><b>Total</b></td>
                                                <td><b>186.00</b></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <br>
                                <div class="input-icon">
                                    <b>Message to customer:</b>
                                    <textarea style="width: 30%; font-weight: bold; background-color: lightblue" class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="Show on the packing slip" ></textarea>
                                    <br>
                                    <button type="button" class="btn default fa fa-ban btn-xsm">&nbsp;Cancel</button>
                                    <button type="button" class="btn green fa fa-save btn-xsm">&nbsp;Save</button>
                                </div>
                            </div>
                            <br>
                        </div>
                    </div>
                    <!-- END TABLE PORTLET-->
                </div>
            </div>
        </div>
         <!-- END PAGE CONTENT-->
    </div>
        <!-- END PAGE-->

    </body>
    <!-- END BODY -->
</html>