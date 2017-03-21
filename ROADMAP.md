# Poly Roadmap

Planned features for future releases.

[Directory](https://github.com/wikitongues/poly#poly)

# Table of Contents
  1. [Version 0.1 - *deployed*](#version-01-deployed)
  1. [Version 0.2 - *deployed*](#version-02-deployed)
  1. [Version 0.3 - *progress*](#version--03)
  1. [Version 0.4](#version-04)
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
- [ ] Security audit
- [ ] Embed books on other sites
- [ ] Social sharing

### Books
- [ ] Book type - ***Breaking change***
  - [ ] Public/Private ([In Progress](https://github.com/wikitongues/poly/tree/draft-books))
  - [ ] Licenses
  - [ ] Book templates
  - [ ] Single language books
- [ ] Dictionary operations ***Breaking change*** [Example](https://facebook.github.io/draft-js/docs/overview.html#content)
  - [ ] Reorder phrases
    - [ ] Alphabetically
    - [ ] Arbitrarily (Drag & drop)
  - [ ] Delete multiple phrases
- [ ] Rich text - ***Breaking change***
  - [ ] Descriptions
  - [ ] Phrases
- [ ] Document scroll position progress marker
- [ ] Show favorite icon in dashboard
- [ ] Fixed position book languages sub-header
- Video phrases
  - [ ] Transcribe video phrases
  - [ ] Upload video phrases
- [x] ~~Video descriptions~~ - ***Breaking change***

### Users
- [ ] User-to-user contributions
- [ ] User upload profile picture
- [x] ~~User edit profile data~~

### Search
- [ ] Search term highlighting [Example](https://github.com/bvaughn/react-highlight-words)
- [ ] Search by content (In Progress)
- [x] ~~Search by title~~
- [x] ~~Search by author~~

## Version 0.4

### Platform
- [ ] User-facing data import / export

### Books
- [ ] Add tags to books
- [ ] Collaborative Books

### Users
- [ ] Follow a user

### Search
- [ ] Search by tags

## Version 1.0

### Platform
- [ ] Native app
- [ ] Offline-first architecture
- [ ] Public API
- [ ] Language object model
