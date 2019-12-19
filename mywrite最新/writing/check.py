from pylanguagetool import api

def checker(a):
    s = api.check(
        a,
        api_url='http://192.168.1.146:8081/v2/',
        lang='en-US',
        pwl=['sceneries' , 'KFC'])
    s1 = s["matches"]
    # print(s1)
    if s1 ==[]:
        a = ["未发现错误"]
        return a
    else:
        n = []
        for i in s1:
            if len(i['replacements']) ==  0:
                a2 = i['message']
                b = ' '
                c = i['offset']
                d = i['length']
                e = i['rule']['issueType']
                A = a[c:c+d]
                A1 = i['sentence']
                B = i['shortMessage']
                f = {'sentence': A1,'questions':{'issueType': e,'offset': c,'length': d,'words': A,'suggestion': b,'shortMessage': B,'Message': a2}}
                f1 = [f]
                n += f1
            else:
                a2 = i['message']
                b = i['replacements'][0]['value']
                c = i['offset']
                d = i['length']
                A = a[c:c+d]
                A1 = i['sentence']
                B = i['shortMessage']
                e = i['rule']['issueType']
                f = {'sentence': A1,'questions':{'issueType': e,'offset': c,'length': d,'words': A,'suggestion': b,'shortMessage': B,'Message': a2}}
                f1 = [f]
                n += f1
        return n

      
