<?php /* Smarty version Smarty-3.1.19, created on 2015-02-25 05:35:14
         compiled from "C:\wamp\www\admin2934xmb6d\themes\default\template\helpers\list\list_action_edit.tpl" */ ?>
<?php /*%%SmartyHeaderCode:1787854ed510260c808-79816474%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'ff1f1ce811e3490d6000ac0d41acafd00953bd74' => 
    array (
      0 => 'C:\\wamp\\www\\admin2934xmb6d\\themes\\default\\template\\helpers\\list\\list_action_edit.tpl',
      1 => 1420607154,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '1787854ed510260c808-79816474',
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
  'unifunc' => 'content_54ed51026bf4f1_72159710',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_54ed51026bf4f1_72159710')) {function content_54ed51026bf4f1_72159710($_smarty_tpl) {?>
<a href="<?php echo htmlspecialchars($_smarty_tpl->tpl_vars['href']->value, ENT_QUOTES, 'UTF-8', true);?>
" title="<?php echo htmlspecialchars($_smarty_tpl->tpl_vars['action']->value, ENT_QUOTES, 'UTF-8', true);?>
" class="edit">
	<i class="icon-pencil"></i> <?php echo htmlspecialchars($_smarty_tpl->tpl_vars['action']->value, ENT_QUOTES, 'UTF-8', true);?>

</a><?php }} ?>
