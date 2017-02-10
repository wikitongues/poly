#Poly Roadmap
Planned features for future releases.

[Directory](https://github.com/wikitongues/poly#poly)

#Table of Contents
1. [Feature map](#feature-map)
  1. [Version 0.1](#version-01-deployed)
  1. [Version 0.2](#version-02-deployed)
  1. [Version 0.3](#version--03)
  1. [Version 0.4](#version-04)
  1. [Version 1.0](#version-10)

##Version 0.1, *Deployed*
Version 0.1 establishes the application. It prepares an application to receive users, allows the creation of books and the input and editing of phrase content.
- [x] ~~Create new phrasebook~~
- [x] ~~Input and save new phrase~~
- [x] ~~Refactor new phrase controller~~
- [x] ~~Book title, description, L1, L2 editing~~
- [x] ~~Phrase editing~~
- [x] ~~Continuous text phrase input (hit enter to save)~~
- [x] ~~Book authorship~~
- [x] ~~Sign in upon account creation~~

##Version 0.2, *Deployed*
Version 0.2 focuses on developing core features that are not structural. Breaking changes to the schema for implementation of book favoriting. Heavy attention paid to video input and display, as well as search. A user dashboard and profile pages are also anticipated.
###Platform
- [x] ~~Deployment~~
- [x] ~~Alerts~~
- [x] ~~Refactor to ES6~~
- [x] ~~Testing~~

###Books
- [x] ~~Favorite a book~~ ***Breaking change***
- [x] ~~Only save new book if all inputs are complete~~
- [x] ~~In-progress phrase ellipsis animation~~
- [x] ~~Video phrases~~
  - [x] ~~Video phrase interface~~
  - [x] ~~Input video phrases~~

###Users
- [x] ~~Proper user validations~~
  - [x] ~~Unique usernames~~
  - [x] ~~Handle error messages on login page~~
- [x] ~~Profile page~~
  - [x] ~~User name~~
  - [x] ~~User books~~
  - [x] ~~Gravatar~~
- [x] ~~Password Reset~~

###Search
- [x] ~~Search by language~~

##Version  0.3
Version 0.3 introduces breaking changes to the schema for implementation of book type and status, as well as for phrase operations like reordering and rich-text.
###Platform
- [ ] Security audit
- [ ] Phrasebook embed
- [ ] Phrasebook social sharing

###Books
- [ ] Book type ***Breaking change***
  - [ ] Public/Private ([In Progress](https://github.com/wikitongues/poly/tree/draft-books))
  - [ ] Licenses
  - [ ] Book templates
  - [ ] Dictionaries
- [ ] Dictionary operations ***Breaking change***
  - [ ] Reorder phrases
    - [ ] Alphabetically
    - [ ] Arbitrarily (Drag & drop)
  - [ ] Delete multiple phrases
- [ ] Rich text [Example](https://facebook.github.io/draft-js/docs/overview.html#content) ***Breaking change***
  - [ ] Descriptions
  - [ ] Phrases
- [ ] Document scroll position progress marker
- [ ] Fixed position book languages sub-header
- [x] ~~Video descriptions~~ ***Breaking change***
- [ ] Video phrases
  - [ ] Transcribe video phrases
  - [ ] Upload video phrases

###Users
- [ ] User edit profile data
- [ ] User upload profile picture

###Search
- [ ] Search term highlighting [Example](https://github.com/bvaughn/react-highlight-words)
- [x] ~~Search by content~~
- [x] ~~Search by title~~
- [x] ~~Search by author~~

##Version 0.4
###Platform
- [ ] User-facing data import / export

###Books
- [ ] Add tags to books
- [ ] Collaborative Books

###Users
- [ ] Follow a user

###Search
- [ ] Search by tags

##Version 1.0
###Platform
- [ ] Native app
- [ ] Offline-first architecture
- [ ] Public API
- [ ] Language object model