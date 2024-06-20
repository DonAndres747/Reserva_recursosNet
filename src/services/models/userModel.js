import db from "../../../config.json"

class UserModel {
  constructor(first_name, last_name, company_id, phone, email, password, password2, country_id) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.company_id = company_id;
    this.phone = phone;
    this.email = email;
    this.password = password
    this.password2 = password2;
    this.country_id = country_id;
  }

  async registerUser() {
    try {
      const response = await fetch(`http://${db.database.host}:${db.database.port}/user/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_id: this.company_id,
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name,
          password: this.password,
          password2: this.password2,
          phone: this.phone,
          country_id: this.country_id,
        }),
      });
      return response;
    } catch (error) {
      throw error;
    }
  }


  async loginUser() {
    try {
      const response = await fetch(`http://${db.database.host}:${db.database.port}/userLogin/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

}



export default UserModel;
