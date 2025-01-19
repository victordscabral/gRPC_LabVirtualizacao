#include <algorithm>
#include <chrono>
#include <cmath>
#include <iostream>
#include <memory>
#include <string>
#include <vector>
#include <mutex>

#include <grpc/grpc.h>
#include <grpcpp/security/server_credentials.h>
#include <grpcpp/server.h>
#include <grpcpp/server_builder.h>
#include <grpcpp/server_context.h>
#ifdef BAZEL_BUILD
#include "proto/route_guide.grpc.pb.h"
#else
#include "insert.grpc.pb.h"
#endif

using grpc::Server;
using grpc::ServerBuilder;
using grpc::ServerContext;
using grpc::ServerReader;
using grpc::ServerWriter;
using grpc::Status;
using insertword::Empty;
using insertword::WordRequest;
using insertword::WordResponse;
using insertword::InsertWord;
using std::chrono::system_clock;

class InsertWordImpl final : public InsertWord::Service {
 public:
    // Lista de Palavras
    std::vector<insertword::WordResponse> word_list;
    std::mutex mtx;

    Status InsertCount(ServerContext* context, const WordRequest* wordRequest,
                    Empty* empty) override {
        const std::string expected_string = "IMPRIMIR";
        if(expected_string != wordRequest->word())
        {
            std::lock_guard<std::mutex> lock(mtx);

            bool exist = false;
            int sum = 0;
            for (WordResponse& w : word_list)
            {   
                // Se a palavra está na lista aumenta sua contagem.
                if(w.word() == wordRequest->word())
                {
                    sum = w.sum()+1;
                    w.set_sum(sum);
                    exist = true;
                    std::cout << "Palavra já existente " << wordRequest->word() << " " << sum << std::endl;
                }
            }

            if(!exist)
            {
                // Cria e salva nova palavra na lista.
                std::cout << "Nova palavra Recebida " << wordRequest->word() << std::endl;
                insertword::WordResponse new_word;
                new_word.set_word(wordRequest->word());
                new_word.set_sum(1);
                word_list.push_back(new_word);
            }
            

        }
        return Status::OK;
    }

    Status ListWords(ServerContext* context,
                      const insertword::WordRequest* wordRequest,
                      ServerWriter<WordResponse>* writer) override {
        const std::string expected_string = "IMPRIMIR";
        if(expected_string == wordRequest->word()){
            std::cout << "Palavra chave para impressão recebida " << wordRequest->word() << std::endl;
            std::lock_guard<std::mutex> lock(mtx);

            // Envia as palavras
            for (const WordResponse& w : word_list) {
                std::cout << "Envia palavra: " << w.word() << " soma = "<< w.sum() << std::endl;
                writer->Write(w);
            }
        }
        return Status::OK;
    }
};

void RunServer()
{
    std::string server_address("0.0.0.0:50051");
    InsertWordImpl service;

    ServerBuilder builder;
    builder.AddListeningPort(server_address, grpc::InsecureServerCredentials());
    builder.RegisterService(&service);
    std::unique_ptr<Server> server(builder.BuildAndStart());
    std::cout << "Server listening on " << server_address << std::endl;
    server->Wait();
}

int main(int argc, char** argv) {

  RunServer();

  return 0;
}
