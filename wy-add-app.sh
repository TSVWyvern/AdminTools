#!/bin/bash
if [ "$#" -ne 1 ]; then
  echo "Usage: ./wy-add-app.sh <appuser>"
  exit
fi

id -u $1 > /dev/null 2>&1
if [ "$?" -ne 1 ]; then
  echo "User $1 exists."
  exit
fi

# Add the user
adduser --disabled-password $1

echo "User $1 created"
echo "Add a manager for the application with ./wy-add-app-manager.sh"
