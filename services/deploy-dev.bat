@echo off
setlocal enabledelayedexpansion

set "API_DOMAIN_NAME=api.codedino.io"
set "S3_BUCKET_NAME=codedino.io"
set "DOMAIN_NAME=codedino.io"
set "DEPLOYMENT_BUCKET=codedino.io"
set "PROFILE=default"
set "S3_CODE_SERVICE_FOLDER=portal/services/language-translator"
set "STACK_NAME=codedino-language-translator"

echo Packaging SAM application...
sam package --template-file template.yml --output-template-file serverless-output.yml --s3-bucket %DEPLOYMENT_BUCKET% --s3-prefix %S3_CODE_SERVICE_FOLDER% --profile default --region us-east-1

echo Deploying SAM application...
sam deploy ^
    --template-file serverless-output.yml ^
    --stack-name codedino-language-translator ^
    --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND ^
    --region us-east-1 ^
    --parameter-overrides ApiDomainName=api.codedino.io S3BucketName=codedino.io DomainName=codedino.io AccountId=975050376382 EcsImageId=q2p0j5j5 SecurityGroupIds=sg-0374712a2bd0677d3 SubnetIds=subnet-037684522ea91d660^
    --profile default

echo Deployment complete.
pause
