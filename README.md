`yarn install`

### Extensions:

- `ESLint`
- `Prettier - Code formatter`

### `.vscode/settings.json`

```json
{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.rulers": [80],
    "eslint.useFlatConfig": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact"
    ],
    "eslint.probe": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact"
    ],
    "eslint.run": "onType",
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
    }
}
```

pre-commit

```bash
#!/bin/sh
# Get all files added with "git add ..."
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep ".jsx\{0,1\}$")
PASS=true
echo "Validating ESLint:"
for FILE in $STAGED_FILES
do
# Run eslint on all staged files
git show :$FILE | yarn run eslint --stdin --stdin-filename "$FILE"
if [ "$?" -eq 0 ]; then
echo -e "\tESLint Passed: $FILE"
else
echo -e "\tESLint Failed: $FILE"
PASS=false
fi
done
echo "ESLint validation completed!"
if ! $PASS; then
echo "COMMIT FAILED: Your commit contains files that should pass ESLint but do not.␣
↪→Please fix the ESLint errors and try again."
exit 1 # Exit error to not allow the commit
else
echo "COMMIT SUCCEEDED"
fi
exit $? # Will allow or not to commit
```

``chmod +x .git/hooks/pre-commit``