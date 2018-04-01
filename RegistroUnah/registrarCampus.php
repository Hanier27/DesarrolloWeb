<!DOCTYPE html>
<html>
<head>
	<title>Registrar Campus</title>
	<?php require 'web/link.php';  ?>
</head>
<body>
	<?php include 'web/navbar.php';  ?>
	<nav aria-label="breadcrumb">
	  <ol class="breadcrumb">
	    <li class="breadcrumb-item"><a href="index.php">Inicio</a></li>
	    <li class="breadcrumb-item"><a href="seapi.php">SEAPI</a></li>
	    <li class="breadcrumb-item active" aria-current="page">Campus</li>
	  </ol>
	</nav>

	<div class="container-fluid">
		<div class="col-md-12">
		  	  <h1 class="display-6 text-center"><b>Registrar Campus</b></h1>
		  	  <hr style="border:1px solid #dae0e5;">
			<div class="row justify-content-md-center main_regEmpleado">
				<div id="reg_Estudiante" class="col-md-6 ">
					<form>
						  	<div class="form-group">
								<label for="txt-campus">Nombre del Campus</label>
								<input type="text" class="form-control" id="txt-campus" placeholder="Escriba el nombre">
							</div>
							<div class="form-group">
								<label for="txt-cantEdificios">Cantidad de Edificios</label>
								<input type="text" class="form-control" id="txt-cantEdificios" placeholder="Escriba la Cantidad de Edificios">
							</div>
							
							<div style="text-align: center;">
								<button type="button" class="btn btn-primary">Registrar Campus</button>
							</div>
						 
						<!--<button type="submit" class="btn btn-primary">Submit</button>-->
					</form>
				</div>
			</div>
		</div>
	</div>

	<div class="footer">
		<div  class="container">
			<div id="piePagina" class="col-md-12">
				<div class="row">
					<div id="title" class="col-xl-6">
						<h6 class="text-left text-uppercase">Universidad Nacional Autonoma de Honduras</h6>
					</div>
				</div>
				<hr style="border-color: white;">
				<div  class="row">
					<div id="logo" class="col-12 col-sm-4 col-md-7 col-lg-8 col-xl-9">
						<img src="img/logo-unah-blanco.png" class="img-fluid">	
					</div>
					<div id="contacts" class="col-12 col-sm-8 col-md-5 col-lg-4 col-xl-3">
						<div class="col-xl-12 ">
								<a href="" >
									<img src="img/logo face redondo.png" class="img-fluid" alt="Resposive image">
									
								</a>Registro DIIP-UNAH
						</div>	
						<div class="col-xl-12">
								<img src="img/ICONO TELEFONO.png" class="img-fluid" alt="Resposive image">
								2232-6862/2232-5496
						</div>	
					</div>
					
				</div>
				<div style="padding-top: 20px;" class="row">
					<div class="col-xl-12">
						<h6 class="text-center">Derechos reservados Universidad Nacional Autónoma de Honduras 2017</h6>
					</div>
					<div class="col-xl-12">
						<h6 class="text-center">Desarrollado por Hanier Rodas</h6>
					</div>
				</div>
			</div>
		</div>
	</div>

</body>
</html>