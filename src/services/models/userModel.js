import { url, port } from "../conection";

class UserModel {
  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.company = '';
    this.phone = '';
    this.email = '';
    this.password = '';
    this.password2 = '';
  }

  async registerUser(userModelData) {
    try {
      const response = await fetch(`http://${url}:${port}/user/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Puedes agregar cualquier otra cabecera necesaria, como la autorización
        },
        body: JSON.stringify({
          company: userModelData.company,
          email: userModelData.email,
          first_name: userModelData.firstName,
          last_name: userModelData.lastName,
          password: userModelData.password,
          password2: userModelData.password2,
          phone: userModelData.phone,
        }),
      });

      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default UserModel;
