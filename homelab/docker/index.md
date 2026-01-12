# VM Creation

Refer to [Virtual Machine wiki](../virtualmachine/index.md)

1. Upload the VM Image (Ubuntu)
1. Create VM in Proxmox
1. This VM will hold docker, so minimum of 2gb RAM, but I go 4
1. VM will install OS
   - Reboot may have you remove installation media from Options tab

# Install Docker

https://techhut.tv/7-docker-basics-for-beginners/

1. Install Docker
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   ```
1. Install Docker Compose
   ```bash
   sudo apt-get update
   sudo apt-get install docker-compose-plugin
   ```

Portainer installation
