"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/Category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type CategoryFilterProps = {};

function CategoryFilter({}: CategoryFilterProps) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();
      if (categoryList) {
        setCategories(categoryList as ICategory[]);
      }
    };
    getCategories();
  }, []);

  const onSelectCategory = (category: string) => {
    let newUrl;

    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all" className="select-item p-regular-14">
          All
        </SelectItem>
        {categories.map((category) => (
          <SelectItem
            key={category._id}
            value={category.name}
            className="select-item p-regular-14"
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CategoryFilter;
