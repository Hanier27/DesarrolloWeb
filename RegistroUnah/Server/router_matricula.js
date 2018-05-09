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

router.get("/asignaturasMatriculadas",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT m.codigo_matricula,m.codigo_estado_matricula,m.codigo_alumno,s.codigo_alterno as seccion,s.hora_inicio,s.hora_fin,"+
        "s.dias,a.nombre_asignatura,a.codigo_alterno,a.cantidad_unidades_valorativas,"+
        "p.nombre_periodo,aul.nombre_aula,e.nombre_edificio "+
        "FROM tbl_matricula m "+
        "INNER JOIN tbl_seccion s "+
        "ON s.codigo_seccion=m.codigo_seccion "+
        "INNER JOIN tbl_asignaturas a "+
        "ON a.codigo_asignatura=s.codigo_asignatura "+
        "INNER JOIN tbl_periodos p "+
        "ON p.codigo_periodo=s.codigo_periodo "+
        "INNER JOIN tbl_aulas aul "+
        "ON aul.codigo_aula=s.codigo_aula "+
        "INNER JOIN tbl_edificios e "+
        "ON e.codigo_edificio=aul.codigo_edificio "+
        "WHERE m.codigo_alumno=?",[2],
        function(errorSelect,informacion){
            if (errorSelect) throw errorSelect;
            conexion.end();
            res.send(informacion);
        }
    );
})

router.get("/planEstudios",function(req,res){
    var conexion=mysql.createConnection(servidor);
		var conexion2=mysql.createConnection(servidor);
		var carreras=[];
		var sql="SELECT * FROM tbl_carreras";
		conexion.query(sql)
					.on('result',function(carrera){
					carrera.asignaturas=[];
					carreras.push(carrera);
					conexion.pause();
					conexion2.query("SELECT a.codigo_asignatura,a.nombre_asignatura,a.codigo_alterno,a.codigo_carrera,pl.codigo_carrera "+
                                    "FROM tbl_planes_de_estudios pl "+
                                    "INNER JOIN tbl_asignaturas a "+
                                    "ON a.codigo_asignatura=pl.codigo_asignatura "+
                                    "WHERE pl.codigo_carrera=1 AND a.codigo_carrera=?",[carrera.codigo_carrera])
									.on('result',function(asignatura){ 
									carrera.asignaturas.push(asignatura);
									})
									.on('end',function(){
										conexion.resume();
									});
				})
			.on('end',function(){
					conexion.end();
                    conexion2.end();
                    var departamentos=[];
                    for(var i=0;i<carreras.length;i++){
                        if(carreras[i].asignaturas.length>0){
                            departamentos.push(carreras[i]);
                        }
                    } 
                    res.send(departamentos);
				});
});


router.post("/secciones",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT s.codigo_alterno,s.codigo_seccion,s.dias,s.cantidad_cupos,a.codigo_asignatura,a.nombre_asignatura "+
        "FROM tbl_seccion s "+
        "INNER JOIN tbl_asignaturas a "+
        "ON a.codigo_asignatura=s.codigo_asignatura "+
        "WHERE a.codigo_asignatura=?",
        [req.body.codigo],
        function(error,data){
            if(error) throw error;
			conexion.end();
			res.send(data);
        });
});

router.post("/matricular",function(req,res){
    var conexion=mysql.createConnection(servidor);
    var estado=0;
    conexion.query(
        "SELECT s.codigo_alterno,s.codigo_seccion,s.dias,s.cantidad_cupos,a.codigo_asignatura,a.nombre_asignatura "+
        "FROM tbl_seccion s "+
        "INNER JOIN tbl_asignaturas a "+
        "ON a.codigo_asignatura=s.codigo_asignatura "+
        "WHERE s.codigo_seccion=?",
        [req.body.codigo],
        function(error,data){
            if(data[0].cantidad_cupos>0){
                estado=1;
            }else{
                estado=2;
            }
            conexion.query(
                "INSERT INTO tbl_matricula(fecha_matricula,codigo_alumno,codigo_estado_matricula,codigo_seccion,codigo_matricula) "+
                "VALUES (sysdate(),?,?,?,NULL)",
                [
                    2,
                    estado,
                    req.body.codigo,
                ],
                function(errorInsert,info){
                    if(info.affectedRows==1){
                        conexion.query(
                            "UPDATE tbl_seccion "+
                            "SET cantidad_cupos = cantidad_cupos-1 "+
                            "WHERE tbl_seccion.codigo_seccion = ?",
                            [req.body.codigo],
                            function(errorUpdate,datos){
                                conexion.query(
                                    "SELECT m.codigo_matricula,m.codigo_estado_matricula,m.codigo_alumno,s.codigo_alterno as seccion,s.hora_inicio,s.hora_fin,"+
                                    "s.dias,a.nombre_asignatura,a.codigo_alterno,a.cantidad_unidades_valorativas,"+
                                    "p.nombre_periodo,aul.nombre_aula,e.nombre_edificio "+
                                    "FROM tbl_matricula m "+
                                    "INNER JOIN tbl_seccion s "+
                                    "ON s.codigo_seccion=m.codigo_seccion "+
                                    "INNER JOIN tbl_asignaturas a "+
                                    "ON a.codigo_asignatura=s.codigo_asignatura "+
                                    "INNER JOIN tbl_periodos p "+
                                    "ON p.codigo_periodo=s.codigo_periodo "+
                                    "INNER JOIN tbl_aulas aul "+
                                    "ON aul.codigo_aula=s.codigo_aula "+
                                    "INNER JOIN tbl_edificios e "+
                                    "ON e.codigo_edificio=aul.codigo_edificio "+
                                    "WHERE m.codigo_matricula=?",[info.insertId],
                                    function(errorSelect,informacion){
                                        if (errorSelect) throw errorSelect;
                                        conexion.end();
                                        res.send(informacion);
                                    }
                                );
                            }
                        );
                        
                    }
                }
            );
        }
    );
    
});

module.exports=router;