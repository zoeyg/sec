 Error response from daemon: Conflict. The container name "/team-db5fdc85-2415-4e90-acae-f6b2d7c8197d" is already in use by container "c337d1417057ba1fd2f2b9ee0e2be0daf9346b63632e6c43657ca684e685a892". You have to remove (or rename) that container to be able to reuse that name.
See 'docker run --help'.
Traceback (most recent call last):
  File "/home/orange/oShell-wrapper.py", line 78, in <module>
    my_exec(cmds)
  File "/home/orange/oShell-wrapper.py", line 38, in my_exec
    return check_output(cmds)
  File "/usr/lib/python2.7/subprocess.py", line 223, in check_output
    raise CalledProcessError(retcode, cmd, output=output)
subprocess.CalledProcessError: Command '['sudo', 'docker', 'run', '-d', '--rm', '--env', 'LOG_HOST=172.17.0.1', '-v', '/home/orange/tmp/team-db5fdc85-2415-4e90-acae-f6b2d7c8197d_X6wPFD:/enable.secret', '--name', 'team-db5fdc85-2415-4e90-acae-f6b2d7c8197d', 'oshell']' returned non-zero exit status 125
Connection to 54.150.148.61 closed.