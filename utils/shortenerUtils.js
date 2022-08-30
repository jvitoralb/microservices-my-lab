const shortCode = () => {
    const randomStr = () => {
        return (Math.random() * performance.now()).toString(36).replace('.', '').substring(0, 3);
    }

    let str = randomStr();
    let ing = randomStr();
    return `${str}${ing}`;
}

export default shortCode;