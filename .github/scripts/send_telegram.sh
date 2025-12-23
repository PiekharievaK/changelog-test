set -e

if [[ -z "$TELEGRAM_BOT_TOKEN" || -z "$TELEGRAM_CHAT_ID" ]]; then
  echo "❌ Telegram secrets are missing"
  exit 1
fi

TEXT="🧠 CodeRabbitAI updated comment in PR #$PR_NUMBER

$COMMENT_BODY

🔗 $COMMENT_URL"

curl -s -X POST \
  "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
  -d chat_id="$TELEGRAM_CHAT_ID" \
  --data-urlencode text="$TEXT"
