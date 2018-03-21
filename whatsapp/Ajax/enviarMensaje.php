<?php 
date_default_timezone_set("America/Tegucigalpa");

	$archivo=fopen('./mensaje.csv', 'a');
	fwrite($archivo,$_POST['user'].','.$_POST['receptor'].','.$_POST['mensaje'].','.date("h:i:a").PHP_EOL);
	fclose($archivo);


?>