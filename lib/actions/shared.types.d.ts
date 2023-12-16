import { IUser } from "@/database/user.model";

export interface DataUserParams {
  clerkId: string;
  username: string;
  name: string;
  picture: string;
  emai: string;
}

export interface updateUserParams {
    clerkId:string;
    updateData: Partial<IUser>
    path:string
}

export interface deleteUserParams {
    clerkId:string;

}

export interface GetUserByIdParams {
    userId:string
}
