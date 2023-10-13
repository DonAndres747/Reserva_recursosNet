import db from "../../../config.json";

class CountryModel {
    constructor(id, description) {
        this.id = id;
        this.description = description;
    }

    async getCountries() {
        try {
            const response = await fetch(`http://${db.database.host}:${db.database.port}/countries/`, {
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



export default CountryModel;
