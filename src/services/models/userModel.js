import db from "../../../config.json"
import * as Localization from 'react-native-localize';

class UserModel {
  deviceLanguage = Localization.getLocales()[0].languageTag;

  constructor(id, first_name, last_name, company_id, phone, email, password, password2, country_id) {
    this.id = id
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
    const deviceLanguage = Localization.getLocales()[0].languageTag;
    try {
      const response = await fetch(`http://${db.database.host}${db.database.port}/user/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': deviceLanguage
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
    const deviceLanguage = Localization.getLocales()[0].languageTag;
    try {
      const response = await fetch(`https://${db.database.host}/userLogin/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': deviceLanguage
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

  async registerUserPhone(id, phoneToken) {
    const deviceLanguage = Localization.getLocales()[0].languageTag;
    try {
      const response = await fetch(`https://${db.database.host}/registerPhone/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': deviceLanguage
        },
        body: JSON.stringify({
          user_id: id,
          phone_token: phoneToken
        })
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

}



export default UserModel;
