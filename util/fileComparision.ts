import formatFileSize from "./formSize"

export type Comparision = {
    publicId: string | undefined;

    original: {
        size: string;
    };
    optimized: {
        size: string;
    };
    saved: {
        size: string;
        percent: string;
    };
}

export default function fileComparison(originalSize: number, optimizedSize: number, publicId?: string) {
    const comparison: Comparision = {
        publicId,
        original: {
            size: formatFileSize(originalSize),
        },
        optimized: {
            size: formatFileSize(optimizedSize),
        },
        saved: {
            size: formatFileSize(originalSize - optimizedSize),
            percent: ((1 - optimizedSize / originalSize) * 100).toFixed(2),
        },
    }

    return comparison
}