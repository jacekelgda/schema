POST localhost:8081/fieldvalue
{
"fieldName": "marketingName",
"itemReference": "7236389_F900",
"value": "adi_OZWEEGO_EE6464_FTWWHT/FTW"
}

POST localhost:8081/template
{
"name": "variant"
}

POST localhost:8081/item
{
"reference": "7236389_F902",
"templateName": "variant"
}

POST localhost:8081/field
{
"name": "marketingName"
}

POST localhost:8081/search
{
"type": "variant"
}
