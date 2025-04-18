import db from '../../../config/db.js';

const getAllDias_Bloques = (callback) => {
    const q = `
        SELECT
            DiaBloque.id_dia_bloque,
            DiaBloque.nombreRelacion,
            Dia.nombreDia AS nombre_dia,
            Bloquehora.nombreBloqueHora AS nombre_bloque
        FROM
            DiaBloque
        JOIN
            Dia ON DiaBloque.fk_dia = Dia.id_dia
        JOIN
            BloqueHora ON DiaBloque.fk_bloque = Bloquehora.id_bloque;
    `;
    db.query(q, callback);
};

const getDia_BloqueById = (id, callback) => {
    const query = 'SELECT * FROM DiaBloque WHERE id_dia_bloque = $1';

    // Ejecutamos la consulta
    db.query(query, [id], (err, result) => {
        if (err) {
            return callback(err, null); // Retorna el error si ocurre
        }

        if (result.length === 0) {
            return callback(new Error('Sección no encontrada'), null); // Error si no se encuentra la sección
        }

        return callback(null, result[0]); // Retorna el primer resultado
    });
};


const createDia_Bloque = (dia_BloqueData, callback) => {
    const q = "INSERT INTO DiaBloque(`fk_dia`, `fk_bloque`, `nombreRelacion`) VALUES ($1, $2, $3)";
    db.query(q, [dia_BloqueData.fk_dia, dia_BloqueData.fk_bloque, dia_BloqueData.nombreRelacion], callback);
};

const deleteDia_Bloque = (id, callback) => {
    const q = "DELETE FROM DiaBloque WHERE id_dia_bloque = $1";
    db.query(q, [id], callback);
};

const updateDia_Bloque = (id, fk_dia, fk_bloque, nombreRelacion, callback) => {
    const q = "UPDATE DiaBloque SET `fk_dia` = $1, `fk_bloque` = $2, `nombreRelacion` = $3 WHERE id_dia_bloque = $4";
    db.query(q, [fk_dia, fk_bloque, nombreRelacion, id], callback);
};

export default {
    getAllDias_Bloques,
    getDia_BloqueById,
    createDia_Bloque,
    deleteDia_Bloque,
    updateDia_Bloque
};