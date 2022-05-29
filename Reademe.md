How to run?

First, you should have node environment, then run `yarn install` in root

Then, connect an Android mobile, use yarn run start to run Expo development App on phone

How to deploy a apk?

First, you should have an expo account,register here: [Expo Account](https://expo.dev/signup)

Then, install eas-cli, use `npm install -g eas-cli`

After it, use `eas login` to login eas server, run `eas build:configure` to auto config install configuration

Edit `eas.json` like this:
`{
"cli": {
"version": ">= 0.52.0"
},
"build": {
"development": {
"developmentClient": true,
"distribution": "internal"
},
"preview": {
"android": {
"buildType": "apk"
}
},
"preview2": {
"android": {
"gradleCommand": ":app:assembleRelease"
}
},
"preview3": {
"developmentClient": true
},
"production": {}
},
"submit": {
"production": {}
}
}
`

Run `eas build -p android --profile preview` to build an apk with expo!

If you want to release an AAB file for upload to Google Play, just run `eas build -p android`!
