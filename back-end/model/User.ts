import express from 'express';
import userService from '../service/user.service';

const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const newUser = await userService.createUser(username, password, role);
        res.status(201).json(newUser);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await userService.getUserById(parseInt(req.params.id, 10));
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(200).json(user);
        }
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const data = req.body;

    try {
        const updatedUser = await userService.updateUser(id, data);
        res.status(200).json(updatedUser);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
        await userService.deleteUser(id);
        res.status(204).send();
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
