import {Request, Response} from "express";
import {prisma, Prisma} from "@repo/product-db";

export const createCategory = async (req: Request, res: Response) => {
    const data: Prisma.CategoryCreateInput = req.body;

    const category = await prisma.category.create({ data });
    res.status(201).json(category);
};
export const updateCategory = async (req: Request, res: Response) => {
};
export const deleteCategory = async (req: Request, res: Response) => {
};
export const getCategorys = async (req: Request, res: Response) => {
};
export const getCategory = async (req: Request, res: Response) => {
};