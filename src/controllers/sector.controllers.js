const sectorServices = require("../services/sector.services");

//create sector
const createSector = async (req, res) => {
  try {
    // console.log(req.file);
    const body = { name: req.body.name, image: req.file.filename };
    const sector = await sectorServices.createSector(body);
    return res.status(201).json({ sector });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//get all sectors
const getAllSectors = async (req, res) => {
  try {
    const sectors = await sectorServices.getAllSectors();
    return res.status(200).json({ sectors });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//delete sector
const deleteSector = async (req, res) => {
  try {
    const { id } = req.params;
    const sector = await sectorServices.deleteSector(id);
    return res
      .status(200)
      .json({ message: "Sector Deleted Successfully", sector });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Edit sector
const editSector = async (req, res) => {
  try {
    const { id } = req.params;
    const body = { name: req.body.name, image: req.file.filename };
    const sector = await sectorServices.editSector(id, body);
    return res
      .status(200)
      .json({ message: "Sector successfully updated", sector });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get sectors with categories
const getAllSectorsWithCategories = async (req, res) => {
  try {
    const sectors = await sectorServices.getAllSectorsWithCategories();
    res
      .status(200)
      .json({
        message: "Sectors with categories retrieved successfully",
        sectors,
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// export module
module.exports = {
  createSector,
  getAllSectors,
  deleteSector,
  editSector,
  getAllSectorsWithCategories,
};
