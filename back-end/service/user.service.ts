import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Creates a new user with the given username, password, and role
const createUser = async (username: string, password: string, role: string) => {
    // Check if the username already exists
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) throw new Error('Username already exists');
    if (password.length < 8) throw new Error('Password must be at least 8 characters long');

    const validRoles = ['USER', 'ADMIN'];
    if (!validRoles.includes(role)) throw new Error('Invalid role');

    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
        data: { username, password: hashedPassword, role },
    });
};

// Gets all users
const getAllUsers = async () => {
    return prisma.user.findMany();
};

// Gets a user by ID
const getUserById = async (id: number) => {
    return prisma.user.findUnique({
        where: { id },
    });
};

// Updates a user by ID
const updateUser = async (
    id: number,
    data: Partial<{ username: string; password: string; role: string }>
) => {
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }

    return prisma.user.update({
        where: { id },
        data,
    });
};

// Deletes a user by ID
const deleteUser = async (id: number) => {
    return prisma.user.delete({
        where: { id },
    });
};

export default {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
