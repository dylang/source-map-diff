export const getComparison = (currentFiles: Files, previousFiles: Files): Data[] => {
    const MINIMUM_DIFFERENCE_BYTES = 100;

    const chunks = new Set([...Object.keys(currentFiles), ...Object.keys(previousFiles)]);
    return Array.from(chunks).sort().map(name => {
        const currentSize = currentFiles[name] || 0;
        const previousSize = previousFiles[name] || 0;
        const changeInSize = currentSize - previousSize;
        const isIncreased = changeInSize > MINIMUM_DIFFERENCE_BYTES;
        const isDecreased = previousSize - currentSize > MINIMUM_DIFFERENCE_BYTES;
        const isSame = !isIncreased && !isDecreased;

        return {
            name,
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
    }).filter(({isSame}) => !isSame);
};
