var express= require('express');
var mysql = require("mysql");
var bodyParser = require("body-parser");
var router= express.Router();

var servidor = {
    host: 'localhost', 
 	user: 'root',  
 	password: '', 
 	database: 'registro_unah',
    port:"3306"
};

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

router.get("/obtenerDatos",function(req,res){
	if(req.session.jefeDepartamento!=undefined){
		var conexion=mysql.createConnection(servidor);
		conexion.query(
			"SELECT c.nombre_carrera,cam.nombre_campus,t.numero_empleado,p.nombre,p.apellido "+
			"FROM tbl_empleados t "+
			"INNER JOIN tbl_maestros m "+
			"ON m.codigo_maestro=t.codigo_empleado "+
			"INNER JOIN tbl_personas p "+
			"ON p.codigo_persona=t.codigo_empleado "+
			"INNER JOIN tbl_carreras c "+
			"ON c.codigo_carrera=m.codigo_area "+
			"INNER JOIN tbl_campus cam "+
			"ON cam.codigo_campus=p.codigo_campus "+
			"WHERE t.numero_empleado=?",
			[req.session.jefeDepartamento],
			function(error,data){
				if(error) throw error;
				conexion.end();
				req.session.jefeDepartamentoCampus=data[0].nombre_campus;
				req.session.jefeDepartamentoCarrera=data[0].nombre_carrera;
				res.send(data);	
			}
		);
	}
})


router.get("/aulas",function(req,res){
	if(req.session.jefeDepartamento!=undefined){
		var conexion=mysql.createConnection(servidor);
		conexion.query(
			"SELECT a.nombre_aula,e.nombre_edificio,a.codigo_aula "+
			"FROM tbl_aulas a "+
			"INNER JOIN tbl_edificios e "+
			"ON e.codigo_edificio=a.codigo_edificio "+
			"INNER JOIN tbl_campus c "+
			"ON c.codigo_campus=e.codigo_campus "+
			"WHERE c.nombre_campus=?",
			[req.session.jefeDepartamentoCampus],
			function(error,data){
				if(error) throw error;
				conexion.end();
				res.send(data);
			});
	}
});

router.get("/periodos",function(req,res){
	if(req.session.jefeDepartamento!=undefined){
		var conexion=mysql.createConnection(servidor);
		conexion.query(
			"SELECT codigo_periodo,nombre_periodo,fecha_inicio,fecha_fin,codigo_tipo_periodo "+
			"FROM tbl_periodos "+
			"WHERE (sysdate() BETWEEN fecha_inicio AND fecha_fin)",
			function(error,data){
				if(error) throw error;
				conexion.end();
				res.send(data);
			});
	}
});

router.get("/asignaturas",function(req,res){
	if(req.session.jefeDepartamento!=undefined){
		var conexion=mysql.createConnection(servidor);
		var conexion2=mysql.createConnection(servidor);
		var asignaturas=[];
		var sql="SELECT a.codigo_asignatura,a.nombre_asignatura,a.codigo_alterno,a.dias,"+
				"a.cantidad_unidades_valorativas,c.nombre_carrera,ta.tipo_asignatura,c.codigo_carrera "+
				"FROM  tbl_asignaturas a "+
				"INNER JOIN tbl_carreras c "+
				"ON c.codigo_carrera=a.codigo_carrera "+
				"INNER JOIN tbl_tipo_asignatura ta "+
				"ON ta.codigo_tipo_asignatura=a.codigo_tipo_asignatura "+
				"WHERE c.nombre_carrera=?";
		conexion.query(sql,[req.session.jefeDepartamentoCarrera])
					.on('result',function(asignatura){
					asignatura.requisitos=[];
					asignaturas.push(asignatura);
					conexion.pause();
					conexion2.query("SELECT a.nombre_asignatura,a.codigo_alterno,a.cantidad_unidades_valorativas,a.dias,re.codigo_carrera "+
									"FROM tbl_requisitos re "+
									"INNER JOIN tbl_planes_de_estudios pl "+
									"ON pl.codigo_asignatura=re.codigo_asignatura "+
									"INNER JOIN tbl_asignaturas a "+
									"ON a.codigo_asignatura=re.codigo_asignatura_requisito "+
									"WHERE pl.codigo_carrera=? AND re.codigo_carrera=? AND re.codigo_asignatura=?",[asignatura.codigo_carrera,asignatura.codigo_carrera,asignatura.codigo_asignatura])
									.on('result',function(requisito){
									asignatura.requisitos.push(requisito);
									})
									.on('end',function(){
										conexion.resume();
									});
				})
			.on('end',function(){
					conexion.end();
					conexion2.end();
					res.send(asignaturas);
				});
	}
});

