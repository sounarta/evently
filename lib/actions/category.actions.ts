"use server";

import Category from "@/database/category.model";
import { ConnectToDatabase } from "../mongoose";
import { createCategoryParams } from "./shared.types";

export async function createCategory(params: createCategoryParams) {
  try {
    await ConnectToDatabase();

    const { categoryName } = params;
    const newCategory = await Category.create({ name: categoryName });
    return newCategory;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllCategories(params: any) {
  try {
    await ConnectToDatabase();

    const categories = await Category.find();
    return { categories };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
