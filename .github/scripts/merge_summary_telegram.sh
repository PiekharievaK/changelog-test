set -e

if [[ -z "$TELEGRAM_BOT_TOKEN" || -z "$TELEGRAM_CHAT_ID" ]]; then
  echo "❌ Telegram secrets are missing"
  exit 1
fi

MAX=3800

CLEAN_BODY=$(echo "$COMMENT_BODY" \
  | sed '/<!--.*-->/d' \
  | sed '/^[[:space:]]*$/N;/^\n$/D' \
  | sed 's/^## \(.*\)$/**\1**/' \
  | sed 's/^- \(.*\)$/• **\1**/' )

MERGE_DATE_FORMATTED=""
if [[ -n "$MERGE_DATE" ]]; then
  MERGE_DATE_FORMATTED=$(date -d "$MERGE_DATE" "+%d.%m.%Y %H:%M UTC")
fi

MESSAGE_HEADER="🚀 New release ${VERSION:+v$VERSION} in ${REPO_NAME:-repository}
📌 PR: $PR_TITLE
👤 Merged by: ${MERGE_AUTHOR:-unknown}
${MERGE_DATE_FORMATTED}"


TEXT="${MESSAGE_HEADER}

${CHANGED_FILES}

${CLEAN_BODY:0:$MAX}

🔗 $COMMENT_URL"

curl -s -X POST \
  "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
  -d chat_id="$TELEGRAM_CHAT_ID" \
  --data-urlencode text="$TEXT"

echo "✅ Telegram notification sent"
