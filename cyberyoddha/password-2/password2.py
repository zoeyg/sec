import random

def genPassword(password):
  password = "CYCTF{ju$@rcs_3l771l_@_t}bd3cfdr0y_u0t__03_0l3m****"
  newPass = ['-'] * 100
  for i in range(27,47,2):
    newPass[i] = password[i]
  for i in range(46,22,-2):
    print(i)
    newPass[70-i] = password[i]
  for i in range(23,8,-1):
    newPass[32-i] = password[i]
  for i in range(8,-1,-1):
    newPass[i] = password[i]
  return ''.join(newPass)

def checkPassword(password):
    if(len(password) != 47):
      return False
    newPass = list(password)
    for i in range(0,9):
      newPass[i] = password[i]
    for i in range(9,24):
      newPass[i] = password[32-i]
    for i in range(24,47,2):
      newPass[i] = password[70-i]
    for i in range(45,25,-2):
      newPass[i] = password[i]
    password = "".join(newPass)
    return password == "CYCTF{ju$@rcs_3l771l_@_t}bd3cfdr0y_u0t__03_0l3m"

#password = input("Enter password: ")
""" if(checkPassword(password)):
  print("PASSWORD ACCEPTED\n")
else:
  print("PASSWORD DENIED\n") """

print(genPassword(''))


