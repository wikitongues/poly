# Poly Roadmap

Planned features for future releases.

[Directory](https://github.com/wikitongues/poly#poly)

# Table of Contents
  1. [Version 0.1 - *deployed*](#version-01-deployed)
  1. [Version 0.2 - *deployed*](#version-02-deployed)
  1. [Version 0.3 - *progress*](#version--03)
  1. [Version 1.0](#version-10)

## Version 0.1, *Deployed*

Version 0.1 establishes the application. It prepares an application to receive users, allows the creation of books and the input and editing of phrase content.
- [x] ~~Create new book~~
- [x] ~~Input and save new phrase~~
- [x] ~~Refactor new phrase controller~~
- [x] ~~Book title, description, L1, L2 editing~~
- [x] ~~Phrase editing~~
- [x] ~~Continuous text phrase input (hit enter to save)~~
- [x] ~~Book authorship~~
- [x] ~~Sign in upon account creation~~

## Version 0.2, *Deployed*

Version 0.2 focuses on developing core features that are not structural. Breaking changes to the schema for implementation of book favoriting. Heavy attention paid to video input and display, as well as search. A user dashboard and profile pages are also anticipated.

### Platform
- [x] ~~Deployment~~
- [x] ~~Alerts~~
- [x] ~~Refactor to ES6~~
- [x] ~~Testing~~

### Books
- [x] ~~Favorite a book~~ - ***Breaking change***
- [x] ~~Only save new book if all inputs are complete~~
- [x] ~~In-progress phrase ellipsis animation~~
- [x] ~~Video phrases~~
  - [x] ~~Video phrase interface~~
  - [x] ~~Input video phrases~~

### Users
- [x] ~~Proper user validations~~
  - [x] ~~Unique usernames~~
  - [x] ~~Handle error messages on login page~~
- [x] ~~Profile page~~
  - [x] ~~User name~~
  - [x] ~~User books~~
  - [x] ~~Gravatar~~
- [x] ~~Password Reset~~

### Search
- [x] ~~Search by language~~

## Version  0.3

Version 0.3 introduces breaking changes to the schema for implementation of book type and status, as well as for phrase operations like reordering and rich-text.

### Platform
- [x] ~~Infinite scrolling~~
- [ ] Security audit
- [ ] [Code test coverage](https://github.com/wikitongues/poly/issues/270)
- [ ] [Embed books on other sites](https://github.com/wikitongues/poly/issues/146)
- [ ] [Social sharing](https://github.com/wikitongues/poly/issues/214)
- [ ] User-facing data import / export
- [ ] Dashboard 2.0

### Books
- [ ] Document scroll position progress marker
- [ ] Show favorite icon in dashboard
- [ ] Phrase inline comments and social interactions such as likes and emojis
- [ ] Fixed position book languages sub-header
- [ ] Upvote and downvote books
- [ ] Add tags to books
- [ ] Collaborative and multi-author Books
- [ ] Book type - ***Breaking change***
  - [ ] Public/Private ([In Progress](https://github.com/wikitongues/poly/tree/draft-books))
  - [ ] [Licenses](https://github.com/wikitongues/poly/issues/206)
  - [ ] Book templates
  - [ ] Single language books
- [ ] Dictionary operations - ***Breaking change*** [Example](https://facebook.github.io/draft-js/docs/overview.html#content)
  - [ ] Delete multiple phrases
  - [ ] [Reorder phrases](https://github.com/wikitongues/poly/issues/245)
    - [ ] Alphabetically
    - [ ] Arbitrarily (Drag & drop)
  - [ ] Translate this book (Template from source phrases)
- [ ] [Rich text](https://github.com/wikitongues/poly/issues/141) - ***Breaking change***
  - [ ] Descriptions
  - [ ] Phrases
- [ ] Phrases - ***Breaking change***
  - [ ] Transcribe video phrases
  - [ ] [Upload video phrases](https://github.com/wikitongues/poly/issues/207)
  - [ ] Upvote and downvote phrases
  - [ ] [Audio phrases](https://github.com/wikitongues/poly/issues/267)
  - [ ] [Phrase pairs should allow video and text simultaneously](https://github.com/wikitongues/poly/issues/282)
- [x] ~~Video descriptions~~ - ***Breaking change***
  - [ ] [Upload video description](https://github.com/wikitongues/poly/issues/207)

### Users
- [ ] Follow a user
- [ ] User to user book contributions
- [ ] User upload profile picture
- [ ] User notifications [Example](https://gorails.com/episodes/in-app-messaging-between-users)
  - [ ] When an owned book gets favorited
  - [ ] When a user receives a message
- [ ] User to user messaging
- [x] ~~User edit profile data~~

### Search
- [ ] Search term highlighting [Example](https://github.com/bvaughn/react-highlight-words)
- [ ] [Search by content (In Progress)](https://github.com/wikitongues/poly/issues/205)
- [x] ~~Search by title~~
- [x] ~~Search by author~~
- [ ] Search by tags

## Version 1.0

### Platform
- [ ] Native app
- [ ] Offline-first architecture
- [ ] Public API
- [ ] Language object model

#### Email
- [ ] Retention email campaign
  - [ ] Weekly summaries
  - [ ] Interactions
    - [ ] Someone has favorited your book
    - [ ] Someone has suggested a change to your book
