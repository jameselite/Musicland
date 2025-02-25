import prisma from "../../prismaClient.mjs";

export const SearchTracks = async (req, res) => {
    
    const { q } = req.params;
    if(!q) throw new Error("Search query is empty.");

    if (!query || typeof query !== "string") {
        throw new Error("Invalid or empty search query.")
    }

    if (query.length > 50) {
        throw new Error("search query can not be larger than 50 character.")
    }

    const searchResults = await prisma.track.findMany({
        where: {
            title: {
                contains: q,
                mode: "insensitive"
            }
        }
    });

    if (searchResults.length === 0) {
        throw new Error("No products found matching the search query.")
    }

    return res.status(200).json({ data: searchResults, count: searchResults.length });
}