# Wikitongues Poly

###Poly makes crowdsourcing translation dictionaries in any language easy and familiar.

This README outlines the details of collaborating on this Rails/React application.

Getting started? Start [here](#prerequisites)

###Current Features
* Compose translation dictionaries between two languages using text
* Browse available dictionaries

#Feature Map
Planned features for future releases. Releases are mapped below. We use [semantic versioning](http://semver.org/).

###Version 0.1

- [x] ~~Create new phrasebook~~
- [x] ~~Input and save new phrase~~
- [x] ~~Refactor new phrase controller~~
- [x] ~~Book title, description, L1, L2 editing~~
- [x] ~~Phrase editing~~
- [x] ~~Continuous text phrase input (hit enter to save)~~
- [x] ~~Book authorship~~
- [x] ~~Sign in upon account creation~~

###Version 0.2
- [ ] Testing
- [ ] Book search
- [ ] Deployment
- [ ] Handle media uploads
- [ ] Profile page
  - [ ] User name
  - [ ] User photo
  - [ ] User books
  - [ ] Tag a book as Favorite
- [ ] Handle error messages on login page

###Version  0.3
- [ ] Audio and video phrase interface
- [ ] Input and upload video phrases
- [ ] Input and upload book banner images
- [ ] Only save new book if all inputs are complete
- [ ] Input area blur action behavior
- [ ] Document scroll position progress marker
- [ ] Fixed book languages sub-header

###Version 0.4
- [ ] Add tags to books
- [ ] Search

###Version 1.0

- [ ] Offline-first architecture
- [ ] Public API
- [ ] Language object model


## About [Wikitongues](www.wikitongues.org)
Wikitongues is a movement for language rights.
Together with speakers and signers of every langauge in the world, we're building the most inclusive cultural archive ever made, raising awareness about linguistic diversity and rallying to defend it.

Currently, there are around 7000 classified languages, with an unknowable number of unclassified languages.


### Community
Join us on our open [Slack](http://wikitongues-slack.herokuapp.com/) channel.
  

## Prerequisites
You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* Ruby 2.3.0 (check what version of ruby you have by running `ruby -v`)
* Bundler (`gem install bundler`)

## Installation
* Clone or fork this repository with `git clone https://github.com/wikitongues/poly.git`
* Change into the new directory
* Install all dependencies with `bundle install`
* Create a Postgres database with `rake db:create`

## Running / Development
* `rails s`
* Visit the app at [http://localhost:3000](http://localhost:3000).

### Contributing

Make pull requests to have your contributions reviewed and deployed by the administrator, or contact [us](https://github.com/FredericoAndrade) directly.

Refer to best practices for contributing to open source projects on the [Github Contribution guide](https://guides.github.com/activities/contributing-to-open-source/) or the more comprehensive [Open-Source Contribution Guide](http://www.contribution-guide.org/).
