import db from "../../../config.json";

class RequestModel {
    constructor(req_id, resource_name, reqMng_name, rcvMng_name, reserved_date, requested_date, crozDates, request_status) {
        this.req_id = req_id;
        this.resource_name = resource_name;
        this.rcvMng_name = rcvMng_name;
        this.reqMng_name = reqMng_name;
        this.reserved_date = reserved_date;
        this.requested_date = requested_date;
        this.crozDates = crozDates;
        this.request_status = request_status;
    }

    async getRequestByManager(token, managerId, type) {
        try {
            const response = await fetch(`http://${db.database.host}:${db.database.port}/requests/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    managerId,
                    type,
                }),
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async denyRequest(token, req_id) {
        try {
            const response = await fetch(`http://${db.database.host}:${db.database.port}/denyRequest/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    req_id
                }),
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    async acceptRequest(token, req_id) {
        try {
            const response = await fetch(`http://${db.database.host}:${db.database.port}/acceptRequest/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    req_id
                }),
            }); 
            return response;
        } catch (error) {
            console.log("error accepting request", error);
        }
    }

}

export default RequestModel;
