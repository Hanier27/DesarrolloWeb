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

router.get("/facultades",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT codigo_facultad,nombre_facultad,descripcion"+
        " FROM tbl_facultades",
        function(error,data){
            if (error) throw error;
				conexion.end();
				res.send(data);
        })
});

router.get("/periodos",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT p.nombre_periodo,p.codigo_periodo,p.fecha_inicio,p.fecha_fin,tp.tipo_periodo "+
        "FROM tbl_periodos p "+
        "INNER JOIN tbl_tipos_periodos tp "+
        "ON tp.codigo_tipo_periodo=p.codigo_tipo_periodo",
        function(error,data){
            if (error) throw error;
			conexion.end();
            res.send(data);
        }
    );
});

router.get("/tiposPeriodos",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT tipo_periodo,codigo_tipo_periodo "+
        "FROM  tbl_tipos_periodos ",
        function(error,data){
            if (error) throw error;
			conexion.end();
            res.send(data);
        }
    );
});

router.get("/grados",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT codigo_grado, nombre_grado FROM tbl_grados",
        function(error,data){
            if (error) throw error;
				conexion.end();
				res.send(data);
        })
});

router.get("/asignaturas",function(req,res){
    var conexion=mysql.createConnection(servidor);
    var sql="SELECT a.codigo_asignatura, a.nombre_asignatura, a.codigo_alterno,ta.tipo_asignatura, "+
            "a.cantidad_unidades_valorativas,a.dias,a.codigo_carrera,c.nombre_carrera "+
            "FROM tbl_asignaturas a "+
            "INNER JOIN tbl_carreras c "+
            "ON c.codigo_carrera=a.codigo_carrera "+
            "INNER JOIN tbl_tipo_asignatura ta "+
            "ON ta.codigo_tipo_asignatura=a.codigo_tipo_asignatura";
    conexion.query(sql,function(errorSelect,informacion){
        if (errorSelect) throw errorSelect;
	    conexion.end();
		res.send(informacion);
    });
});

router.get("/tipos_asignaturas",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT codigo_tipo_asignatura,tipo_asignatura FROM tbl_tipo_asignatura",
        function(error,data){
            if (error) throw error;
				conexion.end();
				res.send(data);
        })
});

router.get("/carreras",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT c.codigo_carrera, c.codigo_auxiliar, c.nombre_carrera, c.cantidad_asignaturas,"+
        " c.cantidad_unidades_valorativas, c.codigo_facultad, c.codigo_grado, g.nombre_grado, f.nombre_facultad "+
        "FROM tbl_carreras c "+
        "INNER JOIN tbl_grados g "+
        "ON g.codigo_grado= c.codigo_grado "+
        "INNER JOIN tbl_facultades f "+
        "ON f.codigo_facultad= c.codigo_facultad",
        function(error,data){
            if (error) throw error;
				conexion.end();
				res.send(data);
        })
});

router.post("/planEstudio",function(req,res){
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
            conexion.query(sql,[req.body.carrera])
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
});

router.post("/agregar_Facultad",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "INSERT INTO tbl_facultades(codigo_facultad,nombre_facultad,descripcion)"+
        " VALUES (NULL,?,?)",
        [
            req.body.facultad,
            req.body.descripcion
        ],
        function(error,data){
            if(data.affectedRows==1){
                conexion.query(
                    "SELECT codigo_facultad,nombre_facultad,descripcion"+
                    " FROM tbl_facultades"+
                    " WHERE codigo_facultad=?",
                    [data.insertId],
                    function(errorSelect,informacion){
                        if (errorSelect) throw errorSelect;
						conexion.end();
						res.send(informacion);
                    });
            }
        });
});

router.post("/agregar_Carrera",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "INSERT INTO tbl_carreras(codigo_carrera,codigo_auxiliar,nombre_carrera,"+
        "cantidad_asignaturas,cantidad_unidades_valorativas,codigo_facultad,codigo_grado) "+
        "VALUES (NULL,?,?,?,?,?,?)",
        [
            req.body.codigo,
            req.body.nombre,
            req.body.asignaturas,
            req.body.uv,
            req.body.facultad,
            req.body.grado,
        ],
        function(error,data){
            if(data.affectedRows==1){
                conexion.query(
                    "SELECT c.codigo_carrera, c.codigo_auxiliar, c.nombre_carrera, c.cantidad_asignaturas,"+
                    " c.cantidad_unidades_valorativas, c.codigo_facultad, c.codigo_grado, g.nombre_grado, f.nombre_facultad "+
                    "FROM tbl_carreras c "+
                    "INNER JOIN tbl_grados g "+
                    "ON g.codigo_grado= c.codigo_grado "+
                    "INNER JOIN tbl_facultades f "+
                    "ON f.codigo_facultad= c.codigo_facultad "+
                    "WHERE c.codigo_carrera=?",
                    [data.insertId],
                    function(errorSelect,informacion){
                        if (errorSelect) throw errorSelect;
						conexion.end();
						res.send(informacion);
                    });
            }
        });
});

