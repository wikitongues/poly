# Wikitongues Poly

###Poly makes crowdsourcing translation dictionaries in any language easy and familiar.

This README outlines the details of collaborating on this Ember CLI application.

Getting started? Start [here](#prerequisites)

###Current Features
* Compose translation dictionaries between two languages using text
* Browse available dictionaries
* Favorite dictionaries
* Immediately publish content to the Poly community

#Feature Map
Planned features for future releases. Releases are mapped below. We use [semantic versioning](http://semver.org/).

###Version 0.1

- [x] ~~Create new phrasebook~~
- [x] ~~Input and save new phrase~~
- [x] ~~Audio and video phrase interface~~
- [x] ~~Tag a book as Favorite~~
- [x] ~~Refactor new phrase controller~~

###Version 0.2
- [ ] Profile page
  - [ ] User object
  - [ ] User name
  - [ ] User photo
- [ ] Book authorship
- [ ] Sign in upon account creation
- [ ] Handle error messages on login page
- [ ] Properly remove all phrases on book destroy (BUG)
- [ ] Fix double input (BUG)

###Version  0.3

- [ ] Book title, description, L1, L2 editing
- [ ] Phrase editing
- [ ] Continuous text phrase input (hit enter to save)
- [ ] Input and upload sound and video phrases
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
  + [Slack](https://wikitongues.slack.com)
  + [Gitter](https://gitter.im/wikitongues)
  + [IRC](http://www.irchelp.org/)


## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone https://github.com/wikitongues/poly.git` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit the app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Contributing

Make pull requests to have your contributions reviewed and deployed by the administrator, or contact [us](https://github.com/FredericoAndrade) directly.

Refer to best practices for contributing to open source projects on the [Github Contribution guide](https://guides.github.com/activities/contributing-to-open-source/) or the more comprehensive [Open-Source Contribution Guide](http://www.contribution-guide.org/).


## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
* [firebase](http://www.firebase.com/)
* [emberFire](https://www.firebase.com/docs/web/libraries/ember/)



<!-- ## Other Projects
[Explore](#videos) - [Branch](https://github.com/wikitongues/Ember-Homepage/tree/watch-page)

### A Language Platform
We are a community of constant learners, curious in our pursuits to know more about our world. It is no surprise therefore that ideas and projects are infinite. With that in mind, we have dedicated most of our efforts towards a persistent platform accessible both on web browsers and native mobile apps.

This platform will facilitate two main objectives:

1. The exploration of our video content in greater depth
2. The creation and crowdsourcing of bilingual phrasebooks3.


These objectives describe our vision for a platform on which all languages may be used, and where speakers and signers may share their language with the world.

### Elements

### User
A user will be able to make an account on which all his/her activity will be tracked. This includes:

+ Videos uploaded
+ Videos watched
+ Transcriptions added
+ Translations made
+ Tweaks to other people’s editable transcriptions/translations
+ Comments and comment threads

The ability to edit one’s profile with personal information such as:

+ Name
+ Profile picture
+ Bio
+ Location
+ Languages known
+ Writing systems known
+ Interface language

**_A note on interface language:
All text on Wikitongues should be translatable to any language._**



### Videos
Video content is integral to Wikitongues and to any form of language content. The ability to fully immerse oneself into a language and the community around it is facilitated by the ability to:

+ Watch
+ Comment
+ Transcribe
+ Translate
+ Record
+ Upload

The ability to explore them based on multiple relationships including:

+ Language
+ Language country of origin
+ Writing system
+ Geneaology

A video contains the following information:

+ Author
+ Speaker or signer (May be same as author)
+ Date created
+ Location created
+ Tags (Used for themes or topics)
+ Languages used
+ Transcription
+ Transcription edit license (Anyone can edit, anyone can suggest, collaborators can edit, collaborators can suggest, only author can edit)
+ Transcription collaborators (If not video author)
+ Transcription last edited
+ Transcription history
+ Translation language
+ Translation

Comment license (Open, moderate or strict, disabled)

### Phrasebooks
Phrasebooks represent a new approach to language access. Through them, users are able to learn and share knowledge of their language. The technology offers:

1. The ability to create bilingual phrasebooks with one source language and one target language. Each phrasebook has the following information:
    + Author
    + Date created
    + Location created
    + Release license (Free, subscription, single purchase)
    + Title
    + Tags (Used for themes or topics)
    + Banner (Image or video)
    + Edit license (Anyone can edit, anyone can suggest, collaborators can edit, collaborators can suggest, only author can edit)
    + Last edited
    + History
    + Collaborators
    + Comment license (Open, moderate or strict, disabled)
    + Source language
    + Target language
    + Phrases

2. The ability to track individual phrasebook analytics such as:
    + Views
    + Favorites
    + Shares
    + Embeds

3. Each phrase object
    +  Must contain:
        + Source string
        + Source writing system
        + Target string
        + Target writing system
  + May contain:
    + Audio
    + Video
    + Variations
4. The ability to translate a phrasebook into another language. Partial translations or drafts should be supported but unpublished until complete.

5. The ability to search for phrasebooks based on multiple criteria including:
    + Source language
  + Target language
  + Language (Fuzzy)
  + Author
  + Location created
  + Near me
  + Personal search terms

The ideal scenario for this content would be a phrasebook that could be translated between Mandarin and American Sign Language, for example.

### Embeddable content
Phrasebooks should exist as embeddable widgets across the internet. Whether on blogs, websites or other platforms, our phrasebooks are able to be embedded and consumed.

### Chat
The ability to contact available video and phrasebook authors and collaborators over video or text, as well as a users own friends and contacts.

## Data

### Persistence
Both the phrasebooks and the videos share a persistent database of ontological language data. All references to a language refer to a unique language object with its ID and metadata.

### Language keys
Language is an incredibly diverse and fluid subject matter. Therefore, the study of language is ever evolving as the languages themselves change. To address this, we rely on external standards maintained jointly by the International Standards Organization (ISO) and the Summer Institute for Language (SIL).
As a first stage, we just use ISO 639-3 standards as the unique keys.
At a second moment, we intend to develop composite unique ID keys for each language comprised of the language’s own ISO 639-3 ID and our own ID component. Additional research must yet be conducted to assess the stability and value of other ISO 639 codes as well as additional databases such as Glottolog. This allows for flexible IDing of languages that are not yet classified or identified under the ISO code.

There is certainly room to improve language standards.

### Corpora and Machine Translations
All translation activities provide an important opportunity to capture and develop useful corpora. An open standard for corpus data should be developed, and we should be involved.

### Ownership and access
 -->
