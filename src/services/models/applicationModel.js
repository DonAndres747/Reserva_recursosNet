import db from "../../../config.json";

class ApplicationModel {
    constructor(solTyp, servTyp, recLvl, start, end, user_id) {
        this.solTyp = solTyp;
        this.servTyp = servTyp;
        this.recLvl = recLvl;
        this.start = start;
        this.end = end;
        this.user_id = user_id;
    }

    async bookApplication(token, ApplicationData, user_id) {
        try {
            const response = await fetch(`http://${db.database.host}:${db.database.port}/bookApplications/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    ApplicationData,
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
};

export default ApplicationModel;
