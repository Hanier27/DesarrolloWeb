<!DOCTYPE html>
<html>
<head>
	<title>Menu Principal</title>
	<?php require 'web/link.php';  ?>
</head>
<body>

<div  style="width: 100%;background-image: url(http://confidencialhn.com/wp-content/uploads/2017/06/UNAH.jpg); background-size: cover; background-position: center;">
<div  style="background-color: rgba(0,0,0,0.8); width: 100%">
	<div class="container-fluid">
		<div class="row">
			<div class="col-12 col-md-2 col-lg-2 d-flex justify-content-start" style="margin-top: 20px;">
				<ul class="nav " id="MenuBar">
					<li class="nav-item">
		    			<a id="menu-bar" class="nav-link d-flex " data-toggle="pill" href="#"><img src="img/menu.png" class="rounded-circle" width="50px"></a>
					</li>
				</ul>
			</div>
			<!-- Nav pills -->
			<div class="col-12 col-md-8 col-lg-8 d-flex justify-content-center" style="margin-top: 20px; color: white; text-align: center;">
				<ul class="nav nav-pills" id="SubMenu">
					<li class="nav-item">
					    <a class="nav-link" data-toggle="pill" href="#historial"><img src="img/historial.png" class="rounded-circle" width="50px"></a>
					</li>
					<li class="nav-item">
					    <a class="nav-link" data-toggle="pill" href="#solicitudes"><img src="img/solicitudes.png" class="rounded-circle" width="50px"></a>
					</li>
					<li class="nav-item">
					    <a class="nav-link" data-toggle="pill" href="#matricula"><img src="img/matricula.jpg" class="rounded-circle" width="50px"></a>
					</li>
					<li class="nav-item">
					    <a class="nav-link active" data-toggle="pill" href="#menu"><img src="img/home.ico" class="rounded-circle" width="50px"></a>
					</li>
					<li class="nav-item">
					    <a class="nav-link" data-toggle="pill" href="#censo"><img src="img/censo.png" class="rounded-circle" width="50px"></a>
					</li>
					<li class="nav-item">
					    <a class="nav-link" data-toggle="pill" href="#calificaciones"><img src="img/calificaciones.jpg" class="rounded-circle" width="50px"></a>
					</li>
					<li class="nav-item">
					    <a class="nav-link" data-toggle="pill" href="#programacion"><img src="img/programacion.png" class="rounded-circle" width="50px"></a>
					</li>	
				</ul>
			</div>
			<div class="col-12 col-md-2 col-lg-2 d-flex justify-content-start" style="margin-top: 20px;">
				<ul class="nav " id="MenuBar">
					<li class="nav-item">
						<div class="dropdown show">
			    			<a id="dropdownMenuButton" class="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="img/user.png" class="rounded-circle" width="50px"></a>
			    			<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
							    <a class="dropdown-item" href="#"><i class="fa fa-user" style="color: red"></i> Perfil</a>
							    <a class="dropdown-item" href="#"><i class="fa fa-cogs" style="color: red"></i> Configuracion</a>
							    <a class="dropdown-item" href="index.php"><i class="fa fa-close" style="color: red"></i> Salir</a>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>	
	</div>
	<!-- Tab panes -->
	<div class="tab-content" style="padding-bottom: 40px;">
	  	<div class="tab-pane fade" id="historial">
	  		<div class="row" style="padding-top: 40px; margin-right: 20px;margin-left: 20px; background-color: white; margin-top: 20px; padding-bottom: 70px;">	
		  			<div class="col-md-12" >
						<div class="col-md-12">
							<h1 class="display-6 text-center" style="color: black;"><b>Historiales</b></h1>
				   			<hr style="border:1px solid #dae0e5;">
						</div>
					<div class="col-md-12">
						<div class="row">
							<div class="nav flex-column nav-pills col-md-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
								  <a class="nav-link active" id="v-pills-Iniciohistorial-tab" data-toggle="pill" href="#v-pills-Iniciohistorial" role="tab" aria-controls="v-pills-Iniciohistorial" aria-selected="true">Inicio</a>
								  <a class="nav-link " id="v-pills-historialacademico-tab" data-toggle="pill" href="#v-pills-historialacademico" role="tab" aria-controls="v-pills-historialacademico" aria-selected="true">Historial Academico</a>
								  <a class="nav-link" id="v-pills-equivalencias-tab" data-toggle="pill" href="#v-pills-equivalencias" role="tab" aria-controls="v-pills-equivalencias" aria-selected="false">Equivalencias</a>
							</div>
							<div class="tab-content col-md-10" id="v-pills-tabContent" style="padding-top: 20px;">
									  <div class="tab-pane fade show active" id="v-pills-Iniciohistorial" role="tabpanel" aria-labelledby="v-pills-Iniciohistorial-tab">
										  	<div class="row">
												<div class="col-4">
													<img src="https://civuunah.files.wordpress.com/2015/11/puma.png?w=640" width="200px" style="transform: scaleX(-1);">
												</div>
												<div class="col-8 d-flex justify-content-center" style="padding: 100px 20px;">
													<h1 style="color:black; font-family: 'Amatic SC', cursive; font-size: 50px;">UNAH es tu Casa</h1>
												</div>
											</div>
									  </div>
								    <div class="tab-pane fade" id="v-pills-historialacademico" role="tabpanel" aria-labelledby="v-pills-historialacademico-tab">
										<div class="row d-flex justify-content-center">
											<div id="profile-user" style="padding-bottom: 30px;" class="col-md-12">
												<div class="row ">
													<div class="col-4 col-md-4 col-lg-2">
													  	<img src="img/user.png" class="rounded-cicle" width="140px" alt="Responsive-img">
													</div>
													<div class="col-8 col-md-8 col-lg-10">
													  	<div class="row ">
														  	<div class="col-md-12 col-lg-6">
														  		<h5>Cuenta: 20131004389</h5>
														  		<h5>Nombre: Hanier Isaias Rodas</h5>
														  		<h5>Carrera: Ingenieria en Sistemas</h5>
														  	</div>
														  	<div class="col-md-12 col-lg-6">
														  		<h5>Centro: Cuidad Universitaria</h5>
														  		<h5>Indice Global: 90</h5>
														  		<h5>Indice Periodo: 99</h5>
														  	</div>
													  	</div>
													</div>
												</div>
											</div>
											<div class="col-md-12">
												<div class="table-responsive">
													<table id="example" class="table table-striped table-bordered" style="width:100%">
												        <thead>
														    <tr>
														        <th>Codigo</th>
														        <th>Asignatura</th>
														        <th>UV</th>
														        <th>Seccion</th>
														        <th>Año</th>
														        <th>Periodo</th>
														        <th>Calificacion</th>
														        <th>Observacion</th>
														    </tr>
														</thead>
														<tbody>
														    <tr>
														        <td>EG011</td>
														        <td>ESPANOL GENERAL</td>
														        <td>4</td>
														        <td>1400</td>
														        <td>2013</td>
														        <td>1</td>
														        <td>89</td>
														        <td>APR</td>
														    </tr>
														</tbody>
													</table>
												</div>
											</div>		
										</div>
								    </div>
								    <div class="tab-pane fade" id="v-pills-equivalencias" role="tabpanel" aria-labelledby="v-pills-equivalencias-tab">
								  		<div class="row d-flex justify-content-center">
											
										</div>
								    </div>
							</div>
						</div>
					</div>
				</div>
		  	</div>
	  	</div>
	  	<div class="tab-pane fade" id="solicitudes">
	  		<div class="row" style="padding-top: 40px; margin-right: 20px;margin-left: 20px; background-color: white; margin-top: 20px; padding-bottom: 70px;">	
		  			<div class="col-md-12" >
						<div class="col-md-12">
							<h1 class="display-6 text-center" style="color: black;"><b>Solicitudes</b></h1>
				   			<hr style="border:1px solid #dae0e5;">
						</div>
					<div class="col-md-12">
						<div class="row">
							<div class="nav flex-column nav-pills col-md-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
								  <a class="nav-link active" id="v-pills-Iniciosolicitud-tab" data-toggle="pill" href="#v-pills-Iniciosolicitud" role="tab" aria-controls="v-pills-Iniciosolicitud" aria-selected="true">Inicio</a>
								  <a class="nav-link " id="v-pills-cambioCarrera-tab" data-toggle="pill" href="#v-pills-cambioCarrera" role="tab" aria-controls="v-pills-cambioCarrera" aria-selected="true">Cambio de Carrera</a>
								  <a class="nav-link" id="v-pills-cambioUniversidad-tab" data-toggle="pill" href="#v-pills-cambioUniversidad" role="tab" aria-controls="v-pills-cambioUniversidad" aria-selected="false">Cambio de Universidad</a>
							</div>
							<div class="tab-content col-md-10" id="v-pills-tabContent" style="padding-top: 20px;">
									  <div class="tab-pane fade show active" id="v-pills-Iniciosolicitud" role="tabpanel" aria-labelledby="v-pills-Iniciosolicitud-tab">
										  	<div class="row">
												<div class="col-4">
													<img src="https://civuunah.files.wordpress.com/2015/11/puma.png?w=640" width="200px" style="transform: scaleX(-1);">
												</div>
												<div class="col-8 d-flex justify-content-center" style="padding: 100px 20px;">
													<h1 style="color:black; font-family: 'Amatic SC', cursive; font-size: 50px;">UNAH es tu Casa</h1>
												</div>
											</div>
									  </div>
								    <div class="tab-pane fade" id="v-pills-cambioCarrera" role="tabpanel" aria-labelledby="v-pills-cambioCarrera-tab">
										<div class="row d-flex justify-content-center">
											<div class="col-12 col-md-8 col-lg-6" style="padding-top: 20px;">
												<form>
													<div class="form-group">
													    <textarea type="text" class="form-control" id="txt-motivoCambioCarrera" placeholder="Describa el motivo por el que desea realizar el cambio de carrera"></textarea>
													</div>
													<div class="form-group">
													    <select class="form-control" id="select-carreras">
													      <option>Seleccione la Carrera</option>
													      <option>Ingenieria Civil</option>
													      <option>Ingenieria Mecanica</option>
													      <option>Licenciatura en Matematicas</option>
													      <option>Lic. Pedagogia</option>
													    </select>
													</div>
													<div class="form-group d-flex justify-content-center">
														<div class="col-md-4 ">
															<button class="btn btn-success">Enviar Solicitud</button>
														</div>
													</div>
												</form>
											</div>
										</div>
								    </div>
								    <div class="tab-pane fade" id="v-pills-cambioUniversidad" role="tabpanel" aria-labelledby="v-pills-cambioUniversidad-tab">
								  		<div class="row d-flex justify-content-center">
											<div class="col-12 col-md-8 col-lg-6" style="padding-top: 20px;">
												<form>
													<div class="form-group">
													    <textarea type="text" class="form-control" id="txt-motivoCambioUniversidad" placeholder="Describa el motivo por el que desea realizar el cambio de universidad"></textarea>
													</div>
													<div class="form-group">
													    <select class="form-control" id="select-universidad">
													      <option>Seleccione la Universidad</option>
													      <option>UNAH-CURLA</option>
													      <option>UNAH-VS</option>
													    </select>
													</div>
													<div class="form-group d-flex justify-content-center">
														<div class="col-md-4 ">
															<button class="btn btn-success">Enviar Solicitud</button>
														</div>
													</div>
												</form>
											</div>
										</div>
								    </div>
							</div>
						</div>
					</div>
				</div>
		  	</div>
	  	</div>
	  	<div class="tab-pane fade" id="matricula">
		  	<div class="row"  style="padding-top: 40px; margin-right: 20px;margin-left: 20px; background-color: white; margin-top: 20px; padding-bottom: 70px;">	
		  		<div class="col-md-12" >
		  			<div class="col-md-12">
						<div class="col-md-12">
							<h1 class="display-6 text-center" style="color: black;"><b>Matricula</b></h1>
				   			<hr style="border:1px solid #dae0e5;">
						</div>
						<div class="col-md-12">
							<div class="row">
								<div class="nav flex-column nav-pills col-md-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
									  <a class="nav-link active" id="v-pills-matricula-tab" data-toggle="pill" href="#v-pills-matricula" role="tab" aria-controls="v-pills-matricula" aria-selected="true">Inicio</a>
									  <a class="nav-link " id="v-pills-addAsignatura-tab" data-toggle="pill" href="#v-pills-addAsignatura" role="tab" aria-controls="v-pills-addAsignatura" aria-selected="true">Adicionar Asignatura</a>
									  <a class="nav-link" id="v-pills-forma003-tab" data-toggle="pill" href="#v-pills-forma003" role="tab" aria-controls="v-pills-forma003" aria-selected="false">Forma 003</a>
									  <a class="nav-link" id="v-pills-listaEspera-tab" data-toggle="pill" href="#v-pills-listaEspera" role="tab" aria-controls="v-pills-listaEspera" aria-selected="false">Lista de Espera</a>
									  <a class="nav-link" id="v-pills-Cuenta-tab" data-toggle="pill" href="#v-pills-Cuenta" role="tab" aria-controls="v-pills-Cuenta" aria-selected="false">Estado de cuenta</a>
								</div>
								<div class="tab-content col-md-10" id="v-pills-tabContent" style="padding-top: 30px;">
									  <div class="tab-pane fade show active" id="v-pills-matricula" role="tabpanel" aria-labelledby="v-pills-matricula-tab">
									  	<div class="row">
												<div class="col-4">
													<img src="https://civuunah.files.wordpress.com/2015/11/puma.png?w=640" width="200px" style="transform: scaleX(-1);">
												</div>
												<div class="col-8 d-flex justify-content-center" style="padding: 100px 20px;">
													<h1 style="color:black; font-family: 'Amatic SC', cursive; font-size: 50px;">UNAH es tu Casa</h1>
												</div>
											</div>
									  </div>
									  <div class="tab-pane fade" id="v-pills-addAsignatura" role="tabpanel" aria-labelledby="v-pills-addAsignatura-tab">
											<div class="row d-flex justify-content-center">
												<div class="col-12 d-flex justify-content-center">
													<button class="btn btn-success" data-toggle="modal" data-target=".bd-example-modal-lg">Agregar Asignatura</button> 
												</div>
												<div class="col-12" style="padding-top: 30px;">
													<div class="table-responsive">
														<table id="example" class="table table-striped table-bordered" style="width:100%">
													        <thead style="color: white;">
													        	<tr align="center" class="bg-primary">
													        		<th colspan="11">Asignaturas Matriculadas</th>
													        	</tr>
															    <tr align="center" class="bg-primary">
															        <th>Codigo</th>
															        <th>Asignatura</th>
															        <th>Seccion</th>  
															        <th>HI</th>
															        <th>HF</th>
															        <th>Dias</th>
															        <th>Edificio</th>
															        <th>Aula</th>
															        <th>UV</th>
															        <th>Periodo</th>
															        <th>Cancelar</th>
															    </tr>
															</thead>
															<tbody align="center">
															    <tr>
															        <td>EG011</td>
															        <td>ESPANOL GENERAL</td>
															        <td>1400</td>
															        <td>1400</td>
															        <td>1500</td>
															        <td>LuMaMiJu</td>
															        <td>D1</td>
															        <td>101</td>
															        <td>4</td>
															        <td>1</td>
															        <td><button class="btn btn-danger">Eliminar</button></td>
															    </tr>
															</tbody>
														</table>
													</div>
													<div class="table-responsive">
														<table id="example" class="table table-striped table-bordered" style="width:100%">
													        <thead style="color: white;">
													        	<tr align="center" class="bg-primary">
													        		<th colspan="11">Laboratorios Matriculados</th>
													        	</tr>
															    <tr align="center" class="bg-primary">
															        <th>Codigo</th>
															        <th>Laboratorio</th>
															        <th>Seccion</th>  
															        <th>HI</th>
															        <th>HF</th>
															        <th>Dias</th>
															        <th>Edificio</th>
															        <th>Aula</th>
															        <th>Periodo</th>
															        <th>Cancelar</th>
															    </tr>
															</thead>
															<tbody align="center">
															    <tr>
															        <td>EG011</td>
															        <td>ESPANOL GENERAL</td>
															        <td>1400</td>
															        <td>1400</td>
															        <td>1500</td>
															        <td>LuMaMiJu</td>
															        <td>D1</td>
															        <td>101</td>
															        <td>1</td>
															        <td><button class="btn btn-danger">Eliminar</button></td>
															    </tr>
															</tbody>
														</table>
													</div>
													<div class="table-responsive">
														<table id="example" class="table table-striped table-bordered" style="width:100%">
													        <thead style="color: white;">
													        	<tr align="center" class="bg-primary">
													        		<th colspan="11">Asignaturas en Espera</th>
													        	</tr>
															    <tr align="center" class="bg-primary">
															        <th>Codigo</th>
															        <th>Asignatura</th>
															        <th>Dias</th>
															        <th>UV</th>
															        <th>Periodo</th>
															        <th>Cancelar</th>
															    </tr>
															</thead>
															<tbody align="center">
															    <tr>
															        <td>EG011</td>
															        <td>ESPANOL GENERAL</td>
															        <td>LuMaMiJu</td>
															        <td>4</td>
															        <td>1</td>
															        <td><button class="btn btn-danger">Eliminar</button></td>
															    </tr>
															</tbody>
														</table>
													</div>
												</div>
											</div>
									  </div>
									  <div class="tab-pane fade" id="v-pills-forma003" role="tabpanel" aria-labelledby="v-pills-forma003-tab">
									  	<div id="profile-user" style="padding-bottom: 30px;">
									  		<div class="row d-flex justify-content-center">
									  			<div class="col-4 col-md-4 col-lg-2">
									  				<img src="img/user.png" class="rounded-cicle" width="140px">
									  			</div>
									  			<div class="col-8 col-md-8 col-lg-10">
									  				<div class="row ">
										  				<div class="col-md-12 col-lg-6">
										  					<h5>Cuenta: 20131004389</h5>
										  					<h5>Nombre: Hanier Isaias Rodas</h5>
										  					<h5>Carrera: Ingenieria en Sistemas</h5>
										  				</div>
										  				<div class="col-md-12 col-lg-6 ">
										  					<h5>Centro: Cuidad Universitaria</h5>
										  					<h5>Año: 2018</h5>
										  				</div>
									  				</div>
									  			</div>
									  		</div>
									  	</div>
									  	<div class="table-responsive">
											<table id="example" class="table table-striped table-bordered" style="width:100%">
										        <thead style="color: white;">
										        	<tr align="center" class="bg-primary">
										        		<th colspan="11">Asignaturas Matriculadas</th>
										        	</tr>
												    <tr align="center" class="bg-primary">
												        <th>Codigo</th>
												        <th>Asignatura</th>
												        <th>Seccion</th>  
												        <th>HI</th>
												        <th>HF</th>
												        <th>Dias</th>
												        <th>Edificio</th>
												        <th>Aula</th>
												        <th>UV</th>
												        <th>Periodo</th>
												        <th>OBS</th>
												    </tr>
												</thead>
												<tbody align="center">
												    <tr>
												        <td>EG011</td>
												        <td>ESPANOL GENERAL</td>
												        <td>1400</td>
												        <td>1400</td>
												        <td>1500</td>
												        <td>LuMaMiJu</td>
												        <td>D1</td>
												        <td>101</td>
												        <td>4</td>
												        <td>1</td>
												        <td></td>
												    </tr>
												</tbody>
											</table>
										</div>
										<div class="table-responsive">
											<table id="example" class="table table-striped table-bordered" style="width:100%">
										        <thead style="color: white;">
										        	<tr align="center" class="bg-primary">
										        		<th colspan="11">Laboratorios Matriculados</th>
										        	</tr>
												    <tr align="center" class="bg-primary">
												        <th>Codigo</th>
												        <th>Laboratorio</th>
												        <th>Seccion</th>  
												        <th>HI</th>
												        <th>HF</th>
												        <th>Dias</th>
												        <th>Edificio</th>
												        <th>Aula</th>
												        <th>Periodo</th>
												        <th>OBS</th>
												    </tr>
												</thead>
												<tbody align="center">
												    <tr>
												        <td>EG011</td>
												        <td>ESPANOL GENERAL</td>
												        <td>1400</td>
												        <td>1400</td>
												        <td>1500</td>
												        <td>LuMaMiJu</td>
												        <td>D1</td>
												        <td>101</td>
												        <td>1</td>
												        <td></td>
												    </tr>
												</tbody>
											</table>
										</div>
									  </div>
									  <div class="tab-pane fade" id="v-pills-listaEspera" role="tabpanel" aria-labelledby="v-pills-listaEspera-tab">
									  		<div class="table-responsive">
												<table id="example" class="table table-striped table-bordered" style="width:100%">
											        <thead style="color: white;">
											        	<tr align="center" class="bg-primary">
											        		<th colspan="11">Asignaturas en Espera</th>
											        	</tr>
													    <tr align="center" class="bg-primary">
													        <th>Codigo</th>
													        <th>Asignatura</th>
													        <th>Dias</th>
													        <th>UV</th>
													        <th>Periodo</th>
													        <th>Cancelar</th>
													    </tr>
													</thead>
													<tbody align="center">
													    <tr>
													        <td>EG011</td>
													        <td>ESPANOL GENERAL</td>
													        <td>LuMaMiJu</td>
													        <td>4</td>
													        <td>1</td>
													        <td><button class="btn btn-danger">Eliminar</button></td>
													    </tr>
													</tbody>
												</table>
											</div>
									  </div>
									  <div class="tab-pane fade" id="v-pills-Cuenta" role="tabpanel" aria-labelledby="v-pills-Cuenta-tab">
									  	<div class="d-flex justify-content-center">
											<div class="table-responsive col-md-6 ">
												<table id="example" class="table table-striped table-bordered" style="width:100%">
											        <thead style="color: white;">
											        	<tr align="center" class="bg-warning">
											        		<th colspan="11">Cargos Pendientes</th>
											        	</tr>
													    <tr align="center" class="bg-warning">
													        <th>Cargo</th>
													        <th>Monto</th>
													    </tr>
													</thead>
													<tbody align="center">
													    <tr>
													        <td>Matricula</td>
													        <td>L.270</td>
													    </tr>
													</tbody>
												</table>
											</div>
										</div>
									  </div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	  	</div>
	  	<div class="tab-pane fade show active" id="menu">
	  		
	  		<div class="col-md-12 " style="padding-top: 40px;">
					<div class="row ">
						<div class="col-12 col-md-6 col-lg-4">
							<img src="https://civuunah.files.wordpress.com/2015/11/puma.png?w=640" width="400px" style="transform: scaleX(-1);">
						</div>
						<div class="col-12 col-md-6 col-lg-8 d-flex justify-content-center text-center" style="padding: 70px 20px">
							<h1 style="color: white;">Bienvenido Puma al Sistema de Matricula</h1>
						</div>
					</div>
			</div>
	  	</div>
	  	<div class="tab-pane fade" id="censo">
	  		<div class="row"  style="padding-top: 40px; margin-right: 20px;margin-left: 20px; background-color: white; margin-top: 20px; padding-bottom: 70px;">	
		  		<div class="col-md-12" >
		  			<div class="col-md-12">
						<div class="col-md-12">
							<h1 class="display-6 text-center" style="color: black;"><b>Censo de Matricula</b></h1>
				   			<hr style="border:1px solid #dae0e5;">
						</div>
						<div class="col-md-12">
							<div class="row">
								<div class="col-md-12">
									<div class="table-responsive">
										<table id="example" class="table table-striped table-bordered" style="width:100%">
											<thead align="center">
												<tr>
													<th colspan="7">Programacion del año 2018</th>
												</tr>
												<tr>
													<th>Codigo</th>
													<th>Asignatura</th>
													<th>Dias</th>
													<th>Seccion</th>
													<th>HI</th>
													<th>HF</th>
													<th>Solicitados</th>
												</tr>
											</thead>
											<tbody align="center">
												<tr>
													<td>EG011</td>
													<td>ESPANOL GENERAL</td>
													<td>LuMaMiJu</td>
													<td>1300</td>
													<td>1300</td>
													<td>1400</td>
													<td>20</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-12">
							<div class="row">
								<div class="col-md-12 d-flex justify-content-center">
									<button class="btn btn-primary">Nueva Seccion</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	  	</div>
	  	<div class="tab-pane fade" id="calificaciones">
	  		<div class="row"  style="padding-top: 40px; margin-right: 20px;margin-left: 20px; background-color: white; margin-top: 20px; padding-bottom: 70px;">	
		  		<div class="col-md-12" >
		  			<div class="col-md-12">
						<div class="col-md-12">
							<h1 class="display-6 text-center" style="color: black;"><b>Calificaciones del Periodo</b></h1>
				   			<hr style="border:1px solid #dae0e5;">
						</div>
						<div class="col-md-12">
							<div class="row">
								<div class="col-md-12">
									<div class="table-responsive">
										<table id="example" class="table table-striped table-bordered" style="width:100%">
											<thead align="center">
												<tr>
													<th colspan="4">Calificaciones</th>
												</tr>
												<tr>
													<th>Codigo</th>
													<th>Asignatura</th>
													<th>Docente</th>
													<th>Evaluacion</th>
												</tr>
											</thead>
											<tbody align="center">
												<tr>
													<td>EG011</td>
													<td>ESPANOL GENERAL</td>
													<td>Maria Jimenez</td>
													<td><button class="btn btn-success">Evaluar</button></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	  	</div>
	  	<div class="tab-pane fade" id="programacion">
	  		<div class="row"  style="padding-top: 40px; margin-right: 20px;margin-left: 20px; background-color: white; margin-top: 20px; padding-bottom: 70px;">	
		  		<div class="col-md-12" >
		  			<div class="col-md-12">
						<div class="col-md-12">
							<h1 class="display-6 text-center" style="color: black;"><b>Programacion Academica</b></h1>
				   			<hr style="border:1px solid #dae0e5;">
						</div>
						<div class="col-md-12">
							<div class="row">
								<div class="col-md-12">
									<div class="table-responsive">
										<table id="example" class="table table-striped table-bordered" style="width:100%">
											<thead align="center">
												<tr>
													<th colspan="6">Programacion del año 2018</th>
												</tr>
												<tr>
													<th>Codigo</th>
													<th>Asignatura</th>
													<th>Dias</th>
													<th>Seccion</th>
													<th>HI</th>
													<th>HF</th>
												</tr>
											</thead>
											<tbody align="center">
												<tr>
													<td>EG011</td>
													<td>ESPANOL GENERAL</td>
													<td>LuMaMiJu</td>
													<td>1300</td>
													<td>1300</td>
													<td>1400</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	  	</div>
	</div>
</div>	
</div>	
	
	<?php include 'web/modal.php'; ?>
	<?php include 'web/footer.php';  ?>
	<script type="text/javascript" src="js/controladorMatricula.js"></script>
</body>
</html>