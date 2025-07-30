const redis = require("redis");

const client = redis.createClient({
  url: "redis://10.66.124.30:6379",
});

client
  .on("error", (err) => console.log("Redis Client Error", err))
  .on("connect", () => {
    console.log("Redis Connected successfully");
  });
client.connect();
// client.on("error", (err) => console.log("Redis Client Error", err));

// client.on("connect", () => {
//   console.log("Connected successfully");
// });

const cacheHelper = {
  async getItem(key) {
    console.log(client);
    const value = await client.get(key);
    return JSON.parse(value);
  },
  async setItem(key, value) {
    await client.setEx(key, 60, JSON.stringify(value));
  },
};

module.exports = { client, cacheHelper };
