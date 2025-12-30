# Post Install Updates

There's a subscription warning that flashes everytime you long into the box

Since I don't want to see that, here's how to remove:

1. SSH into the box
1. Navigate to: `usr/share/javascript/proxmox-widget-toolkit`
1. In the `proxmoxlib.js` file, comment out the notification function
   - Look for the 'you do not have a valid subscription' section
   - This is a function that returns a message when there's no active subscription
   - We are going to comment out the else check (line 616)
     `Ext.Msg.show`
