#!/bin/bash

# Remove the user
deluser $1 --remove-home --backup --backup-to /home/backup
