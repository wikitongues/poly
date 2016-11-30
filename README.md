# Wikitongues Poly

###Poly is open source, modern software to share and learn every language in the world.

This README outlines the details of collaborating on this Rails/React application.

Getting started? Start [here](#prerequisites)

[Brief intro](https://youtu.be/TgTn8HlUVZo)

#Feature Map
Planned features for future releases. Releases are mapped below. We use [semantic versioning](http://semver.org/).

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
#####Platform
- [x] ~~Deployment~~
- [x] ~~Alerts~~
- [x] ~~Refactor to ES6~~
- [ ] Testing ([In progress](https://github.com/wikitongues/poly/tree/79-improve-unit-test-coverage))

#####Users
- [x] ~~Proper user validations~~
  - [x] ~~Unique usernames~~
  - [x] ~~Handle error messages on login page~~
- [x] ~~Profile page~~
  - [x] ~~User name~~
  - [x] ~~User books~~
  - [x] ~~Gravatar~~
  - [ ] User edit profile data
  - [ ] User upload profile picture
- [ ] Password Reset

#####Books
- [x] ~~Favorite a book~~
- [x] ~~Only save new book if all inputs are complete~~
- [x] ~~In-progress phrase ellipsis animation~~
- [ ] Video descriptions
- [ ] Video phrases ([In progress](https://github.com/wikitongues/poly/tree/video-comp-ben))
  - [x] ~~Video phrase interface~~
  - [x] ~~Input video phrases~~

#####Search
- [x] ~~Search by language~~

##Version  0.3
#####Platform
- [ ] Security audit

#####Books
- [ ] Book type ***Breaking change***
  - [ ] Public/Private ([In Progress](https://github.com/wikitongues/poly/tree/draft-books))
  - [ ] Licenses
  - [ ] Book templates
  - [ ] Dictionaries
- [ ] Rich text
  - [ ] Descriptions
  - [ ] Phrases
- [ ] Document scroll position progress marker
- [ ] Fixed position book languages sub-header
- [ ] Video phrases
  - [ ] Transcribe video phrases
  - [ ] Upload video phrases

#####Search
- [ ] Search by title
- [ ] Search by author

##Version 0.4
#####Platform
- [ ] User-facing data import / export

#####Books
- [ ] Add tags to books
- [ ] Collaborative Books

#####Users
- [ ] Follow a user

#####Search
- [ ] Search by content
- [ ] Search by tags

##Version 1.0
#####Platform
- [ ] Native app
- [ ] Offline-first architecture
- [ ] Public API
- [ ] Language object model


## About [Wikitongues](www.wikitongues.org)
Wikitongues is a movement for language rights.
Together with speakers and signers of every langauge in the world, we're building the most inclusive cultural archive ever made, raising awareness about linguistic diversity and rallying to defend it.

Currently, there are around 7000 classified languages, with an unknowable number of unclassified languages.


<!-- ### Community -->
<!-- Join us on our open [Slack](http://wikitongues-slack.herokuapp.com/) channel. -->

###Directory


You can find the language database project repo at [https://github.com/wikitongues/language-api](https://github.com/wikitongues/language-api).

You can find the [Oral Histories](https://youtube.com/wikitongues) project on [Youtube](https://youtube.com/wikitongues)



## Prerequisites
You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* Ruby 2.3.0 (check what version of ruby you have by running `ruby -v`)
* Bundler (`gem install bundler`)

## Installation
* Clone or fork this repository with `git clone https://github.com/wikitongues/poly.git`
* Change into the new directory
* Install all dependencies with `bundle install`
* Create a Postgres database with `rake db:setup`

## Running / Development
* `rails s`
* Visit the app at [http://localhost:3000](http://localhost:3000).

## Alternative Workflow with Convox and Docker

An alternative to running poly that dispenses from installing prerequisites like ruby, Postgres, etc... locally is to use [docker](https://www.docker.com/) to run poly locally, namely via the [convox](https://convox.com/) cli.

* [Install docker](https://www.docker.com/products/docker) for your operating system
* [Install convox](https://dl.equinox.io/convox/convox/stable) for your operating system
* Clone or fork this repository with `git clone https://github.com/wikitongues/poly.git`
* Change into the new directory
* Run `bin/poly-setup` once to setup poly (will take a while the first time as docker images are downloaded and built)
* Run `bin/poly-start` to run poly locally (data will be persisted to `~/.convox/volumes/poly/database/var/lib/postgresql/`)
* Run `bin/poly-migrate` in case poly has some pending migrations
* Visit the app at [http://localhost:3000](http://localhost:3000).

### Contributing

Make pull requests to have your contributions reviewed and deployed by the administrator, or contact [us](https://github.com/FredericoAndrade) directly.

Refer to best practices for contributing to open source projects on the [Github Contribution guide](https://guides.github.com/activities/contributing-to-open-source/) or the more comprehensive [Open-Source Contribution Guide](http://www.contribution-guide.org/).
