const db = require("../config/database");

//create sector

const createSector = async (body) => {
  const { name, image } = body;
  const { rows } = await db.query(
    "INSERT INTO sectors (name, image) VALUES ($1, $2) RETURNING *",
    [name, image]
  );

  return rows[0];
};

//get all sectors
const getAllSectors = async () => {
  const { rows } = await db.query("SELECT * FROM sectors");

  return rows;
};

//delete sector
const deleteSector = async (id) => {
  //check if sector id exists
  const { rows } = await db.query("SELECT * FROM sectors WHERE id = $1", [id]);

  if (!rows[0]) {
    throw new Error(`Sector not found`);
  }

  const record = await db.query("DELETE FROM sectors WHERE id = $1", [id]);
  return record.rows[0];
};

//Edit sector
const editSector = async (id, body) => {
  //check if sector id exists
  const { rows } = await db.query("SELECT * FROM sectors WHERE id = $1", [id]);

  if (!rows[0]) {
    throw new Error(`Sector not found`);
  }
  //Edit the sector
  const { name, image } = body;
  const { rows: record } = await db.query(
    "UPDATE sectors SET name = $1, image = $2 WHERE id = $3 RETURNING *",
    [name, image, id]
  );
  return record[0];
};

// get sectors by categories
const getAllSectorsWithCategories = async () => {
  const { rows } = await db.query(
    `
    SELECT 
    s.id,
    s.name,
    s.image,
    json_agg(
      json_build_object('id',c.id, 'name', c.name, 'job_count',
      (SELECT COUNT(*) FROM jobs j WHERE j.category_id = c.id
      ))
    ) AS categories
    FROM sectors s
    LEFT JOIN categories c
    ON s.id = c.sector_id
    GROUP By s.id
    `
  );
  return rows;
};

//export modules
module.exports = {
  createSector,
  getAllSectors,
  deleteSector,
  editSector,
  getAllSectorsWithCategories,
};
