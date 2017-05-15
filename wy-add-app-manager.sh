#!/bin/bash
if [ "$#" -ne 3 ]; then
  echo "Usage: ./wy-add-app-manager.sh <appuser> <appmanager> <email>"
  exit
fi

id -u $1 > /dev/null 2>&1
if [ "$?" -eq 1 ]; then
  echo "User $1 does not exist exist."
  exit
fi

id -u $2 > /dev/null 2>&1
if [ "$?" -eq 1 ]; then
  echo "User $2 does not exist exist."
  exit
fi

# Add the owner
echo $2'        ALL=('$1') NOPASSWD: /bin/bash' >> /etc/sudoers

echo "Added $2 privileges to access $1"

# Send email
MAIL=$(sed 's/#USER/'$1'/g; s/#WYVERNUSER/'$2'/g' mail-add-app-admin-template.txt)
echo "$MAIL" | mail -s "Granted application manager privileges" $3

echo "Sent info mail to $3"

