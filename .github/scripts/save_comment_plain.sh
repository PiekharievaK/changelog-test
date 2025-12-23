#!/bin/bash

COMMENT_RAW="$1"
OUTPUT_FILE="$2"

COMMENT_FORMATTED=$(echo -e "$COMMENT_RAW")

COMMENT_CLEAN=$(echo "$COMMENT_FORMATTED" | sed '/<!--.*-->/d')

echo "$COMMENT_CLEAN" > "$OUTPUT_FILE"

echo "Comment saved to $OUTPUT_FILE"
