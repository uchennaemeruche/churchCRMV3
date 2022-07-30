# Strapi application

A quick description of your strapi application

#AWS Deployment guide

ssh -i ~/.ssh/strapi-churchcrm-key.pem ubuntu@52.72.18.103

> NODE_ENV=production yarn build --no-optimization -- to build the application
pm2 restart 0

