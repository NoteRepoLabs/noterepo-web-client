<img src="./github/banner.svg" alt="RepoBanner" />

# Web Client

![](https://img.shields.io/github/license/NoteRepoLabs/noterepo-web-client?style=for-the-badge&colorA=131820&colorB=FFFFFF&logo=markdown)
![](https://img.shields.io/npm/v/@nestjs/core.svg?style=for-the-badge&colorA=131820&colorB=FFFFFF&logo=markdown)
![](https://img.shields.io/github/deployments/NoteRepoLabs/noterepo-web-client/production?style=for-the-badge&logo=vercel&label=DEPLOYMENT&labelColor=%23131820&color=%2364fab6)


Web client for the NoteRepo backend written with NextJS and Typescript.  
[NoteRepo](https://noterepo-web.vercel.app/) is a collaborative effort to make access to our university course materials easier by uploading them in a central hub.

## Features

1. **Authentication**: Seure user sign up / sign in / sign out.
2. **Repositories**: Users can create and upload files into their repositories.
4. **Security is a top priority**: User information and data is encrypted and cleared from device every 5 days.
5. **Optimized for speed**: Blazingly fast, updates are synchronized across devices seamlessly.
6. **Uploads**: You can upload, share and delete files, and entire repositories!
7. **Customization**: The app theme, repository view layout and others can be dynamically changed.
8. **Global Search**: Find and bookmark cool repositories others have shared.
9. **Open Source**: We believe software should be free for all, every line of code is free for anyone to checkout.

## FAQs

### 1. I'm unable to sign in!
   
   This is usually an issue with the browser cache. If a full refresh doesn't do the trick, try clearing your cache and cookies.

### 2. Some of my repos or files don't show up

  One possible cause is creating or deleting a repo or file on one device and trying to access them on another. We automatically sync out-of-date repos every 5   minutes to improve performance.

### 3. I'm unable to upload some file types

  NoteRepo limits the kinds of files you can upload to our servers to improve security, they're limited to only word, powerpoint, pdf and image files.

### 4. I Keep getting an error when I upload a valid file!
  
  We limit the file size of any repo to 10MB since most study materials don't exceed this threshold...and our BLOB store won't allow it either for the free plan. :)

### 5. How safe are my files? Can anyone else view them?

  Security is our top priority when developing NoteRepo, by default the server encrypts some of your user and file information and no other entity knows about what you upload unless you compromise your account password. Never share it with anyone by the way.

### 6. How do I delete my account?

  It's sad to see you want to go, but you can delete your account and everything else associated with it by going to the accounts page.

## For Developers

We're actively looking for contributers eager to work on NoteRepo, as we're only two engineers working on it at the moment. If you know NextJS and Typescript, feel free to submit pull requests, they're always welcome!

### Building the client (dev mode)

To get started, git clone the repository and cd into it.

```sh
git clone https://github.com/NoteRepoLabs/note-repo-web-client.git
cd note-repo-client
```

Then install the dependencies using `npm`

```sh
npm install
```

You can run the client in development mode using this command (Linux).

```sh
chmod +x ./clean.sh ./build.sh ./dev.sh
./dev.sh
```

On Windows systems, you can use `npm run dev`.

### Encryption Key

NoteRepo encrypts data it saves on your device to improve security and as such you might encounter errors while trying to build from source. To fix this, generate and store your encryption key in a `.env` file.

```sh
openssl rand -base64 32
```

You can paste the key in the `.env.example` file and rename that to `.env`.

### Bug Reports

The client is still in its early stages, so bugs may be present. You can report any bugs you find using the `issues` tab if it's not presently being fixed.

# License

NoteRepo is provided under the [MIT](./LICENSE) Open Source license.
