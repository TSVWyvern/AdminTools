#!/bin/bash
if [ "$#" -ne 2 ]; then
  echo "Usage: ./wy-add-user.sh <username> <email>"
  exit
fi

id -u $1 > /dev/null 2>&1
if [ "$?" -ne 1 ]; then
  echo "User $1 exists."
  exit
fi

# Add the user
adduser --disabled-password $1
adduser $1 wyvern

# Set password
PASS=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 8 | head -n 1)
echo "$1:$PASS" | chpasswd

echo User $1 created with password $PASS.

# Send email
MAIL=$(sed 's/#USER/'$1'/g; s/#PASS/'$PASS'/g' mail-add-user-template.txt)
echo "$MAIL" | mail -s "User account created" $2
