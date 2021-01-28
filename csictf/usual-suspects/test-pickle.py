import pickle 
  
def storeData(): 
    # initializing data to be stored in db 
    Omkar = {'key' : 'Omkar', 'name' : 'Omkar Pathak', 
    'age' : 21, 'pay' : 40000} 
    Jagdish = {'key' : 'Jagdish', 'name' : 'Jagdish Pathak', 
    'age' : 50, 'pay' : 50000} 
  
    # database 
    db = {} 
    db['Omkar'] = Omkar 
    db['Jagdish'] = Jagdish 
      
    # Its important to use binary mode 
    dbfile = open('examplePickle', 'ab') 
      
    # source, destination 
    pickle.dump(db, dbfile, 0)                      
    dbfile.close() 
  
def loadData(): 
    # for reading also binary mode is important 
    dbfile = open('examplePickle', 'rb')      
    db = pickle.load(dbfile) 
    for keys in db: 
        print(keys, '=>', db[keys]) 
    dbfile.close() 
   
storeData() 
#loadData() 2|1:0|10:1595315378|5:admin|8:dHJ1ZQ==|911c3b278b93a30b10bcb0ee62c103ee819d635f8c88a9952219f8fc02d1a6f4
#           2|1:0|10:1595315378|5:admin|8:ZmFsc2U=|911c3b278b93a30b10bcb0ee62c103ee819d635f8c88a9952219f8fc02d1a6f4
#                                                  f2ca1bb6c7e907d06dafe4687e579fce76b37e4e93b7605022da52e6ccc26fd2