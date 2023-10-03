import db from "../../../config.json";

class SolTypModel {
    constructor(id, description) {
        this.id = id;
        this.description = description;
    }

    async getSolTypes() {
        try {
            const response = await fetch(`http://${db.database.host}:${db.database.port}/solutionsTypes/`, {
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



export default SolTypModel;
