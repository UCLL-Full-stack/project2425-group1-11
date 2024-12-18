import { getToken } from './LocalStorage';

const getPins = async (page: number = 1): Promise<Response> => {
    try {
        const token = getToken();

        if (!token) {
            throw new Error('No authentication token found.');
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pins?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch pins');
        }

        return response;
    } catch (error) {
        console.error('Error fetching pins:', error);
        throw new Error('Unable to connect to the server or invalid input.');
    }
};

const addPinToBoards = async (pinId: number, boardIds: number[]): Promise<Response> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pins/${pinId}/boards`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ boardIds }),
        });

        return response;
    } catch (error) {
        console.error('Error adding pin to boards:', error);
        throw new Error('Unable to connect to the server.');
    }
};

const removePinFromBoards = async (pinId: number, boardIds: number[]): Promise<Response> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pins/${pinId}/boards`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ boardIds }),
        });

        return response;
    } catch (error) {
        console.error('Error removing pin from boards:', error);
        throw new Error('Unable to connect to the server.');
    }
};

const PinsService = {
    getPins,
    addPinToBoards,
    removePinFromBoards,
};

export default PinsService;
