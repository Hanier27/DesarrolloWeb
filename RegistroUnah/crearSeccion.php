<!DOCTYPE html>
<html>
<head>
	<title>Crear Seccion</title>
	<?php require 'web/link.php';  ?>
</head>
<body>
	<?php include 'web/navbar.php';  ?>
	
	<nav aria-label="breadcrumb">
	  <ol class="breadcrumb">
	    <li class="breadcrumb-item"><a href="index.php">Inicio</a></li>
	    <li class="breadcrumb-item active" aria-current="page">Seccion</li>
	  </ol>
	</nav>

	<div class="container-fluid">
		<div class="col-md-12">
		  	  <h1 class="display-6 text-center"><b>Nueva Seccion</b></h1>
		  	  <hr style="border:1px solid #dae0e5;">
			<div class="row justify-content-md-center main_regEmpleado">
				<div id="reg_Estudiante" class="col-md-6 ">
					<form>
						  	<div class="form-group">
								<label for="txt-codigoSeccion">Codigo Alterno</label>
								<input type="text" class="form-control" id="txt-codigoSeccion" placeholder="Escriba el codigo">
							</div>
							<div class="form-group">
								<label for="txt-horaInicial">Hora Inicio</label>
								<input type="time" class="form-control" id="txt-horaInicial">
							</div>
							<div class="form-group">
								<label for="txt-horaFinal">Hora Final</label>
								<input type="time" class="form-control" id="txt-horaFinal">
							</div>
							<div class="form-group">
								<label for="txt-diasSemana">Dias de la Semana</label>
								<select id="txt-diasSemana" class="custom-select" multiple >
									<option selected>Selecciones los dias de la Seccion</option>
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
								<label for="txt-aula">Aula</label>
								<select id="txt-aula" class="custom-select" >
									<option selected>Seleccione la aula</option>
									<option value="1">B2-201</option>
									<option value="2">F1-101</option>
									<option value="3">B1-200</option>
									<option value="4">E1-401</option>
									<option value="5">D1-206</option>
									<option value="6">C1-410</option>
									<option value="7">A1-302</option>
								</select>
							</div>
							<div class="form-group">
								<label for="txt-asignatura">Asignatura</label>
								<select id="txt-asignatura" class="custom-select" >
									<option selected>Seleccione la Asignatura</option>
									<option value="1">Matematicas I</option>
									<option value="2">Español General</option>
									<option value="3">Filosofia</option>
									<option value="4">Ingles I</option>
								</select>
							</div>
							<div class="form-group">
								<label for="txt-docente">Maestro</label>
								<select id="txt-docente" class="custom-select" >
									<option selected>Seleccione el Maestro</option>
									<option value="1">Juan Carcamo</option>
									<option value="2">Luis Gonzalez</option>
									<option value="3">Hector Duron</option>
									<option value="4">Maria Rosales</option>
								</select>
							</div>
							<div class="form-group">
								<label for="txt-periodo">Periodo</label>
								<select id="txt-periodo" class="custom-select" >
									<option selected>Seleccione el Periodo</option>
									<option value="1">I Periodo 2018</option>
									<option value="2">II Periodo 2018</option>
									<option value="3">III Periodo 2018</option>
								</select>
							</div>
							<div class="form-group">
								<label for="txt-cupos">Cupos</label>
								<input type="text" class="form-control" id="txt-cupos" placeholder="Escriba la cantidad de Cupos">
							</div>

							<div style="text-align: center;">
								<button type="button" class="btn btn-primary">Crer Seccion</button>
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