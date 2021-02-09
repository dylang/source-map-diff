export interface Files {
    [filename: string]: number;
}

export interface Data {
    filename: string;
    path: string[];
    added: boolean;
    removed: boolean;
    isIncreased: boolean;
    isDecreased: boolean;
    isSame: boolean;
    currentSize: number;
    previousSize: number;
    changeInSize: number;
}

export const compareFileSizes = (currentFiles: Files, previousFiles: Files): Data[] => {
    const MINIMUM_DIFFERENCE_BYTES = 100;

    const chunks = new Set([...Object.keys(currentFiles), ...Object.keys(previousFiles)]);
    return Array.from(chunks)
        .sort()
        .map((name: string) => {
            const currentSize = currentFiles[name] || 0;
            const previousSize = previousFiles[name] || 0;
            const changeInSize = currentSize - previousSize;
            const isIncreased = changeInSize > MINIMUM_DIFFERENCE_BYTES;

            const isDecreased = previousSize - currentSize > MINIMUM_DIFFERENCE_BYTES;
            const isSame = !isIncreased && !isDecreased;

            const data: Data = {
                filename: name,
                path: name.split('/'),
                added: previousSize === 0,
                removed: currentSize === 0,
                isIncreased,
                isDecreased,
                isSame,
                previousSize,
                currentSize,
                changeInSize
            };

            return data;
        })
        .filter(({ isSame }) => !isSame);
};
