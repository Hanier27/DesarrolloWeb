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

router.get("/datos_estudiantes",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT p.nombre,p.apellido,a.numero_cuenta,a.promedio,"+
        "car.nombre_carrera,cam.nombre_campus,YEAR(sysdate()) as año "+
        "FROM tbl_alumnos a "+
        "INNER JOIN tbl_personas p "+
        "ON p.codigo_persona=a.codigo_alumno "+
        "INNER JOIN tbl_carreras_x_alumno ca "+
        "ON a.codigo_alumno=ca.codigo_alumno "+
        "INNER JOIN tbl_carreras car "+
        "ON car.codigo_carrera=ca.codigo_carrera "+
        "INNER JOIN tbl_campus cam "+
        "ON cam.codigo_campus=p.codigo_campus "+
        "WHERE p.codigo_persona=?",
        [2],
        function(errorSelect,informacion){
            if (errorSelect) throw errorSelect;
            conexion.end();
            res.send(informacion);
        }
    );
});

router.get("/asignaturasMatriculadas",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT m.codigo_matricula,m.codigo_estado_matricula,m.codigo_alumno,s.codigo_seccion,s.codigo_alterno as seccion,s.hora_inicio,s.hora_fin,"+
        "s.dias,a.nombre_asignatura,a.codigo_alterno,a.cantidad_unidades_valorativas,a.codigo_asignatura,"+
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

router.get("/historial",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT a.codigo_alterno,a.nombre_asignatura,a.cantidad_unidades_valorativas,"+
        "s.codigo_alterno as seccion,YEAR(p.fecha_inicio) as ano,p.nombre_periodo,de.valor_nota,"+
        "e.nombre_tipo_evaluacion,h.codigo_alumno "+
        "FROM tbl_historial h "+
        "INNER JOIN tbl_detalle_evaluacion de "+
        "ON de.codigo_historial=h.codigo_historial "+
        "INNER JOIN tbl_tipos_evaluaciones e "+
        "ON e.codigo_tipo_evaluacion=de.codigo_tipo_evaluacion "+
        "INNER JOIN tbl_seccion s "+
        "ON s.codigo_seccion=h.codigo_seccion "+
        "INNER JOIN tbl_periodos p "+
        "ON p.codigo_periodo=s.codigo_periodo "+
        "INNER JOIN tbl_asignaturas a "+
        "ON a.codigo_asignatura=s.codigo_asignatura "+
        "WHERE h.codigo_alumno=?",
        [2],
        function(error,data){
            if(error) throw error;
			conexion.end();
			res.send(data);
        }
    );
});

router.get("/requisitos",function(req,res){
    var conexion=mysql.createConnection(servidor);
    var conexion2=mysql.createConnection(servidor);
    var asignaturas=[];
    var sql="SELECT a.codigo_asignatura,a.nombre_asignatura,a.codigo_alterno,a.dias,"+
            "a.cantidad_unidades_valorativas,c.nombre_carrera,ta.tipo_asignatura,c.codigo_carrera "+
            "FROM  tbl_planes_de_estudios pl "+
            "INNER JOIN tbl_asignaturas a "+
            "ON a.codigo_asignatura=pl.codigo_asignatura "+
            "INNER JOIN tbl_carreras c "+
            "ON c.codigo_carrera=pl.codigo_carrera "+
            "INNER JOIN tbl_tipo_asignatura ta "+
            "ON ta.codigo_tipo_asignatura=a.codigo_tipo_asignatura "+
            "WHERE pl.codigo_carrera=?";
            conexion.query(sql,[1])
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
                            "WHERE pl.codigo_carrera=? AND re.codigo_carrera=? AND re.codigo_asignatura=?",[1,1,asignatura.codigo_asignatura])
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
});

router.post("/secciones",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT s.codigo_alterno,s.codigo_seccion,s.dias,s.cantidad_cupos,"+
        "a.codigo_asignatura,a.nombre_asignatura,p.fecha_inicio,p.fecha_fin "+
        "FROM tbl_seccion s "+
        "INNER JOIN tbl_asignaturas a "+
        "ON a.codigo_asignatura=s.codigo_asignatura "+
        "INNER JOIN tbl_periodos p "+
        "ON p.codigo_periodo=s.codigo_periodo "+
        "WHERE (sysdate() BETWEEN p.fecha_inicio AND p.fecha_fin) "+
        "AND a.codigo_asignatura=?",
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
                                    "SELECT m.codigo_matricula,m.codigo_estado_matricula,m.codigo_alumno,s.codigo_seccion,s.codigo_alterno as seccion,s.hora_inicio,s.hora_fin,"+
                                    "s.dias,a.nombre_asignatura,a.codigo_alterno,a.cantidad_unidades_valorativas,a.codigo_asignatura,"+
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

router.post("/cancelar_clase",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "DELETE FROM tbl_matricula "+
        "WHERE tbl_matricula.codigo_matricula = ?",
        [req.body.codigo],
        function(error,data){
            if(data.affectedRows==1){
                conexion.query(
                    "UPDATE tbl_seccion "+
                    "SET cantidad_cupos = cantidad_cupos+1 "+
                    "WHERE tbl_seccion.codigo_seccion = ?",
                    [req.body.seccion],
                    function(errorUpdate,datos){
                        conexion.query(
                            "SELECT m.codigo_matricula,m.codigo_estado_matricula,m.codigo_alumno,s.codigo_alterno as seccion,s.hora_inicio,s.hora_fin,"+
                            "s.dias,a.nombre_asignatura,a.codigo_alterno,a.cantidad_unidades_valorativas,s.codigo_seccion,"+
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
                    }
                );
            }
        }
    );
});

module.exports=router;