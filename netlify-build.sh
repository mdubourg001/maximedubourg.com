echo "Installing nvm, node@20.0 and installing dependencies..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm install 20
npm install

echo "Installing deno..."
curl -fsSL "https://deno.land/install.sh" | sh -s -- v1.46.3
export PATH="/opt/buildhome/.deno/bin:$PATH"


echo "Installing ssgo..."
deno install --reload -f --unstable -A https://deno.land/x/ssgo/ssgo.ts

echo "Building website..."
npm run build
