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

router.get("/cargos",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT * FROM tbl_cargos",
        function(error,data){
            if(error) throw error;
		    conexion.end();
		    res.send(data);
        });
});

router.get("/especialidades",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT * FROM tbl_area_especializaciones",
        function(error,data){
            if(error) throw error;
		    conexion.end();
		    res.send(data);
        });
});

router.get("/titularidades",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT * FROM tbl_titularidad",
        function(error,data){
            if(error) throw error;
		    conexion.end();
		    res.send(data);
        });
});

router.get("/facultades",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT * FROM tbl_facultades",
        function(error,data){
            if(error) throw error;
		    conexion.end();
		    res.send(data);
        });
});

router.get("/tipos_empleado",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT * FROM tbl_tipo_empleado",
        function(error,data){
            if(error) throw error;
		    conexion.end();
		    res.send(data);
        });
});

router.get("/empleados",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT p.codigo_persona, p.nombre,p.apellido, p.fecha_nacimiento, p.identidad, p.direccion,"+
        "p.telefono, p.correo_electronico, e.sueldo_base,e.numero_empleado,c.nombre_cargo,"+
        "ca.nombre_campus,t.nombre_tipo_empleado "+
        "FROM tbl_personas p "+
        "INNER JOIN tbl_empleados e "+
        "ON e.codigo_empleado=p.codigo_persona "+
        "INNER JOIN tbl_cargos c "+
        "ON c.codigo_cargo=e.codigo_cargo "+ 
        "INNER JOIN tbl_campus ca "+
        "ON ca.codigo_campus=p.codigo_campus "+
        "INNER JOIN tbl_tipo_empleado t "+
        "ON t.codigo_tipo_empleado=e.codigo_tipo_empleado "+
        "WHERE c.codigo_cargo!=1",
        function(error,data){
            if(error) throw error;
		    conexion.end();
		    res.send(data);
        });
});

router.get("/docentes",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT p.codigo_persona,p.nombre,p.apellido,p.identidad,p.direccion,p.telefono,p.correo_electronico,"+
        "e.numero_empleado,ca.nombre_cargo,te.nombre_tipo_empleado,a.descripcion,ti.nombre_titularidad,"+
        "ti.salario_minimo,ti.salario_maximo,fa.nombre_facultad,cam.nombre_campus "+
        "FROM tbl_personas p "+
        "INNER JOIN tbl_empleados e "+
        "ON e.codigo_empleado=p.codigo_persona "+
        "INNER JOIN tbl_maestros m "+
        "ON m.codigo_maestro=e.codigo_empleado "+
        "INNER JOIN tbl_cargos ca "+
        "ON ca.codigo_cargo=e.codigo_cargo "+
        "INNER JOIN tbl_tipo_empleado te "+
        "ON te.codigo_tipo_empleado=e.codigo_tipo_empleado "+
        "INNER JOIN tbl_area_especializaciones a "+
        "ON a.codigo_especializacion=m.codigo_especializacion "+
        "INNER JOIN tbl_titularidad ti "+
        "ON ti.codigo_titularidad=m.codigo_titularidad "+
        "INNER JOIN tbl_facultades fa "+
        "ON fa.codigo_facultad=m.codigo_area "+
        "INNER JOIN tbl_campus cam "+
        "ON cam.codigo_campus=p.codigo_campus "+
        "WHERE ca.codigo_cargo=1",
        function(error,data){
            if(error) throw error;
		    conexion.end();
		    res.send(data);
        });
});

router.get("/estudiantes",function(req,res){
    var conexion=mysql.createConnection(servidor);
    var conexion2=mysql.createConnection(servidor);
    var estudiantes=[];
                            var sql="SELECT p.codigo_persona, p.nombre, p.apellido, p.fecha_nacimiento, p.identidad, p.direccion,"+
                                    "p.telefono, p.correo_electronico, p.codigo_lugar_nacimiento, p.codigo_lugar_residencia, p.codigo_estado_civil,"+
                                    "p.codigo_genero, p.codigo_campus, p.codigo_municipio_nacimiento, p.codigo_municipio_residencia,a.numero_cuenta,"+
                                    "a.promedio,c.nombre_campus "+
                                    "FROM tbl_personas p "+
                                    "INNER JOIN tbl_alumnos a "+
                                    "ON a.codigo_alumno=p.codigo_persona "+
                                    "INNER JOIN tbl_campus c "+
                                    "ON c.codigo_campus=p.codigo_campus ";
                        conexion.query(sql)
                        .on('result',function(estudiante){
                            estudiante.carreras=[];
                            estudiantes.push(estudiante);
                            conexion.pause();
                            conexion2.query(
                                            "SELECT c.nombre_carrera,c.codigo_carrera,ca.codigo_alumno "+
                                            "FROM tbl_carreras_x_alumno ca "+
                                            "INNER JOIN tbl_carreras c "+
                                            "ON c.codigo_carrera=ca.codigo_carrera "+
                                            "WHERE ca.codigo_alumno=?",[estudiante.codigo_persona])
                                            .on('result',function(carrera){
                                                estudiante.carreras.push(carrera);
                                            })
                                            .on('end',function(){
                                                conexion.resume();
                                            });
                        })
                        .on('end',function(){
                            conexion.end();
                            conexion2.end();
                            res.send(estudiantes);
                        });
});

