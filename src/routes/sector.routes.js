const sectorController = require("../controllers/sector.controllers");
const router = require("express-promise-router")();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/sectors", upload.single("image"), sectorController.createSector);
router.get("/sectors", sectorController.getAllSectors);
router.delete("/sectors/:id", sectorController.deleteSector);

module.exports = router;
