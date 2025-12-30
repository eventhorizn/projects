```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/ct/plex.sh)"
```

http://192.168.1.245:32400/web

default install
automatic root login
root username
no pwd

## Set up Disk for Plex

1. Add HDD
   - On proxmox > Disks > Refresh
   - Initialize w/ GPT
1. Create ZFS Pool
   - pool1 name for example
1. On proxmox shell (node level), create a dataset
   `zfs create pool1/plexdata`
1. Map Storage to Plex Container/VM
   - Open Plex LXC console
   - Create a mount point `mkdir /mnt/media`
   - Add Bind Mount
     - In proxmox host shell `pct set <Plex-ID> -mp0 /pool1/plexdata,mp=/mnt/media`
   - Set perms
     - Inside the LXC console `chmod -R 777 /mnt/media`
1. Configure Plex Media Library
   - Restart Plex container/vm
   - Open Plex web UI
   - Settings > Libraries > Add Folders
   - Browse to the mounted path and add as media library
