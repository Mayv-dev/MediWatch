# Collections

## User Collection

```JSON
{
    "uuid": "unique id",
    "email": "user email",
    "password": "password hash",
    
    "pillbox": {
        "uuid": "unique id",
        "compartments": [
            {
                "uuid": "unique id"
            }
        ]
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
            "compartment id": "unique id",
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
    ]
}
```

## Carer Collection
```JSON
{
    "uuid": "unique id",
    "email": "user email",
    "password": "password hash",
    "cares for": [
        {
            "user id": "unique id",
            "notification type": "all/warnings"
        }
    ]
}
```
