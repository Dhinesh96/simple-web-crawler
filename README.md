# Web Crawler Service

This repository is a simple web crawler service developed with node.js. 

## Installation

Clone the repo and download all the dependencies as below:

```bash
git clone https://github.com/Dhinesh96/simple-web-crawler.git
cd web-crawler 
npm install
```

## Running the service

Run the web crawler service as below:

```bash
npm run start-service
```

Now the service will be running in port 1500.


## Testing the service

Go to any web browser and hit the url `http://<ip>:1500/crawlWebsite?url=<absolute-url>`. As a result, an output file will be generated under `outputs` folder.

whereas, 

    ip = your ip address
    
    absolute-url =  Absolute url of the domain for scraping
    
eg: http://localhost:1500/crawlWebsite?url=https://www.wipro.com 


## What can be done with more time?

More validation and filtering can be done.
