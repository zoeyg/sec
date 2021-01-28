#!/usr/bin/python3
import subprocess
import random
from base64 import b64encode,b64decode
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad
import sys
import time
import hashlib

title = """
      .o.       oooooooooooo  .oooooo..o 
     .888.      `888'     `8 d8P'    `Y8 
    .8"888.      888         Y88bo.      
   .8' `888.     888oooo8     `"Y8888o.  
  .88ooo8888.    888    "         `"Y88b 
 .8'     `888.   888       o oo     .d8P 
o88o     o8888o o888ooooood8 8""88888P'  
"""
  
def pow(sec_level):
    m = hashlib.sha256()
    prefix = get_random_bytes(16)
    m.update(prefix)
    print("POW PREFIX: " + b64encode(prefix).decode('utf-8'))
    suffix = b64decode(input("ENTER SUFFIX FROM CLIENT SCRIPT HERE: "))
    m.update(suffix)
    if(m.digest()[0:sec_level] == b'\x00' * sec_level):
        print("VERIFIED!\n")
        return 1
    return 0

def init_words(word_n):
    words = str.split(subprocess.check_output("cat /usr/share/dict/american-english | shuf | head -n " + str(word_n), shell=True).decode())
    return words

def init_docs(words, doc_n, doc_length):
    documents = []
    for i in range(doc_n):
        document = []
        for j in range(doc_length):
            selector = random.randint(0, len(words) - 1)
            document.append(words[selector])

        documents.append(" ".join(document))
    return documents

def init_index(words, documents):
    inverted_index = {}
    for word in words:
        inverted_index[word] = set()
    for i, doc in enumerate(documents):
        for word in doc.split(" "):
            inverted_index[word].add(i)
    return inverted_index

def encrypt_doc(document):
    key = get_random_bytes(16)
    cipher = AES.new(key, AES.MODE_CBC)
    ct = cipher.encrypt(pad(document.encode("utf-8"), AES.block_size))
    return b64encode(ct).decode('utf-8')

def search(docs, index, query):
    if(query in index):
        doc_indicies = index[query]
        ret = [docs[i] for i in doc_indicies]
        return ret
    return 

def do_search(docs, index):
    print("Enter words to search, seperated by a newline. Extra newline when done")
    search_terms = []
    i = 0
    while(1):
        i += 1
        term = input(str(i) + ": ")
        if(term): search_terms.append(term)
        else: break

    return {response for term in search_terms if term in index for response in search(docs, index, term)}

def chal():
    if(not pow(3)):
        return
    print("Sampling the dictionary...")
    words = init_words(1000)
    print("Generating Random Documents...")
    documents = init_docs(words, 1000, 1000)
    print("Creating Inverted Index...")
    index = init_index(words, documents)
    print("Encrypting Documents...")
    encrypted = [encrypt_doc(document) for document in documents]
    print(title)
    
    print("\nWelcome to ABSURD ENCRYPTED STORAGE")
    print("It doesn't matter what I let you do with my DB, as long as it is encrypted it is probably secure")
    print("\nPART 1: SEARCH")
    print("This searchable encrypted database was my final project for the CS427 Cyptography Course at OSU. After looking at the code, Dr. Rosulek was so impressed that he immediately resigned from his tenured position, saying that he no longer felt confident that he was capable of teaching his students.")
    
    for i in range(170):
        print("\n--- MENU ---")
        print("1: Search Encrypted Docs")
        print("2: Add Document")
        print("3: Get flag")
        option = int(input("Enter a menu option number: "))
        
        if(option == 1): 
            res = do_search(encrypted, index)
            print("---BEGIN RESPONSE---")
            for val in res:
                print(val)
            print("---END RESPONSE---")
        
        if(option == 2):
            doc = input("Type your document here ")
            encrypted.append(encrypt_doc(doc))
            doc = doc.split()
            for word in doc:
                if word in index:
                    index[word].append(len(encrypted)-1)
                else:
                    index[word] = [len(encrypted)-1]

        if(option == 3):
            submitted = input("Enter ten words from our dictionary sample, seperated by spaces: " ).split()
            if len(submitted) >= 10:
                for word in submitted:
                    if word not in words:
                        print("incorrect!")
                        return
                with open("./flag") as f:
                    print(f.read())
                    return

chal()
