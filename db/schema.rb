# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160131013535) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "books", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "description"
  end

  create_table "dictionaries", force: :cascade do |t|
    t.integer  "book_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "dictionaries", ["book_id"], name: "index_dictionaries_on_book_id", using: :btree

  create_table "phrase_pairs", force: :cascade do |t|
    t.integer  "dictionary_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.text     "source_phrase", null: false
    t.text     "target_phrase", null: false
  end

  add_index "phrase_pairs", ["dictionary_id"], name: "index_phrase_pairs_on_dictionary_id", using: :btree

  add_foreign_key "dictionaries", "books"
  add_foreign_key "phrase_pairs", "dictionaries"
end