router.post("/guardarEstudiante",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "INSERT INTO tbl_personas(nombre,apellido,fecha_nacimiento,identidad,direccion,"+
        "telefono,correo_electronico,codigo_lugar_nacimiento,codigo_lugar_residencia,"+
        "codigo_estado_civil,codigo_genero,codigo_campus,"+
        "codigo_municipio_nacimiento,codigo_municipio_residencia) "+ 
        "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            req.body.nombre,
            req.body.apellido,
            req.body.fechaNac,
            req.body.ide,
            req.body.direccion,
            req.body.telefono,
            req.body.correo,
            req.body.lugarNac,
            req.body.lugarRes,
            req.body.estado,
            req.body.genero,
            req.body.campus,
            req.body.municipioNac,
            req.body.municipioRes,
        ],
        function(error,data){
            if(data.affectedRows==1){
                conexion.query(
                    "INSERT INTO tbl_alumnos(numero_cuenta,codigo_alumno,password) "+ 
                    "VALUES (?,?,?)",
                    [ 
                        req.body.cuenta,
                        data.insertId,
                        req.body.pass,
                    ],
                    function(errorInsert,informacion){
                        for(var i=0;i<req.body.carreras.length;i+=2){
                            conexion.query(
                                "INSERT INTO tbl_carreras_x_alumno(fecha_registro_carrera,codigo_carrera,codigo_alumno) "+
                                "VALUES (sysdate(),?,?)",
                                [   
                                    req.body.carreras[i],
                                    data.insertId,
                                ]);
                        }
                        var conexion2=mysql.createConnection(servidor);
                        var estudiantes=[];
                        var sql="SELECT p.codigo_persona, p.nombre, p.apellido, p.fecha_nacimiento, p.identidad, p.direccion,"+
                                "p.telefono, p.correo_electronico, p.codigo_lugar_nacimiento, p.codigo_lugar_residencia, p.codigo_estado_civil,"+
                                "p.codigo_genero, p.codigo_campus, p.codigo_municipio_nacimiento, p.codigo_municipio_residencia,a.numero_cuenta,"+
                                "a.promedio,c.nombre_campus "+
                                "FROM tbl_personas p "+
                                "INNER JOIN tbl_alumnos a "+
                                "ON a.codigo_alumno=p.codigo_persona "+
                                "INNER JOIN tbl_campus c "+
                                "ON c.codigo_campus=p.codigo_campus "+
                                "WHERE p.codigo_persona=?";
                        conexion.query(sql,[data.insertId])
                        .on('result',function(estudiante){
                            estudiante.carreras=[];
                            estudiantes.push(estudiante);
                            conexion.pause();
                            conexion2.query(
                                            "SELECT c.nombre_carrera,c.codigo_carrera,ca.codigo_alumno "+
                                            "FROM tbl_carreras_x_alumno ca "+
                                            "INNER JOIN tbl_carreras c "+
                                            "ON c.codigo_carrera=ca.codigo_carrera "+
                                            "WHERE ca.codigo_alumno=?",[data.insertId])
                                            .on('result',function(carrera){
                                                estudiante.carreras.push(carrera);
                                            })
                                            .on('end',function(){
                                                conexion.resume();
                                            });
                        })
                        .on('end',function(){
                            conexion.end();
                            conexion2.end();
                            res.send(estudiantes);
                        });
                    });
            }
        });
});

