const getUserBoards = async () => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/boards`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
};

const updatePinBoards = async (pinId: number, boardIds: number[]) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/pins/${pinId}/boards`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ boardIds }),
    });
};

const BoardService = {
    getUserBoards,
    updatePinBoards,
};

export default BoardService;
