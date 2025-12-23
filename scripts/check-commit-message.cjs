// const fs = require('node:fs');
//
// const validateCommitMessage = (message) => {
//     // Commit message pattern
//     const pattern = /^(feat|chore|fix)\(HB-\d+\): .+$/;
//
//     if (!pattern.test(message)) {
//         console.error('\x1b[31mError: Invalid commit message format\x1b[0m');
//         console.log('\nCommit message must follow the pattern:');
//         console.log('  feat(HB-0): text');
//         console.log('  chore(HB-0): text');
//         console.log('  fix(HB-0): text');
//         console.log('\nExample: feat(HB-123): add user authentication');
//         process.exit(1);
//     }
// };
//
// // Read commit message from file
// const commitMsgFile = process.argv[2];
// const commitMsg = fs.readFileSync(commitMsgFile, 'utf8').trim();
//
// validateCommitMessage(commitMsg);
// console.log('\x1b[32m✓ Commit message format is valid\x1b[0m');


const fs = require('fs');

const commitMsgFile = process.argv[2];

if (!commitMsgFile) {
    console.error("ERROR: Commit message file is missing");
    process.exit(1);
}

const commitMsg = fs.readFileSync(commitMsgFile, 'utf8').trim();

console.log("Commit message:");
console.log(commitMsg);
console.log("----------------");

const allowedTypes = ['feat', 'fix', 'chore'];

const regex = new RegExp(`^(${allowedTypes.join('|')})\\([A-Z]+-[0-9]+\\):\\s.+`);

if (!regex.test(commitMsg)) {
    console.error("❌ ERROR: Commit message format invalid!");
    console.error("Expected format:");
    console.error("  <type>(<TASK-ID>): <description>");
    console.error("Example:");
    console.error("  feat(TTT-3): add user login");
    process.exit(1);
}

console.log("✅ Commit message format is valid");
