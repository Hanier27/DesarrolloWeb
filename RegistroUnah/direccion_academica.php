<!DOCTYPE html>
<html>
<head>
	<title>Direccion Academica</title>
	<?php require 'web/link.php';  ?>
</head>
<body>
	<?php include 'web/navbar.php';  ?>
	
	<nav aria-label="breadcrumb">
	  <ol class="breadcrumb">
	    <li class="breadcrumb-item"><a href="index.php">Inicio</a></li>
	    <li class="breadcrumb-item active" aria-current="page">Direccion Academica</li>
	  </ol>
	</nav>

	<div class="container">
		<div class="col-md-12">
		  	  <h1 class="display-6 text-center"><b>Direccion Academica</b></h1>
		  	  <hr style="border:1px solid #dae0e5;">
			<div id="MenuPrincipal" class="row justify-content-center">
					<div class="col-lg-4">
						<img src="img/favu.png" class="img-rounded">
						<a href="crearFacultad.php">Registro de Facultad</a> 
					</div>
					<div class="col-lg-4">
						<img src="img/carreras.png" class="img-rounded">
						<a href="crearCarrera.php">Registro de Carrera</a> 
					</div>
					<div class="col-lg-4">
						<img src="img/asignaturaa.jpg" class="img-rounded">
						<a href="crear_asignatura.php">Registro de Asignatura</a> 
					</div>
			</div>
		</div>
	</div>

	<?php include 'web/footer.php';  ?>
</body>
</html>