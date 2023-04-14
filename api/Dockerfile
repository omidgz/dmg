FROM postgres:latest

ENV POSTGRES_DB=dmg
ENV POSTGRES_USER=dmguser
ENV POSTGRES_PASSWORD=pwd

COPY db.sql /docker-entrypoint-initdb.d/

EXPOSE 5432

CMD ["postgres"]