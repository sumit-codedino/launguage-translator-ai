#!/bin/bash

set -e  # Exit immediately if a command fails

# Set environment variables
AWS_REGION="us-east-1"
API_DOMAIN_NAME="api.codedino.io"
S3_BUCKET_NAME="codedino.io"
DOMAIN_NAME="codedino.io"
DEPLOYMENT_BUCKET="codedino.io"
PROFILE="default"
S3_CODE_SERVICE_FOLDER="portal/services/language-translator"
STACK_NAME="codedino-language-translator"
ACCOUNT_ID="975050376382"
ECS_IMAGE_ID="q5f4u1b2"
SECURITY_GROUP_IDS="sg-0374712a2bd0677d3"
SUBNET_IDS="subnet-037684522ea91d660"
ECR_REPOSITORY="975050376382.dkr.ecr.us-east-1.amazonaws.com/flask-translate"

echo "================================"
echo "Building SAM application..."
echo "================================"
sam build

echo "================================"
echo "Deploying SAM application..."
echo "================================"
sam deploy \
    --stack-name "$STACK_NAME" \
    --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND \
    --region "$AWS_REGION" \
    --image-repository "$ECR_REPOSITORY" \
    --parameter-overrides \
    ApiDomainName="$API_DOMAIN_NAME" \
    S3BucketName="$S3_BUCKET_NAME" \
    DomainName="$DOMAIN_NAME" \
    AccountId="$ACCOUNT_ID" \
    EcsImageId="$ECS_IMAGE_ID" \
    SecurityGroupIds="$SECURITY_GROUP_IDS" \
    SubnetIds="$SUBNET_IDS" \
    ImageRepository="$ECR_REPOSITORY" \
    --profile "$PROFILE"

echo "================================"
echo "Deployment Complete!"
echo "================================"
