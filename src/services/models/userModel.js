import db from "../../../config.json";

class UserModel {
  constructor(firstName, lastName, company, phone, email, password, password2) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.company = company;
    this.phone = phone;
    this.email = email;
    this.password = password
    this.password2 = password2;
  }

  async registerUser() {
    try {
      const response = await fetch(`http://${db.database.host}:${db.database.port}/user/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company: this.company,
          email: this.email,
          first_name: this.firstName,
          last_name: this.lastName,
          password: this.password,
          password2: this.password2,
          phone: this.phone,
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
