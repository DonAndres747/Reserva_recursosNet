import db from "../../../config.json";

class ResourceModel {
  constructor(
    user_id,
    first_name,
    last_name,
    level,
    description,
    skills,
    boodDays
  ) {
    this.user_id = user_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.level = level;
    this.description = description;
    this.skills = skills;
    this.bookDays = boodDays;
  }

  async getResourcesBySkill(token) {
    try {
      const response = await fetch(
        `http://${db.database.host}:${db.database.port}/resourcesBySkill/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            level: this.level,
            skills: this.skills,
          }),
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async bookResource(token, bookingData) {
    try {
      const response = await fetch(
        `http://${db.database.host}:${db.database.port}/bookResource/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            bookingData,
          }),
        }
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getResourceBookDays(token) {
    try {
      const response = await fetch(
        `http://${db.database.host}:${db.database.port}/resourcesBookedDays/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            rsce_id: this.user_id,
          }),
        }
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async extraRequest(token, requestData) {
    try {
      const response = await fetch(
        `http://${db.database.host}:${db.database.port}/bookExtraRequest/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            requestData,
          }),
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default ResourceModel;
