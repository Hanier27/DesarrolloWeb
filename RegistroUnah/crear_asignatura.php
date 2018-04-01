<!DOCTYPE html>
<html>
<head>
	<title>Crear Asignatura</title>
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
		  	  <h1 class="display-6 text-center"><b>Crear Asignatura</b></h1>
		  	  <hr style="border:1px solid #dae0e5;">
			<div class="row justify-content-md-center main_regEmpleado">
				<div id="reg_Estudiante" class="col-md-6 ">
					<form>
						  	<div class="form-group">
								<label for="txt-codigoAsignatura">Codigo Alterno</label>
								<input type="text" class="form-control" id="txt-codigoAsignatura" placeholder="Escriba el codigo">
							</div>
							<div class="form-group">
								<label for="txt-nombreAsignatura">Nombre de la Asigntura</label>
								<input type="text" class="form-control" id="txt-nombreAsignatura" placeholder="Escriba el nombre de la asignatura">
							</div>
							<div class="form-group">
								<label for="txt-horaFinal">Hora Final</label>
								<input type="time" class="form-control" id="txt-horaFinal">
							</div>
							<div class="form-group">
								<label for="txt-uv">Unidades Valorativas</label>
								<input type="text" class="form-control" id="txt-uv" placeholder="Escriba las unidades valorativas">
							</div>
							<div class="form-group">
								<label for="txt-carrera">Carrera</label>
								<select id="txt-carrera" class="custom-select" >
									<option selected>Seleccione una Carrera</option>
									<option value="1">Ingenieria en Sistemas</option>
									<option value="2">Pedagogia</option>
									<option value="3">Informatica Administrativa</option>
								</select>
							</div>
							<div class="form-group">
								<label for="txt-diasSemana">Dias</label>
								<select id="txt-diasSemana" class="custom-select" multiple >
									<option selected>Seleccione los dias de la Asignatura</option>
									<option value="1">Lunes</option>
									<option value="2">Martes</option>
									<option value="3">Miercoles</option>
									<option value="4">Jueves</option>
									<option value="5">Viernes</option>
									<option value="6">Sabados</option>
									<option value="7">Domingos</option>
								</select>
							</div>
							<div class="form-group">
								<label for="txt-tipoAsignatura">Tipo de Asignatura</label>
								<select id="txt-tipoAsignatura" class="custom-select">
									<option selected>Seleccione el tipo de Asignatura</option>
									<option value="1">Tipo 1</option>
									<option value="2">Tipo 2</option>
								</select>
							</div>
							<div class="form-group">
								<label for="txt-requisitoAsignatura">Requisitos</label>
								<select id="txt-requisitoAsignatura" class="custom-select">
									<option selected>Seleccione las asignaturas</option>
									<option value="1">Ninguna</option>
									<option value="2">Filosofia</option>
								</select>
							</div>

							<div style="text-align: center;">
								<button type="button" class="btn btn-primary">Crer Asignatura</button>
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