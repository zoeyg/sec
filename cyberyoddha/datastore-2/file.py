def validate(username, password):
    if (username.find("'")  != -1):
        return False
    con = sqlite3.connect('acctdb.db')
    completion = False
    with con:
        cur = con.cursor()
        cur.execute("SELECT * FROM actdb WHERE username = '" + username + "' AND password = '" + password + "'")


        if cur.fetchone():
            return True
        else:
            return False
