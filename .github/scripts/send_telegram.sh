set -e

if [[ -z "$TELEGRAM_BOT_TOKEN" || -z "$TELEGRAM_CHAT_ID" ]]; then
  echo "❌ Telegram secrets are missing"
  exit 1
fi
MAX=3800

#CLEAN_BODY=$(echo "$COMMENT_BODY" | sed '/<!--.*-->/d')

CHANGED_FILES=$(echo "$COMMENT_BODY" \
  | sed -n 's/.*<br>\(.*\)|.*/\1/p' \
  | grep -oP '`[^`]+`' \
  | tr -d '`')

CHANGED_FILES_BULLETS=$(echo "$CHANGED_FILES" | sed 's/^/• /')

TEXT="CodeRabbitAI updated comment in PR #$PR_NUMBER

${CHANGED_FILES_BULLETS:0:$MAX}

🔗 $COMMENT_URL"

curl -s -X POST \
  "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
  -d chat_id="$TELEGRAM_CHAT_ID" \
  --data-urlencode text="$TEXT"
