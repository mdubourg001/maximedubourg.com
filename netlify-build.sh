echo "Installing nvm and node@14.3.0"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm install 20

echo "Installing deno..."
curl -fsSL "https://deno.land/install.sh" | sh -s -- v1.46.3
export PATH="/opt/buildhome/.deno/bin:$PATH"

echo "Installing velociraptor..."
deno install -qA -n vr https://deno.land/x/velociraptor@1.5.0/cli.ts

echo "Installing ssgo..."
deno install --reload -f --unstable -A https://deno.land/x/ssgo/ssgo.ts

echo "Building website..."
NODE_ENV=production npx tailwindcss@latest -c ./tailwind.config.js -o ./static/tailwind.css
ssgo --sitemap=https://maximedubourg.com
