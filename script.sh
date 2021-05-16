ssh maxim@139.162.139.245 <<EOF
cd kr-web;
pm2 stop 3;
npm -v; 
git --version;
git pull;
npm i;
npm run build;
pm2 start 3;
EOF
