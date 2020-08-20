DEVELOPMENT

    LOCAL DEV:

        docker-compose build
        docker-compose up -d
        docker exec -it #idcontainer bash
        npm run start

    BUILD FOR PRODUCTION:

        docker-compose up -d
        docker exec -it #idcontainer bash
        npm run build

PRODUCTION 

    BUILD:
        docker-compose -f docker-compose-prod.yml build

    DEPLOY
        docker-compose -f docker-compose-prod.yml up -d        

