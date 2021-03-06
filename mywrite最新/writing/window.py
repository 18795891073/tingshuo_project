from pylanguagetool import api
from . import models
import spacy
import re
import json
from django.conf import settings


import spacy
import re

class SPY(object):
    
    def __init__(self):
        self.nlp=spacy.load("en_core_web_sm")


    def s_A(self,ss):
        m=re.findall(r'\s([.])([a-zA-Z])',ss)
        for i in m:
            s1 = re.sub(r'\s[.][a-zA-Z]','##'+i[0]+' '+i[1],ss,1)
            ss = s1
        return ss

    
    def num_A(self,ss):
        m=re.findall(r'(\d[.])([a-zA-Z])',ss)
        for i in m:
            s1 = re.sub(r'\d[.][a-zA-Z]',i[0]+' '+i[1],ss,1)
            ss=s1
        return ss


    def ask_s(self,ss):
        m=re.findall(r'\?([a-zA-Z])',ss)
        for i in m:
            s1 = re.sub(r'\?[a-zA-Z]','? '+i,ss,1)
            ss=s1
        return ss


    def sigh_s(self,ss):
        m=re.findall(r'\!([a-zA-Z])',ss)
        for i in m:
            s1 = re.sub(r'\![a-zA-Z]','! '+i,ss,1)
            ss=s1
        return ss


    def test(self,ss):
        m=re.findall(r'([.]["])',ss)
        for i in m:
            s1 = re.sub(r'[.]["]','#".',ss,1)
            ss=s1
        return ss
        
        
    def test1(self,ss):
        m=re.findall(r'(\?["])',ss)
        for i in m:
            s1 = re.sub(r'\?["]','#"?',ss,1)
            ss=s1
        return ss


    def sentence(self,ss):
        nlp=self.nlp
        doc=nlp(ss)
        a5=list(doc.sents)
        return a5


    def result(self,ss):
        a=self.s_A(ss)
        b=self.num_A(a)
        c=self.ask_s(b)
        d=self.sigh_s(c)
        e=self.test(d)
        f=self.test1(e)
        g=self.sentence(f)
        return g

    
    def new(self,ss):
        a=self.result(ss)
        m=[]
        for i in a:
            f=str(i).replace('\n','')
            f=f.replace('#".','."')
            f=f.replace('#"?','?"')
            f=f.replace('##',' ')
            m+=[f]
        h=0
        for i in m:
            if i[-1].isalpha():
                m[h+1]=m[h]+' '+m[h+1]
                del m[h]
            h+=1          
        return m


def ch(x):
    
    a5=SPY().new(x)
    m=[]
    H=1
    for i in a5:
        offset = x.index(i)
        length = len(i)
        m += [{'sentence':{'sid':H,'offset':offset,'length':length},'questions':[]}]
        H += 1
    k=checker(x)
    for v in m:
        for c in k:
             if x.index(c['sentence'])>=v['sentence']['offset'] and x.index(c['sentence'])< v['sentence']['offset']+v['sentence']['length']:
                v['questions'] += [c['questions']]
    h=json.dumps(m, ensure_ascii=False)
    return h
                
def checker(a):
    s = api.check(
        a,
        api_url='http://192.168.1.127:8081/v2/',
        lang='en-US',
        pwl=['sceneries' , 'KFC'])
    s1 = s["matches"]
    if s1 ==[]:
        a = ["No errors found"]
        return a
    else:
        n = []
        number=0
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
                f = {'sentence': A1,'questions':{'issueType': e,'offset': c,'length': d,'words': A,'suggestion': b,'shortMessage': B,'Message': a2,'id':number}}
                f1 = [f]
                n += f1
                number+=1
            else:
                a2 = i['message']
                b = i['replacements'][0]['value']
                c = i['offset']
                d = i['length']
                A = a[c:c+d]
                A1 = i['sentence']
                B = i['shortMessage']
                e = i['rule']['issueType']
                f = {'sentence': A1,'questions':{'issueType': e,'offset': c,'length': d,'words': A,'suggestion': b,'shortMessage': B,'Message': a2,'id':number}}
                f1 = [f]
                n += f1
                number+=1
        return n