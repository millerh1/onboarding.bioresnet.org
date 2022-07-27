# DAO Quest website

Template is based on https://github.com/sozonome/nextarter-chakra.

## Requirements

You'll need these env files in a .env.local

Check out the slack for the values.

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY


# Resources
## FrontEnd
TypeScript - https://www.typescriptlang.org/
React - https://reactjs.org/

# Available Scripts

## Install dependencies
```
    yarn install
```

## Run App
```
    yarn start
```

Almost everything should be written in TypeScript. We should not need .css/.html files.

## UI
Chakra UI - https://chakra-ui.com/
Charka UI Pro - https://pro.chakra-ui.com/

ChakraUI is a component system which has things like cards/buttons prebuilt for us. This means we
won't need to style the CSS ourselves. Use these components as much as possible (we'll likely buy
charka-ui pro).

## Deployment/Server Side
NextJS - https://nextjs.org/
* NextJS is the framework we use for building/bundling the website. If you need to talk to a server
    of some sort you might want to look at the docs here. You'll want to do things like use
    `<Image>` from nextjs instead of `<img>` for better rendering.

Vercel - https://vercel.com/
* Vercel is what we're using to deploy the website. Login with the refract gmail. It will handle our
    domains and launching the server.


## Misc
Commit Conventions following - https://www.conventionalcommits.org/en/v1.0.0/#summary
