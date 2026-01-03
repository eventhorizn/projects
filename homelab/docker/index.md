# Setup

1. Download VM iso
1. Upload iso tp proxmox
   - loclal (pve) > ISO images
1. Create VM and use uploaded iso

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

## Install

1. RTFM: https://docs.docker.com/engine/install/ubuntu/
   - Using apt repo
1. Set up apt repo

   ```bash
   # Add Docker's official GPG key:
   sudo apt update
   sudo apt install ca-certificates curl
   sudo install -m 0755 -d /etc/apt/keyrings
   sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
   sudo chmod a+r /etc/apt/keyrings/docker.asc

   # Add the repository to Apt sources:
   sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
   Types: deb
   URIs: https://download.docker.com/linux/ubuntu
   Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
   Components: stable
   Signed-By: /etc/apt/keyrings/docker.asc
   EOF

   sudo apt update
   ```

1. Install
   ```bash
   sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```

## Docker Compose

1. RTFM: https://docs.docker.com/compose/
   ```bash
   sudo apt-get update
   sudo apt-get install docker-compose-plugin
   ```

## Creating a docker compose stack

1. SFTP to the VM and create the docker compose files
   - Manually or thru VS code (haven't gottena chance to do ssh tunnels w/ vscode yet)

### Multiple stacks

# VM Details

1. IP: 192.168.1.246
1. username: ghake
