import { Order } from "./Order";
import { RoleEnum } from "./RoleEnum";

export class Customer {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  phone: string;
  order: Array<Order>;
  Created: Date;
  CreatedByRole: RoleEnum;
  SourcePerson: string;
  ApprovedByGeneralManager: boolean;
  Deleted: Date;
  Updated: Date;
}
