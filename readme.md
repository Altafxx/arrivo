### Routes
1. /login - Retrive **token**
    * POST:
        - username: string, 
        - password: string, 
1. /users 
    * GET - Retrieve **all** user
    * POST: - **Create** new user
        - username: string, 
        - password: string, 
        - email: string, 
        - fullname: string, 
        - membership: 'Premium | Normal'
1. /users/:id
    * GET - Retrive **selected** user
    * PUT: - **Update** posts
        - username: string, 
        - password: string, 
        - email: string, 
        - fullname: string, 
        - membership: 'Premium | Normal'
    * PATCH: - Update **selected item** in user
        - username: string, 
        - password: string, 
        - email: string, 
        - fullname: string, 
        - membership: 'Premium | Normal'
    * DELETE - **Remove** user
1. /posts
    * GET - Retrieve **all** posts
    * POST:  - **Create** new posts
        - title: string
        - body: string
        - categoryid: int
        - status: 'Draft | Published | Pending Review'
        - label: 'Premium | Normal'
1. /posts/:id
    * GET - Retrive **selected** posts
    * PUT: - **Update** posts
        - title: string
        - body: string
        - categoryid: int
        - status: 'Draft | Published | Pending Review'
        - label: 'Premium | Normal'
    * PATCH: - Update **selected** item in posts
        - title: string
        - body: string
        - categoryid: int
        - status: 'Draft | Published | Pending Review'
        - label: 'Premium | Normal'
    * DELETE - **Remove** posts
1. /categories
    * GET - Retrieve **all** category
    * POST: - **Create** new category
        - name: string
        - description: string
1. /categories/:id
    * GET - Retrive **selected** category
    * PUT: - **Update** category
        - name: string
        - description: string
    * PATCH: - Update **selected** item in category
        - name: string
        - description: string
    * DELETE - **Remove** category
1. /subs/premium/:id
    * GET - Change from **Normal** to **Premium**
1. /subs/normal/:id
    * GET - Change from **Premium** to **Normal**
1. /payment/submit
    * GET - Return payment_link and insert to table Payment with status '**due**'
1. /payment/success'
    * GET -  Update status to '**completed**'