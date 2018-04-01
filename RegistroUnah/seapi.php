<!DOCTYPE html>
<html>
<head>
	<title>Administracion SEAPI</title>
	<?php require 'web/link.php';  ?>
</head>
<body>
	<?php include 'web/navbar.php';  ?>
	
	<nav aria-label="breadcrumb">
	  <ol class="breadcrumb">
	    <li class="breadcrumb-item"><a href="index.php">Inicio</a></li>
	    <li class="breadcrumb-item active" aria-current="page">SEAPI</li>
	  </ol>
	</nav>

	<div class="container">
		<div class="col-md-12">
		  	  <h1 class="display-6 text-center"><b>SEAPI</b></h1>
		  	  <hr style="border:1px solid #dae0e5;">
			<div id="MenuPrincipal" class="row justify-content-center"> 
					<div class="col-lg-4">
						<img src="img/cam.jpg" class="img-circle">
						<a href="registrarCampus.php">Registro de Campus</a> 
					</div>
					<div class="col-lg-4">
						<img src="img/edificio.png" class="img-rounded">
						<a href="registrarEdificio.php">Registro de Edificio</a> 
					</div>
					<div class="col-lg-4">
						<img src="img/aula.png" class="img-rounded">
						<a href="registrarAula.php">Registro de Aula</a> 
					</div>
			</div>
		</div>
	</div>

	<?php include 'web/footer.php';  ?>
</body>
</html>