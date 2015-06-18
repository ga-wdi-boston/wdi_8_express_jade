# Template Node Project Repository

## Server-Side Rendering

Want to render things without a front-end app? We've got you covered. A lot of tradition systems use this type of system so you should know how it works.

Allows you control

Cache the whole site

### The Modules

In this excercise, we will be using three modules: Jade, Stylus and Nib

Jade is a server-side view engines. Much like we used handlebars on our front end to bind data to a template. We will be creating templates as `.jade` files, and passing them data in our express routes.

Stylus is a CSS pre-processor. It allows us to do some nify things with our stylesheets like create mixins and variables. It also frees us from having to use semi-colons and colons. Pretty nifty, right? Anyone who has ever used SASS or LESS will find this sort of deal familiar. We won't dive too far into Stylus, but it's nice to know about.

Nib is a library built specifically for Stylus. It provides many pre-built mixins that will make your life easier, but most importantly, it frees you from having to include vendor prefixes in your CSS. ~Amazing~

Let's go ahead and install these:

```
npm install jade --save-dev
npm install stylus --save-dev
npm install nib --save-dev
```

Now, we need to import these modules into our `app.js`. Near the top of our page, let's add:

```javascript
var jade = require('jade');
var stylus = require('stylus');
var nib = require('nib');
```

As we know by now, it's not enough to just import these middlewear modules. We need to explicitly tell our Express app to include them.

EXCERCISE #1:

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

