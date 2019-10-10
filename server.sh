#/bin/bash
cd $( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

pm2 start npm -i 1 --name ${PWD##*/} -- run server
