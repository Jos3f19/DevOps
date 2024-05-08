FROM python:3.12
WORKDIR /
COPY . /
COPY requeriments.txt .
COPY .env .
COPY . /models
COPY . /routes
RUN pip install gunicorn blinker build click colorama Flask itsdangerous Jinja2 MarkupSafe packaging psycopg2-binary pyproject_hooks python-decouple python-dotenv Werkzeug
ENV PORT=443
ENV SECRET_KEY=admin123
ENV PGSQL_HOST=	jelani.db.elephantsql.com
ENV PGSQL_DATABASE=egozhukb
ENV PGSQL_USERNAME=egozhukb
ENV PGSQL_PASSWORD=5nTMGyPYtlK_CNEEPQ2LM2lIzFrlyd_t
EXPOSE 443
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 app:app