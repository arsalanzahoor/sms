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
                        Add Sales Orders <small>add sales orders</small>
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
                        <li><a href="#">Add Sales Orders</a></li>
                    </ul>
                    <!-- END PAGE TITLE & BREADCRUMB-->
                </div>
            </div>
            <!-- END PAGE HEADER-->

            <!-- BEGIN PAGE CONTENT-->
            <div class="row">
                <div class="col-md-12">
                    <!-- BEGIN EXAMPLE TABLE PORTLET-->
                    <div class="portlet box light-grey">
                        <div class="portlet-title">
                            <div class="caption"><i class="fa fa-globe"></i>New Sales Orders</div>
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
                                            <th>
                                                <select class="btn blue btn-xlg">
                                                    <option>Select Customer</option>
                                                    <option >Acme Ltd</option>
                                                    <option >Customer 1</option>
                                                </select>
                                        <div class="pull-right">Or</div>
                                        </th>
                                        <th>
                                            <a href="#" class="input-icon blue"><u>Add New Customer</u></a>
                                        </th>
                                        <th>
                                            <a href="#" class="input-icon blue"><u>SO#0006</u></a>
                                        </th>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="supplier" ><b>Ship to:</b></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <a href="#" class="input-icon blue"><u>Shipping Address</u></a>
                                            </td>
                                            <td>
                                                <div class="input-icon">
                                                    <input style="width: 100%" class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="Issue Date" name="issuedate"/>
                                                </div>
                                            </td>
                                            <td>
                                                <select class="btn blue btn-xlg" style="width: 100%">
                                                    <option>Currency</option>
                                                    <option >PKR</option>
                                                    <option >USD</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="billing" ><b>Bill to:</b></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <a href="#" class="input-icon blue"><u>Billing Address</u></a>
                                            </td>
                                            <td>
                                                <div class="input-icon">
                                                    <input style="width: 100%" class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="Shippment Date" name="shipmentdate"/>
                                                </div>
                                            </td>
                                            <td>
                                                <select class="btn blue btn-xlg " style="width: 100%">
                                                    <option>Price List</option>
                                                    <option>Wholesale</option>
                                                    <option>Retail</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label for="shipping" ><b>Ship from:</b></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <a href="#" class="input-icon blue"><u>Primary Location</u></a>
                                            </td>
                                            <td>
                                                <div class="input-icon">
                                                    <input style="width: 100%" class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="Reference" name="reference"/>
                                                </div>
                                            </td>
                                            <td>
                                                <select class="btn blue btn-xlg" style="width: 100%">
                                                    <option>Total are</option>
                                                    <option>Tax Exclusive</option>
                                                    <option>Tax Enclusive</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            </td>
                                            <td>
                                                <div class="input-icon">
                                                    <input style="width: 100%" class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="Email" name="email"/>
                                                </div>
                                            </td>
                                            <td>
                                                <select class="btn blue btn-xlg" style="width: 100%">
                                                    <option>Assigned to</option>
                                                    <option>Abc</option>
                                                    <option>Xyz</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            </td>
                                            <td>
                                                <div class="input-icon">
                                                    <input style="width: 100%" class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="Phone" name="phone"/>
                                                </div>
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
                                                <th >Item Name</th>
                                                <th>Quantity</th>
                                                <th>Avaiable</th>
                                                <th >Price (RS)</th>
                                                <th>Discount</th>
                                                <th >Tax</th>
                                                <th >Total</th>
                                                <th></th>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            <tr class="odd gradeX">
                                                <td>item-image.png</td>
                                                <td>Item Name</td>
                                                <td class="pull-center">12&nbsp;&nbsp;<i class="fa fa-resize-vertical"></i></td>
                                                <td >15</td>
                                                <td >15&nbsp;&nbsp;<i class="fa fa-resize-vertical"></i></td>
                                                <td>5%</td>
                                                <td >15%</td>
                                                <td >171.00</td>
                                                <td>
                                                    <b>Del</b>
                                                    <div class="pull-right">
                                                        <button type="button" class="btn green fa fa-plus-circle btn-sm">&nbsp;Add More</button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><b><i>EXTRA: E.G. SHIPPING/HANDLING/DISCOUNT</i></b></td>
                                            </tr>
                                            <tr class="odd gradeX">
                                                <td></td>
                                                <td>Label: Shipping ...</td>
                                                <td class="pull-center">1&nbsp;&nbsp;<i class="fa fa-resize-vertical"></i></td>
                                                <td >15</td>
                                                <td >15&nbsp;&nbsp;<i class="fa fa-resize-vertical"></i></td>
                                                <td>0%</td>
                                                <td >15%</td>
                                                <td >15.00</td>
                                                <td>
                                                    <b>Del</b>
                                                    <div class="pull-right">
                                                        <button type="button" class="btn green fa fa-plus-circle btn-sm">&nbsp;Add More</button>
                                                    </div>
                                                </td>
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
                                    <textarea style="width: 30%; font-weight: bold; background-color: lightblue" class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="Message to customer" ></textarea>
                                    <br>
                                    <button type="button" class="btn default fa fa-ban btn-xsm">&nbsp;Cancel</button>
                                    <button type="button" class="btn green fa fa-save btn-xsm">&nbsp;Save</button>
                                    <button type="button" class="btn blue fa fa-check btn-xsm" onclick="finalizefunction()">&nbsp;Finalize</button>
                                </div>
                            </div>
                            <br><br>
                            <div class="portlet box grey" id="finalizediv" style="display: none">
                                <div class="portlet-title">
                                    <div class="caption"><i class="fa fa-globe"></i>Reconcile Differences</div>
                                    <div class="tools">
                                        <a href="javascript:;" class="collapse"></a>
                                        <a href="#portlet-config" data-toggle="modal" class="config"></a>
                                        <a href="javascript:;" class="reload"></a>
                                        <a href="javascript:;" class="remove"></a>
                                    </div>
                                </div>
                                <div class="table-scrollable">
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead >
                                            <tr>
                                                <th class="table-checkbox"><input type="checkbox" class="group-checkable" data-set="#sample_1 .checkboxes" /></th>
                                                <th>Order #</th>
                                                <th>Item</th>
                                                <th>Barcode</th>
                                                <th>Ordered</th>
                                                <th>Fulfilled</th>
                                                <th>Difference</th>
                                                <th>Reason</th>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            <tr class="odd gradeX">
                                                <td><input type="checkbox" class="checkboxes" value="1" checked="true" /></td>
                                                <td>P10001</td>
                                                <td >Nestle Water</td>
                                                <td>101</td>
                                                <td>12</td>
                                                <td >0</td>
                                                <td>-12</td>
                                                <td>
                                                    <select class="btn blue btn-xlg" style="width: 100%">
                                                        <option>Not Available</option>
                                                        <option>Discount</option>
                                                        <option>Budget</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr class="odd gradeX">
                                                <td><input type="checkbox" class="checkboxes" value="1" checked="true" /></td>
                                                <td>P10002</td>
                                                <td >Nestle 500ml</td>
                                                <td>102</td>
                                                <td>24</td>
                                                <td >36</td>
                                                <td>+12</td>
                                                <td>
                                                    <select class="btn blue btn-xlg" style="width: 100%">
                                                        <option>Discount</option>
                                                        <option>Not Available</option>
                                                        <option>Budget</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr class="odd gradeX">
                                                <td><input type="checkbox" class="checkboxes" value="1" /></td>
                                                <td>P10003</td>
                                                <td >Nestle 1.5L</td>
                                                <td>103</td>
                                                <td>36</td>
                                                <td >33</td>
                                                <td>-3</td>
                                                <td>
                                                    <select class="btn blue btn-xlg" style="width: 100%">
                                                        <option>Budget</option>
                                                        <option>Not Available</option>
                                                        <option>Discount</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="input-icon">
                                    <button type="button" class="btn green fa fa-check btn-xsm">&nbsp;Reconcile</button>
                                    <button type="button" class="btn default fa fa-eraser btn-xsm">&nbsp;Clear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END EXAMPLE TABLE PORTLET-->
                </div>
            </div>
        </div>
        <!-- END PAGE-->


        <script>
            function addNew()
            {
                //                    $("#newRecord").show();
                $("#newRecord").toggle();
            };
            function finalizefunction()
            {
                $("#finalizediv").toggle();
            }
        </script>      
    </body>
    <!-- END BODY -->
</html>