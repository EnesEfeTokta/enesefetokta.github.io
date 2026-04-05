import { Request, Response } from "express";
import prisma from "../db/prisma";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    const sanitizedUsers = users.map(sanitizeUser);
    res.json({ success: true, data: sanitizedUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching users" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: req.params.id },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, data: sanitizeUser(user) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching user" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const validation = createUserSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
        errors: validation.error.issues,
      });
    }

    const data = validation.data;
    const newUser = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        passwordHash: data.passwordHash,
        role: data.role,
        avatar: data.avatar,
      },
    });

    res.status(201).json({ success: true, data: sanitizeUser(newUser) });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    res.status(500).json({ success: false, message: "Error creating user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const validation = updateUserSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
        errors: validation.error.issues,
      });
    }

    const data = validation.data;
    const updatedUser = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        passwordHash: data.passwordHash,
        role: data.role,
        avatar: data.avatar,
      },
    });

    res.json({ success: true, data: sanitizeUser(updatedUser) });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    res.status(500).json({ success: false, message: "Error updating user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await prisma.user.delete({
      where: { id: req.params.id },
    });

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting user" });
  }
};

const sanitizeUser = (user: any) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  };
};
