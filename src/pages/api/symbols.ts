// pages/api/symbols.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Fetch exchange information from Binance API
        const response = await axios.get(
            "https://api.binance.com/api/v3/exchangeInfo"
        );
        // Extract all symbols from the response
        const symbols = response.data.symbols.map(
            (symbol: any) => symbol.symbol
        );

        // Send the list of symbols as JSON
        res.status(200).json(symbols);
    } catch (error) {
        console.error("Error fetching symbols from Binance:", error);
        res.status(500).json({ error: "Failed to fetch symbols" });
    }
};

export default handler;