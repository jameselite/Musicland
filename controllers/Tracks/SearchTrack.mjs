import prisma from "../../prismaClient.mjs";

export const SearchTracks = async (req, res) => {
  try {
    const query = req.params.q;
    if (!query || typeof query !== "string")
      return res
        .status(400)
        .json({ error: "There is a problem in search query." });

    const searchResults = await prisma.track.findMany({
      where: { title: { contains: query, mode: "insensitive" } },
    });
    if (searchResults.length == 0)
      return res.status(200).json({ message: "No track found." });

    if (query.length > 50) {
      return res.status(400).json({ error: "Search query is too long." });
    }

    return res.status(200).json({ searchResults, count: searchResults.length });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
