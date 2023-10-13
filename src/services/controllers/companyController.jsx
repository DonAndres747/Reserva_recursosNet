import CompanyModel from "../models/companieModel.js"

export default function companiesController() {
    const companyModel = new CompanyModel();

    const getAllCompanies = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await companyModel.getCompanies();
                const result = await response.json();
                resolve(result);
            } catch (error) {
                console.error("Error fetching data:", error);
                reject(error);
            }
        });
    };

    return { getAllCompanies };
}
