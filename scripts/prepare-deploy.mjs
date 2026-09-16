import { copyFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
await mkdir(resolve(root, "out"), { recursive: true });
await copyFile(resolve(root, "deploy/.htaccess"), resolve(root, "out/.htaccess"));
console.log("Файл out/.htaccess добавлен в сборку для Beget.");
