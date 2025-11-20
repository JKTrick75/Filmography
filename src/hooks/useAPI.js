const BASE_URL = 'https://68daca7c23ebc87faa3143da.mockapi.io/api/simonsays';

export function useAPI() {
    // --- GET ---
    const getItems = async (endpoint) => {
        try {
            const response = await fetch(`${BASE_URL}/${endpoint}`);
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();
            return data;
        } catch (err) {
            console.error("API Error:", err);
            return null;
        }
    };

    // --- POST ---
    const createItem = async (endpoint, item) => {
        try {
            const response = await fetch(`${BASE_URL}/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });
            if (!response.ok) throw new Error(response.statusText);
            return await response.json();
        } catch (err) {
            console.error("API Error:", err);
            return null;
        }
    };

    // --- PUT ---
    const updateItem = async (endpoint, id, item) => {
         try {
            const response = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });
            return await response.json();
        } catch (err) {
            console.error("API Error:", err);
            return null;
        }
    };

    // --- DELETE ---
    const deleteItem = async (endpoint, id) => {
        try {
            await fetch(`${BASE_URL}/${endpoint}/${id}`, {
                method: 'DELETE',
            });
            return true;
        } catch (err) {
            console.error("API Error:", err);
            return false;
        }
    };

    // Devolvemos las funciones "normales"
    return { getItems, createItem, updateItem, deleteItem };
}