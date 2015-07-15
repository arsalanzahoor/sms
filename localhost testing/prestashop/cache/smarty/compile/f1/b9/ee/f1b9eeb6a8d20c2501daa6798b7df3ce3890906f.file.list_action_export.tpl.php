<?php /* Smarty version Smarty-3.1.19, created on 2015-02-25 06:59:22
         compiled from "C:\wamp\www\admin2934xmb6d\themes\default\template\controllers\request_sql\list_action_export.tpl" */ ?>
<?php /*%%SmartyHeaderCode:1405254ed64ba06ed17-24389327%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'f1b9eeb6a8d20c2501daa6798b7df3ce3890906f' => 
    array (
      0 => 'C:\\wamp\\www\\admin2934xmb6d\\themes\\default\\template\\controllers\\request_sql\\list_action_export.tpl',
      1 => 1420607154,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '1405254ed64ba06ed17-24389327',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'href' => 0,
    'action' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.19',
  'unifunc' => 'content_54ed64ba0d9b09_30561856',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_54ed64ba0d9b09_30561856')) {function content_54ed64ba0d9b09_30561856($_smarty_tpl) {?>
<a href="<?php echo htmlspecialchars($_smarty_tpl->tpl_vars['href']->value, ENT_QUOTES, 'UTF-8', true);?>
" title="<?php echo $_smarty_tpl->tpl_vars['action']->value;?>
" class="btn btn-default">
	<i class="icon-cloud-upload"></i> <?php echo $_smarty_tpl->tpl_vars['action']->value;?>

</a><?php }} ?>
