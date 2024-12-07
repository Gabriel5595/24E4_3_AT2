const BASE_URL = "https://images-api.nasa.gov/search";

export const fetchImages = async (query, page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}?q=${query}&page=${page}`);
        if (!response.ok) {
            throw new Error("Erro ao buscar dados da API da NASA.");
        }
        const data = await response.json();
        // Filtrar apenas itens com imagens válidas
        return data.collection.items.filter(
            (item) => item.links && item.links[0] && item.links[0].href
        );
    } catch (error) {
        console.error("Erro na requisição:", error);
        return [];
    }
};
