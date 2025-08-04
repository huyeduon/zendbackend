const redis = require("redis");

const client = redis.createClient({
  // url: "redis://10.66.124.30:6379",
  url: "redis://localhost:6379",
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

  async deleteKeysByPattern(pattern) {
    console.log("deleteKeysByPattern");
    try {
      const keys = await client.keys(pattern);
      console.log(keys);
      if (keys.length > 0) {
        await client.del(keys);
        console.log(`Deleted ${keys.length} keys matching pattern: ${pattern}`);
      }
    } catch (error) {
      console.log("No key", error);
    }

    // let cursor = '0';
    // do {
    //   const reply = await client.scan(cursor, 'MATCH', pattern, 'COUNT', '100'); // Adjust COUNT as needed
    //   cursor = reply[0];
    //   const keys = reply[1];

    //   if (keys.length > 0) {
    //     await client.del(keys); // Delete multiple keys at once
    //     console.log(`Deleted ${keys.length} keys matching pattern: ${pattern}`);
    //   }
    // } while (cursor !== '0');
    // console.log('Finished deleting keys by pattern.');
  },
};

module.exports = { client, cacheHelper };
