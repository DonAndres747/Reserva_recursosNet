import db from "../../../config.json";

class ResourceModel {
    constructor(user_id, first_name, last_name, level, description, skills) {
        this.user_id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.level = level;
        this.description = description;
        this.skills = skills;
    }

    async getResourcesBySkill(token) {
        try {
            const response = await fetch(`http://${db.database.host}:${db.database.port}/resourcesBySkill/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    level: this.level,
                    skills: this.skills,
                }),
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async bookResource(token, bookingData) {
        try {
            const response = await fetch(`http://${db.database.host}:${db.database.port}/bookResource/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    bookingData,
                }),
            }); 
            
            return response;
        } catch (error) {
            throw error;
        }
    }



}



export default ResourceModel;
