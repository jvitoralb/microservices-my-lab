
const shortCode = () => {
    let str = (Math.random() * performance.now()).toString(36).substring(4, 7);
    let ing = (Math.random() * performance.now()).toString(36).substring(4, 7);
    return `${str}${ing}`;
}

export default shortCode;