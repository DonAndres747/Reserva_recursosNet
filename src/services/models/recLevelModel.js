import db from "../../../config.json";

class RecLevelModel {
    constructor(id, description) {
        this.id = id;
        this.description = description;
    }

    async getSolTypes() {
        try {
            const response = await fetch(`http://${db.database.host}:${db.database.port}/recLevels/`, {
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



export default RecLevelModel;