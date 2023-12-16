"use server";
import User from "@/database/user.model";
import { ConnectToDatabase } from "../mongoose";
import {
  DataUserParams,
  GetUserByIdParams,
  deleteUserParams,
  updateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Event from "@/database/event.model";
import Order from "@/database/order.model";

export async function createUser(DataUser: DataUserParams) {
  try {
   await  ConnectToDatabase();
    const newUser = await User.create(DataUser);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: updateUserParams) {
  try {
    await ConnectToDatabase();
    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: deleteUserParams) {
  try {
    await ConnectToDatabase();
    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not Found");
    }
    await Order.deleteMany({ buyer: user._id });
    await Event.deleteMany({ organizer: user._id });

    const deleteUser = await User.findByIdAndDelete(user._id);

    return deleteUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserById(params: GetUserByIdParams) {
  try {
    ConnectToDatabase();
    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
