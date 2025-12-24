set -e

if [[ -z "$TELEGRAM_BOT_TOKEN" || -z "$TELEGRAM_CHAT_ID" ]]; then
  echo "❌ Telegram secrets are missing"
  exit 1
fi
MAX=3800

#CLEAN_BODY=$(echo "$COMMENT_BODY" | sed '/<!--.*-->/d')

FILES=$(echo "$COMMENT_BODY" | grep -E '^\| \*\*.*`' | sed -E 's/.*`([^`]+)`.*/\1/' | tr '\n' ',')

CHANGED_FILES_BULLETS=$(echo "$FILES" | tr ',' '\n' | sed 's/^/• /')

TEXT="CodeRabbitAI updated comment in PR #$PR_NUMBER

${CHANGED_FILES_BULLETS:0:$MAX}

🔗 $COMMENT_URL"

curl -s -X POST \
  "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
  -d chat_id="$TELEGRAM_CHAT_ID" \
  --data-urlencode text="$TEXT"
