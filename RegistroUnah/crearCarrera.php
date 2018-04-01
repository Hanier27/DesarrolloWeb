<!DOCTYPE html>
<html>
<head>
	<title>Crear Carrera</title>
	<?php require 'web/link.php';  ?>
</head>
<body>
	<?php include 'web/navbar.php';  ?>
	
	<nav aria-label="breadcrumb">
	  <ol class="breadcrumb">
	    <li class="breadcrumb-item"><a href="index.php">Inicio</a></li>
	    <li class="breadcrumb-item"><a href="direccion_academica.php">Direccion Academica</a></li>
	    <li class="breadcrumb-item active" aria-current="page">Asignatura</li>
	  </ol>
	</nav>

	<div class="container-fluid">
		<div class="col-md-12">
		  	  <h1 class="display-6 text-center"><b>Crear Carrera</b></h1>
		  	  <hr style="border:1px solid #dae0e5;">
			<div class="row justify-content-md-center main_regEmpleado">
				<div id="reg_Estudiante" class="col-md-6 ">
					<form>
						  	<div class="form-group">
								<label for="txt-codigoAuxiliar">Codigo Auxiliar</label>
								<input type="text" class="form-control" id="txt-codigoAuxiliar" placeholder="Escriba el codigo">
							</div>
							<div class="form-group">
								<label for="txt-nombreCarrera">Nombre de la Carrera</label>
								<input type="text" class="form-control" id="txt-nombreCarrera" placeholder="Escriba el nombre de la Carrera">
							</div>
							<div class="form-group">
								<label for="txt-facultad">Facultad</label>
								<select id="txt-facultad" class="custom-select" >
									<option selected>Seleccione una Facultad</option>
									<option value="1">Ingenieria</option>
									<option value="2">Letras</option>
								</select>
							</div>
							<div class="form-group">
								<label for="txt-cantAsignatura">Cantidad de Asignaturas</label>
								<input type="text" class="form-control" id="txt-cantAsignatura" placeholder="Escriba la Cantidad de Asignaturas">
							</div>
							<div class="form-group">
								<label for="txt-uv">Cantidad de Unidades Valorativas</label>
								<input type="text" class="form-control" id="txt-uv" placeholder="Escriba la Cantidad de Unidades Valorativas">
							</div>
							<div class="form-group">
								<label for="txt-facultad">Grado</label>
								<select id="txt-facultad" class="custom-select" >
									<option selected>Seleccione el Grado</option>
									<option value="1">Tecnica</option>
									<option value="2">Licenciatura</option>
									<option value="3">Maestria</option>
								</select>
							</div>
							<div style="text-align: center;">
								<button type="button" class="btn btn-primary">Crer Carrera</button>
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