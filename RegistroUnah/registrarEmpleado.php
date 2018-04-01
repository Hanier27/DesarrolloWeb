<!DOCTYPE html>
<html>
<head>
	<title>Regitrar Empleado</title>
	<?php require 'web/link.php';  ?>
</head>
<body>
	<?php include 'web/navbar.php';  ?>
	
	<nav aria-label="breadcrumb">
	  <ol class="breadcrumb">
	    <li class="breadcrumb-item"><a href="index.php">Inicio</a></li>
	    <li class="breadcrumb-item"><a href="administracion.php">Administracion</a></li>
	    <li class="breadcrumb-item active" aria-current="page">Registrar Empleado</li>
	  </ol>
	</nav>

	<div class="container-fluid">
		<div class="col-md-12">
		  	  <h1 class="display-6 text-center"><b>Registro de Empleados</b></h1>
		  	  <hr style="border:1px solid #dae0e5;">
			<div class="row justify-content-md-center main_regEmpleado">
				<div id="reg_Estudiante" class="col-md-6 ">
					<form>
						<ul class="nav nav-tabs" role="tablist" style="margin-bottom: 20px;">
						  <li class="nav-item">
						    <a class="nav-link active" data-toggle="tab" href="#home" role="tab">Datos personales</a>
						  </li>
						  <li class="nav-item">
						    <a class="nav-link" data-toggle="tab" href="#profile" role="tab">Datos de Empleado</a>
						    <li class="nav-item">
						    <a class="nav-link" data-toggle="tab" href="#docente" role="tab">Datos del Docente</a>
						  </li>
						  </li>
						</ul>
						<div class="tab-content">
						  <div class="tab-pane active" id="home" role="tabpanel">
						  	<div class="form-group">
								<label for="txt-nombre_estudiante">Nombre</label>
								<input type="text" class="form-control" id="txt-nombre_estudiante" placeholder="Escriba el nombre">
							</div>
							<div class="form-group">
								<label for="txt-apellido_estudiante">Apellido</label>
								<input type="text" class="form-control" id="txt-apellido_estudiante" placeholder="Escriba los apellidos">
							</div>
							<div class="form-group">
								<label for="txt-identificacion">Identidad</label>
								<input type="text" class="form-control" id="txt-identificacion" placeholder="Escriba el numoro de identidad">
							</div>
							<div class="form-group">
								<label for="txt-fecha_nacimiento">Fecha de Nacimiento</label>
								<input type="date" class="form-control" id="txt-fecha_nacimiento">
							</div>
							<div class="form-group">
								<label for="txt-lugar_nacimiento">Lugar de Nacimiento</label>
								<select id="txt-lugar_nacimiento" class="custom-select">
									<option selected>Selecciones un lugar</option>
									<option value="1">Francisco Morazan</option>
									<option value="2">Cortes</option>
									<option value="3">Atlantidad</option>
								</select>
							</div>
							<div class="form-group">
								<label for="txt-municipio_nacimiento">Municipio de Nacimiento</label>
								<select id="txt-municipio_nacimiento" class="custom-select">
									<option selected>Tegucigalpa M.D.C</option>
									<option value="2">San Pedro Sula</option>
									<option value="3">La Ceiba</option>
								</select>
							</div>
							<div class="form-group">
								<label for="txt-lugar_residencia">Lugar de Residencia</label>
								<select id="txt-lugar_residencia" class="custom-select">
									<option selected>Selecciones un lugar</option>
									<option value="1">Francisco Morazan</option>
									<option value="2">Cortes</option>
									<option value="3">Atlantidad</option>
								</select>
							</div>
							<div class="form-group">
								<label for="txt-municipio_residencia">Municipio de Residencia</label>
								<select id="txt-municipio_residencia" class="custom-select">
									<option selected>Tegucigalpa M.D.C</option>
									<option value="2">San Pedro Sula</option>
									<option value="3">La Ceiba</option>
								</select>
							</div>
							<fieldset class="form-group">
							    <div class="row">
							      <legend class="col-form-label col-sm-2 pt-0">Genero</legend>
							      <div class="col-sm-10">
							        <div class="form-check">
							          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked>
							          <label class="form-check-label" for="gridRadios1">
							            Masculino
							          </label>
							        </div>
							        <div class="form-check">
							          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
							          <label class="form-check-label" for="gridRadios2">
							            Femenino
							          </label>
							        </div>
							      </div>
							    </div>
							  </fieldset>
							  <fieldset class="form-group">
							    <div class="row">
							      <legend class="col-form-label col-sm-2 pt-0">Estado Civil</legend>
							      <div class="col-sm-10">
							        <div class="form-check">
							          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked>
							          <label class="form-check-label" for="gridRadios1">
							            Casado(a)
							          </label>
							        </div>
							        <div class="form-check">
							          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
							          <label class="form-check-label" for="gridRadios2">
							            Soltero(a)
							          </label>
							        </div>
							        <div class="form-check">
							          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
							          <label class="form-check-label" for="gridRadios2">
							            Union Libre
							          </label>
							        </div>
							      </div>
							    </div>
							  </fieldset>
							<div class="form-group">
								<label for="txt-direccion">Direccion</label>
								<input type="text" class="form-control" id="txt-direccion" placeholder="Escriba la direccion">
							</div>
							<div class="form-group">
								<label for="txt-telefono">Telefono</label>
								<input type="tel" class="form-control" id="txt-telefono" placeholder="Escriba el numero de telefono">
							</div>
							<div class="form-group">
								<label for="txt-correo">Correo</label>
								<input type="email" class="form-control" id="txt-correo" placeholder="Escriba el numero de telefono">
							</div>

								<button type="button" class="btn btn-primary">Continuar</button>
						 </div>
						  <div class="tab-pane" id="profile" role="tabpanel">
						  		<div class="form-group">
									<label for="txt-numeroEmpleado">Numero de Empleado</label>
									<input type="text" class="form-control" id="txt-numeroEmpleado" placeholder="Escriba el numero de Empleado">
								</div>
								<div class="form-group">
									<label for="txt-campus">Cargo</label>
									<select id="txt-campus" class="custom-select">
									  <option selected>Seleccione un Cargo</option>
									  <option value="1">Docente</option>
									  <option value="2">Jefe de Carrera</option>
									  <option value="3">Coordinador de Carrera</option>
									  <option value="4">Decano</option>
									</select>
								</div>
								<div class="form-group">
									<label for="txt-carreras">Tipo de Empleado</label>
									<select id="txt-carreras" class="custom-select">
									  <option selected>Seleccione el tipo de empleado</option>
									  <option value="1">.....</option>
									  <option value="2">......</option>
									  <option value="3">......</option>
									</select>
								</div>
								<div class="form-group">
									<label for="txt-salario">Salario</label>
									<input type="text" class="form-control" id="txt-salario" placeholder="Escriba el salario base">
								</div>
						  </div>
						  <div class="tab-pane" id="docente" role="tabpanel">
						  	<h4>Titularidad</h4><hr>
						  	<div class="form-group">
						  		<label for="txt-nombreTitularidad">Nombre de Titularidad</label>
						  		<select id="txt-nombreTitularidad" class="custom-select">
									  <option selected>Seleccione una Titularidad</option>
									  <option value="1">Licenciatura en Ingenieria en Sistemas</option>
									  <option value="2">Licenciatura en pedagogia</option>
									  <option value="3">Licenciatura en Lenguas Extranjeras</option>
									</select>
						  	</div>
						  	<h4>Especialidades</h4><hr>
						  	<div class="form-group">
						  		<label for="txt-nombreEspecialidad">Nombre de Especialidad</label>
						  		<select id="txt-nombreEspecialidad" class="custom-select">
									  <option selected>Seleccione una Especialidad</option>
									  <option value="1">Maestria en Gestion de Proyectos</option>
								</select>
						  	</div>
						  	<h4>Area</h4><hr>
						  	<div class="form-group">
						  		<label for="txt-nombreArea">Nombre de la Area</label>
						  		<select id="txt-nombreArea" class="custom-select">
									  <option selected>Seleccione una Area</option>
									  <option value="1">Area 1</option>
								</select>
						  	</div>
						  </div>

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