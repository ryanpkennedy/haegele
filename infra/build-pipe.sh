#!/bin/bash

CODEPIPELINE_STACK_NAME="hg-github-codepipeline"

while test $# -gt 0; do
  case "$1" in
  
    -h|--help)
      echo "-c, --create              Create stack"
      echo "-u, --update              Update stack"
      exit 0
      ;;

    -c|--create)
      shift
      aws cloudformation create-stack \
            --capabilities CAPABILITY_IAM \
            --stack-name $CODEPIPELINE_STACK_NAME \
            --parameters file://params.json \
            --template-body file://pipeline.yaml
     ;;

    -u|--update)
      shift
      aws cloudformation update-stack \
            --capabilities CAPABILITY_IAM \
            --stack-name $CODEPIPELINE_STACK_NAME \
            --parameters file://params.json \
            --template-body file://pipeline.yaml
      ;;

  esac
done