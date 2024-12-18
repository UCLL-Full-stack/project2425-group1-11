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

const addPinToBoards = async (pinId: number, boardIds: number[]) => {
    const token = getToken();
    if (!token) {
        throw new Error('No authentication token found');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pins/${pinId}/boards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                boardIds,
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('Failed to add pin to boards:', responseData);
            throw new Error(responseData.error || 'Failed to add pin to boards');
        }

        return responseData;
    } catch (error) {
        console.error('Error in adding pin to boards:', error);
        throw new Error('Unable to connect to the server or invalid input.');
    }
};

const removePinFromBoards = async (pinId: number, boardIds: number[]) => {
    const token = getToken();
    if (!token) {
        throw new Error('No authentication token found.');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pins/${pinId}/boards`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                boardIds: boardIds,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to remove pin from boards');
        }

        return response.json();
    } catch (error) {
        console.error('Error removing pin from boards:', error);
        throw new Error('Unable to connect to the server or invalid input.');
    }
};

const PinsService = {
    getPins,
    addPinToBoards,
    removePinFromBoards,
};

export default PinsService;
