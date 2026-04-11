import { execSync } from "child_process";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pkg = "onnxruntime-web@1.21.0";
    let stdout = "";
    try {
      stdout += execSync(`npm install ${pkg}`, { cwd: "/home/shahzad/Videos/AnyDesk/Traffic-Maximizer-Hub/artifacts/toolshub", encoding: "utf-8", stdio: "pipe" });
    } catch (e: any) {
      stdout += `\nNPM Error: ${e.message}\n${e.stdout?.toString() || ""}\n`;
      try {
        stdout += execSync(`/opt/pnpm/bin/pnpm install`, { cwd: "/home/shahzad/Videos/AnyDesk/Traffic-Maximizer-Hub/artifacts/toolshub", encoding: "utf-8", stdio: "pipe" });
      } catch (err: any) {
         stdout += `\nPNPM Error: ${err.message}\n${err.stdout?.toString() || ""}\n`;
         throw new Error("Both package managers failed: " + stdout);
      }
    }
    return NextResponse.json({ success: true, stdout });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message, stack: error.stack }, { status: 500 });
  }
}
