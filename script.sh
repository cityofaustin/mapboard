#!/bin/bash

DIRECTORY="$1"
BUILD_DIR="/Users/transgineer/Programming/MapBoard/build"

function getFiles {
    for entry in "$1"/*
    do
	if [[ -d "$entry" ]] ; then
	getFiles "$entry"

	else
	    file="${entry##*/}"
	    out="$BUILD_DIR/$file"
	    touch "$out"
	    if [ ${file: -3} == ".js" ]
	    then
		babel "$entry" --out-file "$out"
	    else
		cp "$entry" "$out"
	    fi
	    
	    
	fi

    done
}


getFiles "$DIRECTORY"
