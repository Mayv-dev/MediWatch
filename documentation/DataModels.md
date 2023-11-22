# Collections

## User Collection

```JSON
{
    "uuid": "unique id",
    "email": "user email",
    "password": "password hash",
    
    "pillbox": {
        "uuid": "unique id",
        "numbercompartments": number
    },

    "medications": [
        {
            "uuid": "unique id",
            "name": "encrypted"
        }
    ],

    "schedule": [
        {
            "datetime": "ISODate",
            "compartment": number,
            "medication list": [
                {
                    "medication id": "unique id"
                }
            ]
        }
    ],

    "history": [
        {
            "datetime": "ISODate",
            "taken": "boolean",
            "medication list": [
                {
                    "medication id": "unique id"
                }
            ]
        }
    ],

    "events": [
        {
            "datetime": "ISOdate",
            "compartment": number,
            "sensor": "sensor name",
            "isopen": bool, //if sensor is a switch
            "isempty": bool, //if sensor is a FSR
        }
    ]
}
```

## Carer Collection
```JSON
{
    "uuid": "unique id",
    "email": "email",
    "password": "password hash",
    "cares for": [
        {
            "user id": "unique id",
            "notification type": "all/warnings"
        }
    ]
}
```
