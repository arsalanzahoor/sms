

<!-- BEGIN SIDEBAR -->
<div class="page-sidebar navbar-collapse collapse">
    <?php
//$mainItem = '';
//$menuItem = '';
    ?>

    <!-- BEGIN SIDEBAR MENU -->        
    <ul class="page-sidebar-menu">
        <li>
            <!-- BEGIN SIDEBAR TOGGLER BUTTON -->
            <div class="sidebar-toggler hidden-phone"></div>
            <!-- BEGIN SIDEBAR TOGGLER BUTTON -->
        </li>
        <li>
            <!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->
            <form class="sidebar-search" action="extra_search.html" method="POST">
                <div class="form-container">
                    <div class="input-box">
                        <a href="javascript:;" class="remove"></a>
                        <input type="text" placeholder="Search..."/>
                        <input type="button" class="submit" value=" "/>
                    </div>
                </div>
            </form>
            <!-- END RESPONSIVE QUICK SEARCH FORM -->
        </li>
        <li class="<?php if ($mainItem == 'dashboard') { ?>active<?php } ?>">
            <a href="index.php?mainItem=dashboard&menuItem=dashboard">
                <i class="fa fa-home"></i> 
                <span class="title">Dashboard</span>
            </a>
        </li>

        <li class="<?php if ($mainItem == 'rfq') { ?>active<?php } ?>">
            <a href="index.php?mainItem=rfq&menuItem=rfqView">
                <i class="fa fa-edit"></i> 
                <span class="title">RFQ</span>
            </a>
            
        </li>

        <li class="<?php if ($mainItem == 'por') { ?>active<?php } ?>">
            <a href="index.php?mainItem=por&menuItem=porView">
                <i class="fa fa-question-circle"></i> 
                <span class="title">POR</span>

            </a>
        </li>

<!--       <li class="<?php if ($mainItem == 'salesOrders') { ?>active<?php } ?>">
            <a href="index.php?mainItem=salesOrders&menuItem=ordersView">
                <i class="fa fa-book"></i> 
                <span class="title">Sales Orders</span>
            </a>
           
        </li>-->
        
        <li class="<?php if ($mainItem == 'salesOrders') { ?>active<?php } ?>">
            <a href="javascript:;">
                <i class="fa fa-edit"></i> 
                <span class="title">Sales Orders</span>
                <span class="arrow open"></span>
            </a>
            <ul class="sub-menu">
                <li class="<?php if ($menuItem == 'ordersView') { ?>active<?php } ?>">
                    <a href="index.php?mainItem=salesOrders&menuItem=ordersView">
                        Orders</a>
                </li>
                <li class="<?php if ($menuItem == 'addOrders') { ?>active<?php } ?>">
                    <a href="index.php?mainItem=salesOrders&menuItem=addOrders">
                        Add Sale Orders</a>
                </li>
                <li class="<?php if ($menuItem == 'packingList') { ?>active<?php } ?>">
                    <a href="index.php?mainItem=salesOrders&menuItem=packingList">
                        Generate Packing List</a>
                </li>
            </ul>
        </li>

        <!--        <li class="">
                    <a href="javascript:;">
                        <i class="fa fa-user"></i> 
                        <span class="title">Login Options</span>
                        <span class="arrow "></span>
                    </a>
                    <ul class="sub-menu">
                        <li >
                            <a href="login.html">
                                Login Form 1</a>
                        </li>
                        <li >
                            <a href="login_soft.html">
                                Login Form 2</a>
                        </li>
                    </ul>
                </li>-->


    </ul>
    <!-- END SIDEBAR MENU -->
</div>
<!-- END SIDEBAR -->
