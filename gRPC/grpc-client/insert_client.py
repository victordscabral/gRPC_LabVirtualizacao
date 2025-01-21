from __future__ import print_function

import logging
import random
import sys

import grpc
import insert_pb2
import insert_pb2_grpc
# import insert_resources

def add_word(stub, request_word):
    new_word = insert_pb2.WordRequest(word=request_word)
    response = stub.InsertCount(new_word)
    print("Palavra Adicionada \n")

def get_list_word(stub, request_word):
    response_list = []
    print_word = insert_pb2.WordRequest(word=request_word)
    word_list = stub.ListWords(print_word)

    for word in word_list:
        response_list.append(word)
        print(
            "Palavra %s ocorrência %d\n"
            % (word.word, word.sum)
        )
    return response_list

def run():
     list_dict = []
     request_word = input("Enter word: ")
     request_word = request_word.strip()
     with grpc.insecure_channel("192.168.200.20:50051") as channel:
        stub = insert_pb2_grpc.InsertWordStub(channel)
        if request_word.upper() == 'IMPRIMIR':
            print("-------------- ListWords --------------")
            get_list_word(stub, request_word)
        else:
            print("-------------- AddWord --------------")
            add_word(stub, request_word)

if __name__ == "__main__":
    logging.basicConfig()
    run()
