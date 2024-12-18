import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Creates a new pin with the given title, image URL, description, and optional category IDs
const createPin = async (data: {
    title: string;
    imageUrl: string;
    description?: string;
    categories?: number[]; // Optional categories
}) => {
    return prisma.pin.create({
        data: {
            title: data.title,
            imageUrl: data.imageUrl,
            description: data.description,
            categories: {
                connect: data.categories?.map((id) => ({ id })),
            },
        },
        include: {
            categories: true,
        },
    });
};

// Links an existing pin to a board of the user
const addPinToBoard = async (pinId: number, boardId: number) => {
    return prisma.pin.update({
        where: { id: pinId },
        data: {
            boards: {
                connect: { id: boardId },
            },
        },
        include: {
            boards: true,
        },
    });
};

// Gets all pins
const getAllPins = async () => {
    return prisma.pin.findMany({
        include: {
            boards: true,
            categories: true,
        },
    });
};

// Gets all pins for a specific category
const getPinsByCategory = async (categoryId: number) => {
    return prisma.pin.findMany({
        where: {
            categories: {
                some: { id: categoryId },
            },
        },
        include: {
            boards: true,
            categories: true,
        },
    });
};

// Gets all pins for a specific user
const getPinsByUser = async (userId: number) => {
    return prisma.pin.findMany({
        where: {
            boards: {
                some: { userId: userId },
            },
        },
        include: {
            boards: true,
            categories: true,
        },
    });
};

// Gets all pins for a specific board
const getPinsByBoard = async (boardId: number) => {
    return prisma.pin.findMany({
        where: {
            boards: {
                some: { id: boardId },
            },
        },
        include: {
            boards: true,
            categories: true,
        },
    });
};

// Gets a pin by ID
const getPinById = async (id: number) => {
    return prisma.pin.findUnique({
        where: { id },
        include: {
            boards: true,
            categories: true,
        },
    });
};

// Updates a pin by ID
const updatePin = async (
    id: number,
    data: {
        title?: string;
        imageUrl?: string;
        description?: string;
        boardIds?: number[];
        categories?: number[];
    }
) => {
    return prisma.pin.update({
        where: { id },
        data: {
            title: data.title,
            imageUrl: data.imageUrl,
            description: data.description,
            boards: data.boardIds ? { set: data.boardIds.map((id) => ({ id })) } : undefined,
            categories: data.categories
                ? { set: data.categories.map((id) => ({ id })) }
                : undefined,
        },
        include: {
            boards: true,
            categories: true,
        },
    });
};

// Deletes a pin by ID
const deletePin = async (id: number) => {
    return prisma.pin.delete({
        where: { id },
    });
};

export default {
    createPin,
    addPinToBoard,
    getAllPins,
    getPinsByCategory,
    getPinsByUser,
    getPinsByBoard,
    getPinById,
    updatePin,
    deletePin,
};