router.get("/estudiantes",function(req,res){
	if(req.session.jefeDepartamento!=undefined){
		var conexion=mysql.createConnection(servidor);
				conexion.query(
					"SELECT a.promedio,p.nombre,p.apellido,p.identidad,p.direccion,"+
					"p.correo_electronico,p.telefono,cam.nombre_campus,car.nombre_carrera,a.numero_cuenta "+
					"FROM tbl_alumnos a "+
					"INNER JOIN tbl_personas p "+ 
					"ON p.codigo_persona=a.codigo_alumno "+
					"INNER JOIN tbl_carreras_x_alumno ca "+
					"ON ca.codigo_alumno=a.codigo_alumno "+
					"INNER JOIN tbl_carreras car "+
					"ON car.codigo_carrera=ca.codigo_carrera "+
					"INNER JOIN tbl_campus cam "+
					"ON cam.codigo_campus=p.codigo_campus "+
					"WHERE cam.nombre_campus= ? "+
					"AND car.nombre_carrera= ? ",
					[
						req.session.jefeDepartamentoCampus,
						req.session.jefeDepartamentoCarrera,
					],
					function(errorSelect,informacion){
						if(errorSelect) throw errorSelect;
						conexion.end();
						res.send(informacion);
					});
	}
});

router.get("/docentes",function(req,res){
	if(req.session.jefeDepartamento!=undefined){
		var conexion=mysql.createConnection(servidor);
		
				conexion.query(
					"SELECT e.numero_empleado,p.nombre,p.apellido,p.telefono,p.correo_electronico,"+
					"p.identidad,t.nombre_titularidad,a.descripcion,cam.nombre_campus,t.salario_minimo,ca.nombre_carrera,e.codigo_empleado "+
					"FROM tbl_maestros m "+
					"INNER JOIN tbl_empleados e "+
					"ON e.codigo_empleado=m.codigo_maestro "+
					"INNER JOIN tbl_personas p "+
					"ON p.codigo_persona=e.codigo_empleado "+
					"INNER JOIN tbl_titularidad t "+
					"ON t.codigo_titularidad=m.codigo_titularidad "+
					"INNER JOIN tbl_area_especializaciones a "+
					"ON a.codigo_especializacion=m.codigo_especializacion "+
					"INNER JOIN tbl_campus cam "+
					"ON cam.codigo_campus=p.codigo_campus "+
					"INNER JOIN tbl_carreras ca "+
					"ON ca.codigo_carrera=m.codigo_area "+
					"WHERE ca.nombre_carrera=? AND cam.nombre_campus=? AND e.codigo_cargo=1",
					[
						req.session.jefeDepartamentoCarrera,
						req.session.jefeDepartamentoCampus,
					],
					function(errorSelect,informacion){
						if(errorSelect) throw errorSelect;
						conexion.end();
						res.send(informacion);
					});
	}
});

