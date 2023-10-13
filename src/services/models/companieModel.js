import db from "../../../config.json";

class CompanyModel {
    constructor(id, description) {
        this.id = id;
        this.description = description;
    }

    async getCompanies() {
        try {
            const response = await fetch(`http://${db.database.host}:${db.database.port}/companies/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

}



export default CompanyModel;
