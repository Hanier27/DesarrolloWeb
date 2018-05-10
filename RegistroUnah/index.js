var express= require('express');
var mysql=require('mysql');
var bodyParser=require('body-parser');
var app = express();

var router_dipp=require('./Server/router_dipp.js');
var router_ga=require('./Server/router_gestionAcademica.js');
var router_seapi=require('./Server/router_seapi.js');
var router_jefesDepartemento=require('./Server/router_jefeDepartamento');
var router_matricula=require('./Server/router_matricula');
var router_docente=require('./Server/router_docentes');
const session = require('express-session');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(session({
	secret:'jsaja929218#$9991?¿2',
	resave: false,
  	saveUninitialized: true,
}));

app.set("view engine","jade");
app.use(express.static(__dirname+'/public'));

var servidor = {
    host: 'localhost', 
 	user: 'root',  
 	password: '', 
 	database: 'registro_unah',
    port:"3306"
};

app.get("/",function(req,res){
    res.render("index");
});


app.get('/login_estudiantes', function(req,res){
	res.render("loginEstudiantes");
});

app.get('/login_empleados', function(req,res){
    res.render("loginEmpleados");
});

/*-----------------JEFE DE DEPARTAMENTO-------------------*/
app.post('/loginDepartamento', function(req,res){
	var conexion=mysql.createConnection(servidor);
	conexion.query(
		"SELECT e.numero_empleado, e.password,c.nombre_cargo,e.codigo_empleado "+
		"FROM tbl_empleados e "+
		"INNER JOIN tbl_cargos c "+ 
		"ON c.codigo_cargo=e.codigo_cargo "+
		"WHERE c.nombre_cargo='Jefe de Carrera' "+
		"AND e.numero_empleado=? "+
		"AND e.password=?",
		[
			req.body.numero,
			req.body.clave,
		],
		function (error, data, fields){
		if(error) throw error;
		conexion.end();
		if(data.length!=0){
			req.session.jefeDepartamento=req.body.numero;
			req.session.jefeDepartamentoID=data[0].codigo_empleado;
		}
		res.send(data);	
	});
});

app.get('/Login_jefeDepartamento', function(req,res){
	res.render("loginEmpleados");
});

app.get('/jefeDepartamento', function(req,res){
	if(req.session.jefeDepartamento!=undefined){
		res.render("JefeDepartamento");
	}else{
		res.redirect('/Login_jefeDepartamento');
	}
});

app.get('/Estudiantes', function(req,res){
	if(req.session.jefeDepartamento!=undefined){
		res.render("Estudiantes_JD");
	}else{
		res.redirect('/Login_jefeDepartamento');
	}
});

app.get('/Docentes', function(req,res){
	if(req.session.jefeDepartamento!=undefined){
		res.render("Docentes_JD");
	}else{
		res.redirect('/Login_jefeDepartamento');
	}
});

app.get('/Secciones', function(req,res){
	if(req.session.jefeDepartamento!=undefined){
		res.render("Secciones_JD");
	}else{
		res.redirect('/Login_jefeDepartamento');
	}
});

app.get('/Asignaturas', function(req,res){
	if(req.session.jefeDepartamento!=undefined){
		res.render("Asignaturas_JD");
	}else{
		res.redirect('/Login_jefeDepartamento');
	}
});

app.use('/JD',router_jefesDepartemento);


/*-----------------Direccion Academica-------------------*/

app.post('/loginDireccionAcademica', function(req,res){
	var conexion=mysql.createConnection(servidor);
	conexion.query(
		"SELECT e.numero_empleado, e.password,c.nombre_cargo,e.codigo_empleado "+
		"FROM tbl_empleados e "+
		"INNER JOIN tbl_cargos c "+ 
		"ON c.codigo_cargo=e.codigo_cargo "+
		"WHERE c.nombre_cargo='Director de Direccion Academica' "+
		"AND e.numero_empleado=? "+
		"AND e.password=?",
		[
			req.body.numero,
			req.body.clave,
		],
		function (error, data, fields){
		if(error) throw error;
		conexion.end();
		if(data.length!=0){
			req.session.direccionAcademica=req.body.numero;
			req.session.direccionAcademicaID=data[0].codigo_empleado;
		}
		res.send(data);	
	});
});

app.get('/Login_DireccionAcademica', function(req,res){
	res.render("loginEmpleados");
});

app.get('/direccionAcademica', function(req,res){
	if(req.session.direccionAcademica!=undefined){
		res.render("direccionAcademica");
	}else{
		res.redirect("Login_DireccionAcademica");
	}
});

app.get('/crearFacultad', function(req,res){
	if(req.session.direccionAcademica!=undefined){
		res.render("registroFacultades");
	}else{
		res.redirect("Login_DireccionAcademica");
	}
});

app.get('/crearCarrera', function(req,res){
	if(req.session.direccionAcademica!=undefined){
		res.render("registroCarreras");
	}else{
		res.redirect("Login_DireccionAcademica");
	}
});

app.get('/crearAsignatura', function(req,res){
	if(req.session.direccionAcademica!=undefined){
		res.render("registroAsignaturas");
	}else{
		res.redirect("Login_DireccionAcademica");
	}
});

