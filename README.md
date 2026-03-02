## What is this?
A task dashboard for Kindle to display due household tasks. Serves task list as a server rendered HTML and has the option to mark them as done. Refreshes page after 24h since tasks update based on date when they were last done.
## How this works
Google Sheet - data source. Contains list of tasks, recurring day number, last done date.\
Fastify - server. Gets data from Google Sheet using Google Sheets API, updates the Google sheet after task is marked as done.\
Docker - packages app into container. Docker-compose file specifies the parameters to run the container

## To run
To start the app in dev mode `npm run dev`\
To run Docker container:
- using Docker compose `docker compose up`
- or run Docker container (service account key is specified as shared volume)
```
docker run -p 3000:3000 \
  --env-file .env \
  -v $(pwd)/service_account_key.json:/app/service_account_key.json \
  kindle-tasks
  ```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


