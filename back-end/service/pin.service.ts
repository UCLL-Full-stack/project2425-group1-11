import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Creates a new pin with the given title, image URL, description, board ID, and category IDs
const createPin = async (data: {
    title: string;
    imageUrl: string;
    description?: string;
    boardId?: number;
    categories?: number[];
}) => {
    return prisma.pin.create({
        data: {
            title: data.title,
            imageUrl: data.imageUrl,
            description: data.description,
            boardId: data.boardId,
            categories: {
                connect: data.categories?.map((id) => ({ id })),
            },
        },
        include: {
            categories: true,
        },
    });
};

// Gets all pins
const getAllPins = async () => {
    return prisma.pin.findMany({
        include: {
            board: true,
            categories: true,
        },
    });
};

// TODO Gets all pins for a specific category

// TODO Gets all pins for a specific user

// TODO Gets all pins for a specific board

// Gets a pin by ID
const getPinById = async (id: number) => {
    return prisma.pin.findUnique({
        where: { id },
        include: {
            board: true,
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
        boardId?: number;
        categories?: number[];
    }
) => {
    return prisma.pin.update({
        where: { id },
        data: {
            title: data.title,
            imageUrl: data.imageUrl,
            description: data.description,
            boardId: data.boardId,
            categories: data.categories
                ? {
                      set: data.categories.map((id) => ({ id })),
                  }
                : undefined,
        },
        include: {
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

export default { createPin, getAllPins, getPinById, updatePin, deletePin };
