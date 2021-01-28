const qs = require('qs');

const fakeScriptNode = {
    input: {
            "type": "script",
            "name": "script",
            "namespace": "http://www.w3.org/1999/xhtml",
            "attribs": {},
            "x-attribsNamespace": {},
            "x-attribsPrefix": {},
            "children": ['test'],
            "prev": null,
            "next": null,
            "somethingElse": ""
            }
};

console.log(qs.stringify(fakeScriptNode));