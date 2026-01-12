## Container Setup

We will host this on the same docker VM our servarr and jellyfin stacks live

We need the cloudflare API key from below in order to connect cloudflare and ngnix

## Cloudflare Setup

https://www.cloudflare.com/

set up your domain to work thru cloudflare

- You need to route/transfer your custom domain thru cloudflare
  - For me, I had to transfer from Digital Ocean, but cloudflare's walkthrough was clear
- Then you will get options for DNS, SSL/TLS etc
  - You need to add DNS records for your custom address, which will connect to your home server
  - One A record for your home domain that is proxied
    - 8.8.8.8 for the Content/IP (this will be auto updated once we hook up to our docker container)
  - One A record for jellyfin that is NOT proxied (goes agains TaC)
    - 8.8.8.8 for Content/IP, same story
- We have a cloudflare docker image on our stack
  - Before we deploy the stack, we'll update the required settings from our cloudflare side
  - Domains is the only 'gotcha' but you'll put in your base domain (this.is.dev) and your strea.this.is.dev domain

## Router Port Forwarding Setup

I have a BGW320-500 router which isn't the most user friendly

ipconfig and get the Default Gateway ip

Just google how to port forward for your router
The idea here is to route 443 ports to our home lab's ip address

## Ngnix

Docker_Ip:81

- We're going to add a DNS cert
  - Using base domain
  - Using cloudflare dns api key
- Add host
  - Destination should be the docker network (dockernetwork:port)
- TODO: SCREENSHOTS

## Jellyfin

- Create a new host

Custom configuration on ngnix

This seems to have been updated
I'm following an older walkthru

```
proxy_buffering off;

proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-Protocol $scheme;
proxy_set_header X-Forwarded-Host $http_host;
proxy_headers_hash_max_size 2048;
proxy_headers_hash_bucket_size 128;

add_header X-Frame-Options "SAMEORIGIN";
add_header X-XSS-Protection "0";
add_header X-Content-Type-Options "nosniff";
```

- update jellyfin to point to ngnix ip for proxie
  - 172.19.0.0/16
    - Since everything is in docker, we need the docker network
-
