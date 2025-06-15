export const generateRandomId = (): string => {
    return (Math.random() * 100).toString()?.replaceAll('.', '');
};
