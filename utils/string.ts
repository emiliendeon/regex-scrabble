import { shuffleArray } from "./array";

export const formatSearch = (search: string) =>
    search
        .replace(/\s+/g, "")
        .replace(/[ÁáÀàÂâÄäÅå]/g, "A")
        .replace(/[Çç]/g, "C")
        .replace(/[ÉéÈèÊêËë]/g, "E")
        .replace(/[ÍíÌìÎîÏï]/g, "I")
        .replace(/[Ññ]/g, "N")
        .replace(/[ÓóÒòÔôÖöØø]/g, "O")
        .replace(/[ÚúÙùÛûÜü]/g, "U")
        .replace(/[ÝýỲỳŶŷŸÿ]/g, "Y")
        .replace(/[Ææ]/g, "AE")
        .replace(/[Œœ]/g, "OE")
        .toUpperCase();

export const shuffleString = (str: string) => {
    return shuffleArray([...str]).join("");
};