router.post("/guardarEmpleado",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "INSERT INTO tbl_personas(nombre,apellido,fecha_nacimiento,identidad,direccion,"+
        "telefono,correo_electronico,codigo_lugar_nacimiento,codigo_lugar_residencia,"+
        "codigo_estado_civil,codigo_genero,codigo_campus,"+
        "codigo_municipio_nacimiento,codigo_municipio_residencia) "+ 
        "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            req.body.nombre,
            req.body.apellido,
            req.body.fechaNac,
            req.body.ide,
            req.body.direccion,
            req.body.telefono,
            req.body.correo,
            req.body.lugarNac,
            req.body.lugarRes,
            req.body.estado,
            req.body.genero,
            req.body.campus,
            req.body.municipioNac,
            req.body.municipioRes,
        ],
        function(error,data){
            if(data.affectedRows==1){
                conexion.query(
                    "INSERT INTO tbl_empleados(numero_empleado,sueldo_base,codigo_empleado,codigo_cargo,codigo_tipo_empleado,password) "+ 
                    "VALUES (?,?,?,?,?,?)",
                    [ 
                        req.body.numero,
                        req.body.salario,
                        data.insertId,
                        req.body.cargo,
                        req.body.tipo,
                        req.body.clave,
                    ],
                    function(errorInsert,informacion){
                        conexion.query(
                            "SELECT p.codigo_persona, p.nombre,p.apellido, p.fecha_nacimiento, p.identidad, p.direccion,"+
                            "p.telefono, p.correo_electronico, e.sueldo_base,e.numero_empleado,c.nombre_cargo,"+
                            "ca.nombre_campus,t.nombre_tipo_empleado "+
                            "FROM tbl_personas p "+
                            "INNER JOIN tbl_empleados e "+
                            "ON e.codigo_empleado=p.codigo_persona "+
                            "INNER JOIN tbl_cargos c "+
                            "ON c.codigo_cargo=e.codigo_cargo "+ 
                            "INNER JOIN tbl_campus ca "+
                            "ON ca.codigo_campus=p.codigo_campus "+
                            "INNER JOIN tbl_tipo_empleado t "+
                            "ON t.codigo_tipo_empleado=e.codigo_tipo_empleado "+
                            "WHERE p.codigo_persona=?",
                            [data.insertId],
                            function(errorSelect,info){
                                if(error) throw error;
                                conexion.end();
                                res.send(info);
                            });
                    }
                );        
            }
        });
});

router.post("/guardarDocente",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "INSERT INTO tbl_personas(nombre,apellido,fecha_nacimiento,identidad,direccion,"+
        "telefono,correo_electronico,codigo_lugar_nacimiento,codigo_lugar_residencia,"+
        "codigo_estado_civil,codigo_genero,codigo_campus,"+
        "codigo_municipio_nacimiento,codigo_municipio_residencia) "+ 
        "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            req.body.nombre,
            req.body.apellido,
            req.body.fechaNac,
            req.body.ide,
            req.body.direccion,
            req.body.telefono,
            req.body.correo,
            req.body.lugarNac,
            req.body.lugarRes,
            req.body.estado,
            req.body.genero,
            req.body.campus,
            req.body.municipioNac,
            req.body.municipioRes,
        ],
        function(error,data){
            if(data.affectedRows==1){
                conexion.query(
                    "INSERT INTO tbl_empleados(numero_empleado,codigo_empleado,codigo_cargo,codigo_tipo_empleado,password) "+ 
                    "VALUES (?,?,?,?,?)",
                    [ 
                        req.body.numero,
                        data.insertId,
                        req.body.cargo,
                        req.body.tipo,
                        req.body.clave,
                    ],
                    function(errorInsert,informacion){
                        conexion.query(
                            "INSERT INTO tbl_maestros(codigo_titularidad,codigo_especializacion,codigo_maestro,codigo_area) "+
                            "VALUES (?,?,?,?)",
                            [
                                req.body.titularidad,
                                req.body.especialidad,
                                data.insertId,
                                req.body.area,
                            ],
                            function(errorIN,info){
                                conexion.query(
                                    "SELECT p.codigo_persona,p.nombre,p.apellido,p.identidad,p.direccion,p.telefono,p.correo_electronico,"+
                                    "e.numero_empleado,ca.nombre_cargo,te.nombre_tipo_empleado,a.descripcion,ti.nombre_titularidad,"+
                                    "ti.salario_minimo,ti.salario_maximo,fa.nombre_facultad,cam.nombre_campus "+
                                    "FROM tbl_personas p "+
                                    "INNER JOIN tbl_empleados e "+
                                    "ON e.codigo_empleado=p.codigo_persona "+
                                    "INNER JOIN tbl_maestros m "+
                                    "ON m.codigo_maestro=e.codigo_empleado "+
                                    "INNER JOIN tbl_cargos ca "+
                                    "ON ca.codigo_cargo=e.codigo_cargo "+
                                    "INNER JOIN tbl_tipo_empleado te "+
                                    "ON te.codigo_tipo_empleado=e.codigo_tipo_empleado "+
                                    "INNER JOIN tbl_area_especializaciones a "+
                                    "ON a.codigo_especializacion=m.codigo_especializacion "+
                                    "INNER JOIN tbl_titularidad ti "+
                                    "ON ti.codigo_titularidad=m.codigo_titularidad "+
                                    "INNER JOIN tbl_facultades fa "+
                                    "ON fa.codigo_facultad=m.codigo_area "+
                                    "INNER JOIN tbl_campus cam "+
                                    "ON cam.codigo_campus=p.codigo_campus "+
                                    "WHERE p.codigo_persona=?",
                                    [data.insertId],
                                    function(errorSelect,datos){
                                        if(error) throw error;
                                        conexion.end();
                                        res.send(datos);
                                    });
                            });
                    }
                );        
            }
        });
});


module.exports=router;