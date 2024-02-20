import db from "../../../config.json";

class ComponentModel {
    constructor(id, name, description, rate) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.rate = rate;
    }

    async getComponentsByType(token, data) {
        try {
            const response = await fetch(`http://${db.database.host}:${db.database.port}/componentsByType/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    soltyp: data.solTyp,
                    compList: data.compList,
                }),
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async bookComponents(token, selectedComponents, user_id) {
        try {
            const response = await fetch(`http://${db.database.host}:${db.database.port}/bookComponents/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    selectedComponents,
                    user_id: user_id
                }),
            });

            const result = await response.json();
            return { "result": result, "status": response.status };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}



export default ComponentModel;
