#Planned features for future releases.
[Directory](https://github.com/wikitongues/poly)

#Table of Contents
1. [Feature map](#feature-map)
  1. [Version 0.1](#version-01-deployed)
  1. [Version 0.2](#version-02)
    1. [Platform](#platform)
    1. [Books](#books)
    1. [Users](#users)
    1. [Search](#search)
  1. [Version 0.3](#version--03)
    1. [Platform](#platform)
    1. [Books](#books)
    1. [Search](#search)
  1. [Version 0.4](#version-04)
    1. [Platform](#platform)
    1. [Books](#books)
    1. [Users](#users)
    1. [Search](#search)
  1. [Version 1.0](#version-10)
    1. [Platform](#platform)

##Version 0.1 DEPLOYED
- [x] ~~Create new phrasebook~~
- [x] ~~Input and save new phrase~~
- [x] ~~Refactor new phrase controller~~
- [x] ~~Book title, description, L1, L2 editing~~
- [x] ~~Phrase editing~~
- [x] ~~Continuous text phrase input (hit enter to save)~~
- [x] ~~Book authorship~~
- [x] ~~Sign in upon account creation~~

##Version 0.2
###Platform
- [x] ~~Deployment~~
- [x] ~~Alerts~~
- [x] ~~Refactor to ES6~~
- [x] ~~Testing~~

###Books
- [x] ~~Favorite a book~~
- [x] ~~Only save new book if all inputs are complete~~
- [x] ~~In-progress phrase ellipsis animation~~
- [ ] Video descriptions
- [ ] Video phrases ([In progress](https://github.com/wikitongues/poly/tree/video-comp-ben))
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
  - [ ] User edit profile data
  - [ ] User upload profile picture
- [x] ~~Password Reset~~

###Search
- [x] ~~Search by language~~

##Version  0.3
###Platform
- [ ] Security audit
- [ ] Phrasebook embed

###Books
- [ ] Book type ***Breaking change***
  - [ ] Public/Private ([In Progress](https://github.com/wikitongues/poly/tree/draft-books))
  - [ ] Licenses
  - [ ] Book templates
  - [ ] Dictionaries
- [ ] Dictionary operations
  - [ ] Reorder phrases
    - [ ] Alphabetically
    - [ ] Arbitrarily (Drag & drop)
  - [ ] Delete multiple phrases
- [ ] Rich text [Example](https://facebook.github.io/draft-js/docs/overview.html#content)
  - [ ] Descriptions
  - [ ] Phrases
- [ ] Document scroll position progress marker
- [ ] Fixed position book languages sub-header
- [ ] Video phrases
  - [ ] Transcribe video phrases
  - [ ] Upload video phrases

###Search
- [ ] Search by title
- [ ] Search by author

##Version 0.4
###Platform
- [ ] User-facing data import / export

###Books
- [ ] Add tags to books
- [ ] Collaborative Books

###Users
- [ ] Follow a user

###Search
- [ ] Search by content
- [ ] Search term highlighting [Example](https://github.com/bvaughn/react-highlight-words)
- [ ] Search by tags

##Version 1.0
###Platform
- [ ] Native app
- [ ] Offline-first architecture
- [ ] Public API
- [ ] Language object model