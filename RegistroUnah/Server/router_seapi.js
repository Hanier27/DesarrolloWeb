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

router.get('/obtener', function(req,res){
	res.send("Usuario: "+req.session.user);
});

router.get("/Campus",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT codigo_campus,nombre_campus,cantidad_edificios "+
        "FROM tbl_campus ",
        function(error,data){
            if (error) throw error;
			conexion.end();
			res.send(data);
        }
    );
});

router.get("/Edificios",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT e.codigo_edificio,e.nombre_edificio,e.cantidad_aulas,"+
        "e.codigo_campus,c.nombre_campus "+
        "FROM tbl_edificios e "+
        "INNER JOIN tbl_campus c "+
        "ON e.codigo_campus=c.codigo_campus",
        function(error,data){
            if (error) throw error;
			conexion.end();
			res.send(data);
        }
    );
});

router.get("/Aulas",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT a.codigo_aula,a.nombre_aula,a.codigo_edificio,a.codigo_tipo_aula,"+
        "e.nombre_edificio,ta.tipo_aula,c.nombre_campus "+
        "FROM tbl_aulas a "+
        "INNER JOIN tbl_edificios e "+
        "ON e.codigo_edificio=a.codigo_edificio "+
        "INNER JOIN tbl_campus c "+
        "ON c.codigo_campus=e.codigo_campus "+
        "INNER JOIN tbl_tipos_aulas ta "+
        "ON ta.codigo_tipo_aula=a.codigo_tipo_aula ",
        function(error,data){
            if (error) throw error;
			conexion.end();
			res.send(data);
        }
    );
});

router.get("/tipos_Aulas",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "SELECT codigo_tipo_aula,tipo_aula,descripcion FROM tbl_tipos_aulas",
        function(error,data){
            if (error) throw error;
			conexion.end();
			res.send(data);
        }
    );
});


router.post("/agregar_Campus",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "INSERT INTO tbl_campus(codigo_campus,nombre_campus,cantidad_edificios) "+
        "VALUES (NULL,?,?)",
        [
            req.body.campus,
            req.body.edificios,
        ],
        function(error,data){
            if(data.affectedRows==1){
                conexion.query(
                    "SELECT codigo_campus,nombre_campus,cantidad_edificios "+
                    "FROM tbl_campus "+
                    "WHERE codigo_campus=?",
                    [data.insertId],
                    function(errorSelect,informacion){
                        if (errorSelect) throw errorSelect;
						conexion.end();
						res.send(informacion);
                    });
            }
        });
});

router.post("/agregar_Edificio",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "INSERT INTO tbl_edificios(codigo_edificio,nombre_edificio,cantidad_aulas,codigo_campus) "+
        "VALUES (NULL,?,?,?)",
        [
            req.body.edificio,
            req.body.aulas,
            req.body.campus,
        ],
        function(error,data){
            if(data.affectedRows==1){
                conexion.query(
                    "SELECT e.codigo_edificio,e.nombre_edificio,e.cantidad_aulas,e.codigo_campus,c.nombre_campus "+
                    "FROM tbl_edificios e "+
                    "INNER JOIN tbl_campus c "+
                    "ON e.codigo_campus=c.codigo_campus "+
                    "WHERE e.codigo_edificio=?",
                    [data.insertId],
                    function(errorSelect,informacion){
                        if (errorSelect) throw errorSelect;
						conexion.end();
						res.send(informacion);
                    });
            }
        });
});

router.post("/agregar_Aula",function(req,res){
    var conexion=mysql.createConnection(servidor);
    conexion.query(
        "INSERT INTO tbl_aulas(codigo_aula,nombre_aula,codigo_edificio,codigo_tipo_aula) "+
        "VALUES (NULL,?,?,?)",
        [
            req.body.aula,
            req.body.edificio,
            req.body.tipo,
        ],
        function(error,data){
            if(data.affectedRows==1){
                conexion.query(
                    "SELECT a.codigo_aula,a.nombre_aula,a.codigo_edificio,a.codigo_tipo_aula,"+
                    "e.nombre_edificio,ta.tipo_aula,c.nombre_campus "+
                    "FROM tbl_aulas a "+
                    "INNER JOIN tbl_edificios e "+
                    "ON e.codigo_edificio=a.codigo_edificio "+
                    "INNER JOIN tbl_campus c "+
                    "ON c.codigo_campus=e.codigo_campus "+
                    "INNER JOIN tbl_tipos_aulas ta "+
                    "ON ta.codigo_tipo_aula=a.codigo_tipo_aula "+
                    "WHERE a.codigo_aula = ?",
                    [data.insertId],
                    function(errorSelect,informacion){
                        if (errorSelect) throw errorSelect;
						conexion.end();
						res.send(informacion);
                    });
            }
        });
});

module.exports=router;