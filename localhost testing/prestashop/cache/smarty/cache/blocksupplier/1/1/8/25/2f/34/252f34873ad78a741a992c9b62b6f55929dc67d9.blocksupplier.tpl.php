<?php /*%%SmartyHeaderCode:1405254ed50723b9bc8-30240057%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '252f34873ad78a741a992c9b62b6f55929dc67d9' => 
    array (
      0 => 'C:\\wamp\\www\\themes\\default-bootstrap\\modules\\blocksupplier\\blocksupplier.tpl',
      1 => 1420607156,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '1405254ed50723b9bc8-30240057',
  'version' => 'Smarty-3.1.19',
  'unifunc' => 'content_54f428a9860e51_91747039',
  'has_nocache_code' => false,
  'cache_lifetime' => 31536000,
),true); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_54f428a9860e51_91747039')) {function content_54f428a9860e51_91747039($_smarty_tpl) {?>
<!-- Block suppliers module -->
<div id="suppliers_block_left" class="block blocksupplier">
	<p class="title_block">
					<a href="http://localhost/index.php?controller=supplier" title="Suppliers">
					Suppliers
					</a>
			</p>
	<div class="block_content list-block">
								<ul>
											<li class="last_item">
                					<a 
					href="http://localhost/index.php?id_supplier=1&amp;controller=supplier&amp;id_lang=1" 
					title="More about Fashion Supplier">
				                Fashion Supplier
                					</a>
                				</li>
										</ul>
										<form action="/index.php" method="get">
					<div class="form-group selector1">
						<select class="form-control" name="supplier_list">
							<option value="0">All suppliers</option>
													<option value="http://localhost/index.php?id_supplier=1&amp;controller=supplier&amp;id_lang=1">Fashion Supplier</option>
												</select>
					</div>
				</form>
						</div>
</div>
<!-- /Block suppliers module -->
<?php }} ?>
