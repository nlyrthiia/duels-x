#!/bin/bash

# Stop script on error
set -e

# Load environment variables
export STARKNET_RPC_URL="${STARKNET_RPC_URL:-https://api.cartridge.gg/x/starknet/sepolia}"

# Check if required environment variables are set
if [ -z "$DOJO_ACCOUNT_ADDRESS" ] || [ -z "$DOJO_PRIVATE_KEY" ]; then
  echo "Error: DOJO_ACCOUNT_ADDRESS and DOJO_PRIVATE_KEY must be set!"
  echo ""
  echo "Please set these environment variables:"
  echo "  export DOJO_ACCOUNT_ADDRESS=0x..."
  echo "  export DOJO_PRIVATE_KEY=0x..."
  echo ""
  exit 1
fi

echo "🔨 Building the project..."
sozo -P sepolia build

echo ""
echo "🚀 Deploying to Sepolia..."
sozo -P sepolia migrate

echo ""
echo "✅ Deployment completed successfully!"

