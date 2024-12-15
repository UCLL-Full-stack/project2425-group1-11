import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const seed = async () => {
    await prisma.user.create({
        data: {
            username: 'testuser',
            password: 'testuser',
            role: 'USER',
            boards: {
                create: [
                    {
                        name: 'Inspiration',
                        pins: {
                            create: [
                                {
                                    title: 'Placeholder pin',
                                    imageUrl: 'https://placehold.co/600x400',
                                    description: 'Placeholder pin description',
                                },
                            ],
                        },
                    },
                ],
            },
        },
    });

    console.log('Seeding complete!');
};

seed()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
