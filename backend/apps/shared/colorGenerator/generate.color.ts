const colors = [
    '#F7C1A6',
    '#B9B9EA',
    '#B8F2EB',
    '#88B2E5',
    '#EF8E8E',
    '#CFF9D0',
    '#FFC5FF',
];
const getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * Math.floor(max));
};
export const randomAvatar = () => colors[getRandomInt(colors.length)];
