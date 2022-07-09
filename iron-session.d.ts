import { UserType } from "./src/redux/userSlice";

declare module "iron-session" {
    interface IronSessionData {
      user?: UserType;
    }
  }