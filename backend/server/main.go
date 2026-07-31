package main

import (
	"fmt"
	"context"
	"log"

	"github.com/moby/moby/client"
)

// func createSSHTunnel(user, privateKey string, serverAddr, localAddr string) error {
// 	signer, err := ssh.ParsePrivateKey([]byte(privateKey))
// 	if err != nil {
// 		return fmt.Errorf("failed to parse private key: %w", err)
// 	}
// }

func main() {
	ctx := context.Background()
	apiClient, err := client.New(client.FromEnv, client.WithUserAgent("my-application/1.0.0"))
	if err != nil {	
		log.Fatal(err)
	}
	defer apiClient.Close()

	containers, err := apiClient.ContainerList(ctx, client.ContainerListOptions{})
	if err != nil {
		log.Fatal(err) 
	}

	for _, container := range containers.Items {
		fmt.Println(container.ID)
	}
}