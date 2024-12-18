export const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            try {
                const { token } = JSON.parse(loggedInUser);
                return token;
            } catch (error) {
                console.error('Error parsing the token:', error);
                return null;
            }
        }
    }
    return null;
};

export const getUserId = (): number | null => {
    if (typeof window !== 'undefined') {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            try {
                const { id } = JSON.parse(loggedInUser);
                return id || null;
            } catch (error) {
                console.error('Error parsing the user ID:', error);
                return null;
            }
        }
    }
    return null;
};
