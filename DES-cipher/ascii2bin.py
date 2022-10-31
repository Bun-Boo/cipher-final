import math


def toBinary(a):
    l, m = [], []
    for i in a:
        l.append(ord(i))
    for i in l:
        m.append(int(bin(i)[2:]))
    return m


print("PHANVANH")
print(toBinary("Ậ"))
print(toBinary("Ạ"))
