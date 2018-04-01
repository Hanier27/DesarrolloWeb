<!DOCTYPE html>
<html>
<head>
	<title>Inicio sesión de Empleado</title>
	<?php  require 'web/link.php'; ?>
</head>
<body>
	
	<?php include 'web/navbar.php';  ?>
	
	<nav aria-label="breadcrumb">
	  <ol class="breadcrumb">
	    <li class="breadcrumb-item"><a href="index.php">Inicio</a></li>
	    <li class="breadcrumb-item active" aria-current="page">Inicio de Seccion</li>
	  </ol>
	</nav>

	<div class="container">
		<div class="col-md-12">
			<div class="row justify-content-center">
				<div class="login col-md-6">
					<form>
						<div class="form-group row">
						    <label for="inputEmail3" class="col-sm-3 col-form-label">Empleado</label>
						    <div class="col-sm-9">
						      <input type="email" class="form-control" id="inputEmail3" placeholder="Numero de Empleado">
						    </div>
						  </div>
						  <div class="form-group row">
						    <label for="inputPassword3" class="col-sm-3 col-form-label">Contraseña</label>
						    <div class="col-sm-9">
						      <input type="password" class="form-control" id="inputPassword3" placeholder="Contraseña">
						    </div>
						  </div>
						  <div class="form-group row text-center">
						    <div class="col-sm-12">
						      <a id="btn-login" type="button" href="matricula.html" class="btn btn-primary">Iniciar sesión</a>
						    </div>
						  </div>
					</form>
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
				  <h4 class="alert-heading ">Importante!</h4>
  					<p>Si tiene problemas para ingresar al sistema, favor comunicarse al Tel: 2232-6862.</p>
 					<hr>
 					<p>Para una mejor experiencia de navegación utilice los navegadores Internet Explorer o Google-Chrome</p>
				  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
				    <span aria-hidden="true">&times;</span>
				  </button>
				</div>
			</div>
		</div>
	</div>

	<?php include 'web/footer.php';  ?>
</body>
</html>