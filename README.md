<!-- Refer to Awesome Readme for tips on improving the readme file: https://github.com/matiassingers/awesome-readme -->

# Poly

![Poly](https://raw.githubusercontent.com/wikitongues/poly/master/repo/polyPoster.jpg)

> Poly is open source, modern software to share and learn every language in the world.

Poly streamlines the process of creating and sharing dictionaries between any two languages. Speakers of languages without a written standard, including the world's more than 200 sign languages, are supported by native video functionality.

# Table of Contents
1. [Background](#background)
  1. [About Wikitongues](#about-wikitongues)
1. [Set-up](#install)
  1. [Pre-requisites](#pre-requisits)
  1. [Install](#install)
  1. [Run](#run)
  1. [Test](#test)
    1. [Staging and Production](#staging-and-production)
    1. [Continuous Integration](#continuous-integration)
    1. [Browser testing](#browser-testing)
1. [Usage](#usage)
1. [Feature map](#feature-map)
1. [Security](#security)
1. [Maintainers](#maintainers)
1. [Contribute](#contribute)
  1. [Request features](#request-features)
  1. [PRs are accepted](#prs-are-accepted)
  1. [Best practices](#best-practices)
  1. [Code of conduct](#code-of-conduct)
1. [License](#license)

# Background
Poly was conceived in response to a [New York Times article](https://www.nytimes.com/2014/08/19/opinion/who-speaks-wukchumni.html) that identified one of the last living speakers of her native language Wukchumni manually composing documentation using pen, paper and a voice recorder. Through years of dedication, Marie Wilcox produced an exhaustive dictionary of her mother language, with supplemental recordings, to be used by future generations in their revitalization efforts.

Marie's reality is not unique, and over 5% of the languages spoken in the world today are expected to have fewer than 100 speakers. We at Wikitongues resolved to provide tools to facilitate the experience of documentation.

Initial development on Poly was made possible by record-breaking a [Kickstarter campaign](www.kck.st/poly). Thank you very much to all our backers.

## About [Wikitongues](www.wikitongues.org)

In the next eighty years, 3,000 languages are expected to disappear. We won't let that happen.

![Wikitongues](https://raw.githubusercontent.com/wikitongues/poly/master/repo/wikitonguesBanner.jpg)

Wikitongues is a platform for every language in the world. We publish oral histories and dictionaries in all of the world's 7,000 languages and develop open source technology for cultural exchange.

<!-- [Brief intro](https://youtu.be/54zMtbaDFL8) -->

The [Oral Histories](https://youtube.com/wikitongues) project lives on YouTube.

# Set-up
Poly is written in [Ruby on Rails](http://rubyonrails.org/) and [React.js](https://facebook.github.io/react/), and uses [RecordRTC](recordrtc.org) for video recording. It uses a [PostgreSQL](https://www.postgresql.org/) database, is deployed to [Heroku](heroku.com) and uses [Amazon S3](https://aws.amazon.com/s3) as CDN. RecordRTC relies on [NPM](https://www.npmjs.com/), which in turn requires [Browserify](http://browserify.org/).

To install and set up this application locally, follow the steps below. For any specific questions, please email us at [poly@wikitongues.org](mailto:poly@wikitongues.org).

## Pre-requisites
You will need the following things properly installed on your computer:
* [Git](http://git-scm.com/)
* [Ruby 2.3.0](https://www.ruby-lang.org/en/downloads/) (check what version of ruby you have by running `ruby -v`)
* [NPM](npmjs.com) (Installed with [Node.js](https://nodejs.org/en/))
* [Bundler](http://bundler.io/) (run `$ gem install bundler`)

## Install
1. Clone or fork this repository:

  ```shell
  git clone https://github.com/wikitongues/poly.git
  ```

2. Change into the new directory.
3.  Install all dependencies:

  ```shell
  bundle install && npm install
  ```

4.  Create a Postgres database:

  ```shell
  rake db:setup
  ```

## Run
To start the application locally, run:
```shell
rails server
```

You will also need to run `./local_dev.sh` to compile some stylesheets for the archive.

Then, visit the app at [http://localhost:3000](http://localhost:3000).

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

## Test
Testing is implemented with RSpec, [FactoryGirl](https://github.com/thoughtbot/factory_girl_rails), [shouldamatchers](http://matchers.shoulda.io/) and [simplecov](https://github.com/colszowka/simplecov).

To run tests:

```shell
rspec
```

### Staging and Production
Poly has both a [Staging server](https://poly-staging.herokuapp.com/) and the [live production server](www.poly.wikitongues.org).

### Continuous Integration
Poly uses Continuous integration as provided by [CircleCI.com](https://circleci.com). Right out of the box, it provides automated testing and automatically deploys merged changes to the [staging server](https://poly-staging.herokuapp.com).

### Browser Testing
We're proud to do our live, web-based browser testing together with the awesome people at [BrowserStack](http://browserstack.com).

BrowserStack gives you instant access to all real mobile and desktop browsers. Say goodbye to your lab of devices and virtual machines. Go check them out!

[<img src="https://raw.githubusercontent.com/wikitongues/poly/master/repo/Browserstack_Logo.jpg" width="200px"/>](http://browserstack.com)

# Usage
The app is intended to be used via the UI by any person with access to a modern browser. As of February 21st, 2017, anyone will be able to create an account and start creating content.

[Video Demo](https://youtu.be/rt-NigJJCgI)

[Live App](https://poly.wikitongues.org)
<!-- App screenshots -->

# Feature Map
We use [semantic versioning](http://semver.org/).

For an overview of planned features and future releases, refer to [ROADMAP.md](https://github.com/wikitongues/poly/blob/master/ROADMAP.md).

# Security
The app requires a number of secret keys to function correctly. Features that will not work locally without keys:
* Password reset
* Video recording

# Maintainers
|<img src="https://avatars1.githubusercontent.com/u/2080065?v=3&s=100" width="100px"/>|[Freddie Andrade](https://github.com/FredericoAndrade)|
|:---|:---|
|<img src="https://avatars3.githubusercontent.com/u/2336288?v=3&s=100" width="100px"/>|[Chris Voxland](https://github.com/ChrisVoxland)|

# Core contributors
|<img src="https://avatars1.githubusercontent.com/u/12382534?v=3&s=100" width="100px"/>|[Ben Arias](https://github.com/bjlaa)|
|---|---|
|<img src="https://avatars0.githubusercontent.com/u/12483994?s=400&v=4" width="100px"/>|[Amr Adel](https://github.com/AmrAdelKhalil)|
|<img src="https://avatars2.githubusercontent.com/u/5375262?s=400&v=4" width="100px"/>|[Scott Rohrer](https://github.com/smrohrer)|

# Contribute
We are actively looking for help developing Poly. If you're interested in getting involved, be sure to [let us know](mailto:poly@wikitongues.org)!

## Request features
Feature requests may be made by [opening new issues](https://github.com/wikitongues/poly/issues/new) and labeling them enhancements.

**Note on requesting features:**

>Before making a new request, please review our [roadmap](https://github.com/wikitongues/poly/blob/master/ROADMAP.md) and [issues list](https://github.com/wikitongues/poly/issues) to avoid duplicates. If a feature is already described, please feel free to add your support in the comments!

## PRs are accepted.
Make pull requests to have your contributions reviewed and deployed by the maintainers, or contact us directly by email at [poly@wikitongues.org](mailto:poly@wikitongues.org).

## Best Practices
Refer to the [Github Contribution guide](https://guides.github.com/activities/contributing-to-open-source/) or the more comprehensive [Open-Source Contribution Guide](http://www.contribution-guide.org/) for best practices in contributing to open source projects.

<!-- Requirements -->

## Code of Conduct
All contributors will be held accountable to the [Contributor Covenant](https://github.com/wikitongues/poly/blob/master/CONDUCT.md).

TLDR: be nice. But go read it anyway.

# License
> Poly uses the GNU General Purpose License v3.

Read the license in detail [here](https://github.com/wikitongues/poly/blob/master/LICENSE.txt).
