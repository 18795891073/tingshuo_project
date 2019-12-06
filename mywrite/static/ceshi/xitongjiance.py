from pylanguagetool import api

s=api.check(
         'this is a example',
         api_url='https://languagetool.org/api/v2/',
         lang='en-US',
         pwl=['KFC'])
s1=s["matches"]
for i in s1:
    print(i)
