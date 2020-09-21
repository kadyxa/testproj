define({ "api": [
  {
    "type": "get",
    "url": "/getCurrencies",
    "title": "get Currencies",
    "name": "getCurrencies",
    "group": "Currencies",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "JSONStatus",
            "description": "<p>Status of the Sever.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n   \"AUD\",\n   \"GBP\",\n   \"BYR\",\n   \"DKK\",\n   \"USD\",\n   \"EUR\",\n   \"ISK\",\n   \"KZT\",\n   \"RUB\"\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/index.js",
    "groupTitle": "Currencies"
  },
  {
    "type": "get",
    "url": "/getCurrenciesApi",
    "title": "get Currencies Api",
    "name": "getCurrenciesApi",
    "group": "Currencies",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "JSONStatus",
            "description": "<p>Status of the Sever.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n\t        \"ValCurs\": {\n\t\t        \"$\": {\n\t\t\t        \"Date\": \"18.09.2020\",\n\t\t\t        \"name\": \"Foreign Currency Market\"\n\t\t        },\n\t\t        \"Valute\": [\n\t\t\t        {\n\t\t\t\t        \"$\": {\"ID\": \"R01010\"},\n\t\t\t\t        \"NumCode\": [\"036\"],\n\t\t\t\t        \"CharCode\": [\"AUD\"],\n\t\t\t            \"Nominal\": [\"1\"],\n\t\t\t            \"Name\": [\"������������� ������\"],\n\t\t\t            \"Value\": [\"54,8842\"]\n\t\t            },\n\t\t            {\n\t\t\t            \"$\": {\"ID\": \"R01020A\"},\n\t\t\t            \"NumCode\": [\"944\"],\n\t\t\t            \"CharCode\": [\"AZN\"],\n\t\t\t            \"Nominal\": [\"1\"],\n\t\t\t            \"Name\": [\"��������������� �����\"],\n\t\t\t            \"Value\": [\"44,2579\"]\n\t\t            }\n\t            ]\n         }\n     }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/index.js",
    "groupTitle": "Currencies"
  },
  {
    "type": "get",
    "url": "/",
    "title": "Sever Status information",
    "name": "GetServerStatus",
    "group": "Server",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "JSONStatus",
            "description": "<p>Status of the Sever.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"sever\": \"is working\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/index.js",
    "groupTitle": "Server"
  },
  {
    "type": "post",
    "url": "/getTransactionsАmountById",
    "title": "get Transactions Аmount By Id user",
    "name": "getTransactionsАmountById",
    "group": "TRANSACTIONS",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "JSONStatus",
            "description": "<p>Status of the Sever.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"SUM(amount)\": 130.20000076293945\n }",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  \"err\":\"not authenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/index.js",
    "groupTitle": "TRANSACTIONS"
  },
  {
    "type": "post",
    "url": "/transactionsDelete",
    "title": "transactions Delete",
    "name": "transactionsDelete",
    "group": "TRANSACTIONS",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "JSONStatus",
            "description": "<p>Status of the Sever.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"fieldCount\": 0,\n    \"affectedRows\": 1,\n    \"insertId\": 5,\n    \"serverStatus\": 2,\n    \"warningCount\": 0,\n    \"message\": \"\",\n    \"protocol41\": true,\n    \"changedRows\": 0\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  \"err\":\"not authenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/index.js",
    "groupTitle": "TRANSACTIONS"
  },
  {
    "type": "post",
    "url": "/transactionsDeleteAll",
    "title": "transactions Delete All",
    "name": "transactionsDeleteAll",
    "group": "TRANSACTIONS",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "JSONStatus",
            "description": "<p>Status of the Sever.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"fieldCount\": 0,\n    \"affectedRows\": 1,\n    \"insertId\": 5,\n    \"serverStatus\": 2,\n    \"warningCount\": 0,\n    \"message\": \"\",\n    \"protocol41\": true,\n    \"changedRows\": 0\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  \"err\":\"not authenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/index.js",
    "groupTitle": "TRANSACTIONS"
  },
  {
    "type": "post",
    "url": "/transactionsInsert",
    "title": "Transactions Insert",
    "name": "transactionsInsert",
    "group": "TRANSACTIONS",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "JSONStatus",
            "description": "<p>Status of the Sever.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"fieldCount\": 0,\n    \"affectedRows\": 1,\n    \"insertId\": 5,\n    \"serverStatus\": 2,\n    \"warningCount\": 0,\n    \"message\": \"\",\n    \"protocol41\": true,\n    \"changedRows\": 0\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  \"err\":\"not authenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/index.js",
    "groupTitle": "TRANSACTIONS"
  },
  {
    "type": "post",
    "url": "/transactionsUpdate",
    "title": "transactions Update",
    "name": "transactionsUpdate",
    "group": "TRANSACTIONS",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "JSONStatus",
            "description": "<p>Status of the Sever.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"fieldCount\": 0,\n    \"affectedRows\": 1,\n    \"insertId\": 5,\n    \"serverStatus\": 2,\n    \"warningCount\": 0,\n    \"message\": \"\",\n    \"protocol41\": true,\n    \"changedRows\": 0\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  \"err\":\"not authenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/index.js",
    "groupTitle": "TRANSACTIONS"
  },
  {
    "type": "post",
    "url": "/createUser",
    "title": "Create User",
    "name": "CreateUser",
    "group": "USER",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "JSONStatus",
            "description": "<p>Status of the Sever.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"sever\": \"is working\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"username\":\"admin\",\n  \"password\":\"admin\",\n  \"currency\":\"RUB\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  \"err\":\"not authenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/index.js",
    "groupTitle": "USER"
  },
  {
    "type": "post",
    "url": "/deleteAllUsers",
    "title": "Delete All Users",
    "name": "DeleteAllUsers",
    "group": "USER",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "JSONStatus",
            "description": "<p>Status of the Sever.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"sever\": \"is working\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  \"err\":\"not authenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/index.js",
    "groupTitle": "USER"
  },
  {
    "type": "post",
    "url": "/deleteUser",
    "title": "Delete User",
    "name": "DeleteUser",
    "group": "USER",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "JSONStatus",
            "description": "<p>Status of the Sever.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"fieldCount\": 0,\n      \"affectedRows\": 1,\n      \"insertId\": 0,\n      \"serverStatus\": 2,\n      \"warningCount\": 0,\n      \"message\": \"\",\n      \"protocol41\": true,\n      \"changedRows\": 0\n }",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  \"err\":\"not authenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/index.js",
    "groupTitle": "USER"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login user",
    "name": "Login",
    "group": "USER",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "JSONStatus",
            "description": "<p>Status of the Sever.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"auth\": {\n         \"user\": \"admin\",\n         \"id\": 1,\n         \"currency\": 5,\n         \"role\": 1\n      }\n }",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  \"err\":\"not authenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/index.js",
    "groupTitle": "USER"
  },
  {
    "type": "post",
    "url": "/logout",
    "title": "Logout",
    "name": "Logout",
    "group": "USER",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "JSONStatus",
            "description": "<p>Status of the Sever.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n     \"logout\": \"success\"\n }",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  \"err\":\"not authenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/index.js",
    "groupTitle": "USER"
  },
  {
    "type": "post",
    "url": "/updateUser",
    "title": "Update User",
    "name": "UpdateUserUser",
    "group": "USER",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "JSONStatus",
            "description": "<p>Status of the Sever.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"fieldCount\": 0,\n      \"affectedRows\": 1,\n      \"insertId\": 0,\n      \"serverStatus\": 2,\n      \"warningCount\": 0,\n      \"message\": \"(Rows matched: 1  Changed: 1  Warnings: 0\",\n      \"protocol41\": true,\n      \"changedRows\": 1\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  \"err\":\"not authenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/index.js",
    "groupTitle": "USER"
  },
  {
    "type": "post",
    "url": "/getTransactionsАmountById",
    "title": "get Transactions Аmount By Id user",
    "name": "getTransactionsАmountById",
    "group": "USER",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "JSONStatus",
            "description": "<p>Status of the Sever.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"SUM(amount)\": 130.20000076293945\n }",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Found\n{\n  \"err\":\"not authenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/index.js",
    "groupTitle": "USER"
  }
] });
