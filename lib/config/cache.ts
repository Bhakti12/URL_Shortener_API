import redisClient from "./redisClient";

const CACHE_EXPIRATION = 60 * 60; // 1 hour

export const setCache = async (key: string, value: any, expiration = CACHE_EXPIRATION): Promise<void> => {
  try {
    const data = JSON.stringify(value);
    await redisClient.setex(key, expiration, data);
  } catch (error) {
    console.error("Error setting cache:", error);
  }
};

export const getCache = async (key: string): Promise<any | null> => {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error retrieving cache:", error);
    return null;
  }
};

export const deleteCache = async (key: string): Promise<void> => {
  try {
    await redisClient.del(key);
  } catch (error) {
    console.error("Error deleting cache:", error);
  }
};
