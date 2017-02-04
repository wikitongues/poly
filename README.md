# Poly

![Poly](https://raw.githubusercontent.com/wikitongues/poly/master/polyPoster.jpg)

> Poly is open source, modern software to share and learn every language in the world.

Poly streamlines the process of creating and sharing dictionaries between any two languages. Speakers of languages without a written standard, including the world's more than 200 sign languages, are supported by native video functionality.

#Table of Contents
1. [Background](#background)
  1. [About Wikitongues](#about-wikitongues)
1. [Set-up](#install)
  1. [Pre-requisites](#pre-requisits)
  1. [Install](#install)
  1. [Run](#run)
1. [Usage](#usage)
1. [Feature Map](#feature-map)
1. [Security](#security)
1. [Maintainers](#maintainers)
1. [Contribute](#contribute)
1. [License](#license)

#Background
Poly was conceived in response to a [New York Times article](https://www.nytimes.com/2014/08/19/opinion/who-speaks-wukchumni.html) that identified one of the last living speakers of her native language Wukchumni manually composing documentation using pen, paper and a voice recorder. Through years of dedication, Marie Wilcox produced an exhaustive dictionary of her mother language, with supplemental recordings, to be used by future generations in their revitalization efforts.

Marie's reality not unique, and over 5% of the languages spoken in the world today are expected to have fewer than 100 speakers. We at Wikitongues resolved to provide tools to facilitate the experience of documentation.

Development on Poly was made possible by record-breaking a [Kickstarter campaign](www.kck.st/poly). Thank you very much to all our backers.

##About [Wikitongues](www.wikitongues.org)
In the next eighty years, 3,000 languages are expected to disappear. We won't let that happen.

Wikitongues is a platform for every language in the world. We publish oral histories and dictionaries in all of the world's 7,000 languages and develop open source technology for cultural exchange.

[Brief intro](https://youtu.be/54zMtbaDFL8)

You may find the [Oral Histories](https://youtube.com/wikitongues) project on Youtube.

#Set-up
Poly is written in [Ruby on Rails](http://rubyonrails.org/) and [React.js](https://facebook.github.io/react/), and uses [RecordRTC](recordrtc.org) to record video. It uses a [PostgreSQL](https://www.postgresql.org/) database, is deployed to [Heroku](heroku.com) and uses [Amazon S3](https://aws.amazon.com/s3) as content delivery network ([CDN](https://en.wikipedia.org/wiki/Content_delivery_network)). RecordRTC relies on [NPM](https://www.npmjs.com/), which in turn requires [Browserify](http://browserify.org/).

To install and set up this application locally, follow the steps below. For any specific questions, please email us at [poly@wikitongues.org](mailto:poly@wikitongues.org)

##Pre-requisites
You will need the following things properly installed on your computer.
* [Git](http://git-scm.com/)
* [Ruby 2.3.0](https://www.ruby-lang.org/en/downloads/) (check what version of ruby you have by running `ruby -v`)
* [Node.js](https://nodejs.org/en/)
* [Bundler](http://bundler.io/) (run `$ gem install bundler`)

##Install
* Clone or fork this repository with `$ git clone https://github.com/wikitongues/poly.git`
* Change into the new directory
* Install all dependencies with `$ bundle install && npm install`
* Create a Postgres database with `$ rake db:setup`

##Run
To run the application locally, run:
* `$ rails s`
* Visit the app at [http://localhost:3000](http://localhost:3000).

<!-- ## Alternative Workflow with Convox and Docker
An alternative to running poly that dispenses from installing prerequisites like ruby, Postgres, etc... locally is to use [docker](https://www.docker.com/) to run poly locally, namely via the [convox](https://convox.com/) cli.

* [Install docker](https://www.docker.com/products/docker) for your operating system
* [Install convox](https://dl.equinox.io/convox/convox/stable) for your operating system
* Clone or fork this repository with `git clone https://github.com/wikitongues/poly.git`
* Change into the new directory
* Run `bin/poly-setup` once to setup poly (will take a while the first time as docker images are downloaded and built)
* Run `bin/poly-start` to run poly locally (data will be persisted to `~/.convox/volumes/poly/database/var/lib/postgresql/`)
* Run `bin/poly-migrate` in case poly has some pending migrations
* Visit the app at [http://localhost:3000](http://localhost:3000). -->

#Usage
The app is intended to be used via the UI by any person with access to a modern browser.

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
- [x] ~~Testing~~

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
- [x] ~~Password Reset~~

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
- [ ] Phrasebook embed

#####Books
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
- [ ] Search term highlighting [Example](https://github.com/bvaughn/react-highlight-words)
- [ ] Search by tags

##Version 1.0
#####Platform
- [ ] Native app
- [ ] Offline-first architecture
- [ ] Public API
- [ ] Language object model

#Security
The app requires a number of secret keys to function correctly. Features that will not work:
* Password reset
* Video recording

#Maintainers

|<img src="https://avatars1.githubusercontent.com/u/2080065?v=3&s=100" width="100px"/>|[Freddie Andrade](https://github.com/FredericoAndrade)|
|:---|:---|
|<img src="https://avatars3.githubusercontent.com/u/2336288?v=3&s=100" width="100px"/>|[Chris Voxland](https://github.com/ChrisVoxland)|
|<img src="https://avatars1.githubusercontent.com/u/12382534?v=3&s=100" width="100px"/>|[Ben Arias](https://github.com/bjlaa)|



#Contribute
Feel free to dive in!

#Request issues
Feature requests may be made by [opening new issues](https://github.com/wikitongues/poly/issues/new) and labeling them enhancements.

##PRs are accepted.
Make pull requests to have your contributions reviewed and deployed by the maintainers, or contact [us](mailto:poly@wikitongues.org) directly.

Refer to best practices for contributing to open source projects on the [Github Contribution guide](https://guides.github.com/activities/contributing-to-open-source/) or the more comprehensive [Open-Source Contribution Guide](http://www.contribution-guide.org/).

Requirements

##Code of Conduct
All contributors will be held accountable to the [Contributor Covenant](http://contributor-covenant.org/version/1/4/)

#License






<!-- ### Community -->
<!-- Join us on our open [Slack](http://wikitongues-slack.herokuapp.com/) channel. -->
