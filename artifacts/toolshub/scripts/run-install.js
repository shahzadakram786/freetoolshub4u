import { execSync } from "child_process";
try {
  console.log("Running pnpm install...");
  execSync("pnpm install", { stdio: "inherit", cwd: "/home/shahzad/Videos/AnyDesk/Traffic-Maximizer-Hub" });
  console.log("Done");
} catch (e) {
  console.error("Error", e);
}
