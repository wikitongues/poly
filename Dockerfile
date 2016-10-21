FROM convox/rails

# copy only the files needed for bundle install
COPY Gemfile      /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install

# copy the rest of the app
COPY . /app
