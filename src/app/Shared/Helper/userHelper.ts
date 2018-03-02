import { RoleEnum } from './../../Model/RoleEnum';
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

  /**
   * Returns the role of the user Token
  */
  getRole(): RoleEnum {
    const token = localStorage.getItem("token");

    if (!token) return null;
    else {
      // Decode the token
      const claims = new JwtHelper().decodeToken(token);

      if (claims && claims != null) {
        const role: string = claims.Role;
        return RoleEnum[role];
      }
    }
  }
}
