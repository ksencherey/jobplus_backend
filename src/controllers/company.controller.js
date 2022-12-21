const companyServices = require("../services/company.services");

//create Company
const createCompany = async (req, res) => {
  try {
    const company = await companyServices.createCompany(req.body);
    res.status(200).send({ message: "Company created successfully", company });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// get all companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await companyServices.getAllCompanies();
    res.status(200).send({ message: "List of all companies", companies });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// update company
const updateCompany = async (req, res) => {
  try {
    const company = await companyServices.updateCompany(
      req.params.id,
      req.body
    );
    res.status(200).send({ message: "Comapany successfully updated", company });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// delete Company
const deleteCompany = async (req, res) => {
  try {
    const company = await companyServices.deleteCompany(
      req.params.id,
      req.body
    );
    res.status(200).send({ message: "Comapny deleted successfully", company });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//export modules
module.exports = {
  createCompany,
  getAllCompanies,
  updateCompany,
  deleteCompany,
};
