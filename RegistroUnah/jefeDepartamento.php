<!DOCTYPE html>
<html>
<head>
	<title>Jefe Departamento</title>
	<?php require 'web/link.php';  ?>
</head>
<body>
	<?php include 'web/navbar.php';  ?>
	
	<nav aria-label="breadcrumb">
	  <ol class="breadcrumb">
	    <li class="breadcrumb-item"><a href="index.php">Inicio</a></li>
	    <li class="breadcrumb-item active" aria-current="page">Jefe de Departamento</li>
	  </ol>
	</nav>

	<div class="container">
		<div class="col-md-12">
		  	  <h1 class="display-6 text-center"><b>Jefe de Departamento</b></h1>
		  	  <hr style="border:1px solid #dae0e5;">
			<div id="MenuPrincipal" class="row justify-content-center">
					<div class="col-lg-4">
						<img src="img/seccion.jpg" class="img-rounded">
						<a href="crearSeccion.php">Crear Seccion</a>
					</div>
					
			</div>
		</div>
	</div>

	<?php include 'web/footer.php';  ?>
</body>
</html>