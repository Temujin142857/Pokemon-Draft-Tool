export const cacheData = async (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getCachedData = (key) => {
    const cachedData = localStorage.getItem(key);
    console.log('cached data', JSON.parse(cachedData));
    return cachedData ? JSON.parse(cachedData) : null;
};