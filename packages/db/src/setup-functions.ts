import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import postgres from "postgres";

const envPath = path.resolve(__dirname, "../../../.env");
dotenv.config({ path: envPath });

async function setupTriggers() {
  const sqlPath = path.join(__dirname, "functions", "handle_new_user.sql");
  const sql = fs.readFileSync(sqlPath, "utf8");

  const sqlClient = postgres(String(process.env.DATABASE_URL));

  try {
    console.log("Executing trigger setup...");
    await sqlClient.unsafe(sql);
    console.log("Trigger setup complete!");
  } catch (error) {
    console.error("Error setting up triggers:", error);
  } finally {
    await sqlClient.end();
  }
}

setupTriggers();
