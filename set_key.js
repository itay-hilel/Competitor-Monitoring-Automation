import { exec } from 'child_process';
import fs from 'fs';

const key = fs.readFileSync('private_key_pkcs8.pem', 'utf8');
// Replace newlines with actual newlines, but quoted
const escapedKey = key.trim(); // Remove trailing/leading whitespace

// Using a different approach: Write to a temporary file and use cat in the command? 
// No, let's try passing it differently.
// The issue is likely how the shell interprets the newlines when passed via the node exec command.

// Let's try writing it to a file inside the convex env set command using process substitution if possible,
// or just simply try to just manually set it via the dashboard instruction if all else fails.

// But wait, let's try to just escape it properly for a double-quoted string in bash.
// In bash, double quotes preserve newlines.
// But `exec` runs a shell.

// Let's try a simpler approach: use spawn to avoid shell escaping issues?
// Or just use the `convex env set` command's ability to read from stdin if it has one?
// It doesn't seem to support stdin for value.

console.log("Instructions: Please run this command manually in your terminal to set the key:");
console.log(`npx convex env set JWT_PRIVATE_KEY "${escapedKey.replace(/\n/g, '\\n')}"`);
