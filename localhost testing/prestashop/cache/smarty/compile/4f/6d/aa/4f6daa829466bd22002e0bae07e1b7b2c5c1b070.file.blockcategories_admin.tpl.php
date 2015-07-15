<?php /* Smarty version Smarty-3.1.19, created on 2015-02-23 11:38:24
         compiled from "C:\wamp\www\modules\blockcategories\views\blockcategories_admin.tpl" */ ?>
<?php /*%%SmartyHeaderCode:2505354eb0320d34bb7-21476531%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '4f6daa829466bd22002e0bae07e1b7b2c5c1b070' => 
    array (
      0 => 'C:\\wamp\\www\\modules\\blockcategories\\views\\blockcategories_admin.tpl',
      1 => 1420607192,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '2505354eb0320d34bb7-21476531',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'helper' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.19',
  'unifunc' => 'content_54eb0320d72690_47162214',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_54eb0320d72690_47162214')) {function content_54eb0320d72690_47162214($_smarty_tpl) {?>
<div class="form-group">
	<label class="control-label col-lg-3">
		<span class="label-tooltip" data-toggle="tooltip" data-html="true" title="" data-original-title="<?php echo smartyTranslate(array('s'=>'You can upload a maximum of 3 images.','mod'=>'blockcategories'),$_smarty_tpl);?>
">
			<?php echo smartyTranslate(array('s'=>'Thumbnails','mod'=>'blockcategories'),$_smarty_tpl);?>

		</span>
	</label>
	<div class="col-lg-4">
		<?php echo $_smarty_tpl->tpl_vars['helper']->value;?>

	</div>
</div>
<?php }} ?>
