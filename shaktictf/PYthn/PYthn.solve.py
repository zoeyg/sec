
Z=[]
k=[]
Q="K78m)hm=|cwsXhbH}uq5w4sJbPrw6"
T="ABCDEFGHIJKLMNOPQRSTUVWXYZ012"
TFuN="FHJLNPRTVXZPQRSTUVWXYZ[\\]^456"

def Fun(inp):
    st=[]
    for i in range (len(inp)):
        st.append(chr(ord(inp[i])^1))
    return(''.join(st))

def revFun(inp):
    out=[]
    for i in range(len(inp)):
        out.append(chr(ord(inp[i])^1))
    return(''.join(out))

def FuN(inp):
    for i in range(len(inp)):
        if(i<11):
            Z.append(chr(ord(inp[i])+i+5))
        else:
            Z.append(chr(ord(inp[i])+4))      
    return(''.join(Z))

def revFuN(inp):
    out=[]
    for i in range(len(inp)):
        if (i<11):
            out.append(chr(ord(inp[i]) - i - 5))
        else:
            out.append(chr(ord(inp[i]) - 4))
    return(''.join(out))


X=input("Enter input:")

FunX = Fun(X)
print('Fun(X) ' + FunX)

FuNFunX = FuN(FunX)
print('FuN(FunX) ' + FuNFunX)

k=FuN(Fun(X))

if(Q!=k):
    print("NO")
else:
    print("Flag: shaktictf{"+X+"}")

print(revFuN('FHJLNPRTVXZPQRSTUVWXYZ[\\]^456'))

revQ = revFuN('K78m)hm=|cwsXhbH}uq5w4sJbPrw6')
print(revQ)

print('shaktictf{' + revFun(revQ) + '}')
