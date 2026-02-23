#!/bin/bash
# Script to activate jstar conda environment and run Flask backend

# Change to backend directory (where this script is located)
cd "$(dirname "$0")"

# Load environment variables from .env file
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Activate conda environment
eval "$(conda shell.bash hook)"
conda activate jstar

# Run Flask app
export FLASK_APP=app.py
export FLASK_ENV=development
python app.py

