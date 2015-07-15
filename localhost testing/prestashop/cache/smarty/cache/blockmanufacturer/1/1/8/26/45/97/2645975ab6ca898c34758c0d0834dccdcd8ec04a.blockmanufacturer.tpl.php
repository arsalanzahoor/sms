<?php /*%%SmartyHeaderCode:2162254ed5071d1a226-13792984%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '2645975ab6ca898c34758c0d0834dccdcd8ec04a' => 
    array (
      0 => 'C:\\wamp\\www\\themes\\default-bootstrap\\modules\\blockmanufacturer\\blockmanufacturer.tpl',
      1 => 1420607156,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '2162254ed5071d1a226-13792984',
  'version' => 'Smarty-3.1.19',
  'unifunc' => 'content_54f428a8eee024_11091930',
  'has_nocache_code' => false,
  'cache_lifetime' => 31536000,
),true); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_54f428a8eee024_11091930')) {function content_54f428a8eee024_11091930($_smarty_tpl) {?>
<!-- Block manufacturers module -->
<div id="manufacturers_block_left" class="block blockmanufacturer">
	<p class="title_block">
					<a href="http://localhost/index.php?controller=manufacturer" title="Manufacturers">
						Manufacturers
					</a>
			</p>
	<div class="block_content list-block">
								<ul>
														<li class="last_item">
						<a 
						href="http://localhost/index.php?id_manufacturer=1&amp;controller=manufacturer&amp;id_lang=1" title="More about Fashion Manufacturer">
							Fashion Manufacturer
						</a>
					</li>
												</ul>
										<form action="/index.php" method="get">
					<div class="form-group selector1">
						<select class="form-control" name="manufacturer_list">
							<option value="0">All manufacturers</option>
													<option value="http://localhost/index.php?id_manufacturer=1&amp;controller=manufacturer&amp;id_lang=1">Fashion Manufacturer</option>
												</select>
					</div>
				</form>
						</div>
</div>
<!-- /Block manufacturers module -->
<?php }} ?>
