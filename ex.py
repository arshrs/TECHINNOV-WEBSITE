import string
import random
letters = string.ascii_lowercase
pt="hii"
ct=""
i=0
while i<len(pt):
    n=random.randint(0,25)
    if(letters.rfind(pt[i])!=n):

       ct+=letters[n]
       i+=1
       print(ct)
