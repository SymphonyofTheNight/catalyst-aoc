import { getNavData } from "../layout";

if (getNavData) {
    getNavData.splice(0, 2);
}

interface CategoryImgArr {
    id: number;
    bgString: string;
    price: string;
    name: string;
    link: string | undefined;  // Store the path or undefined if not available
}

export const categoryImgArr: CategoryImgArr[] = [
    {
        id: 1,
        bgString: "bg-Blankets",
        price: "$29.99",
        name: "Blankets",
        link: getNavData ? getNavData[0]?.path : undefined,  // Get path from getNavData
    },
    {
        id: 2,
        bgString: "bg-Mattress",
        price: "$49.99",
        name: "Mattress",
        link: getNavData ? getNavData[1]?.path : undefined,
    },
    {
        id: 3,
        bgString: "bg-Sheets",
        price: "$79.99",
        name: "Sheets",
        link: getNavData ? getNavData[2]?.path : undefined,
    }
];

console.log(categoryImgArr);
