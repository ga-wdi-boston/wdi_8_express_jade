# Template Node Project Repository

## Server-Side Rendering

Server side rendering allows you to render html in the client without the use of a frontend app.

### Why render in your server?

Perceived faster DOM load speeds

Allows you control

Cache the whole site

### The Modules

In this excercise, we will be using two modules: Jade and File System.

Jade is a server-side view engines. Much like we used handlebars on our front end to bind data to a template. We will be creating templates as `.jade` files, and passing them data in our express routes.

File System is a module that allows you to read and write to files in your node server.

We will mostly be focusing on Jade in this lesson, but we will make use of FS later on.

### The Setup

Let's go ahead and install Jade and our other dependecies:

```
npm install jade --save-dev
npm install
```
FS is part of core node, so we do not need to install it.

Now, we need to import these modules into our `app.js`. Near the top of our page, let's add:

```javascript
var jade = require('jade');
var fs = require('fs');
```

As we know by now, it's not enough to just import these middlewear modules. We need to explicitly tell our Express app to include them:

```javascript
app.set('view engine', 'jade');
app.set('views', './templates');
```

First, we set jade as the view engine of our Express app. This tells express to use our Jade middlewear whenever we call `.render`. Next, we set a designated folder that Express will look to for our Jade templates. Since we don't have a templates directory yet, let's create one in the root of our app.

### Baby Steps

We've tossed around terms like server-side rendering and view engines by now, and you may confused about what these are, so let's go through a quick example so you can see the practice in action.

First, let's create our first Jade template. Navigate into your templates directory and touch a file called `index.jade`. We will use the `.jade` extension for all of our templates.

Jade has an unfamiliar, but simple syntax. We always harp on you guys to indent properly for readability-sake, but with Jade

```javascript
app.get('/', function(req, res) {
  res.render( 'index', {name: "Max", message: 'Welcome to our contacts page! I hope you have a good stay.'});
});
```

```jade
html
  head
    title #{name}'s Contact Warehouse
  body
    h1 #{name}'s Contact Warehouse
    h4 #{message}
```

EXCERCISE #2

Add a layout page and extend it to our hello world route:

Our Layout:

```jade
html
  head
    title Contact Warehouse
    link(rel='stylesheet', href='/stylesheets/style.css')
  body
    header
      h1 Contact Warehouse
      block main
```
Our new index.jade:
```jade
extend layout
block main
    h1 #{name}'s Contact Warehouse
    h4 #{message}
```

EXCERCISE #3

Now we will have fun with iteration to render all of our contacts.

This section covers: iteration, embedding javascript into our templates, more advanced syntax

```jade
extend layout
block main
  h1 Contacts
    //- iterating through all of the contacts here
    for contact in contacts
      h3 Name: #{contact.firstName} #{contact.lastName}
      h4 Title: #{contact.title}
      //- // checking to see if we have email addresses
      if (contact.emailAddresses.length > 0)
        h4 Email Addresses:
        //- // iterating through email addresses
        for email in contact.emailAddresses
          p #{email.emailAddressType}: #{email.emailAddress}
      if (contact.phoneNumbers.length > 0)
        h4 Phone Numbers:
        //- // iterating through phone numbers
        for phone in contact.phoneNumbers
          p #{phone.phoneNumberType}: #{phone.phoneNumber}
      if (contact.addresses.length > 0)
        h4 Addresses:
        //- // iterating through addresses
        for address in contact.addresses
          p #{address.street},
          p #{address.city}, #{address.state} #{address.zipCode}
          p #{address.country}
```


- have an index page layout with some javascript that allows users to send post requests to create new contacts
- remember to have them install a jade sublime highlighter

