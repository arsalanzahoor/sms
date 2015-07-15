<?php /* Smarty version Smarty-3.1.19, created on 2015-02-25 05:33:55
         compiled from "C:\wamp\www\admin5151qiicx\themes\default\template\helpers\modules_list\modal.tpl" */ ?>
<?php /*%%SmartyHeaderCode:2494354ed50b3b5df09-06314678%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'c4076474d3f932c7416d840119546230a780e798' => 
    array (
      0 => 'C:\\wamp\\www\\admin5151qiicx\\themes\\default\\template\\helpers\\modules_list\\modal.tpl',
      1 => 1420607154,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '2494354ed50b3b5df09-06314678',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.19',
  'unifunc' => 'content_54ed50b3b67ed0_71432742',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_54ed50b3b67ed0_71432742')) {function content_54ed50b3b67ed0_71432742($_smarty_tpl) {?><div class="modal fade" id="modules_list_container">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h3 class="modal-title"><?php echo smartyTranslate(array('s'=>'Recommended Modules'),$_smarty_tpl);?>
</h3>
			</div>
			<div class="modal-body">
				<div id="modules_list_container_tab_modal" style="display:none;"></div>
				<div id="modules_list_loader"><i class="icon-refresh icon-spin"></i></div>
			</div>
		</div>
	</div>
</div><?php }} ?>
