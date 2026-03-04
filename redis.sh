source .env
docker run  -d --name qrtickets-redis \
            -p 6379:6379 redis:8.4.0 \
            redis-server --requirepass "${REDIS_PASSWORD}"