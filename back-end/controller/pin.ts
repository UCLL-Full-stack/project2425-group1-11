import express from 'express';
import pinService from '../service/pin.service';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pins
 *   description: API endpoints for managing pins
 */

/**
 * @swagger
 * /pins:
 *   post:
 *     summary: Create a new pin
 *     tags: [Pins]
 *     description: Add a new pin with optional categories. Pins can be linked to boards later.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Beautiful Landscape"
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               description:
 *                 type: string
 *                 example: "A beautiful sunset view."
 *               categories:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *     responses:
 *       201:
 *         description: Pin created successfully.
 *       400:
 *         description: Invalid input or error during creation.
 */
router.put('/:id/boards', async (req, res) => {
    try {
        const { id } = req.params;
        const { boardIds } = req.body;
        const updatedPin = await pinService.addPinToBoards(Number(id), boardIds);
        res.status(200).json(updatedPin);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

/**
 * @swagger
 * /pins/{id}/boards:
 *   post:
 *     summary: Add an existing pin to multiple boards
 *     tags: [Pins]
 *     description: Link a pin to multiple boards by providing the pin ID and an array of board IDs.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the pin to link.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               boardIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *     responses:
 *       200:
 *         description: Pin linked to the boards successfully.
 *       400:
 *         description: Invalid input or error during the linking process.
 */
router.post('/:id/boards', async (req, res) => {
    try {
        const { id } = req.params;
        const { boardIds } = req.body;
        const updatedPin = await pinService.addPinToBoards(Number(id), boardIds);
        res.status(200).json(updatedPin);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

/**
 * @swagger
 * /pins/{id}/boards/{boardId}:
 *   delete:
 *     summary: Remove a pin from a board
 *     tags: [Pins]
 *     description: Unlink a pin from a board by providing the pin ID and board ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the pin to unlink.
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the board to unlink.
 *     responses:
 *       200:
 *         description: Pin unlinked from the board successfully.
 *       400:
 *         description: Invalid input or error during the unlinking process.
 */
router.delete('/:id/boards', async (req, res) => {
    try {
        const { id } = req.params;
        const { boardIds } = req.body;
        const updatedPin = await pinService.removePinFromBoards(Number(id), boardIds);
        res.status(200).json(updatedPin);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

/**
 * @swagger
 * /pins:
 *   get:
 *     summary: Get all pins with pagination
 *     tags: [Pins]
 *     description: Retrieve a paginated list of pins, sorted by newest first.
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number (default is 1).
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: integer
 *           default: 12
 *         description: The number of pins per page (default is 12).
 *     responses:
 *       200:
 *         description: A paginated list of pins.
 *       500:
 *         description: Server error during retrieval.
 */
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 1; // Default to page 1
        const pageSize = parseInt(req.query.pageSize as string, 10) || 12; // Default to 12 items per page

        const pins = await pinService.getAllPins(page, pageSize);
        res.status(200).json(pins);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /pins/{id}:
 *   get:
 *     summary: Get a specific pin by ID
 *     tags: [Pins]
 *     description: Retrieve details of a single pin using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the pin.
 *     responses:
 *       200:
 *         description: Pin retrieved successfully.
 *       404:
 *         description: Pin not found.
 *       400:
 *         description: Invalid request.
 */
router.get('/:id', async (req, res) => {
    try {
        const pin = await pinService.getPinById(parseInt(req.params.id, 10));
        if (!pin) {
            res.status(404).json({ error: 'Pin not found' });
        } else {
            res.status(200).json(pin);
        }
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

/**
 * @swagger
 * /pins/{id}:
 *   put:
 *     summary: Update a pin
 *     tags: [Pins]
 *     description: Update the details of an existing pin.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the pin.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Pin Title"
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/updated-image.jpg"
 *               description:
 *                 type: string
 *                 example: "An updated description."
 *               boardIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [2, 3]
 *               categories:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [2, 3]
 *     responses:
 *       200:
 *         description: Pin updated successfully.
 *       400:
 *         description: Invalid input or error during update.
 */
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { title, imageUrl, description, boardIds, categories } = req.body;

    try {
        const updatedPin = await pinService.updatePin(id, {
            title,
            imageUrl,
            description,
            boardIds,
            categories,
        });
        res.status(200).json(updatedPin);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

/**
 * @swagger
 * /pins/{id}:
 *   delete:
 *     summary: Delete a pin
 *     tags: [Pins]
 *     description: Remove a pin from the database using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the pin.
 *     responses:
 *       204:
 *         description: Pin deleted successfully.
 *       400:
 *         description: Error during deletion.
 */
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
        await pinService.deletePin(id);
        res.status(204).send();
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
