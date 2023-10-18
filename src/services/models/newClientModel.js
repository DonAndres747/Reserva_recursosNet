import db from "../../../config.json";

class NewClientModel {
    constructor(user_email, company_name) {
        this.user_email = user_email;
        this.company_name = company_name;
    }

    async registerNewClient() {
        try {
            const response = await fetch(`http://${db.database.host}:${db.database.port}/newClient/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_email: this.user_email,
                    company_name: this.company_name,
                }),
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

}

export default NewClientModel;