app.get('/crearPeriodo', function(req,res){
	if(req.session.direccionAcademica!=undefined){
		res.render("registroPeriodos");
	}else{
		res.redirect("Login_DireccionAcademica");
	}
});

app.get('/PlanDeEstudios', function(req,res){
	if(req.session.direccionAcademica!=undefined){
		res.render("planEstudios");
	}else{
		res.redirect("Login_DireccionAcademica");
	}
});
app.use('/GA',router_ga);

/*-----------------Dipp-------------------*/
app.post('/loginDIIP', function(req,res){
	var conexion=mysql.createConnection(servidor);
	conexion.query(
		"SELECT e.numero_empleado, e.password,c.nombre_cargo,e.codigo_empleado "+
		"FROM tbl_empleados e "+
		"INNER JOIN tbl_cargos c "+ 
		"ON c.codigo_cargo=e.codigo_cargo "+
		"WHERE c.nombre_cargo='Director de DiPP' "+
		"AND e.numero_empleado=? "+
		"AND e.password=?",
		[
			req.body.numero,
			req.body.clave,
		],
		function (error, data, fields){
		if(error) throw error;
		conexion.end();
		if(data.length!=0){
			req.session.diip=req.body.numero;
			req.session.diipID=data[0].codigo_empleado;
		}
		res.send(data);	
	});
});

app.get('/Login_DIIP', function(req,res){
	res.render("loginEmpleados");
});

app.get('/administracion', function(req,res){
	if(req.session.diip!=undefined){
		res.render("diip");
	}else{
		res.redirect("Login_DIIP");
	}
});

app.get('/reg_estudiante', function(req,res){
	if(req.session.diip!=undefined){
		res.render("registrarEstudiante");
	}else{
		res.redirect("Login_DIIP");
	}
});

app.get('/reg_empleado', function(req,res){
	if(req.session.diip!=undefined){
		res.render("registrarEmpleado");
	}else{
		res.redirect("Login_DIIP");
	}
});

app.use('/DP',router_dipp);

/*-----------------SEAPI-------------------*/
app.post('/loginSEAPI', function(req,res){
	var conexion=mysql.createConnection(servidor);
	conexion.query(
		"SELECT e.numero_empleado, e.password,c.nombre_cargo,e.codigo_empleado "+
		"FROM tbl_empleados e "+
		"INNER JOIN tbl_cargos c "+ 
		"ON c.codigo_cargo=e.codigo_cargo "+
		"WHERE c.nombre_cargo='Director de Seapi' "+
		"AND e.numero_empleado=? "+
		"AND e.password=?",
		[
			req.body.numero,
			req.body.clave,
		],
		function (error, data, fields){
		if(error) throw error;
		conexion.end();
		if(data.length!=0){
			req.session.seapi=req.body.numero;
			req.session.seapiID=data[0].codigo_empleado;
		}
		res.send(data);	
	});
});
app.get('/Login_Seapi', function(req,res){
	res.render("loginEmpleados");
});

app.get('/seapi', function(req,res){
	if(req.session.seapi!=undefined){
		res.render("seapi");
	}else{
		res.redirect("Login_Seapi");
	}
});

app.get('/registrarCampus', function(req,res){
	if(req.session.seapi!=undefined){
		res.render("registrarCampus");
	}else{
		res.redirect("Login_Seapi");
	}
});

app.get('/registrarEdificio', function(req,res){
	if(req.session.seapi!=undefined){
		res.render("registrarEdificio");
	}else{
		res.redirect("Login_Seapi");
	}
});

app.get('/registrarAula', function(req,res){
	if(req.session.seapi!=undefined){
		res.render("registrarAula");
	}else{
		res.redirect("Login_Seapi");
	}
});

app.use('/Seapi',router_seapi);

/*-----------------Matricula-------------------*/

app.get('/gestion_matricula', function(req,res){
	res.render("gestionMatricula");
});

app.use('/matricula',router_matricula);

/*-----------------Docentes-------------------*/
app.get('/docente', function(req,res){
    res.render("gestionDocentes");
});

app.use('/Docentes',router_docente);

/*-----------------Consultas-------------------*/

app.get('/departamentos',function(req,res){
	var conexion=mysql.createConnection(servidor);
	conexion.query('SELECT * FROM tbl_lugares where codigo_tipo_lugar=1',function (error, data, fields){
		if(error) throw error;
		conexion.end();
		res.send(data);
	});
});

app.get('/municipios',function(req,res){
	var conexion=mysql.createConnection(servidor);
	conexion.query('SELECT * FROM tbl_lugares where codigo_tipo_lugar=2',function (error, data, fields){
		if(error) throw error;
		conexion.end();
		res.send(data);
	});
});

app.get('/campus',function(req,res){
	var conexion=mysql.createConnection(servidor);
	conexion.query('SELECT * FROM tbl_campus',function (error, data, fields){
		if(error) throw error;
		conexion.end();
		res.send(data);
	});
});

app.get('/carreras',function(req,res){
	var conexion=mysql.createConnection(servidor);
	conexion.query('SELECT * FROM tbl_carreras',function (error, data, fields){
		if(error) throw error;
		conexion.end();
		res.send(data);
	});
});

app.get("/destruir",function(req,res){
	req.session.destroy(function(err) {
		res.redirect('/');
	  });
});


app.listen(3000,function(){
	console.log("Servidor arriba");
});