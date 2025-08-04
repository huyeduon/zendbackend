const fetchData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data;
    // data here is actually a Promise
  } catch (error) {
    console.log("Error", error);
  }
};

const processUserData = async () => {
  try {
    const users = await fetchData();
    console.log("Fetched Users:", users);
  } catch (error) {
    console.error("Failed to process user data", error);
  }
};

processUserData();
