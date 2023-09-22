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
  
    async registerUser() {
      try {
        // Coloca aquí la lógica para enviar los datos al backend
        // Esta función debe manejar la solicitud POST al backend
      } catch (error) {
        throw error;
      }
    }
  }
  
  export default UserModel;