router.get("/secciones",function(req,res){
	if(req.session.jefeDepartamento!=undefined){
		var conexion=mysql.createConnection(servidor);
		conexion.query(
			"SELECT s.codigo_seccion,s.codigo_alterno,s.hora_inicio,s.hora_fin,s.dias,"+
			"s.cantidad_cupos,a.nombre_aula,p.nombre_periodo,car.nombre_carrera,asig.nombre_asignatura,e.nombre_edificio,per.nombre,per.apellido "+
			"FROM tbl_seccion s "+
			"INNER JOIN tbl_aulas a "+
			"ON a.codigo_aula=s.codigo_aula "+
			"INNER JOIN tbl_edificios e "+
			"ON e.codigo_edificio=a.codigo_edificio "+
			"INNER JOIN tbl_maestros m "+
			"ON m.codigo_maestro=s.codigo_maestro "+
			"INNER JOIN tbl_empleados em "+
			"ON em.codigo_empleado=m.codigo_maestro "+
			"INNER JOIN tbl_personas per "+
			"ON em.codigo_empleado=per.codigo_persona "+
			"INNER JOIN tbl_periodos p "+
			"ON p.codigo_periodo=s.codigo_periodo "+
			"INNER JOIN tbl_asignaturas asig "+
			"ON asig.codigo_asignatura=s.codigo_asignatura "+
			"INNER JOIN tbl_carreras car "+
			"ON car.codigo_carrera=asig.codigo_carrera "+
			"WHERE car.nombre_carrera=? ",
			[
				req.session.jefeDepartamentoCarrera
			],
			function(error,informacion){
				if (error) throw error;
				conexion.end();
				res.send(informacion);
			}
		);
	}
});

router.post("/agregarSeccion",function(req,res){
	if(req.session.jefeDepartamento!=undefined){
		var conexion=mysql.createConnection(servidor);
		conexion.query(
			"INSERT INTO tbl_seccion(codigo_seccion,codigo_alterno,hora_inicio,hora_fin,"+
			"dias,cantidad_cupos,codigo_aula,codigo_periodo,codigo_maestro,codigo_asignatura) "+
			"VALUES (NULL,?,?,?,?,?,?,?,?,?)",
			[
				req.body.codigo,
				req.body.inicio,
				req.body.fin,
				req.body.dias,
				req.body.cupos,
				req.body.aula,
				req.body.periodo,
				req.body.maestro,
				req.body.asignatura,
			],
			function(error,data){
				if(data.affectedRows==1){
					conexion.query(
						"SELECT s.codigo_seccion,s.codigo_alterno,s.hora_inicio,s.hora_fin,s.dias,"+
						"s.cantidad_cupos,a.nombre_aula,p.nombre_periodo,car.nombre_carrera,asig.nombre_asignatura,e.nombre_edificio,per.nombre,per.apellido "+
						"FROM tbl_seccion s "+
						"INNER JOIN tbl_aulas a "+
						"ON a.codigo_aula=s.codigo_aula "+
						"INNER JOIN tbl_edificios e "+
						"ON e.codigo_edificio=a.codigo_edificio "+
						"INNER JOIN tbl_maestros m "+
						"ON m.codigo_maestro=s.codigo_maestro "+
						"INNER JOIN tbl_empleados em "+
						"ON em.codigo_empleado=m.codigo_maestro "+
						"INNER JOIN tbl_personas per "+
						"ON em.codigo_empleado=per.codigo_persona "+
						"INNER JOIN tbl_periodos p "+
						"ON p.codigo_periodo=s.codigo_periodo "+
						"INNER JOIN tbl_asignaturas asig "+
						"ON asig.codigo_asignatura=s.codigo_asignatura "+
						"INNER JOIN tbl_carreras car "+
						"ON car.codigo_carrera=asig.codigo_carrera "+
						"WHERE s.codigo_seccion=?",
						[data.insertId],
						function(errorSelect,informacion){
							if (errorSelect) throw errorSelect;
							conexion.end();
							res.send(informacion);
						}
					);
				}
			}
		);
	}
});

module.exports=router;