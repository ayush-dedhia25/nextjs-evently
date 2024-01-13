"use server";

import { CreateCategoryParams } from "@/types";
import { connect } from "../database";
import Category from "../database/models/Category.model";
import { handleError } from "../utils";

export async function createCategory({ categoryName }: CreateCategoryParams) {
  try {
    await connect();
    const newCategory = await Category.create({ name: categoryName });
    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllCategories() {
  try {
    await connect();
    const categories = await Category.find();
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
}
