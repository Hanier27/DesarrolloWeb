<!DOCTYPE html>
<html>
<head>
	<title>Crear Facultad</title>
	<?php require 'web/link.php';  ?>
</head>
<body>
	<?php include 'web/navbar.php';  ?>
	
	<nav aria-label="breadcrumb">
	  <ol class="breadcrumb">
	    <li class="breadcrumb-item"><a href="index.php">Inicio</a></li>
	    <li class="breadcrumb-item"><a href="direccion_academica.php">Direccion Academica</a></li>
	    <li class="breadcrumb-item active" aria-current="page">Facultad</li>
	  </ol>
	</nav>

	<div class="container-fluid">
		<div class="col-md-12">
		  	  <h1 class="display-6 text-center"><b>Crear Facultad</b></h1>
		  	  <hr style="border:1px solid #dae0e5;">
			<div class="row justify-content-md-center main_regEmpleado">
				<div id="reg_Estudiante" class="col-md-6 ">
					<form>
						  	<div class="form-group">
								<label for="txt-nombreFacultad">Nombre de la Facultad</label>
								<input type="text" class="form-control" id="txt-nombreFacultad" placeholder="Escriba el nombre de la Facultad">
							</div>
							<div class="form-group">
								<label for="txt-descripcionFacultad">Descripcion</label>
								<textarea class="form-control" id="txt-descripcionFacultad" placeholder="Describa la Facultad"></textarea>
							</div>
							
							<div style="text-align: center;">
								<button type="button" class="btn btn-primary">Crer Facultad</button>
							</div>
						 
						<!--<button type="submit" class="btn btn-primary">Submit</button>-->
					</form>
				</div>
			</div>
		</div>
	</div>

	<?php include 'web/footer.php';  ?>

</body>
</html>