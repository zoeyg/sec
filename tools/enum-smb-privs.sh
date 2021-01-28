#!/bin/bash
username="${1}"    # Double backslash
password="${2}"        # For demonstration purposes only
hostname="${3}"     # SMB hostname of target

cd "${TMPDIR:-/tmp}"
touch tmp_$$.tmp           # Required locally to copy to target

smbclient -L "$hostname" -g -A <( echo "username=$username"; echo "password=$password" ) 2>/dev/null |
    awk -F'|' '$1 == "Disk" {print $2}' |
    while IFS= read -r share
    do
        echo "Checking root of share '$share'"

        if smbclient "//$hostname/$share/" "$password" -U "$username" -c "dir" >/dev/null 2>&1
        then
            status=READ

            # Try uprating to read/write
            if smbclient "//$hostname/$share/" "$password" -U "$username" -c "put tmp_$$.tmp ; rm tmp_$$.tmp" >/dev/null 2>&1
            then
                status=WRITE
            fi
        else
            status=NONE
        fi

        case "$status" in
            READ) echo "Well, $username has read access" ;;
            WRITE) echo "Yes, $username has write access" ;;
            *) echo "No, $username has no access" ;;
        esac
    done