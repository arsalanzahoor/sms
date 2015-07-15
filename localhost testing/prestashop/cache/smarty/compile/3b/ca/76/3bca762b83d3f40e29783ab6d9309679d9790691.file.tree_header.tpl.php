<?php /* Smarty version Smarty-3.1.19, created on 2015-02-23 11:38:25
         compiled from "C:\wamp\www\admin271ctsj9u\themes\default\template\helpers\tree\tree_header.tpl" */ ?>
<?php /*%%SmartyHeaderCode:950454eb0321061cc2-49076519%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '3bca762b83d3f40e29783ab6d9309679d9790691' => 
    array (
      0 => 'C:\\wamp\\www\\admin271ctsj9u\\themes\\default\\template\\helpers\\tree\\tree_header.tpl',
      1 => 1420607154,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '950454eb0321061cc2-49076519',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'title' => 0,
    'toolbar' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.19',
  'unifunc' => 'content_54eb03210d68f5_18857119',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_54eb03210d68f5_18857119')) {function content_54eb03210d68f5_18857119($_smarty_tpl) {?>
<div class="tree-panel-heading-controls clearfix">
	<?php if (isset($_smarty_tpl->tpl_vars['title']->value)) {?><i class="icon-tag"></i>&nbsp;<?php echo smartyTranslate(array('s'=>$_smarty_tpl->tpl_vars['title']->value),$_smarty_tpl);?>
<?php }?>
	<?php if (isset($_smarty_tpl->tpl_vars['toolbar']->value)) {?><?php echo $_smarty_tpl->tpl_vars['toolbar']->value;?>
<?php }?>
</div><?php }} ?>
