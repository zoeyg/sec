from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from flask import current_app
import os,re,secrets

blacklist = [
    'hack',
    'xss',
    'payload',
    'sqli',
    'ssti',
    'lfi',
    'rfi',
]

class PostForm(FlaskForm):
    class Meta:
       csrf = False
    title = StringField('Title', validators=[DataRequired()])
    content = TextAreaField('Content', validators=[DataRequired()])
    submit = SubmitField('Post')
   

    def validate_content(self, form):
        text = form.data
        urls = re.findall('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', text)
        for url in urls:
            url = urls[0]
            random_hex = secrets.token_hex(8)
            path = f'{current_app.root_path}/tmp/blacklist/{random_hex}'
            os.system(f'/bin/curl --max-time 2 {url} -o {path}')
            try:
                with open(path, 'r') as f:
                    content = f.read()
                    for keyword in blacklist:
                        if keyword in text:
                            raise ValidationError('A link you posted lead to a site with blacklisted content!')
            except FileNotFoundError:
                raise ValidationError('A link you posted was not valid!')


