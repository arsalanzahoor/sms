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
    <!-- BEGIN HEAD -->
    <?php include 'head.php'; ?>
    <!-- END HEAD -->
    <!-- BEGIN BODY -->
    <body class="page-header-fixed">
        <!-- BEGIN HEADER -->   
        <?php include 'header.php'; ?>
        <!-- END HEADER -->
        <div class="clearfix"></div>
        <!-- BEGIN CONTAINER -->
        <div class="page-container">
            
            <?php
            if ( isset($_GET['mainItem'])) {
                $mainItem = $_GET['mainItem'];
                $menuItem = $_GET['menuItem'];
            } else {
                
                $mainItem = 'dashboard';
                $menuItem = 'dashboard';
            }
            
            ?>
                
                <?php include 'sidebar-menu.php';
                
                include $mainItem . '/' . $menuItem . '.php';
                ?>

            
            
        </div>
        <!-- END CONTAINER -->

        <!-- BEGIN FOOTER -->
<?php include 'footer.php'; ?>
        <!-- END FOOTER -->
        <!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
        <!-- BEGIN CORE PLUGINS -->   
<?php include 'core-plugins.php'; ?>
        <!-- END CORE PLUGINS -->
        <!-- BEGIN PAGE LEVEL PLUGINS -->
        <script type="text/javascript" src="assets/plugins/select2/select2.min.js"></script>
        <script type="text/javascript" src="assets/plugins/data-tables/jquery.dataTables.js"></script>
        <script type="text/javascript" src="assets/plugins/data-tables/DT_bootstrap.js"></script>
        <!-- END PAGE LEVEL PLUGINS -->
        <!-- BEGIN PAGE LEVEL SCRIPTS -->
        <script src="assets/scripts/app.js"></script>
        <script src="assets/scripts/table-managed.js"></script>     
        <script>
            jQuery(document).ready(function() {       
                App.init();
//                TableManaged.init();
            });
        </script>
    </body>
    <!-- END BODY -->
</html>