router.post("/agregar_Asignatura",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "INSERT INTO tbl_asignaturas(codigo_asignatura,nombre_asignatura,codigo_alterno,"+
        "cantidad_unidades_valorativas,dias,codigo_tipo_asignatura,codigo_carrera) "+
        "VALUES (NULL,?,?,?,?,?,?)",
        [
            req.body.nombre,
            req.body.codigo,
            req.body.uv,
            req.body.dias,
            req.body.tipo,
            req.body.carrera,
        ],
        function(error,data){
            if(data.affectedRows==1){
                var sql="SELECT a.codigo_asignatura, a.nombre_asignatura, a.codigo_alterno,ta.tipo_asignatura, "+
                        "a.cantidad_unidades_valorativas,a.dias,a.codigo_carrera,c.nombre_carrera "+
                        "FROM tbl_asignaturas a "+
                        "INNER JOIN tbl_carreras c "+
                        "ON c.codigo_carrera=a.codigo_carrera "+
                        "INNER JOIN tbl_tipo_asignatura ta "+
                        "ON ta.codigo_tipo_asignatura=a.codigo_tipo_asignatura "+
                        "WHERE a.codigo_asignatura=?";
                conexion.query(sql,[data.insertId],function(errorSelect,informacion){
                    if (errorSelect) throw errorSelect;
                    conexion.end();
                    res.send(informacion);
                });
                
            }
        }
    );
});

router.post("/agregarPeriodo",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "INSERT INTO tbl_periodos (codigo_periodo, nombre_periodo, fecha_inicio, fecha_fin, codigo_tipo_periodo ) "+
        "VALUES (NULL,?,?,?,?)",
        [
            req.body.nombre,
            req.body.inicio,
            req.body.final,
            req.body.tipo,
        ],
        function(error,datos){
            if(datos.affectedRows==1){
                conexion.query(
                    "SELECT p.nombre_periodo,p.codigo_periodo,p.fecha_inicio,p.fecha_fin,tp.tipo_periodo "+
                    "FROM tbl_periodos p "+
                    "INNER JOIN tbl_tipos_periodos tp "+
                    "ON tp.codigo_tipo_periodo=p.codigo_tipo_periodo "+
                    "WHERE codigo_periodo=?",
                    [datos.insertId],
                    function(errorSelect,informacion){
                        if (errorSelect) throw errorSelect;
						conexion.end();
						res.send(informacion);
                    });
            }
        });
});

router.post("/agregarAsig_PlanEstudio",function(req,res){
    var conexion=mysql.createConnection(servidor);
    var requisitos= req.body.requisitos.split(',');
   conexion.query(
        "INSERT INTO tbl_planes_de_estudios(codigo_carrera,codigo_asignatura) VALUES (?,?)",
        [
            req.body.carrera,
            req.body.asignatura,
        ],
        function(error,datos){
            if(datos.affectedRows==1){
                console.log(requisitos);
                console.log(requisitos.length);
                if(requisitos.length>0){
                    for(var i=0;i<requisitos.length;i++){
                        if(requisitos[i]!=""){
                            conexion.query(
                                "INSERT INTO tbl_requisitos (codigo_asignatura,codigo_asignatura_requisito,codigo_carrera,codigo_requisito) "+
                                "VALUES (?,?,?, NULL);",
                                [   
                                    req.body.asignatura,
                                    requisitos[i],
                                    req.body.carrera,
                                ],
                                function(error,data){
                                    if (error) throw error;
                                }
                            ); 
                        }    
                    }
                }
            }
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
                        "WHERE pl.codigo_carrera=? "+
                        "AND a.codigo_asignatura=?";
                conexion.query(sql,[req.body.carrera,req.body.asignatura])
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
    );
});

module.exports=router;