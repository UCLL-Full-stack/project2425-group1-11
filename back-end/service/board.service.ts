import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Creates a new board with the given name and user ID
const createBoard = async (name: string, userId: number) => {
    return prisma.board.create({
        data: { name, userId },
    });
};

// Gets all boards
const getAllBoards = async () => {
    return prisma.board.findMany({
        include: { user: true, pins: true },
    });
};

// TODO Get all boards for a category

// TODO Get all boards for a user

// Gets a board by ID
const getBoardById = async (id: number) => {
    return prisma.board.findUnique({
        where: { id },
        include: { user: true, pins: true },
    });
};

// Updates a board by ID
const updateBoard = async (id: number, data: Partial<{ name: string }>) => {
    return prisma.board.update({
        where: { id },
        data,
    });
};

// Deletes a board by ID
const deleteBoard = async (id: number) => {
    return prisma.board.delete({
        where: { id },
    });
};

export default {
    createBoard,
    getAllBoards,
    getBoardById,
    updateBoard,
    deleteBoard,
};
