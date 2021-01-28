obj="test"
eval("obj=base64.b64encode(json.dumps({'ID': obj}).encode()).decode('utf-8')")