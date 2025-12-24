set -e

CHANGED_FILES=($(git diff --name-only HEAD~1 HEAD))

declare -A blocks

for file in "${CHANGED_FILES[@]}"; do
  if [[ $file =~ src/pages/([^/]+)/ ]]; then
    block="${BASH_REMATCH[1]}"
  else
    block="Other"
  fi
  blocks["$block"]+="- $file"$'\n'
done

for block in "${!blocks[@]}"; do
  echo "**$block**"
  echo "${blocks[$block]}"
done
