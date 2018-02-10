import { JwtHelper } from "angular2-jwt";

export class UserHelper {
  /**
   * Gets logged-in user's claims
   */
  getLoggedInUserClaims() {
    const token = localStorage.getItem("token");

    if (!token) return null;
    else {
      // Decode the token
      return new JwtHelper().decodeToken(token);
    }
  }

  getRole() {
    const token = localStorage.getItem("token");

    if (!token) return null;
    else {
      // Decode the token
      const claims = new JwtHelper().decodeToken(token);

      if (claims && claims != null) {
        return claims.Role;
      }
    }
  }
}
