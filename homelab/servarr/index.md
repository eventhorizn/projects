TODO:

Use this wiki to build out your own

https://github.com/TechHutTV/homelab/tree/main/media

# Setup

Follow [Docker VM setup](../docker/index.md)

1. Download VM iso
1. Upload iso tp proxmox
   - loclal (pve) > ISO images
1. Create VM and use uploaded iso

https://www.youtube.com/watch?v=Vwtx_dfYrtA&list=PLFxfbw6hcvOf5iaYlJvt9QJDSCcewXJR3

https://techhut.tv/7-docker-basics-for-beginners/

## Install QEMU Guest Agent

1. Allows proxmox to see ip
   ```bash
   sudo apt install qemu-guest-agent
   ```
1. Edit VM options to enable
1. Shut down and start vm

# Access

## SSH

```bash
ssh ghake@192.168.1.246
```

## Set up Windows Terminal Profile

```json
{
	"colorScheme": "Campbell",
	"commandline": "ssh ghake@192.168.1.246",
	"guid": "{0f4d76c0-088b-4ea5-b6b7-149389678738}",
	"hidden": false,
	"icon": "ms-appx:///ProfileIcons/pwsh.png",
	"name": "Docker VM"
}
```

# Docker

https://techhut.tv/7-docker-basics-for-beginners/

## Install

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

## Docker Compose

1. RTFM: https://docs.docker.com/compose/

   ```bash
   sudo apt-get update
   sudo apt-get install docker-compose-plugin
   ```

   192.168.1.246:9443

### Portainer

192.168.1.246:9443

ghake

https://docs.portainer.io/start/install-ce/server/docker/linux#docker-run

### Multiple stacks

# VM Details

1. IP: 192.168.1.246
1. username: ghake

## jellyfin

https://github.com/TechHutTV/homelab/blob/main/media/jellyfin/README.md

## qBittorrent

http://192.168.1.164:8080/

initial user" admin

check logs to get initial random pwd

docker logs qbittorrent

Create a new user in the settings

change default save paths

## Jellyseer
