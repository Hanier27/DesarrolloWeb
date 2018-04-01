<!DOCTYPE html>
<html>
<head>
	<title>Administracion DIIP</title>
	<?php require 'web/link.php';  ?>
</head>
<body>

	<?php include 'web/navbar.php';  ?>
	
	<nav aria-label="breadcrumb">
	  <ol class="breadcrumb">
	    <li class="breadcrumb-item"><a href="index.php">Inicio</a></li>
	    <li class="breadcrumb-item active" aria-current="page">Administracion DIIP</li>
	  </ol>
	</nav>

	<div class="container">
		<div class="col-md-12">
		  	  <h1 class="display-6 text-center"><b>DIIP</b></h1>
		  	  <hr style="border:1px solid #dae0e5;">
			<div id="MenuPrincipal" class="row justify-content-center">
					<div class="col-lg-4">
						<img src="img/estudiante.png" class="img-rounded">
						<a href="registrarEstudiante.php">Registro de Estudiante</a>
					</div>
					<div class="col-lg-4">
						<img src="img/empleado.png" class="img-rounded">
						<a href="registrarEmpleado.php">Registro de Empleado</a> 
					</div>
			</div>
		</div>
	</div>

	<?php include 'web/footer.php';  ?>
</body>
</html>