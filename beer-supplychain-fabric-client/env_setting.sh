#!/bin/bash

# Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
# This bash shell script creates VPC / VPC Enpoint / Roles / EC2 / ELB / Security group. 
# The created EC2 instance will function as Fabric Client and REST API server. 


echo 1. Create a keypair

echo Searching for existing keypair named $NETWORKNAME-keypair
keyname=$(aws ec2 describe-key-pairs --key-names $NETWORKNAME-keypair --region $REGION --query 'KeyPairs[0].KeyName' --output text)
if  [[ "$keyname" == "$NETWORKNAME-keypair" ]]; then
    echo Keypair $NETWORKNAME-keypair already exists. Please choose another keypair name by editing this script
    exit 1
fi
 
echo Creating a keypair named $NETWORKNAME-keypair. The .pem file will be in your $HOME directory
aws ec2 create-key-pair --key-name $NETWORKNAME-keypair --region $REGION --query 'KeyMaterial' --output text > ~/$NETWORKNAME-keypair.pem
if [ $? -gt 0 ]; then
    echo Keypair $NETWORKNAME-keypair could not be created. Please delete the old one. 
    exit $?
fi

chmod 400 ~/$NETWORKNAME-keypair.pem
sleep 10

echo Create the VPC, the Fabric client node and the VPC endpoints using CloudFormation ...
aws cloudformation deploy --stack-name $NETWORKNAME-env-setting --template-file setting.yaml \
--capabilities CAPABILITY_NAMED_IAM \
--parameter-overrides KeyName=$NETWORKNAME-keypair BlockchainVpcEndpointServiceName=$VPCENDPOINTSERVICENAME \
--region $REGION