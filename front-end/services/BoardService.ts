import { getToken, getUserId } from './LocalStorageService';

const updatePinBoards = async (pinId: number, boardIds: number[]) => {
    const token = getToken();
    if (!token) {
        throw new Error('No authentication token found.');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pins/${pinId}/boards`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ boardIds }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update pin boards');
        }

        return response.json();
    } catch (error) {
        console.error('Error updating pin boards:', error);
        throw new Error('Unable to connect to the server or invalid input.');
    }
};

const getUserBoards = async (): Promise<any> => {
    try {
        const userId = getUserId();
        if (!userId) {
            throw new Error('No user ID found');
        }

        const token = getToken();
        if (!token) {
            throw new Error('No authentication token found.');
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/user/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || 'Failed to fetch boards');
        }

        const contentType = response.headers.get('Content-Type');

        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Expected JSON, but received: ' + contentType);
        }
    } catch (error) {
        console.error('Error fetching boards:', error);
        throw new Error('Unable to connect to the server or invalid input.');
    }
};

const BoardService = {
    getUserBoards,
    updatePinBoards,
};

export default BoardService;
