import app from "./src/app.js";
import config from "./src/config/config.js";
import connectToDb from "./src/config/db.js";

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

connectToDb()
