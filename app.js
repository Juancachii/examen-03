import express from "express";
import mysql from "mysql2";

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "familia_db"
});

db.connect((err) => {
    if (err) {
        console.log(" Error al conectar a MySQL:", err);
        return;
    }
    console.log(" Conexión a MySQL exitosa");
});

app.get("/familia", (req, res) => {
    db.query("SELECT * FROM familia", (err, results) => {
        if (err) return res.json(err);
        res.json(results);
    });
});

app.post("/familia", (req, res) => {
    const { nombre, edad, parentesco } = req.body;

    db.query("INSERT INTO familia (nombre, edad, parentesco) VALUES (?,?,?)",
        [nombre, edad, parentesco],
        (err) => {
            if (err) return res.json(err);

            db.query("SELECT COUNT(*) AS total FROM familia", (err2, total) => {
                if (err2) return res.json(err2);

                res.json({
                    mensaje: "Miembro agregado con éxito",
                    total_miembros: total[0].total
                });
            });
        }
    );
});

app.delete("/familia/:id", (req, res) => {
    db.query("DELETE FROM familia WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.json(err);
        res.json({ mensaje: "Miembro eliminado" });
    });
});

app.put("/familia/:id", (req, res) => {
    const { nombre, edad, parentesco } = req.body;

    db.query(
        "UPDATE familia SET nombre=?, edad=?, parentesco=? WHERE id=?",
        [nombre, edad, parentesco, req.params.id],
        (err) => {
            if (err) return res.json(err);
            res.json({ mensaje: "Miembro actualizado" });
        }
    );
});

app.listen(3000, () => {
    console.log(" Servidor funcionando en http://localhost:3000");
});
