import psutil
import redis


r = redis.Redis(host='localhost', port=6379, db=0)
if __name__=="__main__":
    cpu_usage = psutil.cpu_percent(interval=1)
    mem_usage = psutil.virtual_memory().percent
    net_usage = psutil.net_io_counters().bytes_sent + psutil.net_io_counters().bytes_recv

    r.set('cpu_usage', cpu_usage)
    r.set('mem_usage', mem_usage)
    r.set('net_bytes', net_usage)