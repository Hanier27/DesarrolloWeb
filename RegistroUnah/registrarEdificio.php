<!DOCTYPE html>
<html>
<head>
	<title>Registrar Edificio</title>
	<?php require 'web/link.php';  ?>
</head>
<body>
	<?php include 'web/navbar.php';  ?>
	
	<nav aria-label="breadcrumb">
	  <ol class="breadcrumb">
	    <li class="breadcrumb-item"><a href="index.php">Inicio</a></li>
	    <li class="breadcrumb-item"><a href="seapi.php">SEAPI</a></li>
	    <li class="breadcrumb-item active" aria-current="page">Edificio</li>
	  </ol>
	</nav>

	<div class="container-fluid">
		<div class="col-md-12">
		  	  <h1 class="display-6 text-center"><b>Registrar Edificio</b></h1>
		  	  <hr style="border:1px solid #dae0e5;">
			<div class="row justify-content-md-center main_regEmpleado">
				<div id="reg_Estudiante" class="col-md-6 ">
					<form>
						  	<div class="form-group">
								<label for="txt-edificio">Nombre del Edificio</label>
								<input type="text" class="form-control" id="txt-edificio" placeholder="Escriba el nombre">
							</div>
							<div class="form-group">
								<label for="txt-cantAulas">Cantidad de Aulas</label>
								<input type="text" class="form-control" id="txt-cantAulas" placeholder="Escriba la Cantidad de Aulas">
							</div>
							<div class="form-group">
								<label for="txt-campus">Campus</label>
								<select id="txt-campus" class="custom-select">
									<option selected>Seleccione el campus</option>
									<option value="1">UNAH-CU</option>
									<option value="2">UNAH-VS</option>
									<option value="3">CURLA</option>
								</select>
							</div>
							
							<div style="text-align: center;">
								<button type="button" class="btn btn-primary">Registrar Edificio</button>
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