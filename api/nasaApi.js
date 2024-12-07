const BASE_URL = "https://images-api.nasa.gov/search";

export const fetchImages = async (query, page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}?q=${query}&media_type=image&page=${page}`);
        if (!response.ok) {
            throw new Error("Erro ao buscar dados da API da NASA.");
        }
        const data = await response.json();
        const totalHits = data.collection.metadata.total_hits;
        const items = data.collection.items.filter(
            (item) => item.links && item.links[0] && item.links[0].href
        );
        return { items, totalHits };
    } catch (error) {
        console.error("Erro na requisição:", error);
        return { items: [], totalHits: 0 };
    }
};
