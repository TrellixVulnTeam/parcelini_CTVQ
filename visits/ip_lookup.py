import ipinfo
from visits.models import Unique

access_logs = open('visits/utils/www.parcelini.com.access.log').read()

visits = access_logs.strip().split('\n')


access_token = '08cfa5a4b2ab54'
handler = ipinfo.getHandler(access_token)



for visit in visits:
    ip, other = [a.strip() for a in visit.split('- -')]
    ip_exists = Unique.objects.filter(ip=ip).exists()
    if not ip_exists:
        details = handler.getDetails(ip)
        m = Unique(**details.all)
        m.save()
        print("SAVED", ip)

    

    