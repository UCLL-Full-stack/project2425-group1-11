const getPins = async (page: number = 1): Promise<Response> => {
    try {
        const token = localStorage.getItem('loggedInUser')
            ? JSON.parse(localStorage.getItem('loggedInUser') || '').token
            : null;

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

const PinsService = {
    getPins,
};

export default PinsService;
