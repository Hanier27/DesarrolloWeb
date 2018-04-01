<!DOCTYPE html>
<html>
<head>
	<title>Registrar Aula</title>
	<?php require 'web/link.php';  ?>
</head>
<body>
	<?php include 'web/navbar.php';  ?>

	<nav aria-label="breadcrumb">
	  <ol class="breadcrumb">
	    <li class="breadcrumb-item"><a href="index.php">Inicio</a></li>
	    <li class="breadcrumb-item"><a href="seapi.php">SEAPI</a></li>
	    <li class="breadcrumb-item active" aria-current="page">Aula</li>
	  </ol>
	</nav>

	<div class="container-fluid">
		<div class="col-md-12">
		  	  <h1 class="display-6 text-center"><b>Registrar Aula</b></h1>
		  	  <hr style="border:1px solid #dae0e5;">
			<div class="row justify-content-md-center main_regEmpleado">
				<div id="reg_Estudiante" class="col-md-6 ">
					<form>
						  	<div class="form-group">
								<label for="txt-numeroAula">Numero de la aula</label>
								<input type="text" class="form-control" id="txt-numeroAula" placeholder="Escriba el numero">
							</div>
							<div class="form-group">
								<label for="txt-tipoAula">Tipo de Aula</label>
								<select id="txt-tipoAula" class="custom-select" >
									<option selected>Seleccione el tipo de aula</option>
									<option value="1">Laboratorio</option>
									<option value="2">AudioVisual</option>
									<option value="3">Normal</option>
								</select>
							</div>
							<div class="form-group">
								<label for="txt-edificio">Edificio</label>
								<select id="txt-edificio" class="custom-select" >
									<option selected>Seleccione el Edificio</option>
									<option value="1">B2</option>
									<option value="2">F1</option>
									<option value="3">D1</option>
								</select>
							</div>
							
							<div style="text-align: center;">
								<button type="button" class="btn btn-primary">Registrar Aula</button>
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