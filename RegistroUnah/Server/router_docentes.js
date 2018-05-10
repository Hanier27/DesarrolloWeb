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

router.get("/secciones",function(req,res){
    var conexion=mysql.createConnection(servidor);
		conexion.query(
			"SELECT s.codigo_seccion,s.codigo_alterno,s.hora_inicio,s.hora_fin,s.dias,"+
            "s.cantidad_cupos,a.nombre_aula,p.nombre_periodo,car.nombre_carrera,"+
            "asig.nombre_asignatura,e.nombre_edificio,per.nombre,per.apellido,p.fecha_inicio,p.fecha_fin "+
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
            "WHERE (sysdate() BETWEEN p.fecha_inicio AND p.fecha_fin) "+
			"AND m.codigo_maestro=? ",
			[
				17
			],
			function(error,informacion){
				if (error) throw error;
				conexion.end();
				res.send(informacion);
			}
		);
});

router.post("/estudiantes",function(req,res){
    var conexion=mysql.createConnection(servidor);
		conexion.query(
			"SELECT s.codigo_alterno,p.nombre,p.apellido,p.correo_electronico,a.numero_cuenta "+
            "FROM tbl_seccion s "+
            "INNER JOIN tbl_matricula m "+
            "ON m.codigo_seccion=s.codigo_seccion "+
            "INNER JOIN tbl_alumnos a "+
            "ON a.codigo_alumno=m.codigo_alumno "+
            "INNER JOIN tbl_personas p "+
            "ON p.codigo_persona=a.codigo_alumno "+
            "WHERE s.codigo_seccion=?",
			[
				req.body.codigo
			],
			function(error,informacion){
				if (error) throw error;
				conexion.end();
				res.send(informacion);
			}
		);
});

module.exports=